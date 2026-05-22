import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  type KeyboardTypeOptions,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Colors from '@constants/colors';
import Typography from '@constants/typography';
import AppText from './AppText';

interface AppInputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
  multiline?: boolean;
  numberOfLines?: number;
  secureToggle?: boolean;
}

function EyeIcon({ visible }: { visible: boolean }) {
  if (visible) {
    return (
      <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
        <Path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke={Colors.placeholder} strokeWidth={1.5} />
        <Path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke={Colors.placeholder} strokeWidth={1.5} />
      </Svg>
    );
  }
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" stroke={Colors.placeholder} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

export default function AppInput({
  label,
  required,
  error,
  hint,
  leftIcon,
  rightIcon,
  containerStyle,
  multiline,
  numberOfLines = 4,
  secureToggle = false,
  ...props
}: AppInputProps) {
  const [secure, setSecure] = useState(secureToggle);
  const [focused, setFocused] = useState(false);

  const borderColor = error ? Colors.red : focused ? Colors.primary : Colors.border;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <AppText variant="label" weight="medium" color={Colors.textLight} style={styles.label}>
          {label}
          {required && <AppText color={Colors.red}> *</AppText>}
        </AppText>
      )}
      <View style={[styles.inputWrap, { borderColor }, multiline && styles.multilineWrap]}>
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        <TextInput
          style={[
            styles.input,
            leftIcon && styles.inputWithLeft,
            (rightIcon || secureToggle) && styles.inputWithRight,
            multiline && { height: numberOfLines * 22, textAlignVertical: 'top', paddingTop: 12 },
          ]}
          placeholderTextColor={Colors.placeholder}
          selectionColor={Colors.primary}
          secureTextEntry={secure}
          multiline={multiline}
          numberOfLines={multiline ? numberOfLines : undefined}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          underlineColorAndroid="transparent"
          {...props}
        />
        {secureToggle && (
          <TouchableOpacity style={styles.rightIcon} onPress={() => setSecure(s => !s)} hitSlop={8}>
            <EyeIcon visible={!secure} />
          </TouchableOpacity>
        )}
        {!secureToggle && rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
      </View>
      {error && <AppText variant="label" color={Colors.red} style={styles.msg}>{error}</AppText>}
      {hint && !error && <AppText variant="label" color={Colors.muted} style={styles.msg}>{hint}</AppText>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 6 },
  label: { marginBottom: 2 },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1.4,
    borderRadius: 12,
    paddingHorizontal: 14,
    minHeight: 50,
  },
  multilineWrap: { alignItems: 'flex-start' },
  input: {
    flex: 1,
    ...Typography.regular,
    fontSize: 15,
    color: Colors.text,
    paddingVertical: 13,
  },
  inputWithLeft: { paddingLeft: 10 },
  inputWithRight: { paddingRight: 10 },
  leftIcon: { marginRight: 8 },
  rightIcon: { marginLeft: 8 },
  msg: { marginTop: 2 },
});
