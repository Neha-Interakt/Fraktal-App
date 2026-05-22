import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
  type TouchableOpacityProps,
  type ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '@constants/colors';
import Typography from '@constants/typography';
import AppText from './AppText';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface AppButtonProps extends TouchableOpacityProps {
  label: string;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  style?: ViewStyle;
}

const SIZE_STYLES: Record<Size, ViewStyle & { paddingVertical: number; paddingHorizontal: number }> = {
  sm: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 10 },
  md: { paddingVertical: 13, paddingHorizontal: 20, borderRadius: 14 },
  lg: { paddingVertical: 16, paddingHorizontal: 24, borderRadius: 16 },
};

const TEXT_SIZE: Record<Size, number> = { sm: 13, md: 15, lg: 16 };

export default function AppButton({
  label,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  style,
  disabled,
  ...rest
}: AppButtonProps) {
  const sizeStyle = SIZE_STYLES[size];
  const textSize = TEXT_SIZE[size];
  const isDisabled = disabled || loading;

  const content = (
    <View style={[styles.row, { gap: 8 }]}>
      {icon && iconPosition === 'left' && icon}
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' || variant === 'ghost' ? Colors.primary : Colors.white}
        />
      ) : (
        <AppText
          variant="body"
          weight="semiBold"
          style={{ fontSize: textSize, color: getTextColor(variant) }}
        >
          {label}
        </AppText>
      )}
      {icon && iconPosition === 'right' && icon}
    </View>
  );

  if (variant === 'primary') {
    return (
      <TouchableOpacity
        activeOpacity={0.82}
        disabled={isDisabled}
        style={[fullWidth && styles.fullWidth, style, isDisabled && styles.disabled]}
        {...rest}
      >
        <LinearGradient
          colors={[Colors.primary, Colors.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.base, sizeStyle]}
        >
          {content}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.82}
      disabled={isDisabled}
      style={[
        styles.base,
        sizeStyle,
        getContainerStyle(variant),
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        style,
      ]}
      {...rest}
    >
      {content}
    </TouchableOpacity>
  );
}

function getTextColor(variant: Variant): string {
  switch (variant) {
    case 'primary': return Colors.white;
    case 'secondary': return Colors.primary;
    case 'outline': return Colors.primary;
    case 'ghost': return Colors.primary;
    case 'danger': return Colors.white;
  }
}

function getContainerStyle(variant: Variant): ViewStyle {
  switch (variant) {
    case 'secondary': return { backgroundColor: Colors.surfaceAlt };
    case 'outline': return { borderWidth: 1.5, borderColor: Colors.primary, backgroundColor: 'transparent' };
    case 'ghost': return { backgroundColor: 'transparent' };
    case 'danger': return { backgroundColor: Colors.red };
    default: return {};
  }
}

const styles = StyleSheet.create({
  base: { alignItems: 'center', justifyContent: 'center' },
  row: { flexDirection: 'row', alignItems: 'center' },
  fullWidth: { width: '100%' },
  disabled: { opacity: 0.55 },
});
