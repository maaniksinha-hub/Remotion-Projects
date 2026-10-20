import { continueRender, delayRender, staticFile } from "remotion";

export const interFont = "Inter";
export const crimsonProFont = "Crimson Pro";

const waitForFont = delayRender("Loading Neo DS fonts");

const interFace = new FontFace(
  interFont,
  `url(${staticFile("fonts/Inter-latin-variable.woff2")}) format("woff2")`,
  { weight: "100 900" },
);
const crimsonProFace = new FontFace(
  crimsonProFont,
  `url(${staticFile("fonts/CrimsonPro-latin-variable.woff2")}) format("woff2")`,
  { weight: "200 900" },
);

Promise.all([interFace.load(), crimsonProFace.load()])
  .then(([loadedInter, loadedCrimsonPro]) => {
    document.fonts.add(loadedInter);
    document.fonts.add(loadedCrimsonPro);
    continueRender(waitForFont);
  })
  .catch((err) => {
    console.error("Failed to load Neo DS fonts", err);
    continueRender(waitForFont);
  });
