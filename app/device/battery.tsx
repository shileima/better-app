import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import * as Battery from 'expo-battery';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { Spacing, Typography, BorderRadius } from '../../constants';
import { Card, Button } from '../../components';

export default function BatteryScreen() {
  const { colors } = useTheme();
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [batteryState, setBatteryState] = useState<Battery.BatteryState | null>(null);
  const [lowPower, setLowPower] = useState<boolean>(false);

  useEffect(() => {
    const loadBatteryInfo = async () => {
      const level = await Battery.getBatteryLevelAsync();
      const state = await Battery.getBatteryStateAsync();
      const low = await Battery.isLowPowerModeEnabledAsync();
      setBatteryLevel(level);
      setBatteryState(state);
      setLowPower(low);
    };

    loadBatteryInfo();

    const levelSub = Battery.addBatteryLevelListener(({ batteryLevel }) => {
      setBatteryLevel(batteryLevel);
    });
    const stateSub = Battery.addBatteryStateListener(({ batteryState }) => {
      setBatteryState(batteryState);
    });
    const lowSub = Battery.addLowPowerModeListener(({ lowPowerMode }) => {
      setLowPower(lowPowerMode);
    });

    return () => {
      levelSub.remove();
      stateSub.remove();
      lowSub.remove();
    };
  }, []);

  const getBatteryIcon = (): keyof typeof Ionicons.glyphMap => {
    if (batteryLevel === null) return 'battery-full';
    if (batteryLevel > 0.75) return 'battery-full';
    if (batteryLevel > 0.5) return 'battery-half';
    if (batteryLevel > 0.25) return 'battery-half';
    return 'battery-dead';
  };

  const getBatteryColor = (): string => {
    if (batteryLevel === null) return colors.textTertiary;
    if (batteryLevel > 0.5) return colors.success;
    if (batteryLevel > 0.2) return colors.warning;
    return colors.danger;
  };

  const getStateText = (state: Battery.BatteryState | null): string => {
    switch (state) {
      case Battery.BatteryState.UNPLUGGED:
        return '未充电';
      case Battery.BatteryState.CHARGING:
        return '充电中';
      case Battery.BatteryState.FULL:
        return '已充满';
      default:
        return '未知';
    }
  };

  const getStateIcon = (state: Battery.BatteryState | null): keyof typeof Ionicons.glyphMap => {
    switch (state) {
      case Battery.BatteryState.CHARGING:
        return 'flash';
      case Battery.BatteryState.FULL:
        return 'checkmark-circle';
      default:
        return 'remove-circle-outline';
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* 电量大卡片 */}
      <Card style={{ marginHorizontal: Spacing.lg, marginTop: Spacing.lg, alignItems: 'center' }}>
        <Ionicons name={getBatteryIcon()} size={80} color={getBatteryColor()} />
        <Text style={[Typography.h1, { color: colors.text, marginTop: Spacing.lg }]}>
          {batteryLevel !== null ? `${Math.round(batteryLevel * 100)}%` : '--%'}
        </Text>
        <Text style={[Typography.body, { color: colors.textSecondary, marginTop: Spacing.xs }]}>
          当前电量
        </Text>

        {/* 电量条 */}
        <View style={[styles.batteryBar, { backgroundColor: colors.borderLight, marginTop: Spacing.xl }]}>
          <View
            style={[
              styles.batteryFill,
              {
                backgroundColor: getBatteryColor(),
                width: batteryLevel !== null ? `${batteryLevel * 100}%` : '0%',
              },
            ]}
          />
        </View>
      </Card>

      {/* 详细信息 */}
      <View style={{ paddingHorizontal: Spacing.lg, marginTop: Spacing.lg, gap: Spacing.md }}>
        <Card>
          <View style={styles.infoRow}>
            <Ionicons name={getStateIcon(batteryState)} size={22} color={colors.primary} />
            <View style={styles.infoContent}>
              <Text style={[Typography.caption, { color: colors.textSecondary }]}>充电状态</Text>
              <Text style={[Typography.body, { color: colors.text }]}>{getStateText(batteryState)}</Text>
            </View>
          </View>
        </Card>

        <Card>
          <View style={styles.infoRow}>
            <Ionicons
              name={lowPower ? 'moon' : 'sunny'}
              size={22}
              color={lowPower ? colors.warning : colors.success}
            />
            <View style={styles.infoContent}>
              <Text style={[Typography.caption, { color: colors.textSecondary }]}>低电量模式</Text>
              <Text style={[Typography.body, { color: colors.text }]}>{lowPower ? '已开启' : '未开启'}</Text>
            </View>
          </View>
        </Card>
      </View>

      <View style={{ height: Spacing.xxl }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  batteryBar: {
    width: '100%',
    height: 12,
    borderRadius: 6,
    overflow: 'hidden',
  },
  batteryFill: {
    height: '100%',
    borderRadius: 6,
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
