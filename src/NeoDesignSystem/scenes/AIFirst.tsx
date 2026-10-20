import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { colors, radius } from "../tokens";
import { interFont } from "../fonts";

const BoltIcon: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = colors.fillAccent2Primary }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M13 2L4.09 12.11C3.69 12.56 3.58 13.19 3.79 13.75C4 14.31 4.52 14.69 5.11 14.69H12V22L20.91 11.89C21.31 11.44 21.42 10.81 21.21 10.25C21 9.69 20.48 9.31 19.89 9.31H13V2Z"
      fill={color}
    />
  </svg>
);

const NOTE_TEXT = "AI reads the filing so you don't have to.";

const AccordionBeat: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const cardOpacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });
  const noteProgress = spring({ frame: frame - 25, fps, config: { damping: 14, mass: 0.7 } });
  const noteOpacity = interpolate(frame, [25, 38], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const charsVisible = Math.floor(interpolate(frame, [40, 110], [0, NOTE_TEXT.length], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }));

  return (
    <div
      style={{
        width: 820,
        opacity: cardOpacity,
        border: `1px solid ${colors.strokeDefaultPrimaryLow}`,
        borderRadius: radius.lg,
        padding: 24,
        backgroundColor: colors.fillNeutralPrimary,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontFamily: interFont,
          fontWeight: 500,
          fontSize: 28,
          color: colors.textNeutralPrimary,
        }}
      >
        Fundamentals
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M6 9L12 15L18 9"
            stroke={colors.textNeutralSecondary}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div
        style={{
          marginTop: 20,
          opacity: noteOpacity,
          transform: `translateY(${(1 - noteProgress) * 16}px)`,
          display: "flex",
          gap: 12,
          alignItems: "flex-start",
          backgroundColor: colors.fillAccent2Tertiary,
          borderRadius: radius.md,
          padding: 16,
        }}
      >
        <div style={{ marginTop: 2 }}>
          <BoltIcon />
        </div>
        <div style={{ fontFamily: interFont, fontWeight: 400, fontSize: 20, color: colors.textNeutralPrimary }}>
          {NOTE_TEXT.slice(0, charsVisible)}
          <span style={{ opacity: charsVisible < NOTE_TEXT.length ? 1 : 0 }}>|</span>
        </div>
      </div>
    </div>
  );
};

const TechnicalsBeat: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const opacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  const scale = spring({ frame, fps, config: { damping: 14, mass: 0.6 } });

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
      }}
    >
      <div style={{ fontFamily: interFont, fontWeight: 500, fontSize: 18, color: colors.textNeutralPrimary }}>
        1,567.40
      </div>
      <div style={{ fontFamily: interFont, fontWeight: 400, fontSize: 14, color: colors.textNeutralSecondary }}>
        Pivot
      </div>
      <div
        style={{
          marginTop: 16,
          fontFamily: interFont,
          fontWeight: 500,
          fontSize: 16,
          color: colors.textAccent2Primary,
        }}
      >
        AI output. Same Inter rules — disciplined, not decorative.
      </div>
    </div>
  );
};

export const AIFirst: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const accordionEnd = 160;
  const technicalsStart = accordionEnd;
  const technicalsEnd = 260;
  const captionStart = 270;

  const accordionOpacity = interpolate(frame, [accordionEnd - 15, accordionEnd], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const technicalsOpacity = interpolate(
    frame,
    [technicalsStart, technicalsStart + 12, technicalsEnd - 12, technicalsEnd],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const captionOpacity = interpolate(frame, [captionStart, captionStart + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.fillNeutralPrimary,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 48,
      }}
    >
      {frame < accordionEnd && (
        <div style={{ opacity: accordionOpacity }}>
          <AccordionBeat frame={frame} fps={fps} />
        </div>
      )}
      {frame >= technicalsStart && frame < technicalsEnd && (
        <div style={{ opacity: technicalsOpacity }}>
          <TechnicalsBeat frame={frame - technicalsStart} fps={fps} />
        </div>
      )}
      {frame >= captionStart && (
        <div
          style={{
            position: "absolute",
            bottom: 90,
            opacity: captionOpacity,
            fontFamily: interFont,
            fontWeight: 500,
            fontSize: 32,
            color: colors.textNeutralPrimary,
            textAlign: "center",
            maxWidth: 1100,
          }}
        >
          Every surface has a place for AI to speak — and rules for how it speaks.
        </div>
      )}
    </AbsoluteFill>
  );
};
