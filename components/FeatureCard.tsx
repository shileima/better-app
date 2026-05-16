import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';
import { Spacing, BorderRadius, Typography } from '../constants';
import { Card } from './Card';

interface FeatureCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  color?: string;
  onPress?: () => void;
}

export function FeatureCard({ icon, title, subtitle, color, onPress }: FeatureCardProps) {
  const { colors } = useTheme();
  const iconColor = color || colors.primary;

  return (
    <Card onPress={onPress} padding="md" style={styles.card}>
      <View style={[styles.iconContainer, { backgroundColor: iconColor + '15' }]}>
        <Ionicons name={icon} size={24} color={iconColor} />
      </View>
      <Text style={[Typography.h4, { color: colors.text, marginTop: Spacing.sm }]}>
        {title}
      </Text>
      <Text
        style={[Typography.caption, { color: colors.textSecondary, marginTop: Spacing.xs }]}
        numberOfLines={2}
      >
        {subtitle}
      </Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '47%',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
