import React from 'react';
import { Platform, StyleSheet, View, type ViewStyle } from 'react-native';
import Colors from '@constants/colors';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  padding?: number;
  radius?: number;
  bg?: string;
  shadow?: boolean;
}

export default function Card({
  children,
  style,
  padding = 16,
  radius = 16,
  bg = Colors.white,
  shadow = true,
}: CardProps) {
  return (
    <View
      style={[
        styles.card,
        { padding, borderRadius: radius, backgroundColor: bg },
        shadow && styles.shadow,
        ...(Array.isArray(style) ? style : [style]),
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {},
  shadow: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.07,
      shadowRadius: 6,
    },
    android: { elevation: 3 },
    default: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.07,
      shadowRadius: 6,
    },
  }),
});
