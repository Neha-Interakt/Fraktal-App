import React from 'react';
import { View } from 'react-native';

interface Props {
  colors: string[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  locations?: number[];
  style?: any;
  children?: React.ReactNode;
}

function angleFromVector(start?: { x: number; y: number }, end?: { x: number; y: number }): number {
  if (!start || !end) return 180;
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const rad = Math.atan2(dy, dx);
  return Math.round((rad * 180) / Math.PI) + 90;
}

export default function LinearGradient({ colors, start, end, style, children }: Props) {
  const angle = angleFromVector(start, end);
  const gradient = `linear-gradient(${angle}deg, ${colors.join(', ')})`;
  return (
    <View style={[style, { backgroundImage: gradient } as any]}>
      {children}
    </View>
  );
}
