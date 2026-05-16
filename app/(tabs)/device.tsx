import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../hooks/useTheme';
import { Spacing } from '../../constants';
import { SectionHeader, FeatureCard } from '../../components';

const DEVICE_FEATURES = [
  {
    icon: 'camera' as const,
    title: '相机',
    subtitle: '拍照、录像、扫码',
    color: '#FF6B6B',
    href: '/device/camera' as const,
  },
  {
    icon: 'location' as const,
    title: '位置服务',
    subtitle: 'GPS定位与地理编码',
    color: '#4ECDC4',
    href: '/device/location' as const,
  },
  {
    icon: 'speedometer' as const,
    title: '传感器',
    subtitle: '加速度计、陀螺仪',
    color: '#45B7D1',
    href: '/device/sensors' as const,
  },
  {
    icon: 'clipboard' as const,
    title: '剪贴板',
    subtitle: '复制粘贴操作',
    color: '#96CEB4',
    href: '/device/clipboard' as const,
  },
  {
    icon: 'battery-charging' as const,
    title: '电池',
    subtitle: '电量与充电状态',
    color: '#DDA0DD',
    href: '/device/battery' as const,
  },
  {
    icon: 'wifi' as const,
    title: '网络',
    subtitle: '连接类型与状态',
    color: '#FFEAA7',
    href: '/device/network' as const,
  },
  {
    icon: 'phone-portrait' as const,
    title: '设备信息',
    subtitle: '型号、系统、内存',
    color: '#74B9FF',
    href: '/device/device-info' as const,
  },
];

const NATIVE_FEATURES = [
  {
    icon: 'notifications' as const,
    title: '通知',
    subtitle: '推送通知与本地通知',
    color: '#FD79A8',
    href: '/device/device-info' as const,
  },
  {
    icon: 'share-social' as const,
    title: '分享',
    subtitle: '系统分享面板',
    color: '#00CEC9',
    href: '/device/clipboard' as const,
  },
  {
    icon: 'image' as const,
    title: '图片选择',
    subtitle: '相册与相机选取',
    color: '#E17055',
    href: '/device/camera' as const,
  },
  {
    icon: 'volume-high' as const,
    title: '触感反馈',
    subtitle: 'Haptics 振动反馈',
    color: '#6C5CE7',
    href: '/device/sensors' as const,
  },
];

export default function DeviceScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.section}>
        <SectionHeader title="设备能力" subtitle="调用手机硬件与系统功能" />
        <View style={styles.featureGrid}>
          {DEVICE_FEATURES.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              subtitle={feature.subtitle}
              color={feature.color}
              onPress={() => router.push(feature.href)}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <SectionHeader title="系统能力" subtitle="系统集成与交互" />
        <View style={styles.featureGrid}>
          {NATIVE_FEATURES.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              subtitle={feature.subtitle}
              color={feature.color}
              onPress={() => router.push(feature.href)}
            />
          ))}
        </View>
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
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
});
