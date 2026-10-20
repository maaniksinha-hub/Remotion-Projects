import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, radius } from "../tokens";
import { interFont } from "../fonts";

type Swatch = {
  label: string;
  sublabel: string;
  color: string;
  startFrame: number;
};

const swatches: Swatch[] = [
  { label: "Positive", sublabel: "Gains, success", color: colors.fillPositivePrimary, startFrame: 10 },
  { label: "Sell", sublabel: "Never red", color: colors.fillAccent3Primary, startFrame: 30 },
  { label: "Primary", sublabel: "Actions, CTAs", color: colors.fillAccent1Primary, startFrame: 50 },
  { label: "AI", sublabel: "Reserved. Only AI.", color: colors.fillAccent2Primary, startFrame: 75 },
];

const Chip: React.FC<{ swatch: Swatch; frame: number; fps: number; isAi: boolean }> = ({
  swatch,
  frame,
  fps,
  isAi,
}) => {
  const local = frame - swatch.startFrame;
  const scale = spring({ frame: local, fps, config: { damping: 13, mass: 0.6 } });
  const opacity = interpolate(local, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const holdScale = isAi ? interpolate(frame, [95, 130], [1, 1.12], { extrapolateLeft: "clamp" }) : 1;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        opacity,
        transform: `scale(${scale * holdScale})`,
      }}
    >
      <div
        style={{
          width: 140,
          height: 140,
          borderRadius: radius.xxl,
          backgroundColor: swatch.color,
          boxShadow: isAi && frame > 95 ? `0 0 40px ${swatch.color}66` : "none",
        }}
      />
      <div style={{ fontFamily: interFont, fontWeight: 600, fontSize: 24, color: colors.textNeutralPrimary }}>
        {swatch.label}
      </div>
      <div style={{ fontFamily: interFont, fontWeight: 400, fontSize: 16, color: colors.textNeutralSecondary }}>
        {swatch.sublabel}
      </div>
    </div>
  );
};

export const ColorSystem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headlineOpacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.fillNeutralPrimary,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 64,
      }}
    >
      <div
        style={{
          fontFamily: interFont,
          fontWeight: 600,
          fontSize: 36,
          color: colors.textNeutralPrimary,
          opacity: headlineOpacity,
        }}
      >
        A color system built on intent.
      </div>
      <div style={{ display: "flex", gap: 56 }}>
        {swatches.map((s) => (
          <Chip key={s.label} swatch={s} frame={frame} fps={fps} isAi={s.label === "AI"} />
        ))}
      </div>
    </AbsoluteFill>
  );
};
