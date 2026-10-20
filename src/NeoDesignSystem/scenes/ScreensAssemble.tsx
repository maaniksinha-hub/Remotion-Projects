import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, radius } from "../tokens";
import { interFont, crimsonProFont } from "../fonts";

const PHONE_W = 240;
const PHONE_H = 500;

const AiGlowDot: React.FC<{ frame: number; delay: number }> = ({ frame, delay }) => {
  const opacity = interpolate(frame, [delay, delay + 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pulse = 1 + Math.sin((frame - delay) / 8) * 0.15;
  return (
    <div
      style={{
        opacity,
        transform: `scale(${pulse})`,
        width: 10,
        height: 10,
        borderRadius: radius.full,
        backgroundColor: colors.fillAccent2Primary,
        boxShadow: `0 0 12px ${colors.fillAccent2Primary}`,
      }}
    />
  );
};

const PhoneShell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      width: PHONE_W,
      height: PHONE_H,
      borderRadius: radius.xl,
      border: `1px solid ${colors.strokeDefaultPrimary}`,
      backgroundColor: colors.fillNeutralPrimary,
      boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
    }}
  >
    {children}
  </div>
);

const WatchlistScreen: React.FC<{ frame: number }> = ({ frame }) => (
  <PhoneShell>
    <div style={{ padding: 16, fontFamily: interFont }}>
      <div style={{ fontWeight: 600, fontSize: 16, color: colors.textNeutralPrimary, marginBottom: 12 }}>
        Watchlist
      </div>
      {["RI", "HB", "IF"].map((abbr, i) => (
        <div
          key={abbr}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 0",
            borderBottom: `1px solid ${colors.strokeDefaultPrimaryLow}`,
            opacity: interpolate(frame, [20 + i * 10, 35 + i * 10], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: radius.full,
              backgroundColor: colors.fillAccent1Primary,
              color: colors.textInversePrimary,
              fontSize: 11,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {abbr}
          </div>
          <div style={{ flex: 1, fontSize: 13, fontWeight: 500, color: colors.textNeutralPrimary }}>Scrip {i + 1}</div>
          <div style={{ fontSize: 12, fontWeight: 500, color: colors.textPositivePrimary }}>+1.2%</div>
        </div>
      ))}
    </div>
  </PhoneShell>
);

const PortfolioScreen: React.FC<{ frame: number }> = ({ frame }) => {
  const cardOpacity = interpolate(frame, [20, 35], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <PhoneShell>
      <div style={{ padding: 16, fontFamily: interFont }}>
        <div style={{ fontWeight: 600, fontSize: 16, color: colors.textNeutralPrimary, marginBottom: 12 }}>
          Portfolio
        </div>
        <div
          style={{
            opacity: cardOpacity,
            borderRadius: radius.lg,
            border: `1px solid ${colors.strokeDefaultPrimary}`,
            padding: 14,
          }}
        >
          <div style={{ fontSize: 12, color: colors.textNeutralSecondary }}>Portfolio value</div>
          <div
            style={{
              fontFamily: crimsonProFont,
              fontSize: 26,
              fontWeight: 500,
              color: colors.textNeutralPrimary,
              marginTop: 4,
            }}
          >
            ₹1,24,500
          </div>
          <div style={{ fontSize: 12, fontWeight: 500, color: colors.textPositivePrimary, marginTop: 4 }}>
            +2.4% today
          </div>
        </div>
      </div>
    </PhoneShell>
  );
};

const ScripDetailScreen: React.FC<{ frame: number }> = ({ frame }) => {
  const noteOpacity = interpolate(frame, [30, 45], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <PhoneShell>
      <div style={{ padding: 16, fontFamily: interFont }}>
        <div style={{ fontWeight: 600, fontSize: 16, color: colors.textNeutralPrimary }}>RELIANCE</div>
        <div
          style={{
            fontFamily: crimsonProFont,
            fontSize: 32,
            fontWeight: 400,
            color: colors.textNeutralSecondary,
            marginTop: 4,
          }}
        >
          2,847.60
        </div>
        <div
          style={{
            opacity: noteOpacity,
            marginTop: 16,
            display: "flex",
            alignItems: "center",
            gap: 8,
            backgroundColor: colors.fillAccent2Tertiary,
            borderRadius: radius.md,
            padding: 10,
          }}
        >
          <AiGlowDot frame={frame} delay={30} />
          <div style={{ fontSize: 11, color: colors.textNeutralPrimary }}>AI: Strong fundamentals this quarter</div>
        </div>
      </div>
    </PhoneShell>
  );
};

export const ScreensAssemble: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slide = (delay: number, fromX: number) => {
    const s = spring({ frame: frame - delay, fps, config: { damping: 16, mass: 0.8 } });
    return {
      opacity: interpolate(frame - delay, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
      transform: `translateX(${(1 - s) * fromX}px)`,
    };
  };

  const captionOpacity = interpolate(frame, [180, 200], [0, 1], { extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.fillNeutralPrimary,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 40,
      }}
    >
      <div style={{ display: "flex", gap: 32 }}>
        <div style={slide(0, -200)}>
          <WatchlistScreen frame={frame} />
        </div>
        <div style={slide(8, 0)}>
          <PortfolioScreen frame={frame - 8} />
        </div>
        <div style={slide(16, 200)}>
          <ScripDetailScreen frame={frame - 16} />
        </div>
      </div>
      <div
        style={{
          opacity: captionOpacity,
          fontFamily: interFont,
          fontWeight: 500,
          fontSize: 28,
          color: colors.textNeutralPrimary,
        }}
      >
        AI is embedded. Not a separate feature.
      </div>
    </AbsoluteFill>
  );
};
