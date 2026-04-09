import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path, Rect, Circle, Ellipse } from "react-native-svg";
import Colors from "@/constants/colors";

const isWeb = Platform.OS === "web";

// ─── Status Bar Icons ─────────────────────────────────────────────────────────

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
      <Path d="M9 10.5C9.828 10.5 10.5 11.172 10.5 12C10.5 12.828 9.828 13.5 9 13.5C8.172 13.5 7.5 12.828 7.5 12C7.5 11.172 8.172 10.5 9 10.5Z" fill="#0c0c0c" />
      <Path d="M9 6.5C10.658 6.5 12.166 7.17 13.264 8.25L14.678 6.836C13.21 5.396 11.204 4.5 9 4.5C6.796 4.5 4.79 5.396 3.322 6.836L4.737 8.25C5.834 7.17 7.342 6.5 9 6.5Z" fill="#0c0c0c" />
      <Path d="M9 2.5C11.761 2.5 14.261 3.619 16.071 5.429L17.485 4.015C15.314 1.843 12.314 0.5 9 0.5C5.686 0.5 2.686 1.843 0.515 4.015L1.929 5.429C3.739 3.619 6.239 2.5 9 2.5Z" fill="#0c0c0c" />
    </Svg>
  );
}

function BatteryIcon() {
  return (
    <Svg width={25} height={13} viewBox="0 0 25 13" fill="none">
      <Rect x={0.5} y={0.5} width={21} height={12} rx={3.5} stroke="#0c0c0c" strokeOpacity={0.35} />
      <Rect x={2} y={2} width={16} height={9} rx={2} fill="#0c0c0c" />
      <Path d="M23 4.5V8.5C23.805 8.17 24.5 7.17 24.5 6.5C24.5 5.83 23.805 4.83 23 4.5Z" fill="#0c0c0c" fillOpacity={0.4} />
    </Svg>
  );
}

// ─── Nav Icons ────────────────────────────────────────────────────────────────

function ArrowLeftIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path d="M19.5 12H4.5M4.5 12L11.25 18.75M4.5 12L11.25 5.25" stroke="#1a365d" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function ChatIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z" stroke="#1a365d" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

// ─── Spec Icons ───────────────────────────────────────────────────────────────

function BedIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path d="M2 7V17M2 12H22M22 7V17M7 12V9.5C7 8.672 7.672 8 8.5 8H12M16 12V9.5C16 8.672 15.328 8 14.5 8H12M12 8V12" stroke="#1a365d" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function BathIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path d="M4 12H20V16C20 18.209 18.209 20 16 20H8C5.791 20 4 18.209 4 16V12ZM4 12V6C4 4.895 4.895 4 6 4C7.105 4 8 4.895 8 6V12" stroke="#1a365d" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M8 20L7 22M16 20L17 22" stroke="#1a365d" strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

function ElevatorIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Rect x={3} y={3} width={18} height={18} rx={2} stroke="#1a365d" strokeWidth={1.5} />
      <Path d="M9 3V21M15 3V21" stroke="#1a365d" strokeWidth={1.5} />
      <Path d="M12 8L9.5 11H14.5L12 8ZM12 16L9.5 13H14.5L12 16Z" fill="#1a365d" />
    </Svg>
  );
}

function MapPinIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path d="M12 2C8.134 2 5 5.134 5 9C5 13.5 12 22 12 22C12 22 19 13.5 19 9C19 5.134 15.866 2 12 2ZM12 11.5C10.619 11.5 9.5 10.381 9.5 9C9.5 7.619 10.619 6.5 12 6.5C13.381 6.5 14.5 7.619 14.5 9C14.5 10.381 13.381 11.5 12 11.5Z" stroke="#111" strokeWidth={1.4} fill="none" />
    </Svg>
  );
}

function MoneyIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path d="M3 7C3 5.895 3.895 5 5 5H19C20.105 5 21 5.895 21 7V17C21 18.105 20.105 19 19 19H5C3.895 19 3 18.105 3 17V7Z" stroke="#111" strokeWidth={1.4} />
      <Path d="M12 9V15M9.5 10.5C9.5 9.672 10.172 9 11 9H13C13.828 9 14.5 9.672 14.5 10.5C14.5 11.328 13.828 12 13 12H11C10.172 12 9.5 12.672 9.5 13.5C9.5 14.328 10.172 15 11 15H13C13.828 15 14.5 14.328 14.5 13.5" stroke="#111" strokeWidth={1.4} strokeLinecap="round" />
    </Svg>
  );
}

function PencilIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Path d="M9.5 3.5L12.5 6.5L5 14H2V11L9.5 3.5ZM9.5 3.5L11.5 1.5L14.5 4.5L12.5 6.5" stroke="#1a365d" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function ClockIcon() {
  return (
    <Svg width={12} height={12} viewBox="0 0 12 12" fill="none">
      <Circle cx={6} cy={6} r={5} stroke="#f0f0f0" strokeWidth={1} />
      <Path d="M6 3.5V6L7.5 7.5" stroke="#f0f0f0" strokeWidth={1} strokeLinecap="round" />
    </Svg>
  );
}

function UsersIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path d="M16 11C17.657 11 19 9.657 19 8C19 6.343 17.657 5 16 5" stroke="#f8f8f8" strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M18 21C18 18.239 15.314 16 12 16C8.686 16 6 18.239 6 21" stroke="#f8f8f8" strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M20 21C20 18.239 17.314 16 14 16" stroke="#f8f8f8" strokeWidth={1.5} strokeLinecap="round" />
      <Circle cx={12} cy={8} r={4} stroke="#f8f8f8" strokeWidth={1.5} />
    </Svg>
  );
}

function WrenchIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.77 3.77z" stroke="#f8f8f8" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  );
}

function TrendUpIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path d="M22.5 5.25V11.25C22.5 11.449 22.421 11.64 22.28 11.78C22.14 11.921 21.949 12 21.75 12C21.551 12 21.36 11.921 21.22 11.78C21.079 11.64 21 11.449 21 11.25V7.06L13.28 14.78C13.21 14.85 13.128 14.906 13.037 14.943C12.946 14.981 12.849 15 12.75 15C12.651 15 12.554 14.981 12.463 14.943C12.372 14.906 12.289 14.85 12.219 14.78L9 11.56L2.78 17.78C2.64 17.921 2.449 18 2.25 18C2.051 18 1.86 17.921 1.719 17.78C1.579 17.64 1.5 17.449 1.5 17.25C1.5 17.051 1.579 16.86 1.719 16.719L8.469 9.969C8.539 9.9 8.622 9.844 8.713 9.807C8.804 9.769 8.901 9.749 9 9.749C9.099 9.749 9.196 9.769 9.287 9.807C9.378 9.844 9.461 9.9 9.531 9.969L12.75 13.19L19.94 6H15.75C15.551 6 15.36 5.921 15.22 5.78C15.079 5.64 15 5.449 15 5.25C15 5.051 15.079 4.86 15.22 4.719C15.36 4.579 15.551 4.5 15.75 4.5H21.75C21.949 4.5 22.14 4.579 22.28 4.719C22.421 4.86 22.5 5.051 22.5 5.25Z" fill="#FFCB29" />
    </Svg>
  );
}

// ─── Property Images ──────────────────────────────────────────────────────────

const CAROUSEL_IMAGES = [
  { uri: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80", label: "Living Room" },
  { uri: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80", label: "Exterior" },
  { uri: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80", label: "Garden" },
  { uri: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80", label: "Bedroom" },
];

// ─── Status Bar ───────────────────────────────────────────────────────────────

function StatusBar({ topPad }: { topPad: number }) {
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

// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function PropertiesScreen() {
  const insets = useSafeAreaInsets();
  const topPad = isWeb ? 8 : insets.top > 0 ? insets.top : 12;
  const bottomPad = isWeb ? 90 : insets.bottom + 80;
  const [activeImg, setActiveImg] = useState(0);

  return (
    <View style={s.screen}>
      {/* Fixed white top header */}
      <View style={s.topHeader}>
        <StatusBar topPad={topPad} />
        {/* Navbar */}
        <View style={s.navbar}>
          <View style={s.navLeft}>
            <TouchableOpacity activeOpacity={0.7} style={s.backBtn}>
              <ArrowLeftIcon />
            </TouchableOpacity>
            <Text style={s.navTitle}>Sunset Apartments</Text>
          </View>
          <TouchableOpacity activeOpacity={0.7}>
            <ChatIcon />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={s.scroll}
        contentContainerStyle={[s.scrollContent, { paddingBottom: bottomPad }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Image Carousel */}
        <View style={s.carouselWrap}>
          <Image
            source={{ uri: CAROUSEL_IMAGES[activeImg].uri }}
            style={s.carouselImage}
            contentFit="cover"
            transition={250}
          />
          {/* Bottom labels + dots */}
          <View style={s.carouselBottom}>
            <Text style={s.carouselLabel}>{CAROUSEL_IMAGES[activeImg].label}</Text>
            <View style={s.dots}>
              {CAROUSEL_IMAGES.map((_, i) => (
                <TouchableOpacity key={i} onPress={() => setActiveImg(i)}>
                  <View style={[s.dot, i === activeImg && s.dotActive]} />
                </TouchableOpacity>
              ))}
            </View>
            <Text style={s.carouselDate}>Updated Feb 2026</Text>
          </View>
          {/* Edit button */}
          <TouchableOpacity style={s.editBtn} activeOpacity={0.8}>
            <Text style={s.editBtnText}>Edit</Text>
            <PencilIcon />
          </TouchableOpacity>
        </View>

        {/* Location + Rent + Status */}
        <View style={s.infoRow}>
          <View style={s.infoLeft}>
            <View style={s.infoLine}>
              <MapPinIcon />
              <Text style={s.infoText}>Flat 402 · Whitefield, Bengaluru</Text>
            </View>
            <View style={s.infoLine}>
              <MoneyIcon />
              <Text style={s.infoText}>₹28,000/month</Text>
            </View>
          </View>
          <View style={s.leaseBadge}>
            <Text style={s.leaseText}>Lease Active</Text>
          </View>
        </View>

        {/* Specs row */}
        <View style={s.specsRow}>
          <View style={s.specItem}>
            <View style={s.specIcon}><BedIcon /></View>
            <Text style={s.specText}><Text style={s.specBold}>2</Text>-Bed rooms</Text>
          </View>
          <View style={s.specItem}>
            <View style={s.specIcon}><BathIcon /></View>
            <Text style={s.specText}><Text style={s.specBold}>2</Text>-Bath rooms</Text>
          </View>
          <View style={s.specItem}>
            <View style={s.specIcon}><ElevatorIcon /></View>
            <Text style={s.specText}>Lift available</Text>
          </View>
        </View>

        {/* Tenant Card */}
        <View style={s.navyCard}>
          <View style={s.cardTitleRow}>
            <View style={s.cardIconWrap}><UsersIcon /></View>
            <Text style={s.cardTitle}>Current Tenant</Text>
          </View>
          <View style={s.tenantInfoRow}>
            <View style={s.tenantAvatarLg} />
            <View style={s.tenantDetails}>
              <Text style={s.tenantName}>Harish Rao</Text>
              <Text style={s.tenantSub}>Tenant since Jan 2024</Text>
            </View>
            <View style={s.tenantRentBox}>
              <Text style={s.tenantRentAmt}>₹28,000</Text>
              <Text style={s.tenantRentSub}>/month</Text>
            </View>
          </View>
          <View style={s.leaseRow}>
            <View style={s.leaseInfoItem}>
              <Text style={s.leaseInfoLabel}>Lease Start</Text>
              <Text style={s.leaseInfoVal}>Jan 15, 2024</Text>
            </View>
            <View style={s.leaseInfoDivider} />
            <View style={s.leaseInfoItem}>
              <Text style={s.leaseInfoLabel}>Lease End</Text>
              <Text style={s.leaseInfoVal}>Jan 14, 2025</Text>
            </View>
            <View style={s.leaseInfoDivider} />
            <View style={s.leaseInfoItem}>
              <Text style={s.leaseInfoLabel}>Status</Text>
              <Text style={[s.leaseInfoVal, { color: "#68d391" }]}>Renewed</Text>
            </View>
          </View>
        </View>

        {/* Maintenance Card */}
        <View style={s.navyCard}>
          <View style={s.cardTitleRow}>
            <View style={s.cardIconWrap}><WrenchIcon /></View>
            <Text style={s.cardTitle}>Maintenance Requests</Text>
            <View style={s.badgeCount}><Text style={s.badgeCountText}>2</Text></View>
          </View>
          <MaintenanceItem label="AC not cooling" date="Mar 10, 2025" status="Open" />
          <MaintenanceItem label="Leaky kitchen faucet" date="Feb 28, 2025" status="Resolved" />
        </View>

        {/* Analytics Card */}
        <View style={s.navyCard}>
          <View style={s.cardTitleRow}>
            <View style={s.cardIconWrap}><TrendUpIcon /></View>
            <Text style={s.cardTitle}>Rental Analytics</Text>
          </View>
          <View style={s.analyticsRow}>
            <AnalyticsTile label="Monthly Revenue" value="₹28,000" change="+2%" />
            <AnalyticsTile label="Occupancy Rate" value="100%" change="Occupied" />
            <AnalyticsTile label="Total ROI" value="12%" change="Since start" />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function MaintenanceItem({ label, date, status }: { label: string; date: string; status: string }) {
  const isOpen = status === "Open";
  return (
    <View style={s.maintenanceItem}>
      <View style={s.maintenanceLeft}>
        <View style={[s.maintenanceDot, { backgroundColor: isOpen ? "#fc8181" : "#68d391" }]} />
        <View>
          <Text style={s.maintenanceLabel}>{label}</Text>
          <Text style={s.maintenanceDate}>{date}</Text>
        </View>
      </View>
      <View style={[s.maintenanceBadge, { borderColor: isOpen ? "#fc8181" : "#68d391" }]}>
        <Text style={[s.maintenanceBadgeText, { color: isOpen ? "#fc8181" : "#68d391" }]}>{status}</Text>
      </View>
    </View>
  );
}

function AnalyticsTile({ label, value, change }: { label: string; value: string; change: string }) {
  return (
    <View style={s.analyticsTile}>
      <Text style={s.analyticsTileVal}>{value}</Text>
      <Text style={s.analyticsTileLabel}>{label}</Text>
      <Text style={s.analyticsTileChange}>{change}</Text>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#e9e9e9" },

  topHeader: { backgroundColor: "#ffffff" },

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
    color: "#030303",
    letterSpacing: -0.3,
  },
  statusIcons: { flexDirection: "row", alignItems: "center", gap: 8 },

  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 14,
  },
  navLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  backBtn: { padding: 2 },
  navTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    color: "#1a365d",
  },

  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 16,
  },

  // Carousel
  carouselWrap: {
    borderRadius: 24,
    height: 240,
    overflow: "hidden",
    position: "relative",
  },
  carouselImage: { width: "100%", height: "100%" },
  carouselBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingBottom: 10,
  },
  carouselLabel: {
    fontFamily: "Inter_400Regular",
    fontSize: 10,
    color: "#2d3748",
  },
  dots: { flexDirection: "row", alignItems: "center", gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#718096" },
  dotActive: { width: 12, height: 12, borderRadius: 6, backgroundColor: "#1a365d" },
  carouselDate: {
    fontFamily: "Inter_400Regular",
    fontSize: 10,
    color: "#2d3748",
  },
  editBtn: {
    position: "absolute",
    top: 12,
    right: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderWidth: 1,
    borderColor: "#718096",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "rgba(255,255,255,0.85)",
  },
  editBtnText: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#1a365d",
  },

  // Info row
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  infoLeft: { gap: 8 },
  infoLine: { flexDirection: "row", alignItems: "center", gap: 4 },
  infoText: {
    fontFamily: "Inter_500Medium",
    fontSize: 14,
    color: "#111",
  },
  leaseBadge: {
    borderWidth: 1,
    borderColor: "#38a169",
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  leaseText: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#38a169",
  },

  // Specs
  specsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 12,
  },
  specItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  specIcon: {
    backgroundColor: "#edf2f7",
    borderRadius: 24,
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  specText: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#111",
    letterSpacing: -0.3,
  },
  specBold: {
    fontFamily: "Inter_500Medium",
    fontSize: 14,
    color: "#111",
  },

  // Navy cards
  navyCard: {
    backgroundColor: "#1a365d",
    borderRadius: 16,
    padding: 14,
    gap: 12,
  },
  cardTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  cardIconWrap: {
    backgroundColor: "#00122c",
    borderRadius: 10,
    padding: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    color: "#f8f8f8",
    flex: 1,
  },
  badgeCount: {
    backgroundColor: "#fc8181",
    borderRadius: 99,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeCountText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    color: "#fff",
  },

  // Tenant
  tenantInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  tenantAvatarLg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#d3d3d3",
  },
  tenantDetails: { flex: 1 },
  tenantName: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
    color: "#f8f8f8",
  },
  tenantSub: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#a0aec0",
    marginTop: 2,
  },
  tenantRentBox: { alignItems: "flex-end" },
  tenantRentAmt: {
    fontFamily: "Inter_700Bold",
    fontSize: 15,
    color: "#ffcb29",
  },
  tenantRentSub: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: "#a0aec0",
  },
  leaseRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#00122c",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  leaseInfoItem: { alignItems: "center", flex: 1 },
  leaseInfoDivider: { width: 1, height: 28, backgroundColor: "#2d4a7a" },
  leaseInfoLabel: {
    fontFamily: "Inter_400Regular",
    fontSize: 10,
    color: "#a0aec0",
    marginBottom: 3,
  },
  leaseInfoVal: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
    color: "#f8f8f8",
  },

  // Maintenance
  maintenanceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#00122c",
    borderRadius: 10,
    padding: 10,
  },
  maintenanceLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  maintenanceDot: { width: 8, height: 8, borderRadius: 4 },
  maintenanceLabel: {
    fontFamily: "Inter_500Medium",
    fontSize: 13,
    color: "#f8f8f8",
  },
  maintenanceDate: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: "#a0aec0",
    marginTop: 2,
  },
  maintenanceBadge: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  maintenanceBadgeText: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
  },

  // Analytics
  analyticsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  analyticsTile: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#00122c",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 3,
  },
  analyticsTileVal: {
    fontFamily: "Inter_700Bold",
    fontSize: 14,
    color: "#ffcb29",
  },
  analyticsTileLabel: {
    fontFamily: "Inter_400Regular",
    fontSize: 10,
    color: "#a0aec0",
    textAlign: "center",
    marginTop: 4,
  },
  analyticsTileChange: {
    fontFamily: "Inter_500Medium",
    fontSize: 10,
    color: "#68d391",
    marginTop: 3,
  },
});
