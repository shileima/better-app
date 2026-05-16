import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { Spacing, Typography } from '../constants';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: string;
  onActionPress?: () => void;
}

export function SectionHeader({ title, subtitle, action, onActionPress }: SectionHeaderProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={[Typography.h3, { color: colors.text }]}>{title}</Text>
        {subtitle && (
          <Text style={[Typography.caption, { color: colors.textSecondary, marginTop: Spacing.xs }]}>
            {subtitle}
          </Text>
        )}
      </View>
      {action && (
        <TouchableOpacity onPress={onActionPress} activeOpacity={0.7}>
          <Text style={[Typography.bodySmall, { color: colors.primary }]}>{action}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  titleContainer: {
    flex: 1,
  },
});
