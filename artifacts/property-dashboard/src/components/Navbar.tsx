import { BellIcon } from "./icons/BellIcon";

export function Navbar() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col gap-2">
          <span
            style={{
              color: "#0c0c0c",
              fontFamily: "Inter",
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "normal",
            }}
          >
            Welcome back, Aditya!
          </span>
          <div
            style={{
              background: "#f8f8f8",
              borderRadius: "12px",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "4px 8px",
            }}
          >
            <span
              style={{
                color: "#0c0c0c",
                fontFamily: "Roboto",
                fontSize: "16px",
                fontWeight: 500,
                letterSpacing: "-0.3px",
                lineHeight: "normal",
              }}
            >
              Total Properties: 08
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            style={{ width: 24, height: 24, background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            <BellIcon />
          </button>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "linear-gradient(180deg, #1a365d 0%, #00122c 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <span style={{ color: "#f8f8f8", fontSize: "14px", fontWeight: 600, fontFamily: "Inter" }}>A</span>
          </div>
        </div>
      </div>
    </div>
  );
}
