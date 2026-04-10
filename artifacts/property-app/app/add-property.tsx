import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
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
import Svg, { Path, Rect, Circle, G } from "react-native-svg";

const isWeb = Platform.OS === "web";

// ─── Design tokens ────────────────────────────────────────────────────────────
const PRIMARY = "#1a365d";
const DARK = "#00122c";
const GOLD = "#ffcb29";
const GOLD2 = "#c9a227";
const BG = "#e9e9e9";
const WHITE = "#ffffff";
const CARD = "#fbfbfb";

// ─── Step config ──────────────────────────────────────────────────────────────
const STEPS = [
  "Select Type",
  "Ownership Verification",
  "Ownership Type",
  "Upload Documents",
  "Verification Result",
  "Create Property",
  "Add Photos",
  "Society & Address",
  "Financial Details",
  "Tax Setup",
  "Property Saved",
];

// ─── Icons ────────────────────────────────────────────────────────────────────

function ArrowLeftIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path d="M19.5 12H4.5M4.5 12L11.25 18.75M4.5 12L11.25 5.25" stroke={PRIMARY} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
function CheckCircleIcon({ color = GOLD }: { color?: string }) {
  return (
    <Svg width={48} height={48} viewBox="0 0 48 48" fill="none">
      <Circle cx={24} cy={24} r={22} stroke={color} strokeWidth={2} />
      <Path d="M14 24L20 30L34 16" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
function HomeIcon({ color = WHITE }: { color?: string }) {
  return (
    <Svg width={32} height={32} viewBox="0 0 24 24" fill="none">
      <Path d="M21.4 10.78L12.53 1.91C12.39 1.76 12.2 1.69 12 1.69C11.8 1.69 11.61 1.76 11.47 1.91L2.59 10.78C2.43 10.94 2.34 11.16 2.34 11.4C2.34 11.65 2.43 11.87 2.62 12.02C2.79 12.18 3.02 12.26 3.25 12.26L4.5 12.22V20.25C4.5 20.65 4.66 21.03 4.94 21.31C5.22 21.59 5.6 21.75 6 21.75H9C9.2 21.75 9.39 21.67 9.53 21.53C9.67 21.39 9.75 21.2 9.75 21V16.5H14.25V21C14.25 21.2 14.33 21.39 14.47 21.53C14.61 21.67 14.8 21.75 15 21.75H18C18.4 21.75 18.78 21.59 19.06 21.31C19.34 21.03 19.5 20.65 19.5 20.25V12.22L20.75 12.26C20.98 12.26 21.21 12.18 21.38 12.02C21.55 11.86 21.66 11.64 21.66 11.4C21.66 11.16 21.57 10.94 21.4 10.78Z" fill={color} />
    </Svg>
  );
}
function BuildingIcon({ color = WHITE }: { color?: string }) {
  return (
    <Svg width={32} height={32} viewBox="0 0 24 24" fill="none">
      <Path d="M3 21V4.5C3 3.67 3.67 3 4.5 3H15C15.83 3 16.5 3.67 16.5 4.5V7.5H19.5C20.33 7.5 21 8.17 21 9V21H1.5M5.25 6.75H7.5M5.25 10.5H7.5M5.25 14.25H7.5M10.5 6.75H12.75M10.5 10.5H12.75M10.5 14.25H12.75M16.5 10.5H19.5M16.5 14.5H19.5M9 21V17.25H12V21" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  );
}
function WarehouseIcon({ color = WHITE }: { color?: string }) {
  return (
    <Svg width={32} height={32} viewBox="0 0 24 24" fill="none">
      <Path d="M2 7.5L12 3L22 7.5V21H2V7.5Z" stroke={color} strokeWidth={1.5} fill="none" strokeLinejoin="round" />
      <Path d="M8 21V14H16V21" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M2 9H22" stroke={color} strokeWidth={1.2} strokeLinecap="round" />
      <Path d="M5 12H7M17 12H19M5 16H7M17 16H19" stroke={color} strokeWidth={1.2} strokeLinecap="round" />
    </Svg>
  );
}
function PlotIcon({ color = WHITE }: { color?: string }) {
  return (
    <Svg width={32} height={32} viewBox="0 0 24 24" fill="none">
      <Path d="M3 3h18v18H3z" stroke={color} strokeWidth={1.6} fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <Path d="M3 9h18M3 15h18M9 3v18M15 3v18" stroke={color} strokeWidth={1.2} strokeLinecap="round"/>
    </Svg>
  );
}
function VillaIcon({ color = WHITE }: { color?: string }) {
  return (
    <Svg width={32} height={32} viewBox="0 0 24 24" fill="none">
      <Path d="M3 9.5L12 3L21 9.5V20H15V14H9V20H3V9.5ZM5 11V19H8V13H16V19H19V11L12 5.5L5 11Z" fill={color} />
    </Svg>
  );
}
function OfficeIcon({ color = WHITE }: { color?: string }) {
  return (
    <Svg width={32} height={32} viewBox="0 0 24 24" fill="none">
      <Rect x={2} y={3} width={20} height={18} rx={2} stroke={color} strokeWidth={1.5} fill="none" />
      <Path d="M8 7H16M8 11H16M8 15H12" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M2 7H22" stroke={color} strokeWidth={1.5} />
    </Svg>
  );
}
function UploadIcon() {
  return (
    <Svg width={40} height={40} viewBox="0 0 40 40" fill="none">
      <Circle cx={20} cy={20} r={19} stroke={PRIMARY} strokeWidth={1.5} strokeDasharray="4 3" />
      <Path d="M20 27V13M14 19L20 13L26 19" stroke={PRIMARY} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
function PhotoIcon() {
  return (
    <Svg width={40} height={40} viewBox="0 0 40 40" fill="none">
      <Rect x={2} y={6} width={36} height={28} rx={4} stroke={PRIMARY} strokeWidth={1.5} strokeDasharray="4 3" fill="none" />
      <Circle cx={14} cy={16} r={4} stroke={PRIMARY} strokeWidth={1.5} fill="none" />
      <Path d="M2 28L12 18L18 24L24 18L38 30" stroke={PRIMARY} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
function ShieldIcon() {
  return (
    <Svg width={56} height={56} viewBox="0 0 56 56" fill="none">
      <Path d="M28 4L8 12V28C8 39.046 16.954 49.364 28 52C39.046 49.364 48 39.046 48 28V12L28 4Z" fill={`${PRIMARY}22`} stroke={PRIMARY} strokeWidth={1.5} />
      <Path d="M19 28L24 33L37 20" stroke={GOLD} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
function SuccessIcon() {
  return (
    <Svg width={80} height={80} viewBox="0 0 80 80" fill="none">
      <Circle cx={40} cy={40} r={38} fill={`${PRIMARY}22`} stroke={PRIMARY} strokeWidth={1.5} />
      <Circle cx={40} cy={40} r={28} fill={PRIMARY} />
      <Path d="M26 40L34 48L54 28" stroke={GOLD} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
function TaxIcon() {
  return (
    <Svg width={32} height={32} viewBox="0 0 24 24" fill="none">
      <Rect x={3} y={3} width={18} height={18} rx={2} stroke={PRIMARY} strokeWidth={1.5} fill="none" />
      <Path d="M7 12H17M7 8H17M7 16H13" stroke={PRIMARY} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M15 15L18 18M15 18L18 15" stroke={PRIMARY} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

// ─── Shared components ────────────────────────────────────────────────────────

function NavBtn({ label, onPress, filled = true, disabled = false }: { label: string; onPress: () => void; filled?: boolean; disabled?: boolean }) {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} activeOpacity={0.8} style={{ flex: filled ? 1 : undefined }}>
      {filled ? (
        <LinearGradient colors={[PRIMARY, DARK]} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={[btn.filled, disabled && { opacity: 0.4 }]}>
          <Text style={btn.filledTxt}>{label}</Text>
        </LinearGradient>
      ) : (
        <View style={btn.outline}>
          <Text style={btn.outlineTxt}>{label}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const btn = StyleSheet.create({
  filled: { borderRadius: 14, paddingVertical: 14, alignItems: "center", justifyContent: "center" },
  filledTxt: { fontFamily: "Inter_600SemiBold", fontSize: 15, color: WHITE },
  outline: { borderRadius: 14, paddingVertical: 14, alignItems: "center", justifyContent: "center", borderWidth: 1.5, borderColor: PRIMARY },
  outlineTxt: { fontFamily: "Inter_600SemiBold", fontSize: 15, color: PRIMARY },
});

function FormInput({ label, placeholder, value, onChangeText, keyboardType = "default", multiline = false }: {
  label: string; placeholder: string; value: string; onChangeText: (t: string) => void;
  keyboardType?: any; multiline?: boolean;
}) {
  return (
    <View style={fi.wrap}>
      <Text style={fi.label}>{label}</Text>
      <TextInput
        style={[fi.input, multiline && { height: 80, textAlignVertical: "top" }]}
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        multiline={multiline}
      />
    </View>
  );
}

const fi = StyleSheet.create({
  wrap: { gap: 6 },
  label: { fontFamily: "Inter_500Medium", fontSize: 13, color: "#444" },
  input: { backgroundColor: "#f5f5f5", borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, fontFamily: "Inter_400Regular", fontSize: 14, color: "#0c0c0c", borderWidth: 1, borderColor: "#e0e0e0" },
});

function SelectCard({ icon, label, emoji, selected, onPress }: { icon: React.ReactNode; label: string; emoji: string; selected: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.82} style={[sc.card, selected && sc.cardActive]}>
      {selected && (
        <View style={sc.checkBadge}>
          <Text style={sc.checkTick}>✓</Text>
        </View>
      )}
      <View style={[sc.iconCircle, selected && sc.iconCircleActive]}>
        {icon}
      </View>
      <Text style={sc.emoji}>{emoji}</Text>
      <Text style={[sc.label, selected && sc.labelActive]}>{label}</Text>
      {selected && <Text style={sc.selectedHint}>Selected</Text>}
    </TouchableOpacity>
  );
}

const sc = StyleSheet.create({
  card: {
    backgroundColor: WHITE,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: "center",
    gap: 6,
    width: "48%",
    borderWidth: 2,
    borderColor: "#e8e8e8",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    position: "relative",
  },
  cardActive: {
    borderColor: PRIMARY,
    backgroundColor: PRIMARY,
    shadowColor: PRIMARY,
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  checkBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: GOLD,
    alignItems: "center",
    justifyContent: "center",
  },
  checkTick: { color: DARK, fontSize: 12, fontFamily: "Inter_700Bold" },
  iconCircle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: `${PRIMARY}18`,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 2,
  },
  iconCircleActive: { backgroundColor: `${WHITE}22` },
  emoji: { fontSize: 10, opacity: 0 },
  label: { fontFamily: "Inter_600SemiBold", fontSize: 14, color: "#1a1a1a", textAlign: "center" },
  labelActive: { color: WHITE, fontFamily: "Inter_700Bold" },
  selectedHint: { fontFamily: "Inter_400Regular", fontSize: 11, color: `${WHITE}aa`, marginTop: -2 },
});

function UploadBox({ label, hint, onPress }: { label: string; hint: string; onPress?: () => void }) {
  const [uploaded, setUploaded] = useState(false);
  return (
    <TouchableOpacity onPress={() => setUploaded(!uploaded)} activeOpacity={0.8} style={[ub.box, uploaded && ub.boxDone]}>
      {uploaded ? (
        <>
          <View style={{ opacity: 0.7 }}><CheckCircleIcon color="#38a169" /></View>
          <Text style={[ub.label, { color: "#38a169" }]}>{label}</Text>
          <Text style={ub.hint}>Uploaded · tap to replace</Text>
        </>
      ) : (
        <>
          <UploadIcon />
          <Text style={ub.label}>{label}</Text>
          <Text style={ub.hint}>{hint}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const ub = StyleSheet.create({
  box: { borderRadius: 14, borderWidth: 1.5, borderColor: `${PRIMARY}55`, borderStyle: "dashed", padding: 20, alignItems: "center", gap: 8, backgroundColor: `${PRIMARY}06` },
  boxDone: { borderColor: "#38a169", backgroundColor: "#38a16910" },
  label: { fontFamily: "Inter_600SemiBold", fontSize: 14, color: PRIMARY },
  hint: { fontFamily: "Inter_400Regular", fontSize: 12, color: "#888", textAlign: "center" },
});

function PhotoSlot({ index }: { index: number }) {
  const [added, setAdded] = useState(false);
  return (
    <TouchableOpacity onPress={() => setAdded(!added)} activeOpacity={0.8} style={[ps.slot, added && ps.slotAdded]}>
      {added ? (
        <Text style={{ fontSize: 24 }}>🏠</Text>
      ) : (
        <>
          <Text style={ps.plus}>+</Text>
          <Text style={ps.num}>Photo {index + 1}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const ps = StyleSheet.create({
  slot: { width: "30%", aspectRatio: 1, borderRadius: 12, borderWidth: 1.5, borderColor: `${PRIMARY}44`, borderStyle: "dashed", alignItems: "center", justifyContent: "center", backgroundColor: `${PRIMARY}06` },
  slotAdded: { borderColor: PRIMARY, backgroundColor: `${PRIMARY}18` },
  plus: { fontSize: 24, color: PRIMARY, lineHeight: 28 },
  num: { fontFamily: "Inter_400Regular", fontSize: 10, color: "#888" },
});

// ─── Progress bar ─────────────────────────────────────────────────────────────

function ProgressBar({ step, total }: { step: number; total: number }) {
  const pct = ((step + 1) / total) * 100;
  return (
    <View style={pb.wrap}>
      <View style={pb.track}>
        <View style={[pb.fill, { width: `${pct}%` }]} />
      </View>
      <Text style={pb.label}>Step {step + 1} of {total}</Text>
    </View>
  );
}

const pb = StyleSheet.create({
  wrap: { gap: 6 },
  track: { height: 4, backgroundColor: "#e0e0e0", borderRadius: 2, overflow: "hidden" },
  fill: { height: "100%", backgroundColor: GOLD, borderRadius: 2 },
  label: { fontFamily: "Inter_400Regular", fontSize: 11, color: "#888", textAlign: "right" },
});

// ─── Step screens ─────────────────────────────────────────────────────────────

function Step0_SelectType({ next, form, setForm }: any) {
  const types = [
    { key: "apartment", label: "Apartment", emoji: "🏢", icon: <BuildingIcon color={form.propertyType === "apartment" ? WHITE : PRIMARY} /> },
    { key: "villa", label: "Villa", emoji: "🏡", icon: <VillaIcon color={form.propertyType === "villa" ? WHITE : PRIMARY} /> },
    { key: "house", label: "House", emoji: "🏠", icon: <HomeIcon color={form.propertyType === "house" ? WHITE : PRIMARY} /> },
    { key: "commercial", label: "Commercial", emoji: "🏬", icon: <OfficeIcon color={form.propertyType === "commercial" ? WHITE : PRIMARY} /> },
    { key: "warehouse", label: "Warehouse", emoji: "🏭", icon: <WarehouseIcon color={form.propertyType === "warehouse" ? WHITE : PRIMARY} /> },
    { key: "plot", label: "Plot / Land", emoji: "🗺️", icon: <PlotIcon color={form.propertyType === "plot" ? WHITE : PRIMARY} /> },
  ];
  return (
    <View style={st.content}>
      <View style={{ gap: 4 }}>
        <Text style={st.title}>What type of property?</Text>
        <Text style={st.subtitle}>Select the category that best describes your property</Text>
      </View>
      <View style={st.typeGrid}>
        {types.map((t) => (
          <SelectCard
            key={t.key}
            icon={t.icon}
            label={t.label}
            emoji={t.emoji}
            selected={form.propertyType === t.key}
            onPress={() => setForm({ ...form, propertyType: t.key })}
          />
        ))}
      </View>
      <NavBtn label="Continue" onPress={next} disabled={!form.propertyType} />
    </View>
  );
}

function Step1_OwnershipVerification({ next, back }: any) {
  return (
    <View style={st.content}>
      <View style={{ alignItems: "center", marginBottom: 8 }}><ShieldIcon /></View>
      <Text style={st.title}>Ownership Verification</Text>
      <Text style={st.subtitle}>We need to verify that you own this property before listing it on the platform.</Text>
      <View style={st.infoCard}>
        <Text style={st.infoTitle}>What we'll check</Text>
        {["Government-issued ID", "Property ownership documents", "Registry / Sale deed", "Tax receipts (if applicable)"].map((item, i) => (
          <View key={i} style={st.infoItem}>
            <View style={st.infoDot} />
            <Text style={st.infoText}>{item}</Text>
          </View>
        ))}
      </View>
      <View style={st.row}>
        <NavBtn label="Back" onPress={back} filled={false} />
        <View style={{ width: 12 }} />
        <NavBtn label="Proceed" onPress={next} />
      </View>
    </View>
  );
}

function Step2_OwnershipType({ next, back, form, setForm }: any) {
  const types = [
    { key: "freehold", label: "Freehold", desc: "You own the property outright" },
    { key: "leasehold", label: "Leasehold", desc: "Property leased from a freeholder" },
    { key: "cooperative", label: "Co-operative", desc: "Owned jointly with others" },
    { key: "joint", label: "Joint Ownership", desc: "Shared ownership with family" },
  ];
  return (
    <View style={st.content}>
      <Text style={st.title}>Ownership Type</Text>
      <Text style={st.subtitle}>Select the type of ownership you hold for this property</Text>
      <View style={{ gap: 10 }}>
        {types.map((t) => (
          <TouchableOpacity
            key={t.key}
            onPress={() => setForm({ ...form, ownershipType: t.key })}
            activeOpacity={0.8}
            style={[st.radioCard, form.ownershipType === t.key && st.radioCardActive]}
          >
            <View style={[st.radio, form.ownershipType === t.key && st.radioActive]}>
              {form.ownershipType === t.key && <View style={st.radioDot} />}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[st.radioLabel, form.ownershipType === t.key && { color: PRIMARY }]}>{t.label}</Text>
              <Text style={st.radioDesc}>{t.desc}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View style={st.row}>
        <NavBtn label="Back" onPress={back} filled={false} />
        <View style={{ width: 12 }} />
        <NavBtn label="Continue" onPress={next} disabled={!form.ownershipType} />
      </View>
    </View>
  );
}

function Step3_UploadDocuments({ next, back }: any) {
  return (
    <View style={st.content}>
      <Text style={st.title}>Upload Documents</Text>
      <Text style={st.subtitle}>Upload the required documents to verify your ownership.</Text>
      <View style={{ gap: 14 }}>
        <UploadBox label="Sale Deed / Registry" hint="PDF or image, max 10MB" />
        <UploadBox label="Government-issued ID" hint="Aadhaar, PAN, Passport" />
        <UploadBox label="Tax Receipt (optional)" hint="Latest property tax receipt" />
        <UploadBox label="NOC from Society (optional)" hint="If applicable" />
      </View>
      <View style={st.row}>
        <NavBtn label="Back" onPress={back} filled={false} />
        <View style={{ width: 12 }} />
        <NavBtn label="Submit for Verification" onPress={next} />
      </View>
    </View>
  );
}

function Step4_VerificationResult({ next, back }: any) {
  return (
    <View style={[st.content, { alignItems: "center" }]}>
      <View style={{ marginVertical: 16 }}><CheckCircleIcon color="#38a169" /></View>
      <Text style={[st.title, { textAlign: "center" }]}>Verification Successful!</Text>
      <Text style={[st.subtitle, { textAlign: "center" }]}>
        Your ownership documents have been verified. You can now proceed to list your property.
      </Text>
      <View style={[st.verifyBox, { backgroundColor: "#38a16912", borderColor: "#38a16955" }]}>
        {["Ownership documents verified", "Identity confirmed", "No encumbrances found"].map((item, i) => (
          <View key={i} style={st.verifyItem}>
            <Text style={{ color: "#38a169", fontSize: 14 }}>✓</Text>
            <Text style={[st.infoText, { color: "#276749" }]}>{item}</Text>
          </View>
        ))}
      </View>
      <NavBtn label="Continue to Create Property" onPress={next} />
    </View>
  );
}

function Step5_CreateProperty({ next, back, form, setForm }: any) {
  return (
    <View style={st.content}>
      <Text style={st.title}>Create Property</Text>
      <Text style={st.subtitle}>Give your property a name and description for tenants</Text>
      <View style={{ gap: 14 }}>
        <FormInput label="Property Name" placeholder="e.g. Sunset Apartments #402" value={form.propertyName} onChangeText={(t) => setForm({ ...form, propertyName: t })} />
        <FormInput label="Description" placeholder="Describe your property..." value={form.description} onChangeText={(t) => setForm({ ...form, description: t })} multiline />
        <FormInput label="Year Built" placeholder="e.g. 2018" value={form.yearBuilt} onChangeText={(t) => setForm({ ...form, yearBuilt: t })} keyboardType="numeric" />
        <View style={{ gap: 6 }}>
          <Text style={fi.label}>Furnishing Status</Text>
          <View style={st.chipRow}>
            {["Unfurnished", "Semi-furnished", "Fully furnished"].map((f) => (
              <Pressable key={f} onPress={() => setForm({ ...form, furnishing: f })} style={[st.chip, form.furnishing === f && st.chipActive]}>
                <Text style={[st.chipTxt, form.furnishing === f && st.chipTxtActive]}>{f}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
      <View style={st.row}>
        <NavBtn label="Back" onPress={back} filled={false} />
        <View style={{ width: 12 }} />
        <NavBtn label="Continue" onPress={next} disabled={!form.propertyName} />
      </View>
    </View>
  );
}

function Step6_AddPhotos({ next, back }: any) {
  return (
    <View style={st.content}>
      <Text style={st.title}>Add Photos</Text>
      <Text style={st.subtitle}>Upload high-quality photos to attract tenants. Minimum 3 photos required.</Text>
      <View style={{ alignItems: "center", marginVertical: 8 }}><PhotoIcon /></View>
      <View style={st.photoGrid}>
        {Array.from({ length: 6 }).map((_, i) => (
          <PhotoSlot key={i} index={i} />
        ))}
      </View>
      <View style={st.photoTips}>
        <Text style={st.photoTip}>💡 Tips: Use natural light · Shoot all rooms · Include exterior shots</Text>
      </View>
      <View style={st.row}>
        <NavBtn label="Back" onPress={back} filled={false} />
        <View style={{ width: 12 }} />
        <NavBtn label="Continue" onPress={next} />
      </View>
    </View>
  );
}

function Step7_SocietyAddress({ next, back, form, setForm }: any) {
  return (
    <View style={st.content}>
      <Text style={st.title}>Society & Address</Text>
      <Text style={st.subtitle}>Enter the complete address and society details</Text>
      <View style={{ gap: 14 }}>
        <FormInput label="Society / Building Name" placeholder="e.g. Prestige Lakeside Habitat" value={form.society} onChangeText={(t) => setForm({ ...form, society: t })} />
        <FormInput label="Flat / Unit Number" placeholder="e.g. 402" value={form.flatNo} onChangeText={(t) => setForm({ ...form, flatNo: t })} />
        <FormInput label="Floor" placeholder="e.g. 4th Floor" value={form.floor} onChangeText={(t) => setForm({ ...form, floor: t })} />
        <FormInput label="Street / Area" placeholder="e.g. Whitefield Main Road" value={form.street} onChangeText={(t) => setForm({ ...form, street: t })} />
        <View style={{ flexDirection: "row", gap: 10 }}>
          <View style={{ flex: 1 }}>
            <FormInput label="City" placeholder="e.g. Bangalore" value={form.city} onChangeText={(t) => setForm({ ...form, city: t })} />
          </View>
          <View style={{ flex: 1 }}>
            <FormInput label="PIN Code" placeholder="560001" value={form.pin} onChangeText={(t) => setForm({ ...form, pin: t })} keyboardType="numeric" />
          </View>
        </View>
        <FormInput label="State" placeholder="e.g. Karnataka" value={form.state} onChangeText={(t) => setForm({ ...form, state: t })} />
      </View>
      <View style={st.row}>
        <NavBtn label="Back" onPress={back} filled={false} />
        <View style={{ width: 12 }} />
        <NavBtn label="Continue" onPress={next} disabled={!form.society || !form.city} />
      </View>
    </View>
  );
}

function Step8_FinancialDetails({ next, back, form, setForm }: any) {
  return (
    <View style={st.content}>
      <Text style={st.title}>Financial Details</Text>
      <Text style={st.subtitle}>Set your rent, deposit, and maintenance charges</Text>
      <View style={{ gap: 14 }}>
        <FormInput label="Monthly Rent (₹)" placeholder="e.g. 28000" value={form.rent} onChangeText={(t) => setForm({ ...form, rent: t })} keyboardType="numeric" />
        <FormInput label="Security Deposit (₹)" placeholder="e.g. 56000 (2 months)" value={form.deposit} onChangeText={(t) => setForm({ ...form, deposit: t })} keyboardType="numeric" />
        <FormInput label="Maintenance Charges (₹/month)" placeholder="e.g. 2000" value={form.maintenance} onChangeText={(t) => setForm({ ...form, maintenance: t })} keyboardType="numeric" />
        <View style={{ gap: 6 }}>
          <Text style={fi.label}>Rent Increment Cycle</Text>
          <View style={st.chipRow}>
            {["None", "Annual", "Bi-annual"].map((c) => (
              <Pressable key={c} onPress={() => setForm({ ...form, increment: c })} style={[st.chip, form.increment === c && st.chipActive]}>
                <Text style={[st.chipTxt, form.increment === c && st.chipTxtActive]}>{c}</Text>
              </Pressable>
            ))}
          </View>
        </View>
        <FormInput label="Brokerage (₹)" placeholder="e.g. 0 (leave blank if none)" value={form.brokerage} onChangeText={(t) => setForm({ ...form, brokerage: t })} keyboardType="numeric" />
      </View>
      <View style={st.row}>
        <NavBtn label="Back" onPress={back} filled={false} />
        <View style={{ width: 12 }} />
        <NavBtn label="Continue" onPress={next} disabled={!form.rent} />
      </View>
    </View>
  );
}

function Step9_TaxSetup({ next, back, form, setForm }: any) {
  return (
    <View style={st.content}>
      <Text style={st.title}>Tax Setup</Text>
      <Text style={st.subtitle}>Configure GST and tax details for your property</Text>
      <View style={{ gap: 14 }}>
        <View style={{ gap: 6 }}>
          <Text style={fi.label}>Is your property GST registered?</Text>
          <View style={st.chipRow}>
            {["Yes", "No"].map((c) => (
              <Pressable key={c} onPress={() => setForm({ ...form, gstRegistered: c })} style={[st.chip, form.gstRegistered === c && st.chipActive]}>
                <Text style={[st.chipTxt, form.gstRegistered === c && st.chipTxtActive]}>{c}</Text>
              </Pressable>
            ))}
          </View>
        </View>
        {form.gstRegistered === "Yes" && (
          <FormInput label="GSTIN" placeholder="e.g. 29ABCDE1234F1Z5" value={form.gstin} onChangeText={(t) => setForm({ ...form, gstin: t })} />
        )}
        <FormInput label="PAN Number" placeholder="e.g. ABCDE1234F" value={form.pan} onChangeText={(t) => setForm({ ...form, pan: t })} />
        <FormInput label="Property Tax ID (optional)" placeholder="Municipal tax ID" value={form.taxId} onChangeText={(t) => setForm({ ...form, taxId: t })} />
        <View style={st.infoCard}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <TaxIcon />
            <Text style={st.infoTitle}>Why we need this</Text>
          </View>
          <Text style={[st.infoText, { color: "#555" }]}>Tax details help generate accurate rent receipts and stay compliant with Indian tax laws. Your data is secured.</Text>
        </View>
      </View>
      <View style={st.row}>
        <NavBtn label="Back" onPress={back} filled={false} />
        <View style={{ width: 12 }} />
        <NavBtn label="Save Property" onPress={next} />
      </View>
    </View>
  );
}

function Step10_PropertySaved({ form }: any) {
  return (
    <View style={[st.content, { alignItems: "center", justifyContent: "center", flex: 1 }]}>
      <SuccessIcon />
      <Text style={[st.title, { textAlign: "center", marginTop: 20 }]}>Property Saved! 🎉</Text>
      <Text style={[st.subtitle, { textAlign: "center" }]}>
        {form.propertyName || "Your property"} has been successfully listed on the platform.
      </Text>
      <View style={[st.verifyBox, { width: "100%", marginTop: 4 }]}>
        <SummaryRow label="Type" value={form.propertyType || "—"} />
        <SummaryRow label="Ownership" value={form.ownershipType || "—"} />
        <SummaryRow label="Rent" value={form.rent ? `₹${form.rent}/mo` : "—"} />
        <SummaryRow label="City" value={form.city || "—"} />
      </View>
      <View style={{ width: "100%", gap: 10, marginTop: 8 }}>
        <NavBtn label="View My Properties" onPress={() => { router.replace("/(tabs)/properties"); }} />
        <NavBtn label="Go to Dashboard" onPress={() => { router.replace("/(tabs)/"); }} filled={false} />
      </View>
    </View>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 4 }}>
      <Text style={{ fontFamily: "Inter_400Regular", fontSize: 13, color: "#888" }}>{label}</Text>
      <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 13, color: "#1a365d", textTransform: "capitalize" }}>{value}</Text>
    </View>
  );
}

// ─── Shared styles ────────────────────────────────────────────────────────────

const st = StyleSheet.create({
  content: { gap: 16 },
  title: { fontFamily: "Inter_700Bold", fontSize: 22, color: DARK, lineHeight: 28 },
  subtitle: { fontFamily: "Inter_400Regular", fontSize: 14, color: "#555", lineHeight: 20 },
  row: { flexDirection: "row", alignItems: "center" },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  typeGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12, justifyContent: "space-between" },
  infoCard: { backgroundColor: `${PRIMARY}0d`, borderRadius: 12, padding: 14, gap: 6 },
  infoTitle: { fontFamily: "Inter_600SemiBold", fontSize: 14, color: PRIMARY },
  infoItem: { flexDirection: "row", alignItems: "center", gap: 8 },
  infoDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: GOLD },
  infoText: { fontFamily: "Inter_400Regular", fontSize: 13, color: "#444" },
  radioCard: { flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: CARD, borderRadius: 14, padding: 14, borderWidth: 2, borderColor: "transparent" },
  radioCardActive: { borderColor: PRIMARY, backgroundColor: `${PRIMARY}0d` },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: "#ccc", alignItems: "center", justifyContent: "center" },
  radioActive: { borderColor: PRIMARY },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: PRIMARY },
  radioLabel: { fontFamily: "Inter_500Medium", fontSize: 14, color: "#222" },
  radioDesc: { fontFamily: "Inter_400Regular", fontSize: 12, color: "#888", marginTop: 2 },
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: { borderRadius: 20, paddingHorizontal: 14, paddingVertical: 7, backgroundColor: "#f0f0f0" },
  chipActive: { backgroundColor: PRIMARY },
  chipTxt: { fontFamily: "Inter_500Medium", fontSize: 13, color: "#555" },
  chipTxtActive: { color: WHITE },
  verifyBox: { width: "100%", backgroundColor: `${PRIMARY}0d`, borderRadius: 12, padding: 14, borderWidth: 1, borderColor: `${PRIMARY}22`, gap: 8 },
  verifyItem: { flexDirection: "row", alignItems: "center", gap: 8 },
  photoGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10, justifyContent: "flex-start" },
  photoTips: { backgroundColor: `${GOLD}22`, borderRadius: 10, padding: 10 },
  photoTip: { fontFamily: "Inter_400Regular", fontSize: 12, color: "#7a5c00" },
});

// ─── Main screen ──────────────────────────────────────────────────────────────

const STEP_COMPONENTS = [
  Step0_SelectType,
  Step1_OwnershipVerification,
  Step2_OwnershipType,
  Step3_UploadDocuments,
  Step4_VerificationResult,
  Step5_CreateProperty,
  Step6_AddPhotos,
  Step7_SocietyAddress,
  Step8_FinancialDetails,
  Step9_TaxSetup,
  Step10_PropertySaved,
];

export default function AddPropertyScreen() {
  const insets = useSafeAreaInsets();
  const topPad = isWeb ? 16 : insets.top > 0 ? insets.top : 16;
  const bottomPad = isWeb ? 16 : insets.bottom + 16;

  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    propertyType: "",
    ownershipType: "",
    propertyName: "",
    description: "",
    yearBuilt: "",
    furnishing: "",
    society: "",
    flatNo: "",
    floor: "",
    street: "",
    city: "",
    pin: "",
    state: "",
    rent: "",
    deposit: "",
    maintenance: "",
    increment: "",
    brokerage: "",
    gstRegistered: "No",
    gstin: "",
    pan: "",
    taxId: "",
  });

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => {
    if (step === 0) { router.back(); return; }
    setStep((s) => s - 1);
  };

  const isLastStep = step === STEP_COMPONENTS.length - 1;
  const StepComponent = STEP_COMPONENTS[step];

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={[ms.screen, { paddingTop: topPad }]}>
        {/* Header */}
        <View style={ms.header}>
          {!isLastStep ? (
            <TouchableOpacity onPress={back} style={ms.backBtn} activeOpacity={0.7}>
              <ArrowLeftIcon />
            </TouchableOpacity>
          ) : <View style={{ width: 36 }} />}
          <View style={{ flex: 1, paddingHorizontal: 12 }}>
            <Text style={ms.stepLabel} numberOfLines={1}>{STEPS[step]}</Text>
            {!isLastStep && <ProgressBar step={step} total={STEPS.length} />}
          </View>
          <View style={{ width: 36 }} />
        </View>

        {/* Step content */}
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[ms.body, { paddingBottom: bottomPad }]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <StepComponent next={next} back={back} form={form} setForm={setForm} />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const ms = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BG },
  header: { flexDirection: "row", alignItems: "center", backgroundColor: WHITE, paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#f0f0f0" },
  backBtn: { width: 36, height: 36, alignItems: "center", justifyContent: "center" },
  stepLabel: { fontFamily: "Inter_600SemiBold", fontSize: 13, color: PRIMARY, marginBottom: 6 },
  body: { padding: 20, paddingTop: 24 },
});
