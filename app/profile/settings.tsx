import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { Spacing, Typography } from '../../constants';
import { Card, ListItem, Button } from '../../components';
import { Storage } from '../../utils/storage';

export default function SettingsScreen() {
  const { colors, mode, setMode, isDark } = useTheme();
  const router = useRouter();
  const [notifications, setNotifications] = useState(true);
  const [biometrics, setBiometrics] = useState(false);

  const handleClearCache = () => {
    Alert.alert('清除缓存', '确定要清除所有本地缓存数据吗？', [
      { text: '取消', style: 'cancel' },
      {
        text: '确定',
        style: 'destructive',
        onPress: async () => {
          await Storage.clear();
          Alert.alert('提示', '缓存已清除');
        },
      },
    ]);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* 外观设置 */}
      <View style={styles.section}>
        <Text style={[Typography.h4, { color: colors.text, marginBottom: Spacing.md }]}>
          外观
        </Text>
        <Card padding="xs">
          <ListItem
            icon="moon"
            iconColor="#6C5CE7"
            title="深色模式"
            subtitle={mode === 'system' ? '跟随系统' : mode === 'dark' ? '始终开启' : '始终关闭'}
            switchValue={isDark}
            onSwitchChange={(value) => setMode(value ? 'dark' : 'light')}
          />
          <ListItem
            icon="color-palette"
            iconColor="#0984E3"
            title="跟随系统"
            subtitle="自动切换深色/浅色模式"
            switchValue={mode === 'system'}
            onSwitchChange={(value) => setMode(value ? 'system' : 'light')}
          />
        </Card>
      </View>

      {/* 通知设置 */}
      <View style={styles.section}>
        <Text style={[Typography.h4, { color: colors.text, marginBottom: Spacing.md }]}>
          通知
        </Text>
        <Card padding="xs">
          <ListItem
            icon="notifications"
            iconColor="#FF6B6B"
            title="推送通知"
            subtitle="接收应用推送消息"
            switchValue={notifications}
            onSwitchChange={setNotifications}
          />
          <ListItem
            icon="finger-print"
            iconColor="#4ECDC4"
            title="生物识别解锁"
            subtitle="使用指纹或面容解锁应用"
            switchValue={biometrics}
            onSwitchChange={setBiometrics}
          />
        </Card>
      </View>

      {/* 数据管理 */}
      <View style={styles.section}>
        <Text style={[Typography.h4, { color: colors.text, marginBottom: Spacing.md }]}>
          数据管理
        </Text>
        <Card padding="xs">
          <ListItem
            icon="server"
            iconColor="#45B7D1"
            title="本地存储管理"
            subtitle="查看与管理本地数据"
            onPress={() => router.push('/profile/storage')}
          />
          <ListItem
            icon="trash"
            iconColor="#FF3B30"
            title="清除缓存"
            subtitle="清除本地缓存数据"
            onPress={handleClearCache}
            destructive
          />
        </Card>
      </View>

      {/* 关于 */}
      <View style={styles.section}>
        <Text style={[Typography.h4, { color: colors.text, marginBottom: Spacing.md }]}>
          其他
        </Text>
        <Card padding="xs">
          <ListItem
            icon="information-circle"
            iconColor="#007AFF"
            title="关于应用"
            rightText="v1.0.0"
            onPress={() => router.push('/profile/about')}
          />
          <ListItem
            icon="document-text"
            iconColor="#5856D6"
            title="开源许可"
            onPress={() => {}}
          />
          <ListItem
            icon="shield-checkmark"
            iconColor="#34C759"
            title="隐私政策"
            onPress={() => {}}
          />
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
  section: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.xl,
  },
});
