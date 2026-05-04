import { LinearGradient } from "expo-linear-gradient";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Circle, Path, Rect } from "react-native-svg";
import { useAuth } from "@/context/auth";

const { width: SCREEN_W } = Dimensions.get("window");
const isWeb = Platform.OS === "web";

const PRIMARY = "#1a365d";
const DARK = "#00122c";
const GOLD = "#c9a227";
const WHITE = "#ffffff";
const LIGHT = "#edf2f7";

// ─── Illustrations ────────────────────────────────────────────────────────────

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
      <Rect x={65} y={124} width={10} height={12} rx={2} fill={WHITE} opacity={0.3} />
      <Rect x={80} y={124} width={10} height={12} rx={2} fill={WHITE} opacity={0.3} />
      <Rect x={75} y={134} width={14} height={18} rx={2} fill={GOLD} />
      <Rect x={113} y={104} width={10} height={12} rx={2} fill={WHITE} opacity={0.6} />
      <Rect x={128} y={104} width={10} height={12} rx={2} fill={WHITE} opacity={0.6} />
      <Rect x={143} y={104} width={10} height={12} rx={2} fill={WHITE} opacity={0.6} />
      <Rect x={113} y={122} width={10} height={12} rx={2} fill={WHITE} opacity={0.4} />
      <Rect x={128} y={122} width={10} height={12} rx={2} fill={WHITE} opacity={0.4} />
      <Rect x={143} y={122} width={10} height={12} rx={2} fill={WHITE} opacity={0.4} />
      <Rect x={123} y={134} width={16} height={18} rx={2} fill={GOLD} />
      <Path d={`M48 152H172`} stroke={`${PRIMARY}40`} strokeWidth={2} />
      <Circle cx={160} cy={74} r={18} fill={`${GOLD}25`} />
      <Path d="M160 66v16M152 74h16" stroke={GOLD} strokeWidth={2.5} strokeLinecap="round" />
    </Svg>
  );
}

function FinanceIllustration() {
  return (
    <Svg width={220} height={220} viewBox="0 0 220 220" fill="none">
      <Circle cx={110} cy={110} r={100} fill={`${GOLD}10`} />
      <Circle cx={110} cy={110} r={72} fill={`${GOLD}18`} />
      <Rect x={60} y={90} width={100} height={70} rx={10} fill={PRIMARY} />
      <Rect x={60} y={90} width={100} height={28} rx={10} fill="#2d5a9b" />
      <Rect x={60} y={104} width={100} height={14} fill="#2d5a9b" />
      <Circle cx={80} cy={104} r={10} fill={GOLD} />
      <Rect x={96} y={100} width={50} height={5} rx={2.5} fill={WHITE} opacity={0.4} />
      <Rect x={96} y={107} width={32} height={4} rx={2} fill={WHITE} opacity={0.25} />
      <Rect x={68} y={126} width={20} height={8} rx={3} fill={`${GOLD}80`} />
      <Rect x={94} y={126} width={20} height={8} rx={3} fill={`${WHITE}30`} />
      <Rect x={120} y={126} width={30} height={8} rx={3} fill={`${WHITE}20`} />
      <Rect x={68} y={140} width={72} height={5} rx={2.5} fill={`${WHITE}15`} />
      <Circle cx={154} cy={76} r={22} fill={`${PRIMARY}20`} stroke={GOLD} strokeWidth={2} />
      <Path d="M154 68v16M148 74h12" stroke={GOLD} strokeWidth={2.5} strokeLinecap="round" />
      <Path d="M80 66 L95 56 L110 62 L125 50 L140 58" stroke={GOLD} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      <Circle cx={140} cy={58} r={4} fill={GOLD} />
    </Svg>
  );
}

function MaintenanceIllustration() {
  return (
    <Svg width={220} height={220} viewBox="0 0 220 220" fill="none">
      <Circle cx={110} cy={110} r={100} fill={`${PRIMARY}10`} />
      <Circle cx={110} cy={110} r={72} fill={`${PRIMARY}16`} />
      <Rect x={72} y={82} width={76} height={82} rx={8} fill={WHITE} opacity={0.95} />
      <Rect x={80} y={92} width={60} height={8} rx={3} fill={`${PRIMARY}30`} />
      <Rect x={80} y={106} width={42} height={6} rx={3} fill={`${PRIMARY}20`} />
      <Rect x={80} y={118} width={50} height={6} rx={3} fill={`${PRIMARY}15`} />
      <Rect x={80} y={130} width={36} height={6} rx={3} fill={`${PRIMARY}15`} />
      <Circle cx={136} cy={148} r={24} fill={PRIMARY} />
      <Path d="M128.5 148.5 L132 152 L143.5 141" stroke={GOLD} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M144 78 C155 67 164 76 153 87 L140 100 L131 91 Z" fill={GOLD} opacity={0.9} />
      <Path d="M131 91 L118 104 C115 107 115 112 118 115 C121 118 126 118 129 115 L142 102" stroke={PRIMARY} strokeWidth={4} strokeLinecap="round" fill="none" />
    </Svg>
  );
}

// ─── Slides data ──────────────────────────────────────────────────────────────

const SLIDES = [
  {
    illustration: <BuildingIllustration />,
    title: "Manage Properties\nwith Ease",
    sub: "List, track and manage all your properties from one powerful dashboard.",
    bg: ["#f0f4ff", "#e8eeff"] as [string, string],
  },
  {
    illustration: <FinanceIllustration />,
    title: "Track Rent &\nFinances",
    sub: "Get real-time insights on rent collection, ROI and financial health.",
    bg: ["#fffdf0", "#fff8e0"] as [string, string],
  },
  {
    illustration: <MaintenanceIllustration />,
    title: "Handle Maintenance\nRequests",
    sub: "Respond to tenant requests instantly and keep your properties in top shape.",
    bg: ["#f0f7ff", "#e6f0ff"] as [string, string],
  },
];

export default function OnboardingScreen() {
  const insets = useSafeAreaInsets();
  const { completeOnboarding } = useAuth();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const goToNext = () => {
    if (activeIndex < SLIDES.length - 1) {
      const nextIndex = activeIndex + 1;
      scrollRef.current?.scrollTo({ x: nextIndex * SCREEN_W, animated: true });
      setActiveIndex(nextIndex);
    } else {
      completeOnboarding();
    }
  };

  const skip = () => completeOnboarding();

  return (
    <View style={st.screen}>
      {/* Slide content */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        style={{ flex: 1 }}
      >
        {SLIDES.map((slide, i) => (
          <LinearGradient
            key={i}
            colors={slide.bg}
            style={[st.slide, { width: SCREEN_W }]}
          >
            {/* Skip button */}
            <View style={[st.skipRow, { paddingTop: isWeb ? 20 : insets.top + 8 }]}>
              <View style={{ flex: 1 }} />
              {activeIndex < SLIDES.length - 1 && (
                <TouchableOpacity onPress={skip} activeOpacity={0.7} style={st.skipBtn}>
                  <Text style={st.skipTxt}>Skip</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Illustration */}
            <View style={st.illustrationWrap}>
              {slide.illustration}
            </View>

            {/* Text */}
            <View style={st.textWrap}>
              <Text style={st.slideTitle}>{slide.title}</Text>
              <Text style={st.slideSub}>{slide.sub}</Text>
            </View>
          </LinearGradient>
        ))}
      </ScrollView>

      {/* Bottom controls */}
      <View style={[st.bottomBar, { paddingBottom: isWeb ? 32 : insets.bottom + 24 }]}>
        {/* Dots */}
        <View style={st.dotsRow}>
          {SLIDES.map((_, i) => (
            <View key={i} style={[st.dot, i === activeIndex && st.dotActive]} />
          ))}
        </View>

        {/* Button */}
        <TouchableOpacity onPress={goToNext} activeOpacity={0.85} style={st.ctaBtn}>
          <LinearGradient
            colors={[PRIMARY, DARK]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={st.ctaGradient}
          >
            <Text style={st.ctaTxt}>
              {activeIndex < SLIDES.length - 1 ? "Next" : "Get Started"}
            </Text>
            <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
              <Path d="M9 18L15 12L9 6" stroke={WHITE} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const st = StyleSheet.create({
  screen:          { flex: 1, backgroundColor: WHITE },
  slide:           { flex: 1, alignItems: "center" },
  skipRow:         { flexDirection: "row", width: "100%", paddingHorizontal: 20, paddingBottom: 8 },
  skipBtn:         { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, backgroundColor: `${PRIMARY}12` },
  skipTxt:         { fontFamily: "Inter_500Medium", fontSize: 14, color: PRIMARY },
  illustrationWrap:{ flex: 1, alignItems: "center", justifyContent: "center", paddingBottom: 16 },
  textWrap:        { width: "100%", paddingHorizontal: 32, paddingBottom: 24, gap: 10, alignItems: "center" },
  slideTitle:      { fontFamily: "Inter_700Bold", fontSize: 28, color: DARK, textAlign: "center", lineHeight: 36 },
  slideSub:        { fontFamily: "Inter_400Regular", fontSize: 15, color: "#555", textAlign: "center", lineHeight: 22 },
  bottomBar:       { backgroundColor: WHITE, paddingTop: 20, paddingHorizontal: 24, gap: 20, alignItems: "center", borderTopWidth: 1, borderTopColor: "#f0f0f0" },
  dotsRow:         { flexDirection: "row", gap: 8 },
  dot:             { width: 8, height: 8, borderRadius: 4, backgroundColor: "#d1d5dc" },
  dotActive:       { width: 24, backgroundColor: PRIMARY },
  ctaBtn:          { width: "100%", borderRadius: 14, overflow: "hidden" },
  ctaGradient:     { flexDirection: "row", alignItems: "center", justifyContent: "center", height: 52, gap: 8 },
  ctaTxt:          { fontFamily: "Inter_600SemiBold", fontSize: 16, color: WHITE },
});
