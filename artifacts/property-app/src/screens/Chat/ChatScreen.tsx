import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useRef, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Path } from 'react-native-svg';
import type { RootStackParamList } from '@navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>;

const isWeb = Platform.OS === 'web';
const PRIMARY = '#1a365d';
const DARK = '#00122c';
const GOLD = '#ffcb29';
const WHITE = '#ffffff';
const BG = '#f0f2f5';

type Message = { id: string; text: string; sender: 'me' | 'tenant'; time: string; date?: string };

const INITIAL_MESSAGES: Message[] = [
  { id: 'd1', text: 'Today', sender: 'me', time: '', date: 'date-divider' },
  { id: '1', text: 'Hello! I wanted to ask about the upcoming maintenance for the AC unit.', sender: 'tenant', time: '10:02 AM' },
  { id: '2', text: "Hi! Yes, we've scheduled a technician for May 10th between 11 AM – 1 PM. Will you be available?", sender: 'me', time: '10:05 AM' },
  { id: '3', text: 'Yes, that works perfectly. Should I do anything to prepare?', sender: 'tenant', time: '10:07 AM' },
  { id: '4', text: 'Just make sure the unit is accessible. The technician will handle the rest.', sender: 'me', time: '10:09 AM' },
  { id: '5', text: 'Understood. Also, I wanted to confirm — my lease renewal is due end of this month, right?', sender: 'tenant', time: '10:15 AM' },
  { id: '6', text: "Correct, it expires on 28 May. I'll send the renewal agreement by next week for your review.", sender: 'me', time: '10:18 AM' },
  { id: '7', text: 'Perfect, thank you! One more thing — the kitchen tap has been dripping. Should I log a maintenance request?', sender: 'tenant', time: '10:22 AM' },
  { id: '8', text: "Yes please, go ahead and log it through the app. We'll get someone to fix it within 3 business days.", sender: 'me', time: '10:24 AM' },
  { id: '9', text: 'Will do. Thanks for the quick responses!', sender: 'tenant', time: '10:25 AM' },
  { id: '10', text: 'Of course! Let me know if you need anything else. 🙂', sender: 'me', time: '10:26 AM' },
];

function ArrowLeftIcon() { return <Svg width={24} height={24} viewBox="0 0 24 24" fill="none"><Path d="M19.5 12H4.5M4.5 12L11.25 18.75M4.5 12L11.25 5.25" stroke={PRIMARY} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" /></Svg>; }
function SendIcon() { return <Svg width={20} height={20} viewBox="0 0 24 24" fill="none"><Path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke={WHITE} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /></Svg>; }
function AttachIcon() { return <Svg width={20} height={20} viewBox="0 0 24 24" fill="none"><Path d="M21.44 11.05L12.25 20.24C11.12 21.37 9.59 22 7.99 22C6.39 22 4.86 21.37 3.73 20.24C2.6 19.11 1.97 17.58 1.97 15.98C1.97 14.38 2.6 12.85 3.73 11.72L12.92 2.53C13.68 1.77 14.71 1.34 15.79 1.34C16.87 1.34 17.9 1.77 18.66 2.53C19.42 3.29 19.85 4.32 19.85 5.4C19.85 6.48 19.42 7.51 18.66 8.27L9.46 17.46C9.08 17.84 8.57 18.06 8.03 18.06C7.49 18.06 6.98 17.84 6.6 17.46C6.22 17.08 6 16.57 6 16.03C6 15.49 6.22 14.98 6.6 14.6L15.07 6.14" stroke="#888" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" /></Svg>; }

export default function ChatScreen({ navigation, route }: Props) {
  const { tenantId, tenantName } = route.params;
  const insets = useSafeAreaInsets();
  const topPad = isWeb ? 8 : insets.top > 0 ? insets.top : 12;
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [draft, setDraft] = useState('');
  const listRef = useRef<FlatList>(null);

  const initials = tenantName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  const sendMessage = () => {
    if (!draft.trim()) return;
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { id: String(Date.now()), text: draft.trim(), sender: 'me', time }]);
    setDraft('');
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const renderItem = ({ item }: { item: Message }) => {
    if (item.date === 'date-divider') {
      return (
        <View style={ms.dateDivider}>
          <View style={ms.dateLine} />
          <Text style={ms.dateText}>{item.text}</Text>
          <View style={ms.dateLine} />
        </View>
      );
    }
    const isMe = item.sender === 'me';
    return (
      <View style={[ms.msgRow, isMe ? ms.msgRowMe : ms.msgRowThem]}>
        {!isMe && <View style={ms.tenantAvatar}><Text style={ms.tenantInitials}>{initials}</Text></View>}
        <View style={[ms.bubble, isMe ? ms.bubbleMe : ms.bubbleThem]}>
          <Text style={[ms.bubbleText, isMe ? ms.bubbleTextMe : ms.bubbleTextThem]}>{item.text}</Text>
          {item.time ? <Text style={[ms.timeText, isMe ? ms.timeTextMe : ms.timeTextThem]}>{item.time}</Text> : null}
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
      <View style={[ms.header, { paddingTop: topPad }]}>
        <TouchableOpacity style={ms.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <ArrowLeftIcon />
        </TouchableOpacity>
        <View style={ms.tenantInfo}>
          <View style={ms.headerAvatar}><Text style={ms.headerInitials}>{initials}</Text></View>
          <View>
            <Text style={ms.headerName}>{tenantName}</Text>
            <View style={ms.onlineRow}><View style={ms.onlineDot} /><Text style={ms.onlineText}>Online</Text></View>
          </View>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={m => m.id}
        renderItem={renderItem}
        contentContainerStyle={[ms.listContent, { paddingBottom: isWeb ? 16 : insets.bottom + 8 }]}
        showsVerticalScrollIndicator={false}
        onLayout={() => listRef.current?.scrollToEnd()}
        style={{ backgroundColor: BG }}
      />

      <View style={[ms.inputBar, { paddingBottom: isWeb ? 12 : insets.bottom + 6 }]}>
        <TouchableOpacity style={ms.attachBtn} hitSlop={8}><AttachIcon /></TouchableOpacity>
        <TextInput
          style={ms.input}
          value={draft}
          onChangeText={setDraft}
          placeholder="Type a message..."
          placeholderTextColor="#aaa"
          multiline
          maxLength={500}
          underlineColorAndroid="transparent"
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity
          style={[ms.sendBtn, !draft.trim() && ms.sendBtnOff]}
          onPress={sendMessage}
          disabled={!draft.trim()}
          activeOpacity={0.85}
        >
          <SendIcon />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const ms = StyleSheet.create({
  header: { backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingBottom: 12, gap: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 3 },
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  tenantInfo: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12 },
  headerAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: PRIMARY, alignItems: 'center', justifyContent: 'center' },
  headerInitials: { fontWeight: '600', fontSize: 14, color: '#fff' },
  headerName: { fontWeight: '700', fontSize: 16, color: PRIMARY },
  onlineRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 2 },
  onlineDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#48bb78' },
  onlineText: { fontWeight: '400', fontSize: 12, color: '#718096' },
  listContent: { paddingHorizontal: 14, paddingTop: 12, gap: 4 },
  dateDivider: { flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 12 },
  dateLine: { flex: 1, height: 1, backgroundColor: '#d1d5db' },
  dateText: { fontWeight: '500', fontSize: 12, color: '#9ca3af' },
  msgRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 8, marginBottom: 4 },
  msgRowMe: { justifyContent: 'flex-end' },
  msgRowThem: { justifyContent: 'flex-start' },
  tenantAvatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: PRIMARY, alignItems: 'center', justifyContent: 'center' },
  tenantInitials: { fontWeight: '600', fontSize: 11, color: '#fff' },
  bubble: { maxWidth: '75%', borderRadius: 18, paddingHorizontal: 14, paddingVertical: 10, gap: 4 },
  bubbleMe: { backgroundColor: PRIMARY, borderBottomRightRadius: 4 },
  bubbleThem: { backgroundColor: '#fff', borderBottomLeftRadius: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 3, elevation: 1 },
  bubbleText: { fontSize: 14, lineHeight: 20 },
  bubbleTextMe: { color: '#fff' },
  bubbleTextThem: { color: '#1a1a1a' },
  timeText: { fontSize: 10 },
  timeTextMe: { color: 'rgba(255,255,255,0.65)', textAlign: 'right' },
  timeTextThem: { color: '#9ca3af', textAlign: 'left' },
  inputBar: { backgroundColor: '#fff', flexDirection: 'row', alignItems: 'flex-end', paddingHorizontal: 12, paddingTop: 10, gap: 10, borderTopWidth: 1, borderTopColor: '#f0f0f0' },
  attachBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#f0f2f5', alignItems: 'center', justifyContent: 'center', marginBottom: 3 },
  input: { flex: 1, backgroundColor: '#f0f2f5', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10, fontSize: 14, color: '#1a1a1a', maxHeight: 120 },
  sendBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: PRIMARY, alignItems: 'center', justifyContent: 'center', marginBottom: 3 },
  sendBtnOff: { backgroundColor: '#a0aec0' },
});
