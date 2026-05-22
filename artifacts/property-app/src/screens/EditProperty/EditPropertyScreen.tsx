import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { PROPERTIES_DATA } from '@data/properties';
import type { RootStackParamList } from '@navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'EditProperty'>;

const PRIMARY = '#1a365d';
const DARK = '#00122c';
const GOLD = '#c9a227';
const WHITE = '#ffffff';
const BG = '#e9e9e9';
const LIGHT_GRAY = '#edf2f7';
const BORDER = '#d1d5dc';
const MUTED = '#a0aec0';

function ArrowLeftIcon() { return <Svg width={24} height={24} viewBox="0 0 24 24" fill="none"><Path d="M19.5 12H4.5M4.5 12L11.25 18.75M4.5 12L11.25 5.25" stroke={PRIMARY} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" /></Svg>; }
function CheckIcon() { return <Svg width={20} height={20} viewBox="0 0 24 24" fill="none"><Path d="M5 12L10 17L19 7" stroke={WHITE} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" /></Svg>; }

function FieldLabel({ label, required }: { label: string; required?: boolean }) {
  return <Text style={s.fieldLabel}>{label}{required && <Text style={s.required}> *</Text>}</Text>;
}

function InputField({ label, value, onChangeText, placeholder, keyboardType = 'default', required, multiline }: {
  label: string; value: string; onChangeText: (v: string) => void; placeholder: string;
  keyboardType?: any; required?: boolean; multiline?: boolean;
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
        multiline={multiline}
        numberOfLines={multiline ? 3 : 1}
        underlineColorAndroid="transparent"
      />
    </View>
  );
}

const STATUS_OPTIONS = ['Occupied', 'Vacant', 'Under Maintenance'];

export default function EditPropertyScreen({ navigation, route }: Props) {
  const { id } = route.params;
  const property = PROPERTIES_DATA.find(p => p.id === id) ?? PROPERTIES_DATA[0];
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 8 : insets.top > 0 ? insets.top : 12;

  const [form, setForm] = useState({
    name: property.name,
    address: property.address,
    rent: property.rent.replace(/[₹,]/g, ''),
    beds: String(property.beds),
    baths: String(property.baths),
    area: property.area,
    status: property.status,
  });

  const handleSave = () => {
    Alert.alert('Saved!', 'Property details have been updated.', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: BG }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={[s.header, { paddingTop: topPad }]}>
        <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <ArrowLeftIcon />
        </TouchableOpacity>
        <Text style={s.headerTitle}>Edit Property</Text>
        <TouchableOpacity style={s.saveBtn} onPress={handleSave} activeOpacity={0.85}>
          <CheckIcon />
          <Text style={s.saveTxt}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={[s.body, { paddingBottom: insets.bottom + 32 }]} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={s.card}>
          <Text style={s.cardTitle}>Basic Information</Text>
          <InputField label="Property Name" required value={form.name} onChangeText={v => setForm(f => ({ ...f, name: v }))} placeholder="Property name" />
          <InputField label="Full Address" required value={form.address} onChangeText={v => setForm(f => ({ ...f, address: v }))} placeholder="Street, Area, City" multiline />
          <InputField label="Monthly Rent (₹)" required value={form.rent} onChangeText={v => setForm(f => ({ ...f, rent: v }))} placeholder="28000" keyboardType="numeric" />
        </View>

        <View style={s.card}>
          <Text style={s.cardTitle}>Property Specs</Text>
          <View style={s.row}>
            <View style={{ flex: 1 }}><InputField label="Bedrooms" value={form.beds} onChangeText={v => setForm(f => ({ ...f, beds: v }))} placeholder="3" keyboardType="numeric" /></View>
            <View style={{ flex: 1 }}><InputField label="Bathrooms" value={form.baths} onChangeText={v => setForm(f => ({ ...f, baths: v }))} placeholder="2" keyboardType="numeric" /></View>
          </View>
          <InputField label="Area (sq.ft)" value={form.area} onChangeText={v => setForm(f => ({ ...f, area: v }))} placeholder="1450" keyboardType="numeric" />
        </View>

        <View style={s.card}>
          <Text style={s.cardTitle}>Status</Text>
          <View style={s.statusRow}>
            {STATUS_OPTIONS.map(opt => (
              <TouchableOpacity
                key={opt}
                style={[s.statusChip, form.status === opt && s.statusChipActive]}
                onPress={() => setForm(f => ({ ...f, status: opt as any }))}
                activeOpacity={0.8}
              >
                <Text style={[s.statusChipText, form.status === opt && s.statusChipTextActive]}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={s.saveFullBtn} onPress={handleSave} activeOpacity={0.85}>
          <CheckIcon />
          <Text style={s.saveFullTxt}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  header: { backgroundColor: WHITE, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingBottom: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 3, elevation: 2 },
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { flex: 1, fontWeight: '700', fontSize: 18, color: PRIMARY, marginLeft: 4 },
  saveBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: PRIMARY, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 8 },
  saveTxt: { fontWeight: '600', fontSize: 14, color: WHITE },
  body: { padding: 16, gap: 16 },
  card: { backgroundColor: WHITE, borderRadius: 16, padding: 16, gap: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 },
  cardTitle: { fontWeight: '700', fontSize: 15, color: PRIMARY },
  row: { flexDirection: 'row', gap: 12 },
  fieldWrap: { gap: 6 },
  fieldLabel: { fontWeight: '500', fontSize: 14, color: '#374151' },
  required: { color: '#fb2c36' },
  input: { backgroundColor: LIGHT_GRAY, borderWidth: 1.4, borderColor: BORDER, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, fontSize: 15, color: '#1a1a1a' },
  inputMulti: { height: 88, textAlignVertical: 'top' },
  statusRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  statusChip: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 20, borderWidth: 1.5, borderColor: BORDER, backgroundColor: LIGHT_GRAY },
  statusChipActive: { backgroundColor: PRIMARY, borderColor: PRIMARY },
  statusChipText: { fontWeight: '500', fontSize: 14, color: '#555' },
  statusChipTextActive: { color: WHITE },
  saveFullBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: PRIMARY, borderRadius: 16, paddingVertical: 16 },
  saveFullTxt: { fontWeight: '700', fontSize: 16, color: WHITE },
});
