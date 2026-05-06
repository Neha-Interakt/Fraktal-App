import { router, useLocalSearchParams } from "expo-router";
import React, { useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path, Circle } from "react-native-svg";

const isWeb = Platform.OS === "web";
const PRIMARY = "#1a365d";
const DARK = "#00122c";
const GOLD = "#ffcb29";
const WHITE = "#ffffff";
const BG = "#f0f2f5";
const SENT_BG = "#1a365d";
const RECV_BG = "#ffffff";

type Message = {
  id: string;
  text: string;
  sender: "me" | "tenant";
  time: string;
  date?: string;
};

const INITIAL_MESSAGES: Message[] = [
  { id: "d1", text: "Today", sender: "me", time: "", date: "date-divider" },
  { id: "1", text: "Hello! I wanted to ask about the upcoming maintenance for the AC unit.", sender: "tenant", time: "10:02 AM" },
  { id: "2", text: "Hi! Yes, we've scheduled a technician for May 10th between 11 AM – 1 PM. Will you be available?", sender: "me", time: "10:05 AM" },
  { id: "3", text: "Yes, that works perfectly. Should I do anything to prepare?", sender: "tenant", time: "10:07 AM" },
  { id: "4", text: "Just make sure the unit is accessible. The technician will handle the rest.", sender: "me", time: "10:09 AM" },
  { id: "5", text: "Understood. Also, I wanted to confirm — my lease renewal is due end of this month, right?", sender: "tenant", time: "10:15 AM" },
  { id: "6", text: "Correct, it expires on 28 May. I'll send the renewal agreement by next week for your review.", sender: "me", time: "10:18 AM" },
  { id: "7", text: "Perfect, thank you! One more thing — the kitchen tap has been dripping. Should I log a maintenance request?", sender: "tenant", time: "10:22 AM" },
  { id: "8", text: "Yes please, go ahead and log it through the app. We'll get someone to fix it within 3 business days.", sender: "me", time: "10:24 AM" },
  { id: "9", text: "Will do. Thanks for the quick responses!", sender: "tenant", time: "10:25 AM" },
  { id: "10", text: "Of course! Let me know if you need anything else. 🙂", sender: "me", time: "10:26 AM" },
];

function ArrowLeftIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path d="M19.5 12H4.5M4.5 12L11.25 18.75M4.5 12L11.25 5.25" stroke={PRIMARY} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
function SendIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke={WHITE} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
function PhoneIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path d="M22 16.92V19.92C22.0011 20.4835 21.7204 21.0081 21.2356 21.3283C20.7508 21.6485 20.1462 21.7272 19.59 21.54C16.5625 20.5 13.789 18.7668 11.49 16.5C9.22316 14.2011 7.48996 11.4276 6.45 8.4C6.26137 7.84634 6.33899 7.24351 6.65682 6.75891C6.97466 6.27432 7.49618 5.99225 8.06 5.99H11.06C11.5253 5.98522 11.9795 6.14891 12.3351 6.45129C12.6907 6.75367 12.9251 7.17515 13 7.64C13.1396 8.57001 13.3854 9.48175 13.73 10.36C13.8672 10.7092 13.7925 11.1029 13.54 11.38L12.29 12.63C13.2317 14.7612 14.9488 16.4783 17.08 17.42L18.33 16.17C18.6071 15.9175 19.0008 15.8428 19.35 15.98C20.2283 16.3246 21.14 16.5704 22.07 16.71C22.5485 16.7858 22.9746 17.027 23.2765 17.3921C23.5784 17.7571 23.7334 18.2197 23.72 18.69C23.72 18.1 22 16.92 22 16.92Z" fill="none" stroke={PRIMARY} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function DateDivider({ text }: { text: string }) {
  return (
    <View style={c.dateDividerWrap}>
      <View style={c.dateDividerLine} />
      <Text style={c.dateDividerTxt}>{text}</Text>
      <View style={c.dateDividerLine} />
    </View>
  );
}

function Bubble({ msg, tenantName }: { msg: Message; tenantName: string }) {
  if (msg.date === "date-divider") {
    return <DateDivider text={msg.text} />;
  }

  const isMe = msg.sender === "me";

  return (
    <View style={[c.bubbleWrap, isMe ? c.bubbleWrapMe : c.bubbleWrapThem]}>
      {!isMe && (
        <View style={c.tenantAvatarSm} />
      )}
      <View style={{ maxWidth: "75%", gap: 3 }}>
        {!isMe && (
          <Text style={c.senderName}>{tenantName}</Text>
        )}
        <View style={[c.bubble, isMe ? c.bubbleMe : c.bubbleThem]}>
          <Text style={[c.bubbleTxt, isMe ? c.bubbleTxtMe : c.bubbleTxtThem]}>
            {msg.text}
          </Text>
        </View>
        <Text style={[c.timeTxt, isMe ? { textAlign: "right" } : { textAlign: "left" }]}>
          {msg.time}
        </Text>
      </View>
    </View>
  );
}

export default function ChatScreen() {
  const { id, tenant } = useLocalSearchParams<{ id: string; tenant: string }>();
  const insets = useSafeAreaInsets();
  const topPad = isWeb ? 8 : insets.top > 0 ? insets.top : 12;
  const bottomPad = isWeb ? 0 : insets.bottom;

  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");
  const listRef = useRef<FlatList>(null);

  const tenantName = tenant || "Tenant";

  const sendMessage = () => {
    const text = inputText.trim();
    if (!text) return;

    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const newMsg: Message = {
      id: Date.now().toString(),
      text,
      sender: "me",
      time,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText("");

    setTimeout(() => {
      listRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0}
    >
      <View style={c.screen}>
        {/* Header */}
        <View style={[c.header, { paddingTop: topPad }]}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()} style={c.backBtn}>
            <ArrowLeftIcon />
          </TouchableOpacity>
          <View style={c.headerCenter}>
            <View style={c.headerAvatar} />
            <View>
              <Text style={c.headerName}>{tenantName}</Text>
              <View style={c.onlineRow}>
                <View style={c.onlineDot} />
                <Text style={c.onlineTxt}>Online</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={c.phoneBtn} activeOpacity={0.75}>
            <PhoneIcon />
          </TouchableOpacity>
        </View>

        {/* Messages */}
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(m) => m.id}
          renderItem={({ item }) => <Bubble msg={item} tenantName={tenantName} />}
          contentContainerStyle={c.msgList}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: false })}
        />

        {/* Input bar */}
        <View style={[c.inputBar, { paddingBottom: bottomPad > 0 ? bottomPad : 12 }]}>
          <TextInput
            style={c.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type a message…"
            placeholderTextColor="#aaa"
            underlineColorAndroid="transparent"
            multiline
            maxLength={1000}
            returnKeyType="default"
          />
          <TouchableOpacity
            style={[c.sendBtn, !inputText.trim() && c.sendBtnDisabled]}
            activeOpacity={0.85}
            onPress={sendMessage}
            disabled={!inputText.trim()}
          >
            <SendIcon />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const c = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BG },

  // Header
  header: { backgroundColor: WHITE, flexDirection: "row", alignItems: "center", paddingHorizontal: 12, paddingBottom: 10, gap: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.07, shadowRadius: 4, elevation: 4 },
  backBtn: { width: 36, height: 36, alignItems: "center", justifyContent: "center" },
  headerCenter: { flex: 1, flexDirection: "row", alignItems: "center", gap: 10 },
  headerAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#c4c4c4" },
  headerName: { fontFamily: "Inter_600SemiBold", fontSize: 15, color: PRIMARY },
  onlineRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 2 },
  onlineDot: { width: 7, height: 7, borderRadius: 3.5, backgroundColor: "#48bb78" },
  onlineTxt: { fontFamily: "Inter_400Regular", fontSize: 11, color: "#48bb78" },
  phoneBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: `${PRIMARY}12`, alignItems: "center", justifyContent: "center" },

  // Messages
  msgList: { padding: 16, gap: 4, paddingBottom: 8 },
  dateDividerWrap: { flexDirection: "row", alignItems: "center", gap: 8, marginVertical: 10 },
  dateDividerLine: { flex: 1, height: 1, backgroundColor: "#ddd" },
  dateDividerTxt: { fontFamily: "Inter_400Regular", fontSize: 11, color: "#aaa" },

  bubbleWrap: { flexDirection: "row", alignItems: "flex-end", gap: 8, marginVertical: 3 },
  bubbleWrapMe: { justifyContent: "flex-end" },
  bubbleWrapThem: { justifyContent: "flex-start" },
  tenantAvatarSm: { width: 28, height: 28, borderRadius: 14, backgroundColor: "#c4c4c4", marginBottom: 16 },
  senderName: { fontFamily: "Inter_500Medium", fontSize: 11, color: "#888", marginLeft: 4 },
  bubble: { borderRadius: 18, paddingHorizontal: 14, paddingVertical: 10 },
  bubbleMe: { backgroundColor: SENT_BG, borderBottomRightRadius: 4 },
  bubbleThem: { backgroundColor: RECV_BG, borderBottomLeftRadius: 4, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 3, elevation: 2 },
  bubbleTxt: { fontFamily: "Inter_400Regular", fontSize: 14, lineHeight: 20 },
  bubbleTxtMe: { color: WHITE },
  bubbleTxtThem: { color: "#1a1a1a" },
  timeTxt: { fontFamily: "Inter_400Regular", fontSize: 10, color: "#aaa", marginHorizontal: 4 },

  // Input bar
  inputBar: { backgroundColor: WHITE, flexDirection: "row", alignItems: "flex-end", paddingHorizontal: 12, paddingTop: 10, gap: 10, borderTopWidth: 1, borderTopColor: "#e8e8e8" },
  textInput: { flex: 1, backgroundColor: "#f5f5f5", borderRadius: 22, paddingHorizontal: 16, paddingVertical: 10, fontFamily: "Inter_400Regular", fontSize: 14, color: "#1a1a1a", maxHeight: 100, borderWidth: 1, borderColor: "#e8e8e8" },
  sendBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: PRIMARY, alignItems: "center", justifyContent: "center", shadowColor: PRIMARY, shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 4 },
  sendBtnDisabled: { backgroundColor: "#b0bccc", shadowOpacity: 0 },
});
