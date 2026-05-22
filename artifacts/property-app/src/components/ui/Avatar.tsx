import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Colors from '@constants/colors';
import Typography from '@constants/typography';
import AppText from './AppText';

interface AvatarProps {
  name?: string;
  uri?: string;
  size?: number;
  bg?: string;
  online?: boolean;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default function Avatar({ name = '', uri, size = 44, bg = Colors.primary, online = false }: AvatarProps) {
  const fontSize = Math.round(size * 0.35);
  return (
    <View style={{ position: 'relative' }}>
      <View
        style={[
          styles.circle,
          { width: size, height: size, borderRadius: size / 2, backgroundColor: bg },
        ]}
      >
        {uri ? (
          <Image
            source={{ uri }}
            style={{ width: size, height: size, borderRadius: size / 2 }}
            resizeMode="cover"
          />
        ) : (
          <AppText
            weight="semiBold"
            style={{ fontSize, color: Colors.white, lineHeight: fontSize * 1.2 }}
          >
            {getInitials(name)}
          </AppText>
        )}
      </View>
      {online && (
        <View
          style={[
            styles.onlineDot,
            { width: size * 0.24, height: size * 0.24, borderRadius: size * 0.12, bottom: 1, right: 1 },
          ]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  circle: { alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  onlineDot: {
    position: 'absolute',
    backgroundColor: Colors.green,
    borderWidth: 2,
    borderColor: Colors.white,
  },
});
