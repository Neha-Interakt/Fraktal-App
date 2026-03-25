import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Dimensions,
  Image,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path, Circle, Rect, Line, Polyline, G, Defs, LinearGradient, Stop } from "react-native-svg";
import Colors from "@/constants/colors";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const isWeb = Platform.OS === "web";

// ── SVG Icons ──────────────────────────────────────────────────────────────────

function BellIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
        stroke={Colors.primary}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.73 21C13.5542 21.3031 13.3018 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
        stroke={Colors.primary}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function BuildingIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Path
        d="M17.5 17.5H2.5V4.16667C2.5 3.72464 2.67559 3.30072 2.98816 2.98816C3.30072 2.67559 3.72464 2.5 4.16667 2.5H12.5C12.942 2.5 13.366 2.67559 13.6785 2.98816C13.9911 3.30072 14.1667 3.72464 14.1667 4.16667V8.33333"
        stroke={Colors.secondary}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M5.83334 6.66667H10.8333" stroke={Colors.secondary} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M5.83334 10H8.33334" stroke={Colors.secondary} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M5.83334 13.3333H8.33334" stroke={Colors.secondary} strokeWidth={1.5} strokeLinecap="round" />
      <Path
        d="M14.1667 11.6667H11.6667C11.2246 11.6667 10.8007 11.8423 10.4881 12.1548C10.1756 12.4674 10 12.8913 10 13.3333V17.5H15.8333V13.3333C15.8333 12.8913 15.6577 12.4674 15.3452 12.1548C15.0326 11.8423 14.6087 11.6667 14.1667 11.6667Z"
        stroke={Colors.secondary}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function TrendUpIcon({ color = Colors.green }: { color?: string }) {
  return (
    <Svg width={14} height={14} viewBox="0 0 14 14" fill="none">
      <Path
        d="M1.16666 10.5L5.25 6.41667L7.58333 8.75L12.8333 3.5"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.33334 3.5H12.8333V7"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function PlusCircleIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={10} stroke={Colors.primary} strokeWidth={1.5} />
      <Path d="M12 8V16" stroke={Colors.primary} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M8 12H16" stroke={Colors.primary} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

function ChatIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
        stroke={Colors.primary}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function FilesIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
        stroke={Colors.primary}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M14 2V8H20" stroke={Colors.primary} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M16 13H8" stroke={Colors.primary} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M16 17H8" stroke={Colors.primary} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M10 9H8" stroke={Colors.primary} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

function StarIcon({ filled = false }: { filled?: boolean }) {
  return (
    <Svg width={12} height={12} viewBox="0 0 12 12" fill="none">
      <Path
        d="M6 1L7.545 4.13L11 4.635L8.5 7.07L9.09 10.51L6 8.885L2.91 10.51L3.5 7.07L1 4.635L4.455 4.13L6 1Z"
        fill={filled ? Colors.secondary : "none"}
        stroke={Colors.secondary}
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function KeyIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Circle cx={6} cy={6} r={4} stroke={Colors.primary} strokeWidth={1.2} />
      <Path d="M10 10L14 14" stroke={Colors.primary} strokeWidth={1.2} strokeLinecap="round" />
    </Svg>
  );
}

function ClockIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Circle cx={8} cy={8} r={6} stroke={Colors.primary} strokeWidth={1.2} />
      <Path d="M8 5V8L10 10" stroke={Colors.primary} strokeWidth={1.2} strokeLinecap="round" />
    </Svg>
  );
}

// ── Navbar ─────────────────────────────────────────────────────────────────────

function Navbar() {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.navbar, { paddingTop: insets.top + 8 }]}>
      {/* Left: Logo + Text */}
      <View style={styles.navLeft}>
        <View style={styles.logoBox}>
          <BuildingIcon />
        </View>
        <View style={styles.navTexts}>
          <Text style={styles.navWelcome}>Welcome back,</Text>
          <Text style={styles.navName}>Aditya!</Text>
        </View>
      </View>

      {/* Right: Properties badge + Bell + Avatar */}
      <View style={styles.navRight}>
        <View style={styles.propertiesBadge}>
          <Text style={styles.propertiesLabel}>Total Properties:</Text>
          <Text style={styles.propertiesCount}>  08</Text>
        </View>
        <TouchableOpacity style={styles.bellBtn} activeOpacity={0.7}>
          <BellIcon />
        </TouchableOpacity>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>A</Text>
        </View>
      </View>
    </View>
  );
}

// ── Analytics Cards ────────────────────────────────────────────────────────────

function AnalyticsCard({
  title,
  value,
  change,
  changeLabel,
  isPositive,
  isLast,
}: {
  title: string;
  value: string;
  change: string;
  changeLabel: string;
  isPositive: boolean;
  isLast?: boolean;
}) {
  return (
    <View style={[styles.analyticsCard, isLast && styles.analyticsCardLast]}>
      <Text style={styles.analyticsTitle}>{title}</Text>
      <Text style={styles.analyticsValue}>{value}</Text>
      <View style={styles.analyticsFooter}>
        <View style={[styles.changePill, { backgroundColor: isPositive ? "#E8F5E9" : "#FFF3E0" }]}>
          <TrendUpIcon color={isPositive ? Colors.green : Colors.secondary} />
          <Text style={[styles.changeText, { color: isPositive ? Colors.green : Colors.secondary }]}>
            {change}
          </Text>
        </View>
        <Text style={styles.changeLabel}>{changeLabel}</Text>
      </View>
    </View>
  );
}

// ── Quick Actions ──────────────────────────────────────────────────────────────

function QuickActionBtn({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <TouchableOpacity style={styles.quickActionBtn} activeOpacity={0.75}>
      <View style={styles.quickActionIcon}>{icon}</View>
      <Text style={styles.quickActionLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

// ── Property Card ──────────────────────────────────────────────────────────────

function PropertyCard({
  name,
  tenant,
  rent,
  rating,
  image,
}: {
  name: string;
  tenant: string;
  rent: string;
  rating: string;
  image: string;
}) {
  return (
    <View style={styles.propertyCard}>
      {/* Colored image placeholder */}
      <View style={styles.propertyImageBox}>
        <View style={[styles.propertyImage, { backgroundColor: "#c5d8e8" }]}>
          <Svg width={40} height={40} viewBox="0 0 40 40" fill="none">
            <Rect x={5} y={15} width={30} height={20} rx={2} fill="#1a365d" opacity={0.5} />
            <Path d="M2 15L20 4L38 15" stroke="#1a365d" strokeWidth={2} />
            <Rect x={14} y={25} width={12} height={10} fill="#1a365d" opacity={0.7} />
          </Svg>
        </View>
        <View style={styles.ratingBadge}>
          <StarIcon filled />
          <Text style={styles.ratingText}>{rating}</Text>
        </View>
      </View>

      <View style={styles.propertyInfo}>
        <Text style={styles.propertyName} numberOfLines={1}>{name}</Text>
        <Text style={styles.propertyTenant} numberOfLines={1}>{tenant}</Text>
        <View style={styles.propertyFooter}>
          <Text style={styles.propertyRent}>{rent}</Text>
          <Text style={styles.propertyRentSuffix}>/mo</Text>
        </View>
      </View>
    </View>
  );
}

// ── Activity Row ───────────────────────────────────────────────────────────────

function ActivityRow({
  type,
  title,
  property,
  tenant,
  amount,
  time,
}: {
  type: "payment" | "lease";
  title: string;
  property: string;
  tenant?: string;
  amount: string;
  time: string;
}) {
  return (
    <View style={styles.activityRow}>
      <View style={styles.activityIconBox}>
        {type === "payment" ? <KeyIcon /> : <ClockIcon />}
      </View>
      <View style={styles.activityBody}>
        <View style={styles.activityTopRow}>
          <Text style={styles.activityTitle}>{title}</Text>
          <Text style={styles.activityAmount}>{amount}</Text>
        </View>
        <Text style={styles.activitySub} numberOfLines={1}>
          {property}{tenant ? ` · ${tenant}` : ""}
        </Text>
        <Text style={styles.activityTime}>{time}</Text>
      </View>
    </View>
  );
}

// ── Main Screen ────────────────────────────────────────────────────────────────

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const bottomPad = isWeb ? 90 : insets.bottom + 80;

  return (
    <View style={styles.screen}>
      <Navbar />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: bottomPad }]}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Analytics Section ── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Analytics</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.analyticsScroll}
          contentContainerStyle={styles.analyticsScrollContent}
        >
          <AnalyticsCard
            title="Monthly Revenue"
            value="₹1,28,000"
            change="+10.5%"
            changeLabel="vs last month"
            isPositive
          />
          <AnalyticsCard
            title="Occupancy Rate"
            value="94%"
            change="+3.5%"
            changeLabel="vs last month"
            isPositive
          />
          <AnalyticsCard
            title="Total ROI"
            value="12%"
            change="+2.1%"
            changeLabel="Since inception"
            isPositive
            isLast
          />
        </ScrollView>

        {/* ── Quick Actions ── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
        </View>
        <View style={styles.quickActionsRow}>
          <QuickActionBtn icon={<PlusCircleIcon />} label="Add Property" />
          <QuickActionBtn icon={<ChatIcon />} label="Chats" />
          <QuickActionBtn icon={<FilesIcon />} label="Documents" />
        </View>

        {/* ── Properties ── */}
        <View style={[styles.sectionHeader, styles.sectionHeaderSpaced]}>
          <Text style={styles.sectionTitle}>Properties</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.propertiesScrollContent}
        >
          <PropertyCard
            name="Prestige Lakeside Habitat"
            tenant="Ramesh Kumar"
            rent="₹28,000"
            rating="4.5"
            image=""
          />
          <PropertyCard
            name="Sunset Apartments #402"
            tenant="Harish Rao"
            rent="₹28,000"
            rating="4.5"
            image=""
          />
        </ScrollView>

        {/* ── Recent Activities ── */}
        <View style={[styles.sectionHeader, styles.sectionHeaderSpaced]}>
          <Text style={styles.sectionTitle}>Recent Activities</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.activitiesCard}>
          <ActivityRow
            type="payment"
            title="Rent Payment Received"
            property="Sunset Apartments #402"
            tenant="Harish Rao"
            amount="₹28,000"
            time="2h ago"
          />
          <View style={styles.activityDivider} />
          <ActivityRow
            type="lease"
            title="Lease Renewal Pending"
            property="Ocean View Villa"
            amount="₹45,000"
            time="5h ago"
          />
        </View>
      </ScrollView>
    </View>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.bg,
  },

  // Navbar
  navbar: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 4,
    zIndex: 10,
  },
  navLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logoBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#EEF4FA",
    alignItems: "center",
    justifyContent: "center",
  },
  navTexts: {
    gap: 1,
  },
  navWelcome: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#666",
    lineHeight: 16,
  },
  navName: {
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    color: Colors.primaryDark,
    lineHeight: 20,
  },
  navRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  propertiesBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.bg,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  propertiesLabel: {
    fontFamily: "Inter_400Regular",
    fontSize: 10,
    color: Colors.primary,
  },
  propertiesCount: {
    fontFamily: "Inter_700Bold",
    fontSize: 10,
    color: Colors.primary,
  },
  bellBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.bg,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontFamily: "Inter_700Bold",
    fontSize: 14,
    color: "#fff",
  },

  // Scroll
  scroll: { flex: 1 },
  scrollContent: { paddingTop: 8 },

  // Section headers
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
  },
  sectionHeaderSpaced: {
    paddingTop: 24,
  },
  sectionTitle: {
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    color: Colors.primaryDark,
  },
  seeAll: {
    fontFamily: "Inter_500Medium",
    fontSize: 13,
    color: Colors.secondary,
  },

  // Analytics Cards
  analyticsScroll: {},
  analyticsScrollContent: {
    paddingLeft: 16,
    paddingRight: 16,
    gap: 12,
  },
  analyticsCard: {
    width: 160,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    marginRight: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  analyticsCardLast: { marginRight: 0 },
  analyticsTitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: "#888",
    marginBottom: 6,
  },
  analyticsValue: {
    fontFamily: "Inter_700Bold",
    fontSize: 20,
    color: Colors.primaryDark,
    marginBottom: 8,
  },
  analyticsFooter: {
    flexDirection: "column",
    gap: 4,
  },
  changePill: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    paddingHorizontal: 7,
    paddingVertical: 3,
    gap: 4,
    alignSelf: "flex-start",
  },
  changeText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
  },
  changeLabel: {
    fontFamily: "Inter_400Regular",
    fontSize: 10,
    color: "#999",
  },

  // Quick Actions
  quickActionsRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    gap: 10,
  },
  quickActionBtn: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  quickActionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.bg,
    alignItems: "center",
    justifyContent: "center",
  },
  quickActionLabel: {
    fontFamily: "Inter_500Medium",
    fontSize: 11,
    color: Colors.primaryDark,
    textAlign: "center",
  },

  // Properties
  propertiesScrollContent: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  propertyCard: {
    width: 180,
    backgroundColor: "#fff",
    borderRadius: 16,
    marginRight: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  propertyImageBox: {
    position: "relative",
  },
  propertyImage: {
    width: "100%",
    height: 110,
    alignItems: "center",
    justifyContent: "center",
  },
  ratingBadge: {
    position: "absolute",
    bottom: 8,
    right: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 7,
    paddingVertical: 3,
    gap: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  ratingText: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 11,
    color: Colors.black400,
  },
  propertyInfo: {
    padding: 12,
    gap: 3,
  },
  propertyName: {
    fontFamily: "Inter_700Bold",
    fontSize: 12,
    color: Colors.primaryDark,
  },
  propertyTenant: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: "#888",
  },
  propertyFooter: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 4,
  },
  propertyRent: {
    fontFamily: "Inter_700Bold",
    fontSize: 14,
    color: Colors.primary,
  },
  propertyRentSuffix: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: "#999",
    marginLeft: 2,
  },

  // Activities
  activitiesCard: {
    marginHorizontal: 16,
    backgroundColor: Colors.primary,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  activityRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 14,
    gap: 12,
  },
  activityIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  activityBody: {
    flex: 1,
    gap: 2,
  },
  activityTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  activityTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 13,
    color: "#fff",
    flex: 1,
    marginRight: 8,
  },
  activityAmount: {
    fontFamily: "Inter_700Bold",
    fontSize: 13,
    color: Colors.gold,
  },
  activitySub: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: "rgba(255,255,255,0.6)",
  },
  activityTime: {
    fontFamily: "Inter_400Regular",
    fontSize: 10,
    color: "rgba(255,255,255,0.4)",
    marginTop: 2,
  },
  activityDivider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.12)",
    marginHorizontal: 14,
  },
});
