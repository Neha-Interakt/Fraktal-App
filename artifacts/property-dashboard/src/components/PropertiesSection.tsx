interface PropertyCardProps {
  name: string;
  tenant: string;
  rent: string;
  rating: number;
  imageColor: string;
  avatarInitial: string;
}

function PropertyCard({ name, tenant, rent, rating, imageColor, avatarInitial }: PropertyCardProps) {
  return (
    <div
      style={{
        background: "#fbfbfb",
        borderRadius: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        width: "195px",
        flexShrink: 0,
        padding: "8px",
        height: "180px",
        overflow: "hidden",
      }}
    >
      {/* Property image */}
      <div
        style={{
          borderRadius: "12px",
          flex: "1 0 0",
          background: imageColor,
          overflow: "hidden",
          minHeight: "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path d="M21.4072 10.7803L12.5322 1.90531C12.3916 1.76484 12.1999 1.68567 12.0003 1.68567C11.8007 1.68567 11.609 1.76484 11.4684 1.90531L2.59338 10.7803C2.51016 10.8612 2.44483 10.9584 2.40152 11.0657C2.35821 11.173 2.33784 11.288 2.34165 11.4034C2.34965 11.6363 2.44932 11.8568 2.61958 12.017C2.78985 12.1771 3.01665 12.263 3.25026 12.255L4.50026 12.2203V20.25C4.50026 20.6478 4.6583 21.0294 4.9396 21.3107C5.2209 21.592 5.60243 21.75 6.00026 21.75H9.00026C9.19917 21.75 9.38994 21.671 9.53059 21.5303C9.67124 21.3897 9.75026 21.1989 9.75026 21V16.5H14.2503V21C14.2503 21.1989 14.3293 21.3897 14.4699 21.5303C14.6106 21.671 14.8014 21.75 15.0003 21.75H18.0003C18.3981 21.75 18.7796 21.592 19.0609 21.3107C19.3422 21.0294 19.5003 20.6478 19.5003 20.25V12.2203L20.7503 12.255C20.9839 12.263 21.2107 12.1771 21.381 12.017C21.5512 11.8568 21.6509 11.6363 21.6589 11.4034C21.6628 11.288 21.6424 11.173 21.5991 11.0657C21.5558 10.9584 21.4904 10.8612 21.4072 10.7803Z" fill="rgba(255,255,255,0.5)"/>
        </svg>
      </div>

      {/* Property info */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1, minWidth: 0 }}>
          <span
            style={{
              color: "#323232",
              fontFamily: "Inter",
              fontSize: "12px",
              fontWeight: 500,
              lineHeight: "normal",
              display: "block",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {name}
          </span>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  background: "linear-gradient(180deg, #1a365d 0%, #00122c 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span style={{ color: "#f8f8f8", fontSize: "10px", fontWeight: 600, fontFamily: "Inter" }}>
                  {avatarInitial}
                </span>
              </div>
              <span
                style={{
                  color: "#323232",
                  fontFamily: "Inter",
                  fontSize: "11px",
                  fontWeight: 400,
                  letterSpacing: "-0.3px",
                  lineHeight: "normal",
                }}
              >
                {tenant}
              </span>
            </div>
          </div>
          <span
            style={{
              color: "#323232",
              fontFamily: "Inter",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "-0.3px",
              lineHeight: "normal",
            }}
          >
            {rent}
          </span>
        </div>

        {/* Rating */}
        <div
          style={{
            background: "#f5f5f5",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            padding: "2px 5px",
            gap: "2px",
            flexShrink: 0,
            marginLeft: "6px",
          }}
        >
          <span style={{ color: "#f0b100", fontSize: "11px" }}>★</span>
          <span style={{ color: "#0a0a0a", fontFamily: "Inter", fontSize: "10px", fontWeight: 500 }}>
            {rating}
          </span>
        </div>
      </div>
    </div>
  );
}

const properties: PropertyCardProps[] = [
  {
    name: "Prestige Lakeside Habitat",
    tenant: "Ramesh Kumar",
    rent: "₹28,000/mo",
    rating: 4.5,
    imageColor: "linear-gradient(135deg, #1a365d 0%, #2d6a9f 100%)",
    avatarInitial: "R",
  },
  {
    name: "Sunset Apartments #402",
    tenant: "Harish Rao",
    rent: "₹28,000/mo",
    rating: 4.5,
    imageColor: "linear-gradient(135deg, #c9a227 0%, #8b6914 100%)",
    avatarInitial: "H",
  },
  {
    name: "Ocean View Villa",
    tenant: "Priya Sharma",
    rent: "₹45,000/mo",
    rating: 4.8,
    imageColor: "linear-gradient(135deg, #2d6a9f 0%, #1a365d 100%)",
    avatarInitial: "P",
  },
];

export function PropertiesSection() {
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
          Properties
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

      {/* Horizontally scrollable property cards */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          overflowX: "auto",
          paddingBottom: "4px",
          scrollbarWidth: "none",
        }}
        className="no-scrollbar"
      >
        {properties.map((prop, i) => (
          <PropertyCard key={i} {...prop} />
        ))}
      </div>
    </div>
  );
}
