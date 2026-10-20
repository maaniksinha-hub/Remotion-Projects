import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "../tokens";
import { crimsonProFont } from "../fonts";

export const LogoReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const wordmarkScale = spring({ frame, fps, config: { damping: 14, mass: 0.6 } });
  const wordmarkOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });

  const underlineWidth = interpolate(frame, [20, 55], [0, 220], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const boltOpacity = interpolate(frame, [70, 90], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const boltScale = spring({ frame: frame - 70, fps, config: { damping: 10, mass: 0.5 } });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.fillNeutralPrimary,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        <div
          style={{
            fontFamily: crimsonProFont,
            fontWeight: 400,
            fontSize: 120,
            color: colors.textNeutralPrimary,
            opacity: wordmarkOpacity,
            transform: `scale(${wordmarkScale})`,
          }}
        >
          Neo
        </div>
        <div
          style={{
            position: "absolute",
            right: -56,
            top: 8,
            opacity: boltOpacity,
            transform: `scale(${boltScale})`,
          }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path
              d="M13 2L4.09 12.11C3.69 12.56 3.58 13.19 3.79 13.75C4 14.31 4.52 14.69 5.11 14.69H12V22L20.91 11.89C21.31 11.44 21.42 10.81 21.21 10.25C21 9.69 20.48 9.31 19.89 9.31H13V2Z"
              fill={colors.fillAccent2Primary}
            />
          </svg>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: -16,
            left: 0,
            height: 6,
            width: underlineWidth,
            backgroundColor: colors.fillAccent1Primary,
            borderRadius: 999,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
