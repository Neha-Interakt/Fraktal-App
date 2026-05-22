import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import type { RootStackParamList } from '@navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'AddProperty'>;

const PRIMARY = '#1a365d';
const DARK = '#00122c';
const GOLD = '#c9a227';
const WHITE = '#ffffff';
const LIGHT_GRAY = '#edf2f7';
const BORDER = '#d1d5dc';
const PLACEHOLDER = '#a0aec0';

function CaretLeftIcon() { return <Svg width={24} height={24} viewBox="0 0 24 24" fill="none"><Path d="M15.5 19L8.5 12L15.5 5" stroke={PRIMARY} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /></Svg>; }
function CaretDownIcon() { return <Svg width={20} height={20} viewBox="0 0 24 24" fill="none"><Path d="M6 9L12 15L18 9" stroke="#718096" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /></Svg>; }
function UploadIcon() { return <Svg width={24} height={24} viewBox="0 0 24 24" fill="none"><Path d="M12 15V4M8 8L12 4L16 8" stroke={PRIMARY} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" /><Path d="M3 15V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V15" stroke={PRIMARY} strokeWidth={1.8} strokeLinecap="round" /></Svg>; }

function ApartmentIcon({ color = PRIMARY }: { color?: string }) { return <Svg width={28} height={28} viewBox="0 0 24 24" fill="none"><Path d="M3 21V4.5C3 3.67 3.67 3 4.5 3H15C15.83 3 16.5 3.67 16.5 4.5V7.5H19.5C20.33 7.5 21 8.17 21 9V21H1.5M5.25 6.75H7.5M5.25 10.5H7.5M5.25 14.25H7.5M10.5 6.75H12.75M10.5 10.5H12.75M10.5 14.25H12.75M16.5 10.5H19.5M16.5 14.5H19.5M9 21V17.25H12V21" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" /></Svg>; }
function VillaIcon({ color = PRIMARY }: { color?: string }) { return <Svg width={28} height={28} viewBox="0 0 24 24" fill="none"><Path d="M3 9.5L12 3L21 9.5V20H15V14H9V20H3V9.5Z" fill={color} /></Svg>; }
function HouseIcon({ color = PRIMARY }: { color?: string }) { return <Svg width={28} height={28} viewBox="0 0 24 24" fill="none"><Path d="M21.4 10.78L12.53 1.91C12.39 1.76 12.2 1.69 12 1.69C11.8 1.69 11.61 1.76 11.47 1.91L2.59 10.78C2.43 10.94 2.34 11.16 2.34 11.4C2.34 11.65 2.43 11.87 2.62 12.02C2.79 12.18 3.02 12.26 3.25 12.26L4.5 12.22V20.25C4.5 20.65 4.66 21.03 4.94 21.31C5.22 21.59 5.6 21.75 6 21.75H9V16.5H15V21.75H18C18.4 21.75 18.78 21.59 19.06 21.31C19.34 21.03 19.5 20.65 19.5 20.25V12.22L20.75 12.26C20.98 12.26 21.21 12.18 21.38 12.02C21.55 11.86 21.66 11.64 21.66 11.4C21.66 11.16 21.57 10.94 21.4 10.78Z" fill={color} /></Svg>; }
function OfficeIcon({ color = PRIMARY }: { color?: string }) { return <Svg width={28} height={28} viewBox="0 0 24 24" fill="none"><Rect x={2} y={3} width={20} height={18} rx={2} stroke={color} strokeWidth={1.5} fill="none" /><Path d="M8 7H16M8 11H16M8 15H12" stroke={color} strokeWidth={1.5} strokeLinecap="round" /><Path d="M2 7H22" stroke={color} strokeWidth={1.5} /></Svg>; }

const PROP_TYPES = [
  { key: 'apartment', label: 'Apartment', Icon: ApartmentIcon },
  { key: 'villa', label: 'Villa', Icon: VillaIcon },
  { key: 'house', label: 'Independent House', Icon: HouseIcon },
  { key: 'office', label: 'Office Space', Icon: OfficeIcon },
];

function SelectCard({ icon, label, selected, onPress }: { icon: React.ReactNode; label: string; selected: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.82} style={[sc.card, selected && sc.cardActive]}>
      {selected && <View style={sc.badge}><Text style={sc.badgeTick}>✓</Text></View>}
      <View style={[sc.iconCircle, selected && sc.iconCircleActive]}>{icon}</View>
      <Text style={[sc.label, selected && sc.labelActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

const sc = StyleSheet.create({
  card: { backgroundColor: WHITE, borderRadius: 20, paddingVertical: 20, paddingHorizontal: 10, alignItems: 'center', gap: 8, width: '48%', borderWidth: 2, borderColor: '#e8e8e8', position: 'relative' },
  cardActive: { borderColor: PRIMARY, backgroundColor: PRIMARY },
  badge: { position: 'absolute', top: 10, right: 10, width: 22, height: 22, borderRadius: 11, backgroundColor: '#ffcb29', alignItems: 'center', justifyContent: 'center' },
  badgeTick: { color: DARK, fontSize: 12, fontWeight: '700' },
  iconCircle: { width: 62, height: 62, borderRadius: 31, backgroundColor: `${PRIMARY}15`, alignItems: 'center', justifyContent: 'center', marginBottom: 2 },
  iconCircleActive: { backgroundColor: `${WHITE}22` },
  label: { fontWeight: '600', fontSize: 14, color: '#1a1a1a', textAlign: 'center' },
  labelActive: { color: WHITE, fontWeight: '700' },
});

function FormInput({ label, required = false, placeholder, value, onChangeText, keyboardType = 'default', multiline = false }: {
  label: string; required?: boolean; placeholder: string; value: string; onChangeText: (t: string) => void;
  keyboardType?: any; multiline?: boolean;
}) {
  return (
    <View style={fi.wrap}>
      <Text style={fi.label}>{label}{required && <Text style={{ color: '#fb2c36' }}> *</Text>}</Text>
      <TextInput
        style={[fi.input, multiline && fi.inputMulti]}
        placeholder={placeholder}
        placeholderTextColor={PLACEHOLDER}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
        underlineColorAndroid="transparent"
      />
    </View>
  );
}

const fi = StyleSheet.create({
  wrap: { gap: 6 },
  label: { fontWeight: '500', fontSize: 14, color: '#374151' },
  input: { backgroundColor: WHITE, borderWidth: 1.4, borderColor: BORDER, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 13, fontSize: 15, color: '#1a1a1a' },
  inputMulti: { height: 100, textAlignVertical: 'top' },
});

const STEPS = ['Property Type', 'Property Details', 'Upload Photos', 'Done'];

export default function AddPropertyScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === 'web' ? 8 : insets.top > 0 ? insets.top : 12;
  const [step, setStep] = useState(0);
  const [propType, setPropType] = useState('');
  const [form, setForm] = useState({ name: '', city: '', address: '', pincode: '', beds: '', baths: '', area: '', rent: '' });
  const isLast = step === STEPS.length - 2;

  const handleNext = () => { if (step < STEPS.length - 1) setStep(s => s + 1); };
  const handleBack = () => { if (step > 0) setStep(s => s - 1); else navigation.goBack(); };

  const canNext = step === 0 ? !!propType : step === 1 ? (!!form.name && !!form.city && !!form.address) : true;

  if (step === STEPS.length - 1) {
    return (
      <View style={[as.screen, { alignItems: 'center', justifyContent: 'center', padding: 32 }]}>
        <Svg width={96} height={96} viewBox="0 0 96 96" fill="none">
          <Circle cx={48} cy={48} r={46} fill={`${GOLD}20`} />
          <Circle cx={48} cy={48} r={36} fill={`${GOLD}35`} />
          <Path d="M31 48L43 60L65 36" stroke={GOLD} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
        <Text style={{ fontWeight: '700', fontSize: 24, color: PRIMARY, marginTop: 24, marginBottom: 12, textAlign: 'center' }}>Property Added!</Text>
        <Text style={{ fontWeight: '400', fontSize: 15, color: '#718096', textAlign: 'center', lineHeight: 22, marginBottom: 32 }}>
          Your property has been listed successfully. You can now manage it from the Properties tab.
        </Text>
        <TouchableOpacity style={{ backgroundColor: PRIMARY, borderRadius: 16, paddingVertical: 16, paddingHorizontal: 40 }} onPress={() => navigation.navigate('App', {})}>
          <Text style={{ fontWeight: '700', fontSize: 16, color: WHITE }}>Go to Properties</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={[as.header, { paddingTop: topPad }]}>
        <TouchableOpacity style={as.backBtn} onPress={handleBack} activeOpacity={0.7}>
          <CaretLeftIcon />
        </TouchableOpacity>
        <Text style={as.headerTitle}>Add Property</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={as.stepRow}>
        {STEPS.slice(0, -1).map((label, i) => (
          <View key={label} style={as.stepItem}>
            <View style={[as.stepDot, i < step && as.stepDotDone, i === step && as.stepDotActive]}>
              {i < step ? <Text style={as.stepCheck}>✓</Text> : <Text style={[as.stepNum, i === step && as.stepNumActive]}>{i + 1}</Text>}
            </View>
            {i < STEPS.length - 2 && <View style={[as.stepLine, i < step && as.stepLineDone]} />}
          </View>
        ))}
      </View>

      <ScrollView contentContainerStyle={[as.body, { paddingBottom: insets.bottom + 24 }]} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        {step === 0 && (
          <View style={as.section}>
            <Text style={as.sectionTitle}>What type of property?</Text>
            <View style={as.typeGrid}>
              {PROP_TYPES.map(({ key, label, Icon }) => (
                <SelectCard key={key} icon={<Icon color={propType === key ? WHITE : PRIMARY} />} label={label} selected={propType === key} onPress={() => setPropType(key)} />
              ))}
            </View>
          </View>
        )}

        {step === 1 && (
          <View style={as.section}>
            <Text style={as.sectionTitle}>Property Details</Text>
            <View style={as.formGap}>
              <FormInput label="Property Name" required placeholder="e.g. Prestige Lakeside Habitat" value={form.name} onChangeText={v => setForm(f => ({ ...f, name: v }))} />
              <FormInput label="City" required placeholder="e.g. Bangalore" value={form.city} onChangeText={v => setForm(f => ({ ...f, city: v }))} />
              <FormInput label="Full Address" required placeholder="Street, Area, City" value={form.address} onChangeText={v => setForm(f => ({ ...f, address: v }))} multiline />
              <View style={{ flexDirection: 'row', gap: 12 }}>
                <View style={{ flex: 1 }}>
                  <FormInput label="Bedrooms" placeholder="3" value={form.beds} onChangeText={v => setForm(f => ({ ...f, beds: v }))} keyboardType="numeric" />
                </View>
                <View style={{ flex: 1 }}>
                  <FormInput label="Bathrooms" placeholder="2" value={form.baths} onChangeText={v => setForm(f => ({ ...f, baths: v }))} keyboardType="numeric" />
                </View>
              </View>
              <View style={{ flexDirection: 'row', gap: 12 }}>
                <View style={{ flex: 1 }}>
                  <FormInput label="Area (sq.ft)" placeholder="1450" value={form.area} onChangeText={v => setForm(f => ({ ...f, area: v }))} keyboardType="numeric" />
                </View>
                <View style={{ flex: 1 }}>
                  <FormInput label="Monthly Rent (₹)" placeholder="28000" value={form.rent} onChangeText={v => setForm(f => ({ ...f, rent: v }))} keyboardType="numeric" />
                </View>
              </View>
            </View>
          </View>
        )}

        {step === 2 && (
          <View style={as.section}>
            <Text style={as.sectionTitle}>Upload Photos</Text>
            {['Main Photo', 'Interior Photos', 'Floor Plan'].map((label, i) => (
              <TouchableOpacity key={label} style={as.uploadBox} activeOpacity={0.8}>
                <View style={as.uploadIconCircle}><UploadIcon /></View>
                <View style={{ alignItems: 'center', gap: 3 }}>
                  <Text style={as.uploadLabel}>{label}{i === 0 && <Text style={{ color: '#fb2c36' }}> *</Text>}</Text>
                  <Text style={as.uploadHint}>Tap to upload · JPG, PNG up to 10MB</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <TouchableOpacity style={[as.nextBtn, !canNext && as.nextBtnOff]} onPress={handleNext} disabled={!canNext} activeOpacity={0.85}>
          <Text style={as.nextBtnText}>{isLast ? 'Submit Property' : 'Continue'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const as = StyleSheet.create({
  screen: { flex: 1, backgroundColor: WHITE },
  header: { backgroundColor: WHITE, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12, paddingBottom: 12, gap: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 2 },
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontWeight: '700', fontSize: 18, color: PRIMARY },
  stepRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 24, paddingVertical: 16, backgroundColor: WHITE },
  stepItem: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  stepDot: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#e2e8f0', alignItems: 'center', justifyContent: 'center' },
  stepDotActive: { backgroundColor: PRIMARY },
  stepDotDone: { backgroundColor: '#38a169' },
  stepNum: { fontWeight: '600', fontSize: 13, color: '#718096' },
  stepNumActive: { color: WHITE },
  stepCheck: { fontWeight: '700', fontSize: 13, color: WHITE },
  stepLine: { flex: 1, height: 2, backgroundColor: '#e2e8f0', marginHorizontal: 4 },
  stepLineDone: { backgroundColor: '#38a169' },
  body: { padding: 20, gap: 24 },
  section: { gap: 16 },
  sectionTitle: { fontWeight: '700', fontSize: 18, color: PRIMARY },
  typeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: '4%' as any, justifyContent: 'flex-start' },
  formGap: { gap: 16 },
  uploadBox: { backgroundColor: LIGHT_GRAY, borderWidth: 1.5, borderColor: BORDER, borderRadius: 12, paddingVertical: 22, paddingHorizontal: 16, alignItems: 'center', gap: 10 },
  uploadIconCircle: { width: 48, height: 48, borderRadius: 24, borderWidth: 1.5, borderColor: '#a0aec0', alignItems: 'center', justifyContent: 'center' },
  uploadLabel: { fontWeight: '600', fontSize: 14, color: PRIMARY, textAlign: 'center' },
  uploadHint: { fontWeight: '500', fontSize: 12, color: '#718096', textAlign: 'center' },
  nextBtn: { backgroundColor: PRIMARY, borderRadius: 16, paddingVertical: 16, alignItems: 'center', marginTop: 8 },
  nextBtnOff: { backgroundColor: '#a0aec0' },
  nextBtnText: { fontWeight: '700', fontSize: 16, color: WHITE },
});
