import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../hooks/useTheme';
import { Spacing, BorderRadius, Typography } from '../constants';

interface ListItemProps {
  icon?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  title: string;
  subtitle?: string;
  rightText?: string;
  showArrow?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
  onPress?: () => void;
  destructive?: boolean;
}

export function ListItem({
  icon,
  iconColor,
  title,
  subtitle,
  rightText,
  showArrow = true,
  switchValue,
  onSwitchChange,
  onPress,
  destructive = false,
}: ListItemProps) {
  const { colors } = useTheme();

  const textColor = destructive ? colors.danger : colors.text;
  const iColor = destructive
    ? colors.danger
    : iconColor || colors.primary;

  const content = (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.surface, borderColor: colors.borderLight },
      ]}
    >
      {icon && (
        <View style={[styles.iconContainer, { backgroundColor: iColor + '15' }]}>
          <Ionicons name={icon} size={20} color={iColor} />
        </View>
      )}
      <View style={styles.textContainer}>
        <Text style={[Typography.body, { color: textColor }]}>{title}</Text>
        {subtitle && (
          <Text style={[Typography.caption, { color: colors.textSecondary, marginTop: 2 }]}>
            {subtitle}
          </Text>
        )}
      </View>
      {rightText && (
        <Text style={[Typography.bodySmall, { color: colors.textSecondary }]}>{rightText}</Text>
      )}
      {switchValue !== undefined && onSwitchChange && (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{ false: colors.border, true: colors.primary }}
          thumbColor="#FFFFFF"
        />
      )}
      {showArrow && onPress && switchValue === undefined && (
        <Ionicons name="chevron-forward" size={18} color={colors.textTertiary} />
      )}
    </View>
  );

  if (onPress && switchValue === undefined) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  iconContainer: {
    width: 34,
    height: 34,
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  textContainer: {
    flex: 1,
  },
});
