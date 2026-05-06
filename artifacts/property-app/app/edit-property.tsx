import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import { PROPERTIES_DATA } from "./property-detail";

const isWeb = Platform.OS === "web";
const PRIMARY = "#1a365d";
const DARK = "#00122c";
const GOLD = "#c9a227";
const WHITE = "#ffffff";
const BG = "#e9e9e9";
const LIGHT_GRAY = "#edf2f7";
const BORDER = "#d1d5dc";
const MUTED = "#a0aec0";

function ArrowLeftIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path d="M19.5 12H4.5M4.5 12L11.25 18.75M4.5 12L11.25 5.25" stroke={PRIMARY} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
function CheckIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path d="M5 12L10 17L19 7" stroke={WHITE} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function FieldLabel({ label, required }: { label: string; required?: boolean }) {
  return (
    <Text style={s.fieldLabel}>
      {label}
      {required && <Text style={s.required}> *</Text>}
    </Text>
  );
}

function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  required,
  multiline,
}: {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  placeholder?: string;
  keyboardType?: any;
  required?: boolean;
  multiline?: boolean;
}) {
  return (
    <View style={s.fieldWrap}>
      <FieldLabel label={label} required={required} />
      <TextInput
        style={[s.input, multiline && s.inputMulti]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={MUTED}
        keyboardType={keyboardType}
        underlineColorAndroid="transparent"
        multiline={multiline}
        numberOfLines={multiline ? 3 : 1}
      />
    </View>
  );
}

export default function EditPropertyScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const property = PROPERTIES_DATA.find((p) => p.id === id) ?? PROPERTIES_DATA[0];

  const insets = useSafeAreaInsets();
  const topPad = isWeb ? 8 : insets.top > 0 ? insets.top : 12;
  const bottomPad = isWeb ? 32 : insets.bottom + 24;

  const [name, setName] = useState(property.name);
  const [address, setAddress] = useState(property.address);
  const [rent, setRent] = useState(property.rent.replace("₹", "").replace(",", ""));
  const [beds, setBeds] = useState(property.beds);
  const [baths, setBaths] = useState(property.baths);
  const [area, setArea] = useState(property.area.replace(" sq.ft", ""));
  const [status, setStatus] = useState<"Occupied" | "Vacant">(
    property.status === "Occupied" ? "Occupied" : "Vacant"
  );
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (!name.trim() || !address.trim() || !rent.trim()) {
      Alert.alert("Required fields", "Please fill in Name, Address, and Rent.");
      return;
    }
    setSaved(true);
    setTimeout(() => {
      router.back();
    }, 700);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={s.screen}>
        {/* Header */}
        <View style={[s.header, { paddingTop: topPad }]}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()} style={s.backBtn}>
            <ArrowLeftIcon />
          </TouchableOpacity>
          <Text style={s.headerTitle}>Edit Property</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[s.body, { paddingBottom: bottomPad }]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Property name */}
          <View style={s.section}>
            <Text style={s.sectionTitle}>Basic Info</Text>
            <View style={s.card}>
              <InputField label="Property Name" value={name} onChangeText={setName} placeholder="e.g. Prestige Lakeside" required />
              <InputField label="Address" value={address} onChangeText={setAddress} placeholder="Flat/Unit · Area, City" multiline />
            </View>
          </View>

          {/* Financials */}
          <View style={s.section}>
            <Text style={s.sectionTitle}>Financials</Text>
            <View style={s.card}>
              <View style={s.fieldWrap}>
                <FieldLabel label="Monthly Rent (₹)" required />
                <View style={s.rentRow}>
                  <Text style={s.rupeePrefix}>₹</Text>
                  <TextInput
                    style={[s.input, s.inputFlex]}
                    value={rent}
                    onChangeText={setRent}
                    placeholder="0"
                    placeholderTextColor={MUTED}
                    keyboardType="numeric"
                    underlineColorAndroid="transparent"
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Details */}
          <View style={s.section}>
            <Text style={s.sectionTitle}>Property Details</Text>
            <View style={s.card}>
              <View style={s.rowFields}>
                <View style={[s.fieldWrap, { flex: 1 }]}>
                  <FieldLabel label="Bedrooms" />
                  <TextInput
                    style={s.input}
                    value={beds}
                    onChangeText={setBeds}
                    placeholder="2"
                    placeholderTextColor={MUTED}
                    keyboardType="numeric"
                    underlineColorAndroid="transparent"
                  />
                </View>
                <View style={[s.fieldWrap, { flex: 1 }]}>
                  <FieldLabel label="Bathrooms" />
                  <TextInput
                    style={s.input}
                    value={baths}
                    onChangeText={setBaths}
                    placeholder="1"
                    placeholderTextColor={MUTED}
                    keyboardType="numeric"
                    underlineColorAndroid="transparent"
                  />
                </View>
              </View>
              <View style={s.fieldWrap}>
                <FieldLabel label="Area (sq.ft)" />
                <TextInput
                  style={s.input}
                  value={area}
                  onChangeText={setArea}
                  placeholder="e.g. 1200"
                  placeholderTextColor={MUTED}
                  keyboardType="numeric"
                  underlineColorAndroid="transparent"
                />
              </View>
            </View>
          </View>

          {/* Status */}
          <View style={s.section}>
            <Text style={s.sectionTitle}>Occupancy Status</Text>
            <View style={[s.card, { flexDirection: "row", gap: 12 }]}>
              {(["Occupied", "Vacant"] as const).map((opt) => (
                <Pressable
                  key={opt}
                  onPress={() => setStatus(opt)}
                  style={[s.statusChip, status === opt && s.statusChipActive]}
                >
                  <View style={[s.statusDot, { backgroundColor: opt === "Occupied" ? "#38a169" : GOLD }]} />
                  <Text style={[s.statusChipTxt, status === opt && s.statusChipTxtActive]}>{opt}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Save */}
          <TouchableOpacity
            style={[s.saveBtn, saved && s.saveBtnSuccess]}
            activeOpacity={0.88}
            onPress={handleSave}
          >
            {saved ? (
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <CheckIcon />
                <Text style={s.saveBtnTxt}>Saved!</Text>
              </View>
            ) : (
              <Text style={s.saveBtnTxt}>Save Changes</Text>
            )}
          </TouchableOpacity>

          {/* Discard */}
          <TouchableOpacity style={s.discardBtn} activeOpacity={0.7} onPress={() => router.back()}>
            <Text style={s.discardTxt}>Discard Changes</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BG },
  header: { backgroundColor: WHITE, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingBottom: 14, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 3 },
  backBtn: { width: 40, height: 40, alignItems: "center", justifyContent: "center" },
  headerTitle: { fontFamily: "Inter_600SemiBold", fontSize: 17, color: PRIMARY },

  body: { padding: 16, gap: 16 },
  section: { gap: 8 },
  sectionTitle: { fontFamily: "Inter_600SemiBold", fontSize: 13, color: "#718096", letterSpacing: 0.5, textTransform: "uppercase", paddingHorizontal: 2 },
  card: { backgroundColor: WHITE, borderRadius: 16, padding: 14, gap: 14, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 },

  fieldWrap: { gap: 6 },
  fieldLabel: { fontFamily: "Inter_500Medium", fontSize: 13, color: "#444" },
  required: { color: "#e53e3e" },
  input: { backgroundColor: LIGHT_GRAY, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, fontFamily: "Inter_400Regular", fontSize: 14, color: "#1a1a1a", borderWidth: 1, borderColor: BORDER },
  inputMulti: { minHeight: 76, textAlignVertical: "top" },
  inputFlex: { flex: 1 },
  rentRow: { flexDirection: "row", alignItems: "center", backgroundColor: LIGHT_GRAY, borderRadius: 12, borderWidth: 1, borderColor: BORDER, paddingHorizontal: 14 },
  rupeePrefix: { fontFamily: "Inter_600SemiBold", fontSize: 16, color: PRIMARY, marginRight: 4 },
  rowFields: { flexDirection: "row", gap: 12 },

  statusChip: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, backgroundColor: LIGHT_GRAY, borderRadius: 12, paddingVertical: 12, borderWidth: 1.5, borderColor: BORDER },
  statusChipActive: { borderColor: PRIMARY, backgroundColor: `${PRIMARY}0f` },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  statusChipTxt: { fontFamily: "Inter_500Medium", fontSize: 14, color: "#555" },
  statusChipTxtActive: { color: PRIMARY, fontFamily: "Inter_600SemiBold" },

  saveBtn: { backgroundColor: PRIMARY, borderRadius: 14, paddingVertical: 16, alignItems: "center", justifyContent: "center", shadowColor: PRIMARY, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 5 },
  saveBtnSuccess: { backgroundColor: "#38a169" },
  saveBtnTxt: { fontFamily: "Inter_600SemiBold", fontSize: 16, color: WHITE },
  discardBtn: { alignItems: "center", paddingVertical: 8 },
  discardTxt: { fontFamily: "Inter_400Regular", fontSize: 14, color: MUTED },
});
