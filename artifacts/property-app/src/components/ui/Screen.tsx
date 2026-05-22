import React from 'react';
import { Platform, ScrollView, StyleSheet, View, type ViewStyle, type ScrollViewProps } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@constants/colors';

interface ScreenProps {
  children: React.ReactNode;
  style?: ViewStyle;
  bg?: string;
  scrollable?: boolean;
  scrollProps?: ScrollViewProps;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
}

export default function Screen({
  children,
  style,
  bg = Colors.bg,
  scrollable = false,
  scrollProps,
  edges = ['top', 'bottom', 'left', 'right'],
}: ScreenProps) {
  const content = scrollable ? (
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      {...scrollProps}
      style={[{ flex: 1, backgroundColor: bg }, scrollProps?.style]}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.fill, { backgroundColor: bg }, style]}>{children}</View>
  );

  return (
    <SafeAreaView style={[styles.fill, { backgroundColor: bg }]} edges={edges}>
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
});
