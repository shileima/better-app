import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { Spacing, BorderRadius } from '../constants';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: object;
  padding?: keyof typeof Spacing;
}

export function Card({ children, onPress, style, padding = 'lg' }: CardProps) {
  const { colors } = useTheme();

  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          padding: Spacing[padding],
        },
        style,
      ]}
    >
      {children}
    </Container>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
});
