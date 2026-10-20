import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, radius } from "../tokens";
import { interFont } from "../fonts";

const BEAT = 72;

const beatOpacity = (frame: number, start: number) => {
  const local = frame - start;
  return interpolate(local, [0, 10, BEAT - 14, BEAT], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
};

const BuySellBeat: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const buyX = interpolate(frame, [0, 18], [-60, 0], { extrapolateRight: "clamp" });
  const sellX = interpolate(frame, [6, 24], [60, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ display: "flex", gap: 16 }}>
      <div
        style={{
          transform: `translateX(${buyX}px)`,
          padding: "12px 32px",
          borderRadius: radius.md,
          backgroundColor: colors.fillPositivePrimary,
          color: colors.textInversePrimary,
          fontFamily: interFont,
          fontWeight: 500,
          fontSize: 22,
        }}
      >
        Buy
      </div>
      <div
        style={{
          transform: `translateX(${sellX}px)`,
          padding: "12px 32px",
          borderRadius: radius.md,
          backgroundColor: colors.fillAccent3Primary,
          color: colors.textInversePrimary,
          fontFamily: interFont,
          fontWeight: 500,
          fontSize: 22,
        }}
      >
        Sell
      </div>
    </div>
  );
};

const ScripRowBeat: React.FC<{ frame: number }> = ({ frame }) => {
  const logoScale = spring({ frame, fps: 30, config: { damping: 12, mass: 0.5 } });
  const textOpacity = interpolate(frame, [12, 24], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const priceOpacity = interpolate(frame, [24, 36], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, width: 460 }}>
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: radius.full,
          backgroundColor: colors.fillAccent1Primary,
          color: colors.textInversePrimary,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: interFont,
          fontWeight: 600,
          fontSize: 16,
          transform: `scale(${logoScale})`,
        }}
      >
        RI
      </div>
      <div style={{ flex: 1, opacity: textOpacity, fontFamily: interFont }}>
        <div style={{ fontWeight: 500, fontSize: 22, color: colors.textNeutralPrimary }}>RELIANCE</div>
        <div style={{ fontWeight: 400, fontSize: 16, color: colors.textNeutralSecondary }}>NSE</div>
      </div>
      <div style={{ opacity: priceOpacity, textAlign: "right", fontFamily: interFont }}>
        <div style={{ fontWeight: 500, fontSize: 22, color: colors.textNeutralPrimary }}>2,847.60</div>
        <div style={{ fontWeight: 500, fontSize: 18, color: colors.textPositivePrimary }}>+1.8%</div>
      </div>
    </div>
  );
};

const BadgeBeat: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const scale = spring({ frame, fps, config: { damping: 9, mass: 0.6 } });
  const pulse = 1 + Math.sin(frame / 6) * 0.04;
  return (
    <div
      style={{
        transform: `scale(${scale * pulse})`,
        padding: "8px 20px 8px 12px",
        borderRadius: radius.full,
        backgroundColor: colors.fillPositiveTertiary,
        color: colors.textPositivePrimary,
        fontFamily: interFont,
        fontWeight: 600,
        fontSize: 28,
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 19V5M5 12L12 5L19 12" stroke={colors.textPositivePrimary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      +2.40%
    </div>
  );
};

const TabBeat: React.FC<{ frame: number }> = ({ frame }) => {
  const labels = ["Overview", "Financials", "F&O"];
  const activeIndex = Math.min(2, Math.floor(frame / 24));
  const underlineX = interpolate(activeIndex, [0, 1, 2], [0, 140, 300]);

  return (
    <div style={{ position: "relative", display: "flex", gap: 60 }}>
      {labels.map((label, i) => (
        <div
          key={label}
          style={{
            fontFamily: interFont,
            fontWeight: i === activeIndex ? 600 : 500,
            fontSize: 24,
            color: i === activeIndex ? colors.textNeutralPrimary : colors.textNeutralSecondary,
          }}
        >
          {label}
        </div>
      ))}
      <div
        style={{
          position: "absolute",
          bottom: -12,
          left: underlineX,
          width: 100,
          height: 3,
          backgroundColor: colors.textNeutralPrimary,
          transition: "none",
        }}
      />
    </div>
  );
};

const NoteRecallBeat: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const scale = spring({ frame, fps, config: { damping: 13, mass: 0.6 } });
  return (
    <div
      style={{
        transform: `scale(${scale})`,
        display: "flex",
        alignItems: "center",
        gap: 12,
        backgroundColor: colors.fillAccent2Tertiary,
        borderRadius: radius.md,
        padding: "16px 24px",
      }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M13 2L4.09 12.11C3.69 12.56 3.58 13.19 3.79 13.75C4 14.31 4.52 14.69 5.11 14.69H12V22L20.91 11.89C21.31 11.44 21.42 10.81 21.21 10.25C21 9.69 20.48 9.31 19.89 9.31H13V2Z"
          fill={colors.fillAccent2Primary}
        />
      </svg>
      <div style={{ fontFamily: interFont, fontWeight: 500, fontSize: 24, color: colors.textAccent2Primary }}>
        A first-class component. Not a bolt-on.
      </div>
    </div>
  );
};

const beats = [BuySellBeat, ScripRowBeat, BadgeBeat, TabBeat, NoteRecallBeat];

export const ComponentsMontage: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const beatIndex = Math.min(beats.length - 1, Math.floor(frame / BEAT));
  const start = beatIndex * BEAT;
  const BeatComponent = beats[beatIndex];
  const opacity = beatOpacity(frame, start);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.fillNeutralPrimary,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ opacity }}>
        <BeatComponent frame={frame - start} fps={fps} />
      </div>
    </AbsoluteFill>
  );
};
