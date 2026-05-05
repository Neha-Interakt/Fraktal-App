import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Circle, Path, Rect } from "react-native-svg";
import { useAuth } from "@/context/auth";

const isWeb = Platform.OS === "web";
const PRIMARY = "#1a365d";
const DARK = "#00122c";
const GOLD = "#c9a227";
const WHITE = "#ffffff";
const BORDER = "#d1d5dc";
const PLACEHOLDER = "#a0aec0";
const LIGHT_GRAY = "#edf2f7";

function AppLogoIcon() {
  return (
    <Svg width={52} height={52} viewBox="0 0 52 52" fill="none">
      <Rect width={52} height={52} rx={14} fill={PRIMARY} />
      <Path d="M26 12L14 19V30C14 37.4 19.2 44.4 26 46C32.8 44.4 38 37.4 38 30V19L26 12Z" fill={`${WHITE}20`} />
      <Rect x={17} y={26} width={8} height={14} rx={2} fill={WHITE} />
      <Rect x={27} y={20} width={8} height={20} rx={2} fill={GOLD} />
      <Path d="M14 30H38" stroke={`${WHITE}30`} strokeWidth={1} />
    </Svg>
  );
}

function EyeIcon({ visible }: { visible: boolean }) {
  if (visible) {
    return (
      <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
        <Path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke={PLACEHOLDER} strokeWidth={1.5} />
        <Circle cx={12} cy={12} r={3} stroke={PLACEHOLDER} strokeWidth={1.5} />
      </Svg>
    );
  }
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" stroke={PLACEHOLDER} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M1 1l22 22" stroke={PLACEHOLDER} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

type Mode = "signin" | "signup";

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const { login } = useAuth();
  const [mode, setMode] = useState<Mode>("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});

  const validate = () => {
    const errs: typeof errors = {};
    if (mode === "signup" && !name.trim()) errs.name = "Name is required";
    if (!email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = "Enter a valid email";
    if (!password.trim()) errs.password = "Password is required";
    else if (password.length < 6) errs.password = "At least 6 characters";
    return errs;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      const displayName = mode === "signup" ? name.trim() : email.split("@")[0];
      await login(displayName, email);
    } finally {
      setLoading(false);
    }
  };

  const topPad = isWeb ? 0 : insets.top;

  return (
    <KeyboardAvoidingView style={st.screen} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      {/* Decorative header gradient */}
      <LinearGradient colors={[PRIMARY, "#24487a"]} style={[st.headerGrad, { paddingTop: topPad }]}>
        <View style={st.headerContent}>
          <AppLogoIcon />
          <View style={st.headerTexts}>
            <Text style={st.appName}>Fraktal</Text>
            <Text style={st.appTagline}>Your property, simplified</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        style={st.scroll}
        contentContainerStyle={[st.scrollContent, { paddingBottom: isWeb ? 40 : insets.bottom + 40 }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Card */}
        <View style={st.card}>
          {/* Mode toggle */}
          <View style={st.modeToggle}>
            <TouchableOpacity onPress={() => setMode("signin")} activeOpacity={0.8} style={[st.modeBtn, mode === "signin" && st.modeBtnActive]}>
              <Text style={[st.modeTxt, mode === "signin" && st.modeTxtActive]}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setMode("signup")} activeOpacity={0.8} style={[st.modeBtn, mode === "signup" && st.modeBtnActive]}>
              <Text style={[st.modeTxt, mode === "signup" && st.modeTxtActive]}>Create Account</Text>
            </TouchableOpacity>
          </View>

          <View style={st.formGap}>
            <Text style={st.formTitle}>
              {mode === "signin" ? "Welcome back!" : "Join Fraktal"}
            </Text>
            <Text style={st.formSub}>
              {mode === "signin"
                ? "Sign in to manage your properties"
                : "Create your free account today"}
            </Text>
          </View>

          <View style={{ gap: 14 }}>
            {/* Name — signup only */}
            {mode === "signup" && (
              <View style={{ gap: 6 }}>
                <Text style={st.label}>Full Name <Text style={{ color: "#fb2c36" }}>*</Text></Text>
                <TextInput
                  style={[st.input, errors.name ? st.inputError : null]}
                  placeholder="E.g., Arjun Sharma"
                  placeholderTextColor={PLACEHOLDER}
                  value={name}
                  onChangeText={(t) => { setName(t); setErrors((e) => ({ ...e, name: undefined })); }}
                  autoCapitalize="words"
                />
                {errors.name ? <Text style={st.errorTxt}>{errors.name}</Text> : null}
              </View>
            )}

            {/* Email */}
            <View style={{ gap: 6 }}>
              <Text style={st.label}>Email Address <Text style={{ color: "#fb2c36" }}>*</Text></Text>
              <TextInput
                style={[st.input, errors.email ? st.inputError : null]}
                placeholder="you@example.com"
                placeholderTextColor={PLACEHOLDER}
                value={email}
                onChangeText={(t) => { setEmail(t); setErrors((e) => ({ ...e, email: undefined })); }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
              {errors.email ? <Text style={st.errorTxt}>{errors.email}</Text> : null}
            </View>

            {/* Password */}
            <View style={{ gap: 6 }}>
              <Text style={st.label}>Password <Text style={{ color: "#fb2c36" }}>*</Text></Text>
              <View style={[st.pwWrap, errors.password ? st.inputError : null]}>
                <TextInput
                  style={st.pwInput}
                  placeholder={mode === "signin" ? "Your password" : "Create a password (min 6 chars)"}
                  placeholderTextColor={PLACEHOLDER}
                  value={password}
                  onChangeText={(t) => { setPassword(t); setErrors((e) => ({ ...e, password: undefined })); }}
                  secureTextEntry={!showPw}
                  autoCapitalize="none"
                />
                <TouchableOpacity onPress={() => setShowPw((v) => !v)} style={{ padding: 4 }}>
                  <EyeIcon visible={showPw} />
                </TouchableOpacity>
              </View>
              {errors.password ? <Text style={st.errorTxt}>{errors.password}</Text> : null}
            </View>

            {mode === "signin" && (
              <TouchableOpacity activeOpacity={0.7} style={{ alignSelf: "flex-end" }}>
                <Text style={st.forgotTxt}>Forgot password?</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Submit */}
          <TouchableOpacity onPress={handleSubmit} activeOpacity={0.85} disabled={loading} style={{ marginTop: 8 }}>
            <LinearGradient colors={[PRIMARY, DARK]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={st.submitBtn}>
              <Text style={st.submitTxt}>{loading ? "Please wait…" : mode === "signin" ? "Sign In" : "Create Account"}</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Divider */}
          <View style={st.dividerRow}>
            <View style={st.dividerLine} />
            <Text style={st.dividerTxt}>or</Text>
            <View style={st.dividerLine} />
          </View>

          {/* Guest */}
          <TouchableOpacity onPress={() => login("Guest", "guest@propify.app")} activeOpacity={0.7} style={st.guestBtn}>
            <Text style={st.guestTxt}>Continue as Guest</Text>
          </TouchableOpacity>
        </View>

        <Text style={st.tosText}>
          By continuing you agree to our{" "}
          <Text style={{ color: PRIMARY, fontFamily: "Inter_500Medium" }}>Terms of Service</Text>
          {" "}and{" "}
          <Text style={{ color: PRIMARY, fontFamily: "Inter_500Medium" }}>Privacy Policy</Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const st = StyleSheet.create({
  screen:       { flex: 1, backgroundColor: LIGHT_GRAY },
  headerGrad:   { paddingBottom: 28, paddingHorizontal: 24 },
  headerContent:{ flexDirection: "row", alignItems: "center", gap: 14, paddingTop: 20 },
  headerTexts:  { gap: 2 },
  appName:      { fontFamily: "Inter_700Bold", fontSize: 26, color: WHITE },
  appTagline:   { fontFamily: "Inter_400Regular", fontSize: 13, color: `${WHITE}90` },
  scroll:       { flex: 1 },
  scrollContent:{ padding: 20, paddingTop: 0, gap: 16, flexGrow: 1 },
  card:         { backgroundColor: WHITE, borderRadius: 20, padding: 22, gap: 18, marginTop: -16, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 12, elevation: 4 },
  modeToggle:   { flexDirection: "row", backgroundColor: LIGHT_GRAY, borderRadius: 12, padding: 4, gap: 4 },
  modeBtn:      { flex: 1, paddingVertical: 9, borderRadius: 10, alignItems: "center" },
  modeBtnActive:{ backgroundColor: WHITE, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  modeTxt:      { fontFamily: "Inter_500Medium", fontSize: 14, color: PLACEHOLDER },
  modeTxtActive:{ color: PRIMARY, fontFamily: "Inter_600SemiBold" },
  formGap:      { gap: 4 },
  formTitle:    { fontFamily: "Inter_700Bold", fontSize: 20, color: DARK },
  formSub:      { fontFamily: "Inter_400Regular", fontSize: 13, color: "#718096" },
  label:        { fontFamily: "Inter_500Medium", fontSize: 13, color: PRIMARY },
  input:        { height: 47, borderRadius: 12, borderWidth: 1.5, borderColor: BORDER, paddingHorizontal: 14, fontFamily: "Inter_400Regular", fontSize: 14, color: DARK, backgroundColor: WHITE },
  inputError:   { borderColor: "#fb2c36" },
  errorTxt:     { fontFamily: "Inter_400Regular", fontSize: 12, color: "#fb2c36" },
  pwWrap:       { flexDirection: "row", alignItems: "center", height: 47, borderRadius: 12, borderWidth: 1.5, borderColor: BORDER, paddingHorizontal: 14, backgroundColor: WHITE, gap: 8 },
  pwInput:      { flex: 1, fontFamily: "Inter_400Regular", fontSize: 14, color: DARK, height: "100%" as any },
  forgotTxt:    { fontFamily: "Inter_500Medium", fontSize: 13, color: GOLD },
  submitBtn:    { height: 52, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  submitTxt:    { fontFamily: "Inter_600SemiBold", fontSize: 16, color: WHITE },
  dividerRow:   { flexDirection: "row", alignItems: "center", gap: 10 },
  dividerLine:  { flex: 1, height: 1, backgroundColor: BORDER },
  dividerTxt:   { fontFamily: "Inter_400Regular", fontSize: 13, color: PLACEHOLDER },
  guestBtn:     { height: 48, borderRadius: 14, borderWidth: 1.5, borderColor: BORDER, alignItems: "center", justifyContent: "center" },
  guestTxt:     { fontFamily: "Inter_500Medium", fontSize: 15, color: "#555" },
  tosText:      { fontFamily: "Inter_400Regular", fontSize: 12, color: PLACEHOLDER, textAlign: "center", lineHeight: 18 },
});
