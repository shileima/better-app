import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import * as Network from 'expo-network';
import NetInfo, { type NetInfoState } from '@react-native-community/netinfo';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { Spacing, Typography, BorderRadius } from '../../constants';
import { Card, Button } from '../../components';

export default function NetworkScreen() {
  const { colors } = useTheme();
  const [ip, setIp] = useState<string>('获取中...');
  const [netInfo, setNetInfo] = useState<NetInfoState | null>(null);

  const loadNetworkInfo = async () => {
    try {
      const ipAddr = await Network.getIpAddressAsync();
      setIp(ipAddr || '无法获取');
    } catch {
      setIp('获取失败');
    }

    const state = await NetInfo.fetch();
    setNetInfo(state);
  };

  useEffect(() => {
    loadNetworkInfo();
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      setNetInfo(state);
    });
    return () => unsubscribe();
  }, []);

  const getConnectionIcon = (): keyof typeof Ionicons.glyphMap => {
    if (!netInfo?.isConnected) return 'cloud-offline';
    switch (netInfo.type) {
      case 'wifi':
        return 'wifi';
      case 'cellular':
        return 'cellular';
      default:
        return 'globe';
    }
  };

  const getConnectionColor = (): string => {
    if (!netInfo?.isConnected) return colors.danger;
    if (netInfo.isInternetReachable) return colors.success;
    return colors.warning;
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* 网络状态大卡片 */}
      <Card style={{ marginHorizontal: Spacing.lg, marginTop: Spacing.lg, alignItems: 'center' }}>
        <Ionicons name={getConnectionIcon()} size={64} color={getConnectionColor()} />
        <Text style={[Typography.h2, { color: colors.text, marginTop: Spacing.lg }]}>
          {netInfo?.isConnected ? '已连接' : '未连接'}
        </Text>
        <Text style={[Typography.body, { color: colors.textSecondary, marginTop: Spacing.xs }]}>
          {netInfo?.type === 'wifi'
            ? 'WiFi 网络'
            : netInfo?.type === 'cellular'
            ? '蜂窝网络'
            : netInfo?.type === 'ethernet'
            ? '以太网'
            : '未知类型'}
        </Text>
        <View style={styles.statusBadges}>
          <View
            style={[
              styles.badge,
              { backgroundColor: netInfo?.isConnected ? colors.success + '15' : colors.danger + '15' },
            ]}
          >
            <Text style={[Typography.caption, { color: netInfo?.isConnected ? colors.success : colors.danger }]}>
              {netInfo?.isConnected ? '网络可用' : '网络不可用'}
            </Text>
          </View>
          <View
            style={[
              styles.badge,
              {
                backgroundColor: netInfo?.isInternetReachable
                  ? colors.success + '15'
                  : colors.warning + '15',
              },
            ]}
          >
            <Text
              style={[
                Typography.caption,
                { color: netInfo?.isInternetReachable ? colors.success : colors.warning },
              ]}
            >
              {netInfo?.isInternetReachable ? '互联网可达' : '互联网不可达'}
            </Text>
          </View>
        </View>
      </Card>

      {/* 详细信息 */}
      <View style={{ paddingHorizontal: Spacing.lg, marginTop: Spacing.lg, gap: Spacing.md }}>
        <Card>
          <View style={styles.infoRow}>
            <Ionicons name="server" size={20} color={colors.primary} />
            <View style={styles.infoContent}>
              <Text style={[Typography.caption, { color: colors.textSecondary }]}>IP 地址</Text>
              <Text style={[Typography.body, { color: colors.text }]}>{ip}</Text>
            </View>
          </View>
        </Card>

        {netInfo?.details && netInfo.type === 'wifi' && (
          <Card>
            <View style={styles.infoRow}>
              <Ionicons name="wifi" size={20} color={colors.primary} />
              <View style={styles.infoContent}>
                <Text style={[Typography.caption, { color: colors.textSecondary }]}>WiFi 信息</Text>
                <Text style={[Typography.body, { color: colors.text }]}>
                  {(netInfo.details as unknown as Record<string, unknown>).ssid as string || '未知SSID'}
                </Text>
              </View>
            </View>
          </Card>
        )}

        {netInfo?.details && netInfo.type === 'cellular' && (
          <Card>
            <View style={styles.infoRow}>
              <Ionicons name="cellular" size={20} color={colors.primary} />
              <View style={styles.infoContent}>
                <Text style={[Typography.caption, { color: colors.textSecondary }]}>蜂窝网络</Text>
                <Text style={[Typography.body, { color: colors.text }]}>
                  {(netInfo.details as unknown as Record<string, unknown>).cellularGeneration as string || '未知'}代网络
                </Text>
              </View>
            </View>
          </Card>
        )}

        <Button title="刷新网络信息" variant="outline" onPress={loadNetworkInfo} />
      </View>

      <View style={{ height: Spacing.xxl }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBadges: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: Spacing.lg,
  },
  badge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoContent: {
    marginLeft: Spacing.md,
    flex: 1,
  },
});
