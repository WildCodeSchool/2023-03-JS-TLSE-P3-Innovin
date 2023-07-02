import raspberry from "./assets/Red_Wine_Colors/Framboise.png";
import cherry from "./assets/Red_Wine_Colors/Cerise.png";
import garnet from "./assets/Red_Wine_Colors/Grenat.png";
import purple from "./assets/Red_Wine_Colors/Pourpre.png";
import redBlack from "./assets/Red_Wine_Colors/Rouge_Noir.png";
import ruby from "./assets/Red_Wine_Colors/Rubis.png";
import tiled from "./assets/Red_Wine_Colors/Tuilé.png";
import violet from "./assets/Red_Wine_Colors/Violet.png";
import eye from "./assets/Icons/Eye_Icon.svg";
import nose from "./assets/Icons/Nose_Icon.svg";
import mouth from "./assets/Icons/Mouth_Icon.svg";
import heart from "./assets/Icons/Hearth_Icon.svg";

// array used to display the colors in the visual stage 1
const redWineColors = [
  {
    id: 1,
    colorName: "Framboise",
    value: "Framboise",
    color: "#E94E65",
    blotch: raspberry,
  },
  {
    id: 2,
    colorName: "Cerise",
    value: "Cerise",
    color: "#D93D3B",
    blotch: cherry,
  },
  {
    id: 3,
    colorName: "Rubis",
    value: "Rubis",
    color: "#B91C19",
    blotch: ruby,
  },
  {
    id: 4,
    colorName: "Pourpre",
    value: "Pourpre",
    color: "#9A1F49",
    blotch: purple,
  },
  {
    id: 5,
    colorName: "Violet",
    value: "Violet",
    color: "#8E1665",
    blotch: violet,
  },
  {
    id: 6,
    colorName: "Grenat",
    value: "Grenat",
    color: "#743651",
    blotch: garnet,
  },
  {
    id: 7,
    colorName: "Rouge Noir",
    value: "Rouge_Noir",
    color: "#5E2C42",
    blotch: redBlack,
  },
  {
    id: 8,
    colorName: "Tuilé",
    value: "Tuilé",
    color: "#91412F",
    blotch: tiled,
  },
];

// array used for the steps header in most of the tasting pages
const steps = [
  {
    id: 1,
    name: "Eye",
    iconUrl: `${eye}`,
    pathName: ["/eye/stage1", "/eye/stage2"],
  },
  {
    id: 2,
    name: "Nose",
    iconUrl: `${nose}`,
    pathName: ["/nose/stage1"],
  },
  {
    id: 3,
    name: "Mouth",
    iconUrl: `${mouth}`,
    pathName: ["/mouth/stage1", "/mouth/stage2"],
  },
  {
    id: 4,
    name: "Advice",
    iconUrl: `${heart}`,
    pathName: ["/advice"],
  },
];

export { redWineColors, steps };
