import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path, Rect, G } from "react-native-svg";
import Colors from "@/constants/colors";

const isWeb = Platform.OS === "web";

// ─── Status Bar Icons (from Figma) ───────────────────────────────────────────

function CellularIcon() {
  return (
    <Svg width={20} height={12} viewBox="0 0 20 12" fill="none">
      <Rect x={0} y={7} width={3} height={5} rx={0.5} fill="#0c0c0c" />
      <Rect x={4.25} y={5} width={3} height={7} rx={0.5} fill="#0c0c0c" />
      <Rect x={8.5} y={3} width={3} height={9} rx={0.5} fill="#0c0c0c" />
      <Rect x={12.75} y={1} width={3} height={11} rx={0.5} fill="#0c0c0c" />
      <Rect x={17} y={0} width={3} height={12} rx={0.5} fill="#0c0c0c" opacity={0.3} />
    </Svg>
  );
}

function WifiIcon() {
  return (
    <Svg width={18} height={13} viewBox="0 0 18 13" fill="none">
      <Path
        d="M9 10.5C9.82843 10.5 10.5 11.1716 10.5 12C10.5 12.8284 9.82843 13.5 9 13.5C8.17157 13.5 7.5 12.8284 7.5 12C7.5 11.1716 8.17157 10.5 9 10.5Z"
        fill="#0c0c0c"
      />
      <Path
        d="M9 6.5C10.6576 6.5 12.1663 7.17 13.2635 8.25L14.6777 6.8358C13.2101 5.39578 11.2041 4.5 9 4.5C6.79589 4.5 4.78988 5.39578 3.32233 6.8358L4.73654 8.25C5.83372 7.17 7.34236 6.5 9 6.5Z"
        fill="#0c0c0c"
      />
      <Path
        d="M9 2.5C11.7614 2.5 14.2614 3.61929 16.0711 5.42893L17.4853 4.01472C15.3137 1.84315 12.3137 0.5 9 0.5C5.68629 0.5 2.68629 1.84315 0.514718 4.01472L1.92893 5.42893C3.73858 3.61929 6.23858 2.5 9 2.5Z"
        fill="#0c0c0c"
      />
    </Svg>
  );
}

function BatteryIcon() {
  return (
    <Svg width={25} height={13} viewBox="0 0 25 13" fill="none">
      <Rect x={0.5} y={0.5} width={21} height={12} rx={3.5} stroke="#0c0c0c" strokeOpacity={0.35} />
      <Rect x={2} y={2} width={16} height={9} rx={2} fill="#0c0c0c" />
      <Path
        d="M23 4.5V8.5C23.8047 8.17 24.5 7.17 24.5 6.5C24.5 5.83 23.8047 4.83 23 4.5Z"
        fill="#0c0c0c"
        fillOpacity={0.4}
      />
    </Svg>
  );
}

// ─── App SVG Icons ────────────────────────────────────────────────────────────

function BellIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20.7938 16.4944C20.2735 15.5981 19.5 13.0622 19.5 9.75C19.5 7.76088 18.7098 5.85322 17.3033 4.4467C15.8968 3.04018 13.9891 2.25 12 2.25C10.0109 2.25 8.10323 3.04018 6.69671 4.4467C5.29019 5.85322 4.50001 7.76088 4.50001 9.75C4.50001 13.0631 3.72564 15.5981 3.20532 16.4944C3.07245 16.7222 3.00201 16.9811 3.00111 17.2449C3.0002 17.5086 3.06886 17.768 3.20017 17.9967C3.33147 18.2255 3.52077 18.4156 3.74899 18.5478C3.9772 18.6801 4.23625 18.7498 4.50001 18.75H8.32595C8.49899 19.5967 8.95916 20.3577 9.62864 20.9042C10.2981 21.4507 11.1358 21.7492 12 21.7492C12.8642 21.7492 13.7019 21.4507 14.3714 20.9042C15.0409 20.3577 15.501 19.5967 15.6741 18.75H19.5C19.7637 18.7496 20.0226 18.6798 20.2507 18.5475C20.4788 18.4151 20.668 18.225 20.7992 17.9963C20.9303 17.7676 20.9989 17.5083 20.998 17.2446C20.997 16.9809 20.9266 16.7222 20.7938 16.4944ZM12 20.25C11.5348 20.2499 11.0812 20.1055 10.7014 19.8369C10.3216 19.5683 10.0344 19.1886 9.87939 18.75H14.1206C13.9656 19.1886 13.6784 19.5683 13.2986 19.8369C12.9189 20.1055 12.4652 20.2499 12 20.25ZM4.50001 17.25C5.22189 16.0088 6.00001 13.1325 6.00001 9.75C6.00001 8.1587 6.63215 6.63258 7.75737 5.50736C8.88259 4.38214 10.4087 3.75 12 3.75C13.5913 3.75 15.1174 4.38214 16.2427 5.50736C17.3679 6.63258 18 8.1587 18 9.75C18 13.1297 18.7763 16.0059 19.5 17.25H4.50001Z"
        fill="#1A365D"
      />
    </Svg>
  );
}

function BuildingOfficeIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M23.25 19.5H21.75V9C21.9489 9 22.1397 8.92098 22.2803 8.78033C22.421 8.63968 22.5 8.44891 22.5 8.25C22.5 8.05109 22.421 7.86032 22.2803 7.71967C22.1397 7.57902 21.9489 7.5 21.75 7.5H17.25V4.5C17.4489 4.5 17.6397 4.42098 17.7803 4.28033C17.921 4.13968 18 3.94891 18 3.75C18 3.55109 17.921 3.36032 17.7803 3.21967C17.6397 3.07902 17.4489 3 17.25 3H3.75C3.55109 3 3.36032 3.07902 3.21967 3.21967C3.07902 3.36032 3 3.55109 3 3.75C3 3.94891 3.07902 4.13968 3.21967 4.28033C3.36032 4.42098 3.55109 4.5 3.75 4.5V19.5H2.25C2.05109 19.5 1.86032 19.579 1.71967 19.7197C1.57902 19.8603 1.5 20.0511 1.5 20.25C1.5 20.4489 1.57902 20.6397 1.71967 20.7803C1.86032 20.921 2.05109 21 2.25 21H23.25C23.4489 21 23.6397 20.921 23.7803 20.7803C23.921 20.6397 24 20.4489 24 20.25C24 20.0511 23.921 19.8603 23.7803 19.7197C23.6397 19.579 23.4489 19.5 23.25 19.5ZM20.25 9V19.5H17.25V9H20.25ZM5.25 4.5H15.75V19.5H13.5V15C13.5 14.8011 13.421 14.6103 13.2803 14.4697C13.1397 14.329 12.9489 14.25 12.75 14.25H8.25C8.05109 14.25 7.86032 14.329 7.71967 14.4697C7.57902 14.6103 7.5 14.8011 7.5 15V19.5H5.25V4.5ZM12 19.5H9V15.75H12V19.5Z"
        fill="#F8F8F8"
      />
    </Svg>
  );
}

function TrendUpGoldIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M22.5 5.25V11.25C22.5 11.4489 22.421 11.6397 22.2803 11.7803C22.1397 11.921 21.9489 12 21.75 12C21.5511 12 21.3603 11.921 21.2197 11.7803C21.079 11.6397 21 11.4489 21 11.25V7.06031L13.2806 14.7806C13.211 14.8504 13.1282 14.9057 13.0372 14.9434C12.9461 14.9812 12.8486 15.0006 12.75 15.0006C12.6514 15.0006 12.5538 14.9812 12.4628 14.9434C12.3717 14.9057 12.289 14.8504 12.2194 14.7806L8.99999 11.5603L2.78061 17.7806C2.63988 17.9214 2.44901 18.0004 2.24999 18.0004C2.05097 18.0004 1.8601 17.9214 1.71936 17.7806C1.57863 17.6399 1.49957 17.449 1.49957 17.25C1.49957 17.051 1.57863 16.8601 1.71936 16.7194L8.46936 9.96937C8.53902 9.89964 8.62174 9.84432 8.71278 9.80658C8.80383 9.76884 8.90143 9.74941 8.99999 9.74941C9.09855 9.74941 9.19615 9.76884 9.28719 9.80658C9.37824 9.84432 9.46096 9.89964 9.53062 9.96937L12.75 13.1897L19.9397 6H15.75C15.5511 6 15.3603 5.92098 15.2197 5.78033C15.079 5.63968 15 5.44891 15 5.25C15 5.05109 15.079 4.86032 15.2197 4.71967C15.3603 4.57902 15.5511 4.5 15.75 4.5H21.75C21.9489 4.5 22.1397 4.57902 22.2803 4.71967C22.421 4.86032 22.5 5.05109 22.5 5.25Z"
        fill="#FFCB29"
      />
    </Svg>
  );
}

function PlusCircleIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2.25C10.0716 2.25 8.18657 2.82183 6.58319 3.89317C4.97982 4.96452 3.73013 6.48726 2.99218 8.26884C2.25422 10.0504 2.06114 12.0108 2.43735 13.9021C2.81355 15.7934 3.74215 17.5307 5.10571 18.8943C6.46928 20.2579 8.20656 21.1865 10.0979 21.5627C11.9892 21.9389 13.9496 21.7458 15.7312 21.0078C17.5127 20.2699 19.0355 19.0202 20.1068 17.4168C21.1782 15.8134 21.75 13.9284 21.75 12C21.7473 9.41498 20.7192 6.93661 18.8913 5.10872C17.0634 3.28084 14.585 2.25273 12 2.25ZM16.5 12C16.5 12.1989 16.421 12.3897 16.2803 12.5303C16.1397 12.671 15.9489 12.75 15.75 12.75H12.75V15.75C12.75 15.9489 12.671 16.1397 12.5303 16.2803C12.3897 16.421 12.1989 16.5 12 16.5C11.8011 16.5 11.6103 16.421 11.4697 16.2803C11.329 16.1397 11.25 15.9489 11.25 15.75V12.75H8.25C8.05109 12.75 7.86033 12.671 7.71967 12.5303C7.57902 12.3897 7.5 12.1989 7.5 12C7.5 11.8011 7.57902 11.6103 7.71967 11.4697C7.86033 11.329 8.05109 11.25 8.25 11.25H11.25V8.25C11.25 8.05109 11.329 7.86032 11.4697 7.71967C11.6103 7.57902 11.8011 7.5 12 7.5C12.1989 7.5 12.3897 7.57902 12.5303 7.71967C12.671 7.86032 12.75 8.05109 12.75 8.25V11.25H15.75C15.9489 11.25 16.1397 11.329 16.2803 11.4697C16.421 11.6103 16.5 11.8011 16.5 12Z"
        fill="#FFCB29"
      />
    </Svg>
  );
}

function ChatIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2.25C6.615 2.25 2.25 6.615 2.25 12.0272C2.25 13.8216 2.72344 15.5447 3.60938 17.0522L2.27344 21.1116C2.19938 21.3366 2.19281 21.5778 2.25438 21.8062C2.31594 22.0347 2.44313 22.2413 2.62031 22.4003C2.79844 22.5591 3.01875 22.6538 3.25125 22.6725C3.48375 22.6913 3.71531 22.6322 3.91406 22.5047L7.98281 20.0028C9.24094 20.5894 10.6078 20.8931 12 20.8931C17.385 20.8931 21.75 16.5338 21.75 12.0272C21.75 7.52063 17.385 2.25 12 2.25ZM12 19.3931C10.7484 19.3941 9.51281 19.1072 8.38594 18.5541L8.11875 18.4228L4.40625 20.6316L5.54531 17.1197L5.36344 16.8422C4.49531 15.5297 4.03594 13.9997 4.03594 12.3188C4.03594 7.97438 7.64063 3.75 12 3.75C16.3594 3.75 19.9641 7.97438 19.9641 12.3188C19.9641 16.6631 16.3594 19.3931 12 19.3931Z"
        fill="#FFCB29"
      />
    </Svg>
  );
}

function FilesIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20.0306 6.21938L16.2806 2.46938C16.2109 2.39975 16.1282 2.34454 16.0371 2.3069C15.9461 2.26926 15.8485 2.24992 15.75 2.25H8.25C7.85218 2.25 7.47064 2.40804 7.18934 2.68934C6.90804 2.97064 6.75 3.35218 6.75 3.75V5.25H5.25C4.85218 5.25 4.47064 5.40804 4.18934 5.68934C3.90804 5.97064 3.75 6.35218 3.75 6.75V20.25C3.75 20.6478 3.90804 21.0294 4.18934 21.3107C4.47064 21.592 4.85218 21.75 5.25 21.75H15.75C16.1478 21.75 16.5294 21.592 16.8107 21.3107C17.092 21.0294 17.25 20.6478 17.25 20.25V18.75H18.75C19.1478 18.75 19.5294 18.592 19.8107 18.3107C20.092 18.0294 20.25 17.6478 20.25 17.25V6.75C20.2501 6.65148 20.2307 6.55391 20.1931 6.46286C20.1555 6.37182 20.1003 6.28908 20.0306 6.21938ZM15.75 20.25H5.25V6.75H12.4397L15.75 10.0603V20.25ZM18.75 17.25H17.25V9.75C17.2501 9.65148 17.2307 9.55391 17.1931 9.46286C17.1555 9.37182 17.1003 9.28908 17.0306 9.21937L13.2806 5.46938C13.2109 5.39975 13.1282 5.34454 13.0371 5.3069C12.9461 5.26926 12.8485 5.24992 12.75 5.25H8.25V3.75H15.4397L18.75 7.06031V17.25Z"
        fill="#FFCB29"
      />
    </Svg>
  );
}

function ClockSmallIcon() {
  return (
    <Svg width={12} height={12} viewBox="0 0 12 12" fill="none">
      <Path
        d="M6 1C3.243 1 1 3.243 1 6C1 8.757 3.243 11 6 11C8.757 11 11 8.757 11 6C11 3.243 8.757 1 6 1ZM6 10C3.794 10 2 8.206 2 6C2 3.794 3.794 2 6 2C8.206 2 10 3.794 10 6C10 8.206 8.206 10 6 10ZM8.5 6C8.5 6.276 8.276 6.5 8 6.5H6C5.724 6.5 5.5 6.276 5.5 6V3.5C5.5 3.224 5.724 3 6 3C6.276 3 6.5 3.224 6.5 3.5V5.5H8C8.276 5.5 8.5 5.724 8.5 6Z"
        fill="#F0F0F0"
      />
    </Svg>
  );
}

// ─── Status Bar (Figma TopHeader) ────────────────────────────────────────────

function StatusBar() {
  const insets = useSafeAreaInsets();
  const topPad = isWeb ? 8 : insets.top > 0 ? insets.top : 12;

  return (
    <View style={[s.statusBar, { paddingTop: topPad }]}>
      <Text style={s.statusTime}>9:41</Text>
      <View style={s.statusIcons}>
        <CellularIcon />
        <WifiIcon />
        <BatteryIcon />
      </View>
    </View>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  return (
    <View style={s.navbar}>
      <View style={s.navLeft}>
        <Text style={s.navWelcome}>Welcome back, Aditya!</Text>
        <View style={s.totalPropertiesBadge}>
          <Text style={s.totalPropertiesText}>Total Properties: 08</Text>
        </View>
      </View>
      <View style={s.navRight}>
        <TouchableOpacity activeOpacity={0.7}>
          <BellIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─── Analytics Cards ──────────────────────────────────────────────────────────

function RevenueCard() {
  return (
    <View style={s.revenueCard}>
      <View style={s.analyticsIconBox}>
        <BuildingOfficeIcon />
      </View>
      <View style={s.analyticsTexts}>
        <Text style={s.analyticsLabel}>Monthly Revenue</Text>
        <Text style={s.analyticsValue}>₹1,28,000 </Text>
        <Text style={s.analyticsChange}>+10.5%</Text>
      </View>
    </View>
  );
}

function SmallAnalyticsCard({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <View style={s.smallCard}>
      <View style={s.analyticsIconBox}>
        <TrendUpGoldIcon />
      </View>
      <View style={s.analyticsTexts}>
        <Text style={s.analyticsLabel}>{label}</Text>
        <Text style={s.analyticsValue}>{value}</Text>
        <Text style={s.analyticsChangeSm}>{sub}</Text>
      </View>
    </View>
  );
}

// ─── Quick Actions ────────────────────────────────────────────────────────────

function QuickAction({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <View style={s.quickAction}>
      <LinearGradient
        colors={["#1a365d", "#00122c"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={s.quickActionIconWrap}
      >
        {icon}
      </LinearGradient>
      <Text style={s.quickActionLabel}>{label}</Text>
    </View>
  );
}

// ─── Property Card ────────────────────────────────────────────────────────────

const PROPERTY_IMAGES = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&q=80",
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500&q=80",
];

function PropertyCard({
  name,
  tenant,
  rent,
  imageUri,
}: {
  name: string;
  tenant: string;
  rent: string;
  imageUri: string;
}) {
  return (
    <View style={s.propertyCard}>
      {/* Property image */}
      <View style={s.propertyImageCol}>
        <Image
          source={{ uri: imageUri }}
          style={s.propertyImage}
          contentFit="cover"
          transition={200}
        />
      </View>
      {/* Bottom info */}
      <View style={s.propertyBottom}>
        <View style={s.propertyBottomLeft}>
          <Text style={s.propertyName} numberOfLines={1}>
            {name}
          </Text>
          <View style={s.propertyRow}>
            <View style={s.tenantAvatar} />
            <Text style={s.tenantName}>{tenant}</Text>
          </View>
          <View style={s.propertyRow}>
            <Text style={s.propertyRent}>{rent}</Text>
          </View>
        </View>
        <View style={s.ratingBox}>
          <Text style={s.ratingStar}>★</Text>
          <Text style={s.ratingNum}>4.5</Text>
        </View>
      </View>
    </View>
  );
}

// ─── Activity Card ────────────────────────────────────────────────────────────

function ActivityCard({
  title,
  property,
  amount,
  tenant,
  time,
}: {
  title: string;
  property: string;
  amount: string;
  tenant?: string;
  time: string;
}) {
  return (
    <View style={s.activityCard}>
      <View style={s.activityIconBox} />
      <View style={s.activityBody}>
        <View style={s.activityTopRow}>
          <View style={s.activityTitleCol}>
            <Text style={s.activityTitle}>{title}</Text>
            <Text style={s.activityProperty}>{property}</Text>
          </View>
          <Text style={s.activityAmount}>{amount}</Text>
        </View>
        <View style={s.activityBottomRow}>
          <View style={s.tenantRow}>
            <View style={s.activityAvatar} />
            {tenant ? <Text style={s.activityTenant}>{tenant}</Text> : null}
          </View>
          <View style={s.timeRow}>
            <ClockSmallIcon />
            <Text style={s.activityTime}>{time}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const bottomPad = isWeb ? 90 : insets.bottom + 80;

  return (
    <View style={s.screen}>
      <View style={s.topSection}>
        <StatusBar />
        <Navbar />
      </View>
      <ScrollView
        style={s.scroll}
        contentContainerStyle={[s.scrollContent, { paddingBottom: bottomPad }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Analytics */}
        <View style={s.analyticsSection}>
          <RevenueCard />
          <View style={s.smallCardsRow}>
            <SmallAnalyticsCard label="Occupancy rate" value="94%" sub="+3.5%" />
            <SmallAnalyticsCard label="Total ROI" value="12%" sub="Since inception" />
          </View>
        </View>

        {/* Quick Actions */}
        <View style={s.quickActionsBar}>
          <TouchableOpacity onPress={() => router.push("/add-property")} activeOpacity={0.8} style={{ flex: 1 }}>
            <QuickAction icon={<PlusCircleIcon />} label="Add property" />
          </TouchableOpacity>
          <QuickAction icon={<ChatIcon />} label="Chats" />
          <QuickAction icon={<FilesIcon />} label="Documents " />
        </View>

        {/* Properties */}
        <View style={s.sectionHeader}>
          <Text style={s.sectionTitle}>Properties</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={s.seeMore}>See more</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={s.propertiesScrollContent}
        >
          <PropertyCard
            name="Prestige Lakeside Habitat"
            tenant="Ramesh Kumar"
            rent="₹28,000/mo "
            imageUri={PROPERTY_IMAGES[0]}
          />
          <PropertyCard
            name="Sunset Apartments #402"
            tenant="Harish Rao"
            rent="₹28,000/mo "
            imageUri={PROPERTY_IMAGES[1]}
          />
        </ScrollView>

        {/* Recent Activities */}
        <View style={[s.sectionHeader, { marginTop: 4 }]}>
          <Text style={s.sectionTitle}>Recent Activities</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={s.seeMore}>See more</Text>
          </TouchableOpacity>
        </View>
        <View style={s.activitiesCol}>
          <ActivityCard
            title="Rent Payment Received"
            property="Sunset Apartments #402"
            amount="₹28,000"
            tenant="Harish Rao"
            time="2 hours ago"
          />
          <ActivityCard
            title="Lease Renewal Pending"
            property="Ocean View Villa"
            amount="₹45,000"
            time="5 hours ago"
          />
        </View>
      </ScrollView>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#e9e9e9",
  },
  topSection: {
    backgroundColor: "#ffffff",
  },

  // Status bar
  statusBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 4,
  },
  statusTime: {
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    color: "#0c0c0c",
    letterSpacing: -0.3,
  },
  statusIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  // Navbar
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  navLeft: {
    flexDirection: "column",
    gap: 8,
  },
  navWelcome: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: "#0c0c0c",
    lineHeight: 17,
  },
  totalPropertiesBadge: {
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: "flex-start",
  },
  totalPropertiesText: {
    fontFamily: "Inter_500Medium",
    fontSize: 16,
    color: "#0c0c0c",
    letterSpacing: -0.3,
  },
  navRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },

  // Scroll
  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 12,
  },

  // Analytics
  analyticsSection: { gap: 12 },
  revenueCard: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    padding: 12,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
  },
  analyticsIconBox: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  analyticsTexts: { flexDirection: "column", gap: 12 },
  analyticsLabel: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: "#f8f8f8",
    letterSpacing: -0.3,
  },
  analyticsValue: {
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    color: "#f8f8f8",
  },
  analyticsChange: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: "#f8f8f8",
    letterSpacing: -0.3,
  },
  analyticsChangeSm: {
    fontFamily: "Inter_500Medium",
    fontSize: 10,
    color: "#f8f8f8",
  },
  smallCardsRow: { flexDirection: "row", gap: 12 },
  smallCard: {
    flex: 1,
    backgroundColor: Colors.primary,
    borderRadius: 16,
    padding: 12,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },

  // Quick Actions
  quickActionsBar: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  quickAction: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    padding: 8,
  },
  quickActionIconWrap: {
    borderRadius: 24,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  quickActionLabel: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    color: "#e9e9e9",
    textAlign: "center",
  },

  // Section headers
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: "100%",
  },
  sectionTitle: {
    fontFamily: "Inter_500Medium",
    fontSize: 16,
    color: "#060606",
    letterSpacing: -0.3,
  },
  seeMore: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#060606",
    letterSpacing: -0.3,
    textDecorationLine: "underline",
  },

  // Properties
  propertiesScrollContent: { gap: 10, paddingRight: 4 },
  propertyCard: {
    backgroundColor: "#fbfbfb",
    borderRadius: 16,
    width: 208.5,
    height: 180,
    padding: 8,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 8,
    overflow: "hidden",
  },
  propertyImageCol: {
    flex: 1,
    width: "100%",
  },
  propertyImage: {
    flex: 1,
    width: "100%",
    borderRadius: 12,
  },
  propertyBottom: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  propertyBottomLeft: {
    flexDirection: "column",
    gap: 8,
    width: 147,
  },
  propertyName: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    color: "#323232",
    width: 160,
  },
  propertyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  tenantAvatar: {
    width: 24,
    height: 24,
    borderRadius: 16,
    backgroundColor: "#d3d3d3",
    overflow: "hidden",
  },
  tenantName: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#323232",
    letterSpacing: -0.3,
  },
  propertyRent: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    color: "#323232",
    letterSpacing: -0.3,
  },
  ratingBox: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    paddingHorizontal: 4,
    paddingVertical: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  ratingStar: {
    color: "#f0b100",
    fontSize: 12,
    lineHeight: 14,
  },
  ratingNum: {
    fontFamily: "Inter_500Medium",
    fontSize: 10,
    color: "#0a0a0a",
    lineHeight: 12,
  },

  // Activities
  activitiesCol: { gap: 16 },
  activityCard: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    height: 100,
    padding: 17,
    paddingBottom: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  activityIconBox: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: "transparent",
  },
  activityBody: {
    flex: 1,
    flexDirection: "column",
    gap: 8,
  },
  activityTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    height: 42,
  },
  activityTitleCol: {
    flexDirection: "column",
    gap: 2,
    flex: 1,
  },
  activityTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    color: "#e9e9e9",
    lineHeight: 20,
  },
  activityProperty: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: "#e9e9e9",
    lineHeight: 20,
  },
  activityAmount: {
    fontFamily: "Inter_700Bold",
    fontSize: 14,
    color: "#e9e9e9",
    lineHeight: 24,
    paddingRight: 9,
  },
  activityBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 16,
    width: "100%",
  },
  tenantRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  activityAvatar: {
    width: 16,
    height: 16,
    borderRadius: 99999,
    backgroundColor: "#d3d3d3",
  },
  activityTenant: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#f0f0f0",
    lineHeight: 16,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  activityTime: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#f0f0f0",
    lineHeight: 16,
  },
});
