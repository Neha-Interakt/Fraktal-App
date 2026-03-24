import { PlusCircleIcon } from "./icons/PlusCircleIcon";
import { ChatIcon } from "./icons/ChatIcon";
import { FilesIcon } from "./icons/FilesIcon";

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
}

function ActionButton({ icon, label }: ActionButtonProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "6px",
        padding: "8px",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          borderRadius: "24px",
          background: "linear-gradient(180deg, #1a365d 0%, #00122c 100%)",
          display: "flex",
          alignItems: "center",
          padding: "12px",
        }}
      >
        {icon}
      </div>
      <span
        style={{
          color: "#e9e9e9",
          fontFamily: "Inter",
          fontSize: "12px",
          fontWeight: 500,
          lineHeight: "normal",
          textAlign: "center",
        }}
      >
        {label}
      </span>
    </div>
  );
}

export function QuickActions() {
  return (
    <div
      style={{
        borderRadius: "16px",
        background: "#1a365d",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        padding: "8px",
      }}
    >
      <ActionButton icon={<PlusCircleIcon />} label="Add property" />
      <ActionButton icon={<ChatIcon />} label="Chats" />
      <ActionButton icon={<FilesIcon />} label="Documents" />
    </div>
  );
}
