import React from 'react';
import { View, StyleSheet, ScrollView, Text, Linking, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { Spacing, Typography, BorderRadius } from '../../constants';
import { Card, ListItem, Button } from '../../components';
import Constants from 'expo-constants';

export default function AboutScreen() {
  const { colors } = useTheme();

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* App 图标与版本 */}
      <Card style={{ marginHorizontal: Spacing.lg, marginTop: Spacing.lg, alignItems: 'center', paddingVertical: Spacing.xxxl }}>
        <View style={[styles.appIcon, { backgroundColor: colors.primary }]}>
          <Ionicons name="rocket" size={40} color="#FFFFFF" />
        </View>
        <Text style={[Typography.h2, { color: colors.text, marginTop: Spacing.lg }]}>Expo Demo</Text>
        <Text style={[Typography.body, { color: colors.textSecondary, marginTop: Spacing.xs }]}>
          版本 {Constants.expoConfig?.version || '1.0.0'}
        </Text>
        <View style={[styles.tag, { backgroundColor: colors.primary + '15', marginTop: Spacing.md }]}>
          <Text style={[Typography.caption, { color: colors.primary }]}>Expo SDK 54</Text>
        </View>
      </Card>

      {/* 技术栈 */}
      <View style={{ paddingHorizontal: Spacing.lg, marginTop: Spacing.lg }}>
        <Text style={[Typography.h4, { color: colors.text, marginBottom: Spacing.md }]}>
          技术栈
        </Text>
        <Card padding="xs">
          <ListItem icon="logo-react" iconColor="#61DAFB" title="React Native" rightText="0.81" />
          <ListItem icon="rocket" iconColor="#000000" title="Expo" rightText="SDK 54" />
          <ListItem icon="navigate" iconColor="#007AFF" title="Expo Router" rightText="6.0" />
          <ListItem icon="language" iconColor="#3178C6" title="TypeScript" rightText="5.9" />
        </Card>
      </View>

      {/* 链接 */}
      <View style={{ paddingHorizontal: Spacing.lg, marginTop: Spacing.lg }}>
        <Text style={[Typography.h4, { color: colors.text, marginBottom: Spacing.md }]}>
          相关链接
        </Text>
        <Card padding="xs">
          <ListItem
            icon="logo-github"
            iconColor="#333"
            title="Expo GitHub"
            onPress={() => openLink('https://github.com/expo/expo')}
          />
          <ListItem
            icon="book"
            iconColor="#007AFF"
            title="Expo 文档"
            onPress={() => openLink('https://docs.expo.dev')}
          />
          <ListItem
            icon="logo-react"
            iconColor="#61DAFB"
            title="React Native"
            onPress={() => openLink('https://reactnative.dev')}
          />
          <ListItem
            icon="chatbubbles"
            iconColor="#5865F2"
            title="Expo Discord"
            onPress={() => openLink('https://chat.expo.dev')}
          />
        </Card>
      </View>

      {/* 开源说明 */}
      <View style={{ paddingHorizontal: Spacing.lg, marginTop: Spacing.lg }}>
        <Card>
          <Text style={[Typography.caption, { color: colors.textSecondary, textAlign: 'center' }]}>
            本应用基于 Expo 开源项目构建，仅用于学习和演示目的。
            {'\n\n'}
            © 2025 Expo Demo. Built with ❤️
          </Text>
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
  appIcon: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tag: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
});
