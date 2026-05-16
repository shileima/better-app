import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { Spacing, Typography, BorderRadius } from '../../constants';
import { Card, ListItem } from '../../components';

export default function ProfileScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* 用户信息卡片 */}
      <Card style={styles.profileCard}>
        <View style={styles.profileHeader}>
          <View style={[styles.avatar, { backgroundColor: colors.primary + '20' }]}>
            <Ionicons name="person" size={36} color={colors.primary} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={[Typography.h3, { color: colors.text }]}>Expo Demo 用户</Text>
            <Text style={[Typography.bodySmall, { color: colors.textSecondary, marginTop: Spacing.xs }]}>
              体验 Expo 全栈开发能力
            </Text>
          </View>
        </View>
        <View style={styles.profileStats}>
          <View style={styles.statItem}>
            <Text style={[Typography.h3, { color: colors.primary }]}>12</Text>
            <Text style={[Typography.caption, { color: colors.textSecondary }]}>功能</Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
          <View style={styles.statItem}>
            <Text style={[Typography.h3, { color: colors.primary }]}>5</Text>
            <Text style={[Typography.caption, { color: colors.textSecondary }]}>页面</Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
          <View style={styles.statItem}>
            <Text style={[Typography.h3, { color: colors.primary }]}>SDK 54</Text>
            <Text style={[Typography.caption, { color: colors.textSecondary }]}>版本</Text>
          </View>
        </View>
      </Card>

      {/* 功能列表 */}
      <View style={styles.section}>
        <Text style={[Typography.h4, { color: colors.text, marginBottom: Spacing.md }]}>
          应用功能
        </Text>
        <Card padding="xs">
          <ListItem
            icon="server"
            title="本地存储"
            subtitle="AsyncStorage / SecureStore"
            onPress={() => router.push('/profile/storage')}
          />
          <ListItem
            icon="settings"
            title="设置"
            subtitle="主题、语言等偏好设置"
            onPress={() => router.push('/profile/settings')}
          />
          <ListItem
            icon="information-circle"
            title="关于"
            subtitle="版本信息与开源许可"
            onPress={() => router.push('/profile/about')}
            showArrow={true}
          />
        </Card>
      </View>

      {/* 开发工具 */}
      <View style={styles.section}>
        <Text style={[Typography.h4, { color: colors.text, marginBottom: Spacing.md }]}>
          开发工具
        </Text>
        <Card padding="xs">
          <ListItem
            icon="bug"
            iconColor="#FF6B6B"
            title="调试信息"
            subtitle="查看运行时日志与状态"
            onPress={() => {}}
          />
          <ListItem
            icon="color-palette"
            iconColor="#4ECDC4"
            title="UI 预览"
            subtitle="组件库与样式预览"
            onPress={() => {}}
          />
          <ListItem
            icon="code-slash"
            iconColor="#45B7D1"
            title="API 测试"
            subtitle="网络请求调试工具"
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
  profileCard: {
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: BorderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    marginLeft: Spacing.lg,
    flex: 1,
  },
  profileStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.lg,
    paddingTop: Spacing.lg,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E5E5EA',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 30,
  },
  section: {
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.xl,
  },
});
