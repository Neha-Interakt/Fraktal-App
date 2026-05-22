import { Platform } from 'react-native';

const BASE_FONT = Platform.select({
  ios: 'Inter',
  android: 'Inter',
  default: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
});

const Typography = {
  regular: { fontFamily: BASE_FONT, fontWeight: '400' as const },
  medium: { fontFamily: BASE_FONT, fontWeight: '500' as const },
  semiBold: { fontFamily: BASE_FONT, fontWeight: '600' as const },
  bold: { fontFamily: BASE_FONT, fontWeight: '700' as const },

  sizes: {
    xs: 10,
    sm: 12,
    base: 14,
    md: 15,
    lg: 17,
    xl: 20,
    xxl: 24,
    xxxl: 30,
  },
} as const;

export default Typography;
