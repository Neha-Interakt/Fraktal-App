interface ActivityItemProps {
  icon: React.ReactNode;
  title: string;
  property: string;
  amount: string;
  person: string;
  time: string;
  iconBg: string;
}

function ActivityItem({ icon, title, property, amount, person, time, iconBg }: ActivityItemProps) {
  return (
    <div
      style={{
        background: "#1a365d",
        borderRadius: "16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100%",
        padding: "17px 17px 12px",
        gap: "8px",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", width: "100%" }}>
        {/* Icon */}
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "14px",
            background: iconBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {icon}
        </div>

        {/* Content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <span
                style={{
                  color: "#e9e9e9",
                  fontFamily: "Inter",
                  fontSize: "14px",
                  fontWeight: 600,
                  lineHeight: "20px",
                }}
              >
                {title}
              </span>
              <span
                style={{
                  color: "#e9e9e9",
                  fontFamily: "Inter",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "20px",
                }}
              >
                {property}
              </span>
            </div>
            <span
              style={{
                color: "#e9e9e9",
                fontFamily: "Inter",
                fontSize: "14px",
                fontWeight: 700,
                lineHeight: "24px",
                flexShrink: 0,
              }}
            >
              {amount}
            </span>
          </div>

          {/* Footer */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  background: "linear-gradient(180deg, #1a365d 0%, #00122c 100%)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ color: "#f8f8f8", fontSize: "8px", fontWeight: 600 }}>
                  {person.charAt(0)}
                </span>
              </div>
              <span
                style={{
                  color: "#f0f0f0",
                  fontFamily: "Inter",
                  fontSize: "12px",
                  fontWeight: 400,
                  lineHeight: "16px",
                }}
              >
                {person}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="#f0f0f0" strokeWidth="1.5"/>
                <path d="M12 7v5l3 3" stroke="#f0f0f0" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span
                style={{
                  color: "#f0f0f0",
                  fontFamily: "Inter",
                  fontSize: "12px",
                  fontWeight: 400,
                  lineHeight: "16px",
                }}
              >
                {time}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const activities = [
  {
    title: "Rent Payment Received",
    property: "Sunset Apartments #402",
    amount: "₹28,000",
    person: "Harish Rao",
    time: "2 hours ago",
    iconBg: "rgba(56,161,105,0.15)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8" stroke="#38A169" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M6.5 10l2.5 2.5 5-5" stroke="#38A169" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Lease Renewal Pending",
    property: "Ocean View Villa",
    amount: "₹45,000",
    person: "Harish Rao",
    time: "5 hours ago",
    iconBg: "rgba(240,177,0,0.15)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8" stroke="#F0B100" strokeWidth="1.5"/>
        <path d="M10 6v4l2.5 2.5" stroke="#F0B100" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export function RecentActivities() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          width: "100%",
        }}
      >
        <span
          style={{
            color: "#060606",
            fontFamily: "Inter",
            fontSize: "16px",
            fontWeight: 500,
            letterSpacing: "-0.3px",
            lineHeight: "normal",
          }}
        >
          Recent Activities
        </span>
        <span
          style={{
            color: "#060606",
            fontFamily: "Inter",
            fontSize: "12px",
            fontWeight: 400,
            textDecoration: "underline",
            cursor: "pointer",
            letterSpacing: "-0.3px",
          }}
        >
          See more
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {activities.map((activity, i) => (
          <ActivityItem key={i} {...activity} />
        ))}
      </div>
    </div>
  );
}
