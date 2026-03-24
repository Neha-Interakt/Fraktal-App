import { BuildingIcon } from "./icons/BuildingIcon";
import { TrendUpIcon } from "./icons/TrendUpIcon";

export function AnalyticsCards() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        width: "100%",
      }}
    >
      {/* Monthly Revenue Card - Full width */}
      <div
        style={{
          borderRadius: "16px",
          background: "#1a365d",
          display: "flex",
          alignItems: "flex-start",
          gap: "16px",
          padding: "12px",
          width: "100%",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.1)",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            padding: "8px",
            flexShrink: 0,
          }}
        >
          <BuildingIcon />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <span
            style={{
              color: "#f8f8f8",
              fontFamily: "Inter",
              fontSize: "14px",
              fontWeight: 400,
              letterSpacing: "-0.3px",
              lineHeight: "normal",
            }}
          >
            Monthly Revenue
          </span>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span
              style={{
                color: "#f8f8f8",
                fontFamily: "Inter",
                fontSize: "20px",
                fontWeight: 700,
                lineHeight: "normal",
              }}
            >
              ₹1,28,000
            </span>
            <span
              style={{
                color: "#4ade80",
                fontFamily: "Inter",
                fontSize: "13px",
                fontWeight: 400,
                letterSpacing: "-0.3px",
              }}
            >
              +10.5% vs last month
            </span>
          </div>
        </div>
      </div>

      {/* Two smaller cards side by side */}
      <div style={{ display: "flex", gap: "12px", width: "100%" }}>
        {/* Occupancy Rate Card */}
        <div
          style={{
            background: "#1a365d",
            borderRadius: "16px",
            flex: 1,
            display: "flex",
            alignItems: "flex-start",
            gap: "8px",
            padding: "12px",
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.1)",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              padding: "8px",
              flexShrink: 0,
            }}
          >
            <TrendUpIcon />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <span
              style={{
                color: "#f8f8f8",
                fontFamily: "Inter",
                fontSize: "13px",
                fontWeight: 400,
                letterSpacing: "-0.3px",
                lineHeight: "normal",
              }}
            >
              Occupancy rate
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <span
                  style={{
                    color: "#f8f8f8",
                    fontFamily: "Inter",
                    fontSize: "18px",
                    fontWeight: 700,
                    lineHeight: "normal",
                  }}
                >
                  94%
                </span>
              </div>
              <span
                style={{
                  color: "#f8f8f8",
                  fontFamily: "Inter",
                  fontSize: "10px",
                  fontWeight: 500,
                  lineHeight: "normal",
                }}
              >
                +3.5%
              </span>
            </div>
          </div>
        </div>

        {/* Total ROI Card */}
        <div
          style={{
            background: "#1a365d",
            borderRadius: "16px",
            flex: 1,
            display: "flex",
            alignItems: "flex-start",
            gap: "8px",
            padding: "12px",
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.1)",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              padding: "8px",
              flexShrink: 0,
            }}
          >
            <TrendUpIcon />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <span
              style={{
                color: "#f8f8f8",
                fontFamily: "Inter",
                fontSize: "13px",
                fontWeight: 400,
                letterSpacing: "-0.3px",
                lineHeight: "normal",
              }}
            >
              Total ROI
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <span
                  style={{
                    color: "#f8f8f8",
                    fontFamily: "Inter",
                    fontSize: "18px",
                    fontWeight: 700,
                    lineHeight: "normal",
                  }}
                >
                  12%
                </span>
              </div>
              <span
                style={{
                  color: "#f8f8f8",
                  fontFamily: "Inter",
                  fontSize: "10px",
                  fontWeight: 500,
                  lineHeight: "normal",
                }}
              >
                Since inception
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
