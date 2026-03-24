import { Navbar } from "../components/Navbar";
import { AnalyticsCards } from "../components/AnalyticsCards";
import { QuickActions } from "../components/QuickActions";
import { PropertiesSection } from "../components/PropertiesSection";
import { RecentActivities } from "../components/RecentActivities";
import { BottomNav } from "../components/BottomNav";

export default function Dashboard() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#d0d0d0",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "0",
      }}
    >
      {/* Mobile phone frame container */}
      <div
        style={{
          width: "100%",
          maxWidth: "430px",
          background: "#e9e9e9",
          borderRadius: "32px",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          padding: "0",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Status Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 16px 8px",
          }}
        >
          <span
            style={{
              color: "#0c0c0c",
              fontFamily: "Inter",
              fontSize: "15px",
              fontWeight: 400,
              letterSpacing: "-0.3px",
              lineHeight: "normal",
            }}
          >
            9:41
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {/* Signal bars */}
            <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
              <rect x="0" y="4" width="3" height="8" rx="1" fill="#0c0c0c"/>
              <rect x="4.5" y="2.5" width="3" height="9.5" rx="1" fill="#0c0c0c"/>
              <rect x="9" y="0.5" width="3" height="11.5" rx="1" fill="#0c0c0c"/>
              <rect x="13.5" y="0.5" width="3" height="11.5" rx="1" fill="#0c0c0c" opacity="0.3"/>
            </svg>
            {/* WiFi */}
            <svg width="18" height="13" viewBox="0 0 18 13" fill="none">
              <path d="M9 11.5C9.55228 11.5 10 11.0523 10 10.5C10 9.94772 9.55228 9.5 9 9.5C8.44772 9.5 8 9.94772 8 10.5C8 11.0523 8.44772 11.5 9 11.5Z" fill="#0c0c0c"/>
              <path d="M1.5 5.5C3.15 3.63 5.45 2.5 9 2.5C12.55 2.5 14.85 3.63 16.5 5.5" stroke="#0c0c0c" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M4 8C5.22 6.65 6.9 5.5 9 5.5C11.1 5.5 12.78 6.65 14 8" stroke="#0c0c0c" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            {/* Battery */}
            <svg width="23" height="12" viewBox="0 0 23 12" fill="none">
              <rect x="0.5" y="0.5" width="19" height="11" rx="2.5" stroke="#0c0c0c" strokeOpacity="0.35"/>
              <rect x="2" y="2" width="14" height="8" rx="1.5" fill="#0c0c0c"/>
              <path d="M21 4.5v3a1.5 1.5 0 000-3z" fill="#0c0c0c" opacity="0.4"/>
            </svg>
          </div>
        </div>

        {/* Scrollable content */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "0 16px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            paddingBottom: "100px",
            scrollbarWidth: "none",
          }}
          className="no-scrollbar"
        >
          {/* Navbar / Header */}
          <Navbar />

          {/* Top Analytics Cards */}
          <AnalyticsCards />

          {/* Quick Actions */}
          <QuickActions />

          {/* Properties Section */}
          <PropertiesSection />

          {/* Recent Activities */}
          <RecentActivities />
        </div>

        {/* Bottom Navigation - fixed at bottom */}
        <div
          style={{
            position: "fixed",
            bottom: "0",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            maxWidth: "430px",
            padding: "12px 16px 16px",
            background: "transparent",
          }}
        >
          <BottomNav />
        </div>
      </div>
    </div>
  );
}
