import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { Spacing, Typography } from '../constants';

interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
}

export function Loading({ message = '加载中...', fullScreen = false }: LoadingProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        fullScreen && styles.fullScreen,
        { backgroundColor: colors.background },
      ]}
    >
      <ActivityIndicator size="large" color={colors.primary} />
      {message && (
        <Text style={[Typography.bodySmall, { color: colors.textSecondary, marginTop: Spacing.md }]}>
          {message}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.xxl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullScreen: {
    flex: 1,
  },
});
