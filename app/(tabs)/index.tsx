import React from 'react';
import { View, ScrollView, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { Spacing, Typography, BorderRadius } from '../../constants';
import { SectionHeader, FeatureCard, Card } from '../../components';

const QUICK_FEATURES = [
  {
    icon: 'camera' as const,
    title: '相机',
    subtitle: '拍照与扫码',
    color: '#FF6B6B',
    href: '/device/camera' as const,
  },
  {
    icon: 'location' as const,
    title: '位置',
    subtitle: 'GPS 定位',
    color: '#4ECDC4',
    href: '/device/location' as const,
  },
  {
    icon: 'globe' as const,
    title: 'H5 页面',
    subtitle: '内嵌网页',
    color: '#45B7D1',
    href: '/webview/index' as const,
  },
  {
    icon: 'finger-print' as const,
    title: '生物识别',
    subtitle: '指纹/面容',
    color: '#96CEB4',
    href: '/device/device-info' as const,
  },
  {
    icon: 'wifi' as const,
    title: '网络',
    subtitle: '连接状态',
    color: '#FFEAA7',
    href: '/device/network' as const,
  },
  {
    icon: 'battery-charging' as const,
    title: '电池',
    subtitle: '电量信息',
    color: '#DDA0DD',
    href: '/device/battery' as const,
  },
];

const ANNOUNCEMENTS = [
  { id: 1, title: 'Expo SDK 54 正式发布', tag: '新版本', date: '2025-06' },
  { id: 2, title: 'React Native 0.81 新特性一览', tag: '技术', date: '2025-06' },
  { id: 3, title: 'App 开发最佳实践指南', tag: '指南', date: '2025-05' },
];

export default function HomeScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* 顶部欢迎区域 */}
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <View style={styles.headerContent}>
          <View>
            <Text style={[Typography.h2, { color: '#FFFFFF' }]}>Expo Demo</Text>
            <Text style={[Typography.bodySmall, { color: 'rgba(255,255,255,0.8)', marginTop: Spacing.xs }]}>
              基于 Expo SDK 54 的示例应用
            </Text>
          </View>
          <TouchableOpacity
            style={styles.avatarContainer}
            onPress={() => router.push('/profile/settings')}
          >
            <Ionicons name="person-circle" size={42} color="rgba(255,255,255,0.9)" />
          </TouchableOpacity>
        </View>
      </View>

      {/* 快捷功能入口 */}
      <View style={styles.section}>
        <SectionHeader title="快捷功能" subtitle="设备能力一键体验" />
        <View style={styles.featureGrid}>
          {QUICK_FEATURES.map((feature) => (
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

      {/* 公告区域 */}
      <View style={styles.section}>
        <SectionHeader title="最新动态" action="查看全部" onActionPress={() => {}} />
        {ANNOUNCEMENTS.map((item) => (
          <Card key={item.id} style={styles.announcementCard}>
            <View style={styles.announcementContent}>
              <View style={[styles.tag, { backgroundColor: colors.primary + '15' }]}>
                <Text style={[Typography.caption, { color: colors.primary }]}>{item.tag}</Text>
              </View>
              <Text style={[Typography.body, { color: colors.text, marginTop: Spacing.sm, flex: 1 }]}>
                {item.title}
              </Text>
              <Text style={[Typography.caption, { color: colors.textTertiary, marginTop: Spacing.xs }]}>
                {item.date}
              </Text>
            </View>
          </Card>
        ))}
      </View>

      {/* 底部间距 */}
      <View style={{ height: Spacing.xxl }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingBottom: Spacing.xxl,
    paddingHorizontal: Spacing.lg,
    borderBottomLeftRadius: BorderRadius.xl,
    borderBottomRightRadius: BorderRadius.xl,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatarContainer: {
    borderRadius: 21,
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
  announcementCard: {
    marginBottom: Spacing.sm,
  },
  announcementContent: {
    flex: 1,
  },
  tag: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
});
