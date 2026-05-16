import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { Spacing, Typography } from '../constants';
import { Ionicons } from '@expo/vector-icons';

interface EmptyStateProps {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon = 'folder-open-outline', title, subtitle, action }: EmptyStateProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={64} color={colors.textTertiary} />
      <Text style={[Typography.h3, { color: colors.textSecondary, marginTop: Spacing.lg }]}>
        {title}
      </Text>
      {subtitle && (
        <Text
          style={[
            Typography.bodySmall,
            { color: colors.textTertiary, marginTop: Spacing.sm, textAlign: 'center' },
          ]}
        >
          {subtitle}
        </Text>
      )}
      {action && <View style={styles.actionContainer}>{action}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xxl,
  },
  actionContainer: {
    marginTop: Spacing.xl,
  },
});
