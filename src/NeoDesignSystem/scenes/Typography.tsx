import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { colors } from "../tokens";
import { crimsonProFont, interFont } from "../fonts";

export const Typography: React.FC = () => {
  const frame = useCurrentFrame();

  const leftOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const rightOpacity = interpolate(frame, [10, 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const amountProgress = interpolate(frame, [20, 90], [0, 124500], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const amount = amountProgress.toLocaleString("en-IN", { maximumFractionDigits: 0 });

  const captionOpacity = interpolate(frame, [110, 130], [0, 1], { extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.fillNeutralPrimary, flexDirection: "column" }}>
      <div style={{ display: "flex", flex: 1 }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 24,
            opacity: leftOpacity,
            borderRight: `1px solid ${colors.strokeDefaultPrimary}`,
          }}
        >
          <div style={{ fontFamily: interFont, fontWeight: 600, fontSize: 48, color: colors.textNeutralPrimary }}>
            Inter
          </div>
          <div style={{ fontFamily: interFont, fontWeight: 500, fontSize: 22, color: colors.textNeutralSecondary }}>
            Labels, data, structure
          </div>
          <div
            style={{
              marginTop: 24,
              padding: "6px 16px",
              borderRadius: 999,
              backgroundColor: colors.fillPositiveTertiary,
              fontFamily: interFont,
              fontWeight: 600,
              fontSize: 16,
              color: colors.textPositivePrimary,
            }}
          >
            +2.4%
          </div>
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
            opacity: rightOpacity,
          }}
        >
          <div style={{ fontFamily: crimsonProFont, fontWeight: 400, fontSize: 36, color: colors.textNeutralSecondary }}>
            Crimson Pro
          </div>
          <div style={{ fontFamily: crimsonProFont, fontWeight: 500, fontSize: 72, color: colors.textNeutralPrimary }}>
            ₹{amount}
          </div>
          <div style={{ fontFamily: crimsonProFont, fontWeight: 400, fontSize: 24, color: colors.textNeutralSecondary }}>
            Portfolio value
          </div>
        </div>
      </div>
      <div
        style={{
          textAlign: "center",
          paddingBottom: 72,
          fontFamily: interFont,
          fontWeight: 500,
          fontSize: 28,
          color: colors.textNeutralPrimary,
          opacity: captionOpacity,
        }}
      >
        Functional type for data. Serif for what matters.
      </div>
    </AbsoluteFill>
  );
};
