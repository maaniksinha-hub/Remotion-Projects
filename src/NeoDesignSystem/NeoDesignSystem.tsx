import { Series } from "remotion";
import { LogoReveal } from "./scenes/LogoReveal";
import { ColorSystem } from "./scenes/ColorSystem";
import { Typography } from "./scenes/Typography";
import { AIFirst } from "./scenes/AIFirst";
import { ComponentsMontage } from "./scenes/ComponentsMontage";
import { ScreensAssemble } from "./scenes/ScreensAssemble";
import { Close } from "./scenes/Close";

export const NeoDesignSystem: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={120}>
        <LogoReveal />
      </Series.Sequence>
      <Series.Sequence durationInFrames={210}>
        <ColorSystem />
      </Series.Sequence>
      <Series.Sequence durationInFrames={150}>
        <Typography />
      </Series.Sequence>
      <Series.Sequence durationInFrames={360}>
        <AIFirst />
      </Series.Sequence>
      <Series.Sequence durationInFrames={360}>
        <ComponentsMontage />
      </Series.Sequence>
      <Series.Sequence durationInFrames={240}>
        <ScreensAssemble />
      </Series.Sequence>
      <Series.Sequence durationInFrames={210}>
        <Close />
      </Series.Sequence>
    </Series>
  );
};

export const NEO_DESIGN_SYSTEM_DURATION_IN_FRAMES = 120 + 210 + 150 + 360 + 360 + 240 + 210;
