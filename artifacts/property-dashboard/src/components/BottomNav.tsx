import { HomeIcon, BuildingsNavIcon, DollarIcon, WrenchIcon, UserIcon } from "./icons/NavIcons";

interface NavItemProps {
  icon: React.ReactNode;
  label?: string;
  active?: boolean;
}

function NavItem({ icon, label, active }: NavItemProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "4px",
        padding: active ? "8px" : "10px",
        borderRadius: "32px",
        cursor: "pointer",
        background: active ? "rgba(255,255,255,0.1)" : "transparent",
      }}
    >
      {icon}
      {label && (
        <span
          style={{
            color: "#c9a227",
            fontFamily: "Inter",
            fontSize: "10px",
            fontWeight: 500,
            lineHeight: "normal",
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}

export function BottomNav() {
  return (
    <div
      style={{
        borderRadius: "32px",
        background: "linear-gradient(180deg, #1a365d 0%, #00122c 100%)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        padding: "8px 16px",
      }}
    >
      <NavItem icon={<HomeIcon active />} label="Home" active />
      <NavItem icon={<BuildingsNavIcon />} />
      <NavItem icon={<DollarIcon />} />
      <NavItem icon={<WrenchIcon />} />
      <NavItem icon={<UserIcon />} />
    </div>
  );
}
