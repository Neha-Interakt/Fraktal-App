import React from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';
import Colors from '@constants/colors';
import AppText from './AppText';

type BadgeVariant = 'success' | 'warning' | 'error' | 'primary' | 'muted';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  style?: ViewStyle;
  size?: 'sm' | 'md';
}

const VARIANT_COLORS: Record<BadgeVariant, { bg: string; text: string }> = {
  success: { bg: '#e6ffed', text: Colors.green },
  warning: { bg: '#fffbeb', text: Colors.amber },
  error: { bg: '#fff5f5', text: Colors.red },
  primary: { bg: `${Colors.primary}15`, text: Colors.primary },
  muted: { bg: Colors.surfaceAlt, text: Colors.muted },
};

export default function Badge({ label, variant = 'primary', style, size = 'md' }: BadgeProps) {
  const { bg, text } = VARIANT_COLORS[variant];
  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: bg, paddingHorizontal: size === 'sm' ? 6 : 10, paddingVertical: size === 'sm' ? 2 : 4 },
        style,
      ]}
    >
      <AppText variant="micro" weight="semiBold" color={text} style={{ fontSize: size === 'sm' ? 10 : 11 }}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { borderRadius: 99, alignSelf: 'flex-start', alignItems: 'center', justifyContent: 'center' },
});
