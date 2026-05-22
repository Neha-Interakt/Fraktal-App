import React from 'react';
import { Text, type TextProps, type TextStyle } from 'react-native';
import Colors from '@constants/colors';
import Typography from '@constants/typography';

type Variant = 'h1' | 'h2' | 'h3' | 'title' | 'body' | 'bodySm' | 'caption' | 'label' | 'micro';
type Weight = 'regular' | 'medium' | 'semiBold' | 'bold';

interface AppTextProps extends TextProps {
  variant?: Variant;
  weight?: Weight;
  color?: string;
  style?: TextStyle | TextStyle[];
  children?: React.ReactNode;
}

const VARIANT_STYLES: Record<Variant, TextStyle> = {
  h1: { fontSize: Typography.sizes.xxxl, lineHeight: 38 },
  h2: { fontSize: Typography.sizes.xxl, lineHeight: 32 },
  h3: { fontSize: Typography.sizes.xl, lineHeight: 28 },
  title: { fontSize: Typography.sizes.lg, lineHeight: 24 },
  body: { fontSize: Typography.sizes.base, lineHeight: 22 },
  bodySm: { fontSize: Typography.sizes.sm, lineHeight: 18 },
  caption: { fontSize: Typography.sizes.base, lineHeight: 20 },
  label: { fontSize: Typography.sizes.sm, lineHeight: 16 },
  micro: { fontSize: Typography.sizes.xs, lineHeight: 14 },
};

export default function AppText({
  variant = 'body',
  weight = 'regular',
  color = Colors.text,
  style,
  children,
  ...rest
}: AppTextProps) {
  const weightStyle = Typography[weight];
  const variantStyle = VARIANT_STYLES[variant];
  return (
    <Text
      style={[weightStyle, variantStyle, { color }, ...(Array.isArray(style) ? style : [style])]}
      {...rest}
    >
      {children}
    </Text>
  );
}
