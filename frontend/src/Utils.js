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
import vegetal from "./assets/Flavor_Img/Vegetal.jpg";
import spice from "./assets/Flavor_Img/Spices.jpg";
import coffee from "./assets/Flavor_Img/Coffee.jpg";
import animal from "./assets/Flavor_Img/Animal.jpg";
import flower from "./assets/Flavor_Img/Flower.jpg";
import mineral from "./assets/Flavor_Img/Mineral.jpg";
import wood from "./assets/Flavor_Img/Wood.jpg";
import redFruits from "./assets/Flavor_Img/Red_Fruits.jpg";

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

// const wineAromas = [
//   {
//     id: 1,
//     aromaName: "Epices",
//     value: "Epices",
//     iconUrl: spice,
//     blotch: "tiled",
//   },
//   {
//     id: 2,
//     aromaName: "Bois",
//     value: "Bois",
//     iconUrl: wood,
//     blotch: "tiled",
//   },
//   {
//     id: 3,
//     aromaName: "Fleurs",
//     value: "Fleurs",
//     iconUrl: flower,
//     blotch: "tiled",
//   },
//   {
//     id: 4,
//     aromaName: "Végétal",
//     value: "Végétal",
//     iconUrl: vegetal,
//     blotch: "tiled",
//   },
//   {
//     id: 5,
//     aromaName: "Fruits",
//     value: "Fruits",
//     iconUrl: redFruits,
//     blotch: "tiled",
//   },
//   {
//     id: 6,
//     aromaName: "Torréfié",
//     value: "Torréfié",
//     iconUrl: coffee,
//     blotch: "tiled",
//   },
//   {
//     id: 7,
//     aromaName: "Minéral",
//     value: "Minéral",
//     iconUrl: mineral,
//     blotch: "tiled",
//   },
//   {
//     id: 8,
//     aromaName: "Animal",
//     value: "Animal",
//     iconUrl: animal,
//     blotch: "tiled",
//   },
// ];

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

const wineQuality = [
  "Parfait",
  "Excellent",
  "Très bon",
  "Bon",
  "Passable",
  "Pas terrible",
  "Mauvais",
];

const rating = [
  { id: 1, value: 1 },
  { id: 2, value: 2 },
  { id: 3, value: 3 },
  { id: 4, value: 4 },
  { id: 5, value: 5 },
  { id: 6, value: 6 },
  { id: 7, value: 7 },
  { id: 8, value: 8 },
  { id: 9, value: 9 },
  { id: 10, value: 10 },
];

export { redWineColors, steps, wineQuality, rating };
