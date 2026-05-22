import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useRef, useState } from 'react';
import { Dimensions, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { useAuth } from '@context/AuthContext';
import type { RootStackParamList } from '@navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

const { width: W } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';
const PRIMARY = '#1a365d';
const DARK = '#00122c';
const GOLD = '#c9a227';
const WHITE = '#ffffff';
const LIGHT = '#edf2f7';

function BuildingIllustration() {
  return (
    <Svg width={220} height={220} viewBox="0 0 220 220" fill="none">
      <Circle cx={110} cy={110} r={100} fill={`${PRIMARY}12`} />
      <Circle cx={110} cy={110} r={72} fill={`${PRIMARY}18`} />
      <Rect x={58} y={80} width={44} height={72} rx={4} fill={PRIMARY} />
      <Rect x={106} y={96} width={56} height={56} rx={4} fill="#2d5a9b" />
      <Rect x={65} y={88} width={10} height={12} rx={2} fill={WHITE} opacity={0.7} />
      <Rect x={80} y={88} width={10} height={12} rx={2} fill={WHITE} opacity={0.7} />
      <Rect x={65} y={106} width={10} height={12} rx={2} fill={WHITE} opacity={0.5} />
      <Rect x={80} y={106} width={10} height={12} rx={2} fill={WHITE} opacity={0.5} />
      <Rect x={75} y={134} width={14} height={18} rx={2} fill={GOLD} />
      <Rect x={113} y={104} width={10} height={12} rx={2} fill={WHITE} opacity={0.6} />
      <Rect x={128} y={104} width={10} height={12} rx={2} fill={WHITE} opacity={0.6} />
      <Rect x={123} y={134} width={16} height={18} rx={2} fill={GOLD} />
      <Path d={`M48 152H172`} stroke={`${PRIMARY}40`} strokeWidth={2} />
    </Svg>
  );
}
function FinanceIllustration() {
  return (
    <Svg width={220} height={220} viewBox="0 0 220 220" fill="none">
      <Circle cx={110} cy={110} r={100} fill={`${GOLD}12`} />
      <Rect x={52} y={80} width={116} height={80} rx={10} fill={PRIMARY} />
      <Rect x={62} y={92} width={36} height={28} rx={4} fill={`${WHITE}20`} />
      <Rect x={108} y={92} width={50} height={8} rx={3} fill={`${WHITE}40`} />
      <Rect x={108} y={106} width={36} height={6} rx={3} fill={`${WHITE}25`} />
      <Circle cx={70} cy={136} r={10} fill={GOLD} />
      <Path d="M66 136h8M70 132v8" stroke={PRIMARY} strokeWidth={2} strokeLinecap="round" />
      <Rect x={90} y={130} width={70} height={8} rx={3} fill={`${WHITE}30`} />
    </Svg>
  );
}
function MaintenanceIllustration() {
  return (
    <Svg width={220} height={220} viewBox="0 0 220 220" fill="none">
      <Circle cx={110} cy={110} r={100} fill={`${PRIMARY}10`} />
      <Path d="M85 140C85 128 93 118 104 116V90C104 86 107 84 110 84C113 84 116 86 116 90V116C127 118 135 128 135 140C135 153 124 164 110 164C96 164 85 153 85 140Z" fill={PRIMARY} opacity={0.15} stroke={PRIMARY} strokeWidth={2} />
      <Rect x={104} y={84} width={12} height={32} rx={4} fill={PRIMARY} />
      <Circle cx={110} cy={140} r={14} fill={GOLD} />
      <Circle cx={110} cy={140} r={6} fill={WHITE} />
    </Svg>
  );
}

const SLIDES = [
  { title: 'Manage Properties', subtitle: 'Track all your properties, tenants and rent in one beautiful dashboard.', Illustration: BuildingIllustration },
  { title: 'Track Finances', subtitle: 'Monitor revenue, expenses and ROI with clear analytics and reports.', Illustration: FinanceIllustration },
  { title: 'Handle Maintenance', subtitle: 'Log and resolve maintenance requests quickly. Keep tenants happy.', Illustration: MaintenanceIllustration },
];

export default function OnboardingScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { completeOnboarding } = useAuth();

  const handleNext = async () => {
    if (currentIndex < SLIDES.length - 1) {
      const next = currentIndex + 1;
      scrollRef.current?.scrollTo({ x: next * W, animated: true });
      setCurrentIndex(next);
    } else {
      await completeOnboarding();
      navigation.replace('Login');
    }
  };

  const handleSkip = async () => {
    await completeOnboarding();
    navigation.replace('Login');
  };

  return (
    <View style={[s.screen, { paddingBottom: insets.bottom }]}>
      <TouchableOpacity style={[s.skipBtn, { top: (isWeb ? 8 : insets.top) + 8 }]} onPress={handleSkip}>
        <Text style={s.skipText}>Skip</Text>
      </TouchableOpacity>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        style={{ flex: 1 }}
      >
        {SLIDES.map((slide, i) => {
          const Illus = slide.Illustration;
          return (
            <View key={i} style={[s.slide, { width: W }]}>
              <View style={s.illustrationWrap}><Illus /></View>
              <Text style={s.title}>{slide.title}</Text>
              <Text style={s.subtitle}>{slide.subtitle}</Text>
            </View>
          );
        })}
      </ScrollView>

      <View style={s.bottom}>
        <View style={s.dots}>
          {SLIDES.map((_, i) => (
            <View key={i} style={[s.dot, i === currentIndex && s.dotActive]} />
          ))}
        </View>
        <TouchableOpacity style={s.nextBtn} onPress={handleNext} activeOpacity={0.85}>
          <Text style={s.nextText}>{currentIndex === SLIDES.length - 1 ? 'Get Started' : 'Next'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: WHITE },
  skipBtn: { position: 'absolute', right: 20, zIndex: 10 },
  skipText: { fontWeight: '500', fontSize: 14, color: '#718096' },
  slide: { alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
  illustrationWrap: { marginBottom: 40 },
  title: { fontWeight: '700', fontSize: 26, color: PRIMARY, textAlign: 'center', marginBottom: 14, lineHeight: 34 },
  subtitle: { fontWeight: '400', fontSize: 15, color: '#4a5568', textAlign: 'center', lineHeight: 24, maxWidth: 280 },
  bottom: { paddingHorizontal: 24, paddingBottom: 24, gap: 20, alignItems: 'center' },
  dots: { flexDirection: 'row', gap: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#cbd5e0' },
  dotActive: { width: 24, backgroundColor: PRIMARY },
  nextBtn: { backgroundColor: PRIMARY, paddingVertical: 15, borderRadius: 14, width: '100%', alignItems: 'center' },
  nextText: { fontWeight: '700', fontSize: 16, color: WHITE },
});
