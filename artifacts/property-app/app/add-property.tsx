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
import Svg, { Circle, Path, Rect } from "react-native-svg";

const isWeb = Platform.OS === "web";

// ─── Design tokens ────────────────────────────────────────────────────────────
const PRIMARY = "#1a365d";
const DARK = "#00122c";
const GOLD = "#c9a227";
const WHITE = "#ffffff";
const LIGHT_GRAY = "#edf2f7";
const BORDER = "#d1d5dc";
const PLACEHOLDER = "#a0aec0";

// ─── Icons ────────────────────────────────────────────────────────────────────

function CaretLeftIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path d="M15.5 19L8.5 12L15.5 5" stroke={PRIMARY} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function CaretDownIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path d="M6 9L12 15L18 9" stroke="#718096" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function UploadSimpleIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path d="M12 15V4M8 8L12 4L16 8" stroke={PRIMARY} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M3 15V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V15" stroke={PRIMARY} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

function CheckCircleIcon({ color = "#38a169" }: { color?: string }) {
  return (
    <Svg width={72} height={72} viewBox="0 0 72 72" fill="none">
      <Circle cx={36} cy={36} r={34} fill={`${color}18`} stroke={color} strokeWidth={2.5} />
      <Path d="M22 36L31 45L50 26" stroke={color} strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function ShieldCheckIcon() {
  return (
    <Svg width={72} height={72} viewBox="0 0 72 72" fill="none">
      <Path d="M36 8L14 18V34C14 47.8 23.6 60.8 36 64C48.4 60.8 58 47.8 58 34V18L36 8Z" fill={`${PRIMARY}12`} stroke={PRIMARY} strokeWidth={2} />
      <Path d="M26 35L33 42L46 28" stroke={GOLD} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function SuccessIcon() {
  return (
    <Svg width={96} height={96} viewBox="0 0 96 96" fill="none">
      <Circle cx={48} cy={48} r={46} fill={`${GOLD}20`} />
      <Circle cx={48} cy={48} r={36} fill={`${GOLD}35`} />
      <Path d="M31 48L43 60L65 36" stroke={GOLD} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function MapPinIcon() {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill={PRIMARY} />
    </Svg>
  );
}

function PlusIcon({ size = 20, color = PRIMARY }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 5V19M5 12H19" stroke={color} strokeWidth={2.2} strokeLinecap="round" />
    </Svg>
  );
}

// Property type icons
function ApartmentIcon({ color = PRIMARY }: { color?: string }) {
  return (
    <Svg width={28} height={28} viewBox="0 0 24 24" fill="none">
      <Path d="M3 21V4.5C3 3.67 3.67 3 4.5 3H15C15.83 3 16.5 3.67 16.5 4.5V7.5H19.5C20.33 7.5 21 8.17 21 9V21H1.5M5.25 6.75H7.5M5.25 10.5H7.5M5.25 14.25H7.5M10.5 6.75H12.75M10.5 10.5H12.75M10.5 14.25H12.75M16.5 10.5H19.5M16.5 14.5H19.5M9 21V17.25H12V21" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
function VillaIcon({ color = PRIMARY }: { color?: string }) {
  return (
    <Svg width={28} height={28} viewBox="0 0 24 24" fill="none">
      <Path d="M3 9.5L12 3L21 9.5V20H15V14H9V20H3V9.5ZM5 11V19H8V13H16V19H19V11L12 5.5L5 11Z" fill={color} />
    </Svg>
  );
}
function HouseIcon({ color = PRIMARY }: { color?: string }) {
  return (
    <Svg width={28} height={28} viewBox="0 0 24 24" fill="none">
      <Path d="M21.4 10.78L12.53 1.91C12.39 1.76 12.2 1.69 12 1.69C11.8 1.69 11.61 1.76 11.47 1.91L2.59 10.78C2.43 10.94 2.34 11.16 2.34 11.4C2.34 11.65 2.43 11.87 2.62 12.02C2.79 12.18 3.02 12.26 3.25 12.26L4.5 12.22V20.25C4.5 20.65 4.66 21.03 4.94 21.31C5.22 21.59 5.6 21.75 6 21.75H9C9.2 21.75 9.39 21.67 9.53 21.53C9.67 21.39 9.75 21.2 9.75 21V16.5H14.25V21C14.25 21.2 14.33 21.39 14.47 21.53C14.61 21.67 14.8 21.75 15 21.75H18C18.4 21.75 18.78 21.59 19.06 21.31C19.34 21.03 19.5 20.65 19.5 20.25V12.22L20.75 12.26C20.98 12.26 21.21 12.18 21.38 12.02C21.55 11.86 21.66 11.64 21.66 11.4C21.66 11.16 21.57 10.94 21.4 10.78Z" fill={color} />
    </Svg>
  );
}
function OfficeIcon({ color = PRIMARY }: { color?: string }) {
  return (
    <Svg width={28} height={28} viewBox="0 0 24 24" fill="none">
      <Rect x={2} y={3} width={20} height={18} rx={2} stroke={color} strokeWidth={1.5} fill="none" />
      <Path d="M8 7H16M8 11H16M8 15H12" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M2 7H22" stroke={color} strokeWidth={1.5} />
    </Svg>
  );
}
function WarehouseIcon({ color = PRIMARY }: { color?: string }) {
  return (
    <Svg width={28} height={28} viewBox="0 0 24 24" fill="none">
      <Path d="M2 7.5L12 3L22 7.5V21H2V7.5Z" stroke={color} strokeWidth={1.5} fill="none" strokeLinejoin="round" />
      <Path d="M8 21V14H16V21" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M2 9H22" stroke={color} strokeWidth={1.2} strokeLinecap="round" />
      <Path d="M5 12H7M17 12H19M5 16H7M17 16H19" stroke={color} strokeWidth={1.2} strokeLinecap="round" />
    </Svg>
  );
}
function PlotIcon({ color = PRIMARY }: { color?: string }) {
  return (
    <Svg width={28} height={28} viewBox="0 0 24 24" fill="none">
      <Path d="M3 3h18v18H3z" stroke={color} strokeWidth={1.6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M3 9h18M3 15h18M9 3v18M15 3v18" stroke={color} strokeWidth={1.2} strokeLinecap="round" />
    </Svg>
  );
}

// Amenity icons
function WifiIcon({ active }: { active: boolean }) {
  const c = active ? WHITE : PRIMARY;
  return <Svg width={22} height={22} viewBox="0 0 24 24" fill="none"><Path d="M5 12.55A11 11 0 0 1 19 12.55M1.42 9A16 16 0 0 1 22.58 9M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" stroke={c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /></Svg>;
}
function ParkingIcon({ active }: { active: boolean }) {
  const c = active ? WHITE : PRIMARY;
  return <Svg width={22} height={22} viewBox="0 0 24 24" fill="none"><Rect x={3} y={3} width={18} height={18} rx={2} stroke={c} strokeWidth={1.8} /><Path d="M9 17V7H13C14.7 7 16 8.3 16 10C16 11.7 14.7 13 13 13H9" stroke={c} strokeWidth={1.8} strokeLinecap="round" /></Svg>;
}
function SecurityIcon({ active }: { active: boolean }) {
  const c = active ? WHITE : PRIMARY;
  return <Svg width={22} height={22} viewBox="0 0 24 24" fill="none"><Path d="M12 2L4 6V12C4 16.4 7.4 20.5 12 22C16.6 20.5 20 16.4 20 12V6L12 2Z" stroke={c} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" fill="none" /></Svg>;
}
function LiftIcon({ active }: { active: boolean }) {
  const c = active ? WHITE : PRIMARY;
  return <Svg width={22} height={22} viewBox="0 0 24 24" fill="none"><Rect x={3} y={2} width={7} height={20} rx={1} stroke={c} strokeWidth={1.8} /><Path d="M6.5 7L5 9M6.5 7L8 9" stroke={c} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" /><Path d="M6.5 13L5 11M6.5 13L8 11" stroke={c} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" /><Rect x={14} y={2} width={7} height={20} rx={1} stroke={c} strokeWidth={1.8} /></Svg>;
}
function PoolIcon({ active }: { active: boolean }) {
  const c = active ? WHITE : PRIMARY;
  return <Svg width={22} height={22} viewBox="0 0 24 24" fill="none"><Path d="M2 16.5C5.33 16.5 5.33 19 8.67 19C12 19 12 16.5 15.33 16.5C18.67 16.5 18.67 19 22 19M2 11.5C5.33 11.5 5.33 14 8.67 14C12 14 12 11.5 15.33 11.5C18.67 11.5 18.67 14 22 14M17 8L12 3L7 8" stroke={c} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" /></Svg>;
}
function GymIcon({ active }: { active: boolean }) {
  const c = active ? WHITE : PRIMARY;
  return <Svg width={22} height={22} viewBox="0 0 24 24" fill="none"><Path d="M6 6V18M18 6V18M9 9H15M9 15H15M3 12H6M18 12H21" stroke={c} strokeWidth={2} strokeLinecap="round" /></Svg>;
}
function PowerIcon({ active }: { active: boolean }) {
  const c = active ? WHITE : PRIMARY;
  return <Svg width={22} height={22} viewBox="0 0 24 24" fill="none"><Path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke={c} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" /></Svg>;
}
function ClubIcon({ active }: { active: boolean }) {
  const c = active ? WHITE : PRIMARY;
  return <Svg width={22} height={22} viewBox="0 0 24 24" fill="none"><Path d="M3 9.5L12 3L21 9.5V20H15V14H9V20H3V9.5Z" stroke={c} strokeWidth={1.8} fill="none" strokeLinecap="round" strokeLinejoin="round" /></Svg>;
}
function GardenIcon({ active }: { active: boolean }) {
  const c = active ? WHITE : PRIMARY;
  return <Svg width={22} height={22} viewBox="0 0 24 24" fill="none"><Path d="M12 22V12M12 12C12 12 7 10 5 5C8.5 5 11 7.5 12 12ZM12 12C12 12 17 10 19 5C15.5 5 13 7.5 12 12Z" stroke={c} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" /><Path d="M5 22H19" stroke={c} strokeWidth={1.8} strokeLinecap="round" /></Svg>;
}
function WaterIcon({ active }: { active: boolean }) {
  const c = active ? WHITE : PRIMARY;
  return <Svg width={22} height={22} viewBox="0 0 24 24" fill="none"><Path d="M12 2C12 2 5 9 5 14.5C5 18.1 8.1 21 12 21C15.9 21 19 18.1 19 14.5C19 9 12 2 12 2Z" stroke={c} strokeWidth={1.8} fill="none" /></Svg>;
}
function GuardIcon({ active }: { active: boolean }) {
  const c = active ? WHITE : PRIMARY;
  return <Svg width={22} height={22} viewBox="0 0 24 24" fill="none"><Circle cx={12} cy={7} r={3.5} stroke={c} strokeWidth={1.8} /><Path d="M5 20C5 17.2 8.1 15 12 15C15.9 15 19 17.2 19 20" stroke={c} strokeWidth={1.8} strokeLinecap="round" /></Svg>;
}
function PlayAreaIcon({ active }: { active: boolean }) {
  const c = active ? WHITE : PRIMARY;
  return <Svg width={22} height={22} viewBox="0 0 24 24" fill="none"><Circle cx={10} cy={5} r={2} stroke={c} strokeWidth={1.8} /><Path d="M3 20L8 13L12 17L17 10L21 14" stroke={c} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" /></Svg>;
}

const AMENITIES = [
  { key: "wifi", label: "WiFi", icon: (a: boolean) => <WifiIcon active={a} /> },
  { key: "parking", label: "Parking", icon: (a: boolean) => <ParkingIcon active={a} /> },
  { key: "security", label: "CCTV / Security", icon: (a: boolean) => <SecurityIcon active={a} /> },
  { key: "lift", label: "Lift / Elevator", icon: (a: boolean) => <LiftIcon active={a} /> },
  { key: "pool", label: "Swimming Pool", icon: (a: boolean) => <PoolIcon active={a} /> },
  { key: "gym", label: "Gym", icon: (a: boolean) => <GymIcon active={a} /> },
  { key: "power", label: "Power Backup", icon: (a: boolean) => <PowerIcon active={a} /> },
  { key: "clubhouse", label: "Club House", icon: (a: boolean) => <ClubIcon active={a} /> },
  { key: "garden", label: "Garden", icon: (a: boolean) => <GardenIcon active={a} /> },
  { key: "water", label: "24/7 Water", icon: (a: boolean) => <WaterIcon active={a} /> },
  { key: "guard", label: "Security Guard", icon: (a: boolean) => <GuardIcon active={a} /> },
  { key: "play", label: "Play Area", icon: (a: boolean) => <PlayAreaIcon active={a} /> },
];

// ─── SelectCard (property type) ───────────────────────────────────────────────

function SelectCard({ icon, label, selected, onPress }: { icon: React.ReactNode; label: string; selected: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.82} style={[sc.card, selected && sc.cardActive]}>
      {selected && (
        <View style={sc.badge}>
          <Text style={sc.badgeTick}>✓</Text>
        </View>
      )}
      <View style={[sc.iconCircle, selected && sc.iconCircleActive]}>{icon}</View>
      <Text style={[sc.label, selected && sc.labelActive]}>{label}</Text>
      {selected && <Text style={sc.hint}>Selected</Text>}
    </TouchableOpacity>
  );
}
const sc = StyleSheet.create({
  card: { backgroundColor: WHITE, borderRadius: 20, paddingVertical: 20, paddingHorizontal: 10, alignItems: "center", gap: 8, width: "48%", borderWidth: 2, borderColor: "#e8e8e8", position: "relative" },
  cardActive: { borderColor: PRIMARY, backgroundColor: PRIMARY },
  badge: { position: "absolute", top: 10, right: 10, width: 22, height: 22, borderRadius: 11, backgroundColor: "#ffcb29", alignItems: "center", justifyContent: "center" },
  badgeTick: { color: DARK, fontSize: 12, fontFamily: "Inter_700Bold" },
  iconCircle: { width: 62, height: 62, borderRadius: 31, backgroundColor: `${PRIMARY}15`, alignItems: "center", justifyContent: "center", marginBottom: 2 },
  iconCircleActive: { backgroundColor: `${WHITE}22` },
  label: { fontFamily: "Inter_600SemiBold", fontSize: 14, color: "#1a1a1a", textAlign: "center" },
  labelActive: { color: WHITE, fontFamily: "Inter_700Bold" },
  hint: { fontFamily: "Inter_400Regular", fontSize: 11, color: `${WHITE}aa`, marginTop: -4 },
});

// ─── AmenityChip ─────────────────────────────────────────────────────────────

function AmenityChip({ label, icon, selected, onPress }: { label: string; icon: React.ReactNode; selected: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={[am.chip, selected && am.chipActive]}>
      {selected && <View style={am.check}><Text style={{ color: DARK, fontSize: 9, fontFamily: "Inter_700Bold" }}>✓</Text></View>}
      <View style={[am.iconWrap, selected && am.iconWrapActive]}>{icon}</View>
      <Text style={[am.label, selected && am.labelActive]} numberOfLines={2}>{label}</Text>
    </TouchableOpacity>
  );
}
const am = StyleSheet.create({
  chip: { backgroundColor: WHITE, borderRadius: 14, padding: 12, alignItems: "center", gap: 6, width: "48%", borderWidth: 1.5, borderColor: BORDER, position: "relative", minHeight: 90, justifyContent: "center" },
  chipActive: { borderColor: PRIMARY, backgroundColor: `${PRIMARY}08` },
  check: { position: "absolute", top: 8, right: 8, width: 18, height: 18, borderRadius: 9, backgroundColor: "#ffcb29", alignItems: "center", justifyContent: "center" },
  iconWrap: { width: 44, height: 44, borderRadius: 22, backgroundColor: `${PRIMARY}12`, alignItems: "center", justifyContent: "center" },
  iconWrapActive: { backgroundColor: PRIMARY },
  label: { fontFamily: "Inter_500Medium", fontSize: 12, color: "#4a5568", textAlign: "center" },
  labelActive: { color: PRIMARY, fontFamily: "Inter_600SemiBold" },
});

// ─── UploadBox ────────────────────────────────────────────────────────────────

function UploadBox({ label, required = false, hint }: { label: string; required?: boolean; hint: string }) {
  const [uploaded, setUploaded] = useState(false);
  return (
    <TouchableOpacity onPress={() => setUploaded(!uploaded)} activeOpacity={0.8} style={[ub.box, uploaded && ub.boxDone]}>
      <View style={[ub.iconCircle, uploaded && ub.iconCircleDone]}>
        {uploaded
          ? <Text style={{ fontSize: 22, color: "#38a169" }}>✓</Text>
          : <UploadSimpleIcon />
        }
      </View>
      <View style={{ alignItems: "center", gap: 3 }}>
        <Text style={[ub.label, uploaded && { color: "#276749" }]}>
          {label}{required ? <Text style={{ color: "#fb2c36" }}> *</Text> : null}
        </Text>
        <Text style={ub.hint}>{uploaded ? "Uploaded · tap to replace" : hint}</Text>
      </View>
    </TouchableOpacity>
  );
}
const ub = StyleSheet.create({
  box: { backgroundColor: WHITE, borderWidth: 1.5, borderColor: BORDER, borderRadius: 12, paddingVertical: 22, paddingHorizontal: 16, alignItems: "center", gap: 10 },
  boxDone: { borderColor: "#38a169", backgroundColor: "#f0fff4" },
  iconCircle: { width: 48, height: 48, borderRadius: 24, borderWidth: 1.5, borderColor: "#a0aec0", alignItems: "center", justifyContent: "center" },
  iconCircleDone: { borderColor: "#38a169", backgroundColor: "#38a16918" },
  label: { fontFamily: "Inter_600SemiBold", fontSize: 14, color: PRIMARY, textAlign: "center" },
  hint: { fontFamily: "Inter_500Medium", fontSize: 12, color: "#718096", textAlign: "center" },
});

// ─── FormInput ────────────────────────────────────────────────────────────────

function FormInput({ label, required = false, placeholder, value, onChangeText, keyboardType = "default", multiline = false }: {
  label: string; required?: boolean; placeholder: string; value: string; onChangeText: (t: string) => void;
  keyboardType?: any; multiline?: boolean;
}) {
  return (
    <View style={fi.wrap}>
      <Text style={fi.label}>
        {label}{required ? <Text style={{ color: "#fb2c36" }}> *</Text> : null}
      </Text>
      <TextInput
        style={[fi.input, multiline && fi.inputMulti]}
        placeholder={placeholder}
        placeholderTextColor={PLACEHOLDER}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={multiline ? 3 : 1}
      />
    </View>
  );
}
const fi = StyleSheet.create({
  wrap: { gap: 6 },
  label: { fontFamily: "Inter_500Medium", fontSize: 14, color: PRIMARY },
  input: { backgroundColor: WHITE, borderRadius: 12, paddingHorizontal: 14, height: 47, fontFamily: "Inter_400Regular", fontSize: 14, color: DARK, borderWidth: 1.5, borderColor: BORDER },
  inputMulti: { height: 90, paddingTop: 12, textAlignVertical: "top" },
});

// ─── DropdownInput ────────────────────────────────────────────────────────────

function DropdownInput({ label, required = false, placeholder, value, options, onSelect }: {
  label: string; required?: boolean; placeholder: string; value: string; options: string[]; onSelect: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <View style={fi.wrap}>
      <Text style={fi.label}>{label}{required ? <Text style={{ color: "#fb2c36" }}> *</Text> : null}</Text>
      <TouchableOpacity onPress={() => setOpen(!open)} activeOpacity={0.8} style={dd.trigger}>
        <Text style={[dd.value, !value && { color: PLACEHOLDER }]}>{value || placeholder}</Text>
        <CaretDownIcon />
      </TouchableOpacity>
      {open && (
        <View style={dd.list}>
          {options.map((o) => (
            <TouchableOpacity key={o} onPress={() => { onSelect(o); setOpen(false); }} style={dd.option}>
              <Text style={[dd.optTxt, value === o && dd.optTxtActive]}>{o}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}
const dd = StyleSheet.create({
  trigger: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: WHITE, borderRadius: 12, paddingHorizontal: 14, height: 47, borderWidth: 1.5, borderColor: BORDER },
  value: { fontFamily: "Inter_400Regular", fontSize: 14, color: DARK, flex: 1 },
  list: { backgroundColor: WHITE, borderRadius: 12, borderWidth: 1.5, borderColor: BORDER, overflow: "hidden", marginTop: 4, zIndex: 10 },
  option: { paddingHorizontal: 14, paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: "#f0f0f0" },
  optTxt: { fontFamily: "Inter_400Regular", fontSize: 14, color: DARK },
  optTxtActive: { color: PRIMARY, fontFamily: "Inter_600SemiBold" },
});

// ─── PhotoSlot ────────────────────────────────────────────────────────────────

function PhotoSlot({ index, wide = false }: { index: number; wide?: boolean }) {
  const [added, setAdded] = useState(false);
  return (
    <TouchableOpacity onPress={() => setAdded(!added)} activeOpacity={0.8}
      style={[ph.slot, wide && ph.slotWide, added && ph.slotAdded]}>
      {added ? (
        <View style={{ alignItems: "center", gap: 4 }}>
          <Text style={{ fontSize: 30 }}>🏠</Text>
          <Text style={{ fontFamily: "Inter_400Regular", fontSize: 11, color: added ? PRIMARY : "#718096" }}>
            {index === 0 ? "Cover Photo" : `Photo ${index + 1}`}
          </Text>
        </View>
      ) : (
        <>
          <View style={ph.plusWrap}><PlusIcon size={18} color={PRIMARY} /></View>
          <Text style={ph.label}>{index === 0 ? "Cover Photo" : `Photo ${index + 1}`}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}
const ph = StyleSheet.create({
  slot: { width: "48%", aspectRatio: 1, borderRadius: 14, borderWidth: 1.5, borderColor: BORDER, borderStyle: "dashed", alignItems: "center", justifyContent: "center", backgroundColor: WHITE, gap: 6 },
  slotWide: { width: "100%", aspectRatio: 2.4 },
  slotAdded: { borderColor: PRIMARY, backgroundColor: `${PRIMARY}0d`, borderStyle: "solid" },
  plusWrap: { width: 38, height: 38, borderRadius: 19, backgroundColor: `${PRIMARY}12`, alignItems: "center", justifyContent: "center" },
  label: { fontFamily: "Inter_400Regular", fontSize: 11, color: "#718096" },
});

// ─── BtnRow / SingleBtn ───────────────────────────────────────────────────────

function BtnRow({ onBack, onContinue, continueLabel = "Continue", disabled = false }: {
  onBack: () => void; onContinue: () => void; continueLabel?: string; disabled?: boolean;
}) {
  return (
    <View style={bn.row}>
      <TouchableOpacity onPress={onBack} activeOpacity={0.8} style={bn.back}>
        <Text style={bn.backTxt}>Back</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onContinue} activeOpacity={0.8} style={[bn.cont, disabled && bn.disabled]} disabled={disabled}>
        <Text style={bn.contTxt}>{continueLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}
function SingleBtn({ label = "Continue", onPress, disabled = false }: { label?: string; onPress: () => void; disabled?: boolean }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={[bn.cont, bn.full, disabled && bn.disabled]} disabled={disabled}>
      <Text style={bn.contTxt}>{label}</Text>
    </TouchableOpacity>
  );
}
const bn = StyleSheet.create({
  row: { flexDirection: "row", gap: 12 },
  back: { flex: 1, height: 48, borderRadius: 12, borderWidth: 1.5, borderColor: PRIMARY, alignItems: "center", justifyContent: "center" },
  backTxt: { fontFamily: "Inter_600SemiBold", fontSize: 15, color: PRIMARY },
  cont: { flex: 1, height: 48, borderRadius: 12, backgroundColor: PRIMARY, alignItems: "center", justifyContent: "center" },
  full: { flex: undefined, width: "100%" as any },
  disabled: { opacity: 0.4 },
  contTxt: { fontFamily: "Inter_600SemiBold", fontSize: 15, color: WHITE },
});

// ─── Step 0: Select Type ──────────────────────────────────────────────────────

function Step0_SelectType({ next, form, setForm }: any) {
  const types = [
    { key: "apartment", label: "Apartment", icon: <ApartmentIcon color={form.propertyType === "apartment" ? WHITE : PRIMARY} /> },
    { key: "villa",     label: "Villa",      icon: <VillaIcon color={form.propertyType === "villa" ? WHITE : PRIMARY} /> },
    { key: "house",     label: "House",      icon: <HouseIcon color={form.propertyType === "house" ? WHITE : PRIMARY} /> },
    { key: "commercial",label: "Commercial", icon: <OfficeIcon color={form.propertyType === "commercial" ? WHITE : PRIMARY} /> },
    { key: "warehouse", label: "Warehouse",  icon: <WarehouseIcon color={form.propertyType === "warehouse" ? WHITE : PRIMARY} /> },
    { key: "plot",      label: "Plot / Land",icon: <PlotIcon color={form.propertyType === "plot" ? WHITE : PRIMARY} /> },
  ];
  return (
    <View style={{ gap: 20 }}>
      <View style={{ gap: 6 }}>
        <Text style={s.title}>What type of property?</Text>
        <Text style={s.subtitle}>Select the category that best describes your property</Text>
      </View>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12, justifyContent: "space-between" }}>
        {types.map((t) => (
          <SelectCard key={t.key} icon={t.icon} label={t.label}
            selected={form.propertyType === t.key}
            onPress={() => setForm({ ...form, propertyType: t.key })} />
        ))}
      </View>
      <SingleBtn label="Continue" onPress={next} disabled={!form.propertyType} />
    </View>
  );
}

// ─── Step 1: Ownership Verification ──────────────────────────────────────────

function Step1_Verification({ next, back }: any) {
  return (
    <View style={{ gap: 20 }}>
      <View style={{ alignItems: "center", paddingVertical: 8 }}>
        <ShieldCheckIcon />
      </View>
      <View style={{ gap: 6 }}>
        <Text style={s.title}>Ownership Verification</Text>
        <Text style={s.subtitle}>We need to verify that you own this property before listing it on the platform.</Text>
      </View>
      <View style={s.infoCard}>
        <Text style={s.infoTitle}>What we'll check</Text>
        {["Government-issued ID", "Property ownership documents", "Registry / Sale deed", "Tax receipts (if applicable)"].map((item, i) => (
          <View key={i} style={{ flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 4 }}>
            <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: GOLD }} />
            <Text style={s.infoText}>{item}</Text>
          </View>
        ))}
      </View>
      <BtnRow onBack={back} onContinue={next} continueLabel="Proceed" />
    </View>
  );
}

// ─── Step 2: Ownership Type ───────────────────────────────────────────────────

function Step2_OwnershipType({ next, back, form, setForm }: any) {
  const types = [
    { key: "freehold",    label: "Freehold",       desc: "You own the property outright" },
    { key: "leasehold",   label: "Leasehold",       desc: "Property leased from a freeholder" },
    { key: "cooperative", label: "Co-operative",    desc: "Owned jointly with others" },
    { key: "joint",       label: "Joint Ownership", desc: "Shared ownership with family" },
  ];
  return (
    <View style={{ gap: 20 }}>
      <View style={{ gap: 6 }}>
        <Text style={s.title}>Ownership Type</Text>
        <Text style={s.subtitle}>Select the type of ownership you hold for this property</Text>
      </View>
      <View style={{ gap: 10 }}>
        {types.map((t) => (
          <TouchableOpacity key={t.key} onPress={() => setForm({ ...form, ownershipType: t.key })} activeOpacity={0.8}
            style={[s.radioCard, form.ownershipType === t.key && s.radioCardActive]}>
            <View style={[s.radio, form.ownershipType === t.key && s.radioActive]}>
              {form.ownershipType === t.key && <View style={s.radioDot} />}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[s.radioLabel, form.ownershipType === t.key && { color: PRIMARY }]}>{t.label}</Text>
              <Text style={s.radioDesc}>{t.desc}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <BtnRow onBack={back} onContinue={next} disabled={!form.ownershipType} />
    </View>
  );
}

// ─── Step 3: Upload Documents ─────────────────────────────────────────────────

function Step3_Documents({ next, back }: any) {
  return (
    <View style={{ gap: 20 }}>
      <View style={{ gap: 6 }}>
        <Text style={s.title}>Upload Documents</Text>
        <Text style={s.subtitle}>Upload the required documents to verify your property ownership</Text>
      </View>
      <View style={{ gap: 12 }}>
        <UploadBox label="Sale Deed / Registry" required hint="PDF or image, max 10MB" />
        <UploadBox label="Government-issued ID" required hint="Aadhaar, PAN, or Passport" />
        <UploadBox label="Tax Receipt" hint="Latest property tax receipt (optional)" />
        <UploadBox label="NOC from Society" hint="If applicable (optional)" />
      </View>
      <BtnRow onBack={back} onContinue={next} continueLabel="Submit for Verification" />
    </View>
  );
}

// ─── Step 4: Verification Result ─────────────────────────────────────────────

function Step4_Verified({ next }: any) {
  return (
    <View style={{ gap: 20, alignItems: "center" }}>
      <View style={{ paddingVertical: 12 }}>
        <CheckCircleIcon color="#38a169" />
      </View>
      <View style={{ gap: 8 }}>
        <Text style={[s.title, { textAlign: "center" }]}>Verification Successful!</Text>
        <Text style={[s.subtitle, { textAlign: "center" }]}>Your ownership documents have been verified. You can now proceed to list your property.</Text>
      </View>
      <View style={[s.infoCard, { borderColor: "#38a16944", backgroundColor: "#38a16910", width: "100%" }]}>
        {["Ownership documents verified", "Identity confirmed", "No encumbrances found"].map((item, i) => (
          <View key={i} style={{ flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 4 }}>
            <Text style={{ color: "#38a169", fontSize: 16, fontFamily: "Inter_600SemiBold" }}>✓</Text>
            <Text style={[s.infoText, { color: "#276749" }]}>{item}</Text>
          </View>
        ))}
      </View>
      <SingleBtn label="Continue to Property Details" onPress={next} />
    </View>
  );
}

// ─── Step 5: Property Details ─────────────────────────────────────────────────

function Step5_PropertyDetails({ next, back, form, setForm }: any) {
  return (
    <View style={{ gap: 18 }}>
      <FormInput label="Property Name" required placeholder="E.g., Sunset Apartments" value={form.propertyName} onChangeText={(t) => setForm({ ...form, propertyName: t })} />
      <FormInput label="Year Built" required placeholder="E.g., 2010" value={form.yearBuilt} onChangeText={(t) => setForm({ ...form, yearBuilt: t })} keyboardType="numeric" />
      <FormInput label="Total Area (sq ft)" required placeholder="E.g., 1200" value={form.totalArea} onChangeText={(t) => setForm({ ...form, totalArea: t })} keyboardType="numeric" />
      <DropdownInput label="No. of BHK" required placeholder="Select BHK type"
        value={form.bhk} options={["1 BHK", "2 BHK", "3 BHK", "4 BHK", "4+ BHK"]}
        onSelect={(v) => setForm({ ...form, bhk: v })} />
      <View style={{ flexDirection: "row", gap: 12 }}>
        <View style={{ flex: 1 }}>
          <DropdownInput label="Bedrooms" required placeholder="Select"
            value={form.bedrooms} options={["1", "2", "3", "4", "5", "6+"]}
            onSelect={(v) => setForm({ ...form, bedrooms: v })} />
        </View>
        <View style={{ flex: 1 }}>
          <DropdownInput label="Bathrooms" required placeholder="Select"
            value={form.bathrooms} options={["1", "2", "3", "4", "5+"]}
            onSelect={(v) => setForm({ ...form, bathrooms: v })} />
        </View>
      </View>
      <FormInput label="Floor Number" required placeholder="E.g., 4th Floor" value={form.floor} onChangeText={(t) => setForm({ ...form, floor: t })} />
      <BtnRow onBack={back} onContinue={next} disabled={!form.propertyName || !form.yearBuilt || !form.totalArea} />
    </View>
  );
}

// ─── Step 6: Society & Address ────────────────────────────────────────────────

function Step6_Address({ next, back, form, setForm }: any) {
  return (
    <View style={{ gap: 18 }}>
      <FormInput label="Address" required placeholder="Flat/Unit number, Building name, Street" value={form.address} onChangeText={(t) => setForm({ ...form, address: t })} />
      <View style={{ flexDirection: "row", gap: 12 }}>
        <View style={{ flex: 1 }}>
          <FormInput label="City" required placeholder="Bengaluru" value={form.city} onChangeText={(t) => setForm({ ...form, city: t })} />
        </View>
        <View style={{ flex: 1 }}>
          <FormInput label="State" required placeholder="Karnataka" value={form.state} onChangeText={(t) => setForm({ ...form, state: t })} />
        </View>
      </View>
      <FormInput label="Pincode" required placeholder="560001" value={form.pin} onChangeText={(t) => setForm({ ...form, pin: t })} keyboardType="numeric" />
      <TouchableOpacity activeOpacity={0.8} style={s.mapBtn}>
        <View style={s.mapPinCircle}><MapPinIcon /></View>
        <View style={{ flex: 1, gap: 2 }}>
          <Text style={s.mapBtnTitle}>Select Location on Map</Text>
          <Text style={s.mapBtnSub}>Select accurate location through map</Text>
        </View>
      </TouchableOpacity>
      <BtnRow onBack={back} onContinue={next} disabled={!form.address || !form.city || !form.pin} />
    </View>
  );
}

// ─── Step 7: Rental Details ───────────────────────────────────────────────────

function Step7_RentalDetails({ next, back, form, setForm }: any) {
  const durations = ["3 months", "6 months", "11 months", "12 months", "24 months"];
  return (
    <View style={{ gap: 16 }}>
      <View style={s.whiteCard}>
        <FormInput label="Monthly Rent (₹)" required placeholder="E.g., 28,000" value={form.rent} onChangeText={(t) => setForm({ ...form, rent: t })} keyboardType="numeric" />
        <FormInput label="Security Deposit (₹)" required placeholder="E.g., 56,000" value={form.deposit} onChangeText={(t) => setForm({ ...form, deposit: t })} keyboardType="numeric" />
        <FormInput label="Brokerage (₹)" placeholder="E.g., 0 (leave blank if none)" value={form.brokerage} onChangeText={(t) => setForm({ ...form, brokerage: t })} keyboardType="numeric" />
        <View style={{ gap: 8 }}>
          <Text style={fi.label}>Lease Duration</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
            {durations.map((d) => (
              <Pressable key={d} onPress={() => setForm({ ...form, leaseDuration: d })} style={[s.chip, form.leaseDuration === d && s.chipActive]}>
                <Text style={[s.chipTxt, form.leaseDuration === d && s.chipTxtActive]}>{d}</Text>
              </Pressable>
            ))}
          </View>
        </View>
        <FormInput label="Maintenance Charges (₹/month)" placeholder="E.g., 2,000" value={form.maintenance} onChangeText={(t) => setForm({ ...form, maintenance: t })} keyboardType="numeric" />
      </View>
      <BtnRow onBack={back} onContinue={next} disabled={!form.rent || !form.deposit} />
    </View>
  );
}

// ─── Step 8: Amenities ────────────────────────────────────────────────────────

function Step8_Amenities({ next, back, form, setForm }: any) {
  const toggle = (key: string) => {
    const cur: string[] = form.amenities || [];
    setForm({ ...form, amenities: cur.includes(key) ? cur.filter((k: string) => k !== key) : [...cur, key] });
  };
  const sel: string[] = form.amenities || [];
  return (
    <View style={{ gap: 16 }}>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10, justifyContent: "space-between" }}>
        {AMENITIES.map((a) => (
          <AmenityChip key={a.key} label={a.label} icon={a.icon(sel.includes(a.key))} selected={sel.includes(a.key)} onPress={() => toggle(a.key)} />
        ))}
      </View>
      <BtnRow onBack={back} onContinue={next} continueLabel="Continue" />
    </View>
  );
}

// ─── Step 9: Images ───────────────────────────────────────────────────────────

function Step9_Images({ next, back }: any) {
  return (
    <View style={{ gap: 14 }}>
      <View style={s.whiteCard}>
        <Text style={fi.label}>Cover Photo <Text style={{ color: "#fb2c36" }}>*</Text></Text>
        <Text style={s.tipSub}>This will be the main photo shown to tenants</Text>
        <PhotoSlot index={0} wide />
      </View>
      <View style={s.whiteCard}>
        <Text style={fi.label}>Additional Photos</Text>
        <Text style={s.tipSub}>Upload at least 3 photos for best results</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10, justifyContent: "space-between" }}>
          {[1, 2, 3, 4, 5].map((i) => <PhotoSlot key={i} index={i} />)}
        </View>
        <View style={s.tipBox}>
          <Text style={s.tipTxt}>💡 Use natural light · Shoot all rooms · Include exterior shots</Text>
        </View>
      </View>
      <BtnRow onBack={back} onContinue={next} continueLabel="Save Property" />
    </View>
  );
}

// ─── Step 10: Property Saved ──────────────────────────────────────────────────

function Step10_Saved({ form }: any) {
  return (
    <View style={{ gap: 20, alignItems: "center", paddingVertical: 16 }}>
      <SuccessIcon />
      <View style={{ gap: 8 }}>
        <Text style={[s.title, { textAlign: "center" }]}>Property Added! 🎉</Text>
        <Text style={[s.subtitle, { textAlign: "center" }]}>
          {form.propertyName || "Your property"} has been successfully listed on the platform.
        </Text>
      </View>
      <View style={[s.infoCard, { width: "100%" }]}>
        {[
          { l: "Type",         v: form.propertyType  || "—" },
          { l: "Ownership",    v: form.ownershipType || "—" },
          { l: "Area",         v: form.totalArea ? `${form.totalArea} sq ft` : "—" },
          { l: "City",         v: form.city          || "—" },
          { l: "Monthly Rent", v: form.rent          ? `₹${form.rent}/mo` : "—" },
        ].map(({ l, v }) => (
          <View key={l} style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: `${PRIMARY}12` }}>
            <Text style={s.infoText}>{l}</Text>
            <Text style={[s.infoText, { color: PRIMARY, fontFamily: "Inter_600SemiBold", textTransform: "capitalize" }]}>{v}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity onPress={() => router.replace("/(tabs)/properties" as any)} activeOpacity={0.8} style={[bn.cont, bn.full]}>
        <Text style={bn.contTxt}>View My Properties</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.replace("/(tabs)/" as any)} activeOpacity={0.8} style={[bn.back, bn.full]}>
        <Text style={bn.backTxt}>Go to Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
}

// ─── Shared styles ────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  title:     { fontFamily: "Inter_700Bold", fontSize: 20, color: DARK, lineHeight: 28 },
  subtitle:  { fontFamily: "Inter_400Regular", fontSize: 14, color: "#555", lineHeight: 20 },
  infoCard:  { backgroundColor: `${PRIMARY}0d`, borderRadius: 12, padding: 14, gap: 4, borderWidth: 1, borderColor: `${PRIMARY}20` },
  infoTitle: { fontFamily: "Inter_600SemiBold", fontSize: 14, color: PRIMARY, marginBottom: 4 },
  infoText:  { fontFamily: "Inter_400Regular", fontSize: 13, color: "#444" },
  radioCard:       { flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: "#f8fafc", borderRadius: 14, padding: 14, borderWidth: 1.5, borderColor: BORDER },
  radioCardActive: { borderColor: PRIMARY, backgroundColor: `${PRIMARY}08` },
  radio:     { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: "#ccc", alignItems: "center", justifyContent: "center" },
  radioActive: { borderColor: PRIMARY },
  radioDot:  { width: 10, height: 10, borderRadius: 5, backgroundColor: PRIMARY },
  radioLabel: { fontFamily: "Inter_500Medium", fontSize: 14, color: "#222" },
  radioDesc:  { fontFamily: "Inter_400Regular", fontSize: 12, color: "#888", marginTop: 2 },
  chip:       { borderRadius: 20, paddingHorizontal: 14, paddingVertical: 9, backgroundColor: "#f0f4f8", borderWidth: 1.5, borderColor: "#e2e8f0" },
  chipActive: { backgroundColor: PRIMARY, borderColor: PRIMARY },
  chipTxt:    { fontFamily: "Inter_500Medium", fontSize: 13, color: "#4a5568" },
  chipTxtActive: { color: WHITE, fontFamily: "Inter_500Medium" },
  mapBtn:      { flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: LIGHT_GRAY, borderRadius: 14, padding: 14, borderWidth: 1.5, borderColor: `${PRIMARY}22` },
  mapPinCircle:{ width: 44, height: 44, borderRadius: 22, backgroundColor: `${PRIMARY}15`, alignItems: "center", justifyContent: "center" },
  mapBtnTitle: { fontFamily: "Inter_600SemiBold", fontSize: 14, color: PRIMARY },
  mapBtnSub:   { fontFamily: "Inter_400Regular", fontSize: 12, color: "#718096" },
  whiteCard:   { backgroundColor: WHITE, borderRadius: 16, padding: 16, gap: 14, borderWidth: 1.5, borderColor: BORDER },
  tipBox:      { backgroundColor: "#fffbeb", borderRadius: 10, padding: 10 },
  tipTxt:      { fontFamily: "Inter_400Regular", fontSize: 12, color: "#7a5c00" },
  tipSub:      { fontFamily: "Inter_400Regular", fontSize: 12, color: "#718096", marginTop: -8 },
});

// ─── Steps config ─────────────────────────────────────────────────────────────

const STEPS = [
  { title: "Add Property",     component: Step0_SelectType,     grayBg: false, optional: false },
  { title: "Verification",     component: Step1_Verification,   grayBg: false, optional: false },
  { title: "Ownership Type",   component: Step2_OwnershipType,  grayBg: false, optional: false },
  { title: "Documents",        component: Step3_Documents,      grayBg: false, optional: false },
  { title: "Verified",         component: Step4_Verified,       grayBg: false, optional: false },
  { title: "Property Details", component: Step5_PropertyDetails,grayBg: false, optional: false },
  { title: "Society & Address",component: Step6_Address,        grayBg: false, optional: false },
  { title: "Rental Details",   component: Step7_RentalDetails,  grayBg: true,  optional: false },
  { title: "Amenities",        component: Step8_Amenities,      grayBg: true,  optional: true  },
  { title: "Images",           component: Step9_Images,         grayBg: true,  optional: false },
  { title: "",                 component: Step10_Saved,         grayBg: false, optional: false },
];

const TOTAL_NUMBERED = 10; // steps 0-9 show "Step X of 10"

// ─── Main screen ──────────────────────────────────────────────────────────────

export default function AddPropertyScreen() {
  const insets = useSafeAreaInsets();
  const topPad = isWeb ? 0 : insets.top > 0 ? insets.top : 12;
  const bottomPad = isWeb ? 24 : insets.bottom + 24;

  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    propertyType: "",
    ownershipType: "",
    propertyName: "",
    yearBuilt: "",
    totalArea: "",
    bhk: "",
    bedrooms: "",
    bathrooms: "",
    floor: "",
    address: "",
    city: "",
    state: "",
    pin: "",
    rent: "",
    deposit: "",
    brokerage: "",
    leaseDuration: "",
    maintenance: "",
    amenities: [] as string[],
  });

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => {
    if (step === 0) { router.back(); return; }
    setStep((s) => s - 1);
  };

  const isSuccess = step === STEPS.length - 1;
  const stepData = STEPS[step];
  const StepComponent = stepData.component;
  const stepNumber = step + 1;

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: WHITE }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={{ flex: 1, paddingTop: topPad, backgroundColor: WHITE }}>

        {/* ── Header row: caret + title ── */}
        <View style={ms.header}>
          {!isSuccess ? (
            <TouchableOpacity onPress={back} style={ms.caretBtn} activeOpacity={0.7}>
              <CaretLeftIcon />
            </TouchableOpacity>
          ) : (
            <View style={{ width: 32 }} />
          )}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            {stepData.title ? (
              <Text style={ms.stepTitle}>{stepData.title}</Text>
            ) : null}
            {stepData.optional && (
              <Text style={ms.optionalLabel}>(Optional)</Text>
            )}
          </View>
          <View style={{ width: 32 }} />
        </View>

        {/* ── Progress section ── */}
        {!isSuccess && (
          <View style={ms.progressSection}>
            <View style={ms.progressTrack}>
              <View style={[ms.progressFill, { width: `${(stepNumber / TOTAL_NUMBERED) * 100}%` as any }]} />
            </View>
            <Text style={ms.stepText}>Step {stepNumber} of {TOTAL_NUMBERED}</Text>
          </View>
        )}

        {/* ── Step content ── */}
        <ScrollView
          style={{ flex: 1, backgroundColor: stepData.grayBg ? LIGHT_GRAY : WHITE }}
          contentContainerStyle={{ padding: 16, paddingBottom: bottomPad }}
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
  header:         { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingVertical: 10, backgroundColor: WHITE },
  caretBtn:       { padding: 4 },
  stepTitle:      { fontFamily: "Inter_600SemiBold", fontSize: 18, color: PRIMARY },
  optionalLabel:  { fontFamily: "Inter_400Regular", fontSize: 13, color: "#718096" },
  progressSection:{ paddingHorizontal: 16, paddingBottom: 16, gap: 8, backgroundColor: WHITE },
  progressTrack:  { height: 10, backgroundColor: LIGHT_GRAY, borderRadius: 12, overflow: "hidden" },
  progressFill:   { height: "100%" as any, backgroundColor: GOLD, borderRadius: 12 },
  stepText:       { fontFamily: "Inter_400Regular", fontSize: 12, color: "#565656", textAlign: "center" },
});
