// Each pet is defined as a pixel grid
// Each color key maps to a hex color, '.' = transparent

const PETS = {
  cat: {
    name: "Cat",
    emoji: "🐱",
    palette: {
      H: "#F4A460", // head/body - sandy brown
      E: "#2C2C2C", // eyes/details - dark
      N: "#FF9999", // nose - pink
      W: "#FFFFFF", // white
      S: "#D2691E", // shadow/stripe
      ".": null,
    },
    grid: [
      "..HHH..HHH..",
      ".HHHHHHHHHHH",
      "HHHHHHHHHHHH",
      "H.HHHHHHHHH.",
      "HWEHHHHHEHWH",
      "HHHHHNHHHHHH",
      "HHHHHHHHHHH.",
      ".HHHHHHHHHH.",
      "..HHHHHHHHH.",
      "...HHSSSHH..",
      "..HH.....HH.",
      ".HH.......HH",
    ],
  },

  dog: {
    name: "Dog",
    emoji: "🐶",
    palette: {
      B: "#C68642", // brown body
      D: "#8B5E3C", // dark brown
      E: "#2C2C2C", // eyes
      N: "#1A1A1A", // nose (dark)
      W: "#FFFFFF", // white
      T: "#FF9999", // tongue
      ".": null,
    },
    grid: [
      ".BBBB..BBBB.",
      "BBBBBBBBBBBB",
      "BBWBBBBBBWBB",
      "BBBBBBBBBBB.",
      "BBEBEBBBEBB.",
      "BBBBBNBBBBB.",
      "BBBBBBBBBBB.",
      ".BBBBBBBBBB.",
      "DBBBTBBBBBD.",
      "DBBBBBBBBBDB",
      ".DBBBBBBBDB.",
      "..DDDBBDDD..",
    ],
  },

  axolotl: {
    name: "Axolotl",
    emoji: "🦎",
    palette: {
      P: "#FFB7C5", // pink body
      G: "#FF69B4", // dark pink/gills
      E: "#2C2C2C", // eyes
      W: "#FFFFFF", // white of eye
      S: "#FF85A1", // spots/shading
      ".": null,
    },
    grid: [
      "..G...G...G.",
      ".GGG.GGG.GGG",
      "..PPPPPPPP..",
      ".PPPPPPPPPP.",
      "PPWEPPPPWEP.",
      "PPPPPPPPPPPP",
      ".PPSPSPSPP..",
      "..PPPPPPPP..",
      "...PPPPPP...",
      "..PP....PP..",
      ".PP......PP.",
      "PP........PP",
    ],
  },

  bunny: {
    name: "Bunny",
    emoji: "🐰",
    palette: {
      W: "#F5F5F5", // white/cream
      P: "#FFB6C1", // pink inner ear
      E: "#FF69B4", // pink eye
      G: "#D3D3D3", // gray shadow
      N: "#FF9999", // nose
      ".": null,
    },
    grid: [
      ".WW.....WW..",
      ".WPW...WPW..",
      "WWPWW.WWPWW.",
      "WWWWWWWWWWW.",
      "WWWWWWWWWWW.",
      "WWEEWWWWEEW.",
      "WWWWNWWWWWW.",
      ".WWWWWWWWW..",
      ".WWGGGGGWW..",
      "..WWWWWWW...",
      "..WW...WW...",
      ".WW.....WW..",
    ],
  },

  frog: {
    name: "Frog",
    emoji: "🐸",
    palette: {
      G: "#5DBB63", // green body
      D: "#3D8B41", // dark green
      E: "#FFFF00", // yellow eyes
      B: "#1A1A1A", // black pupils
      W: "#FFFFFF", // white belly
      ".": null,
    },
    grid: [
      "..GEEG..GEEG",
      ".GGEEGGGGEEGG",
      "GGGGGGGGGGG.",
      "GGWWWWWWWGG.",
      "GWWWWWWWWWG.",
      "GWWWWWWWWWG.",
      "GWWWWWWWWWG.",
      "GGWWWWWWWGG.",
      ".GGGGGGGGG..",
      "GG.......GG.",
      "GG.......GG.",
      ".G.........G",
    ],
  },

  penguin: {
    name: "Penguin",
    emoji: "🐧",
    palette: {
      B: "#1A1A2E", // dark blue-black body
      W: "#FFFFFF", // white belly
      Y: "#FFD700", // yellow beak/feet
      O: "#FFA500", // orange accent
      E: "#FFFFFF", // white eye ring
      ".": null,
    },
    grid: [
      "....BBBB....",
      "...BBBBBB...",
      "..BBEBEBBB..",
      "..BBBBYBBB..",
      ".BBWWWWWBBB.",
      "BBBWWWWWWBB.",
      "BBBWWWWWWBB.",
      "BBBWWWWWWBB.",
      ".BBBWWWBBB..",
      "..YBBBBBBY..",
      "..YY...YYY..",
      "...Y...Y....",
    ],
  },

  dragon: {
    name: "Dragon",
    emoji: "🐲",
    palette: {
      G: "#228B22", // green body
      D: "#006400", // dark green
      Y: "#FFD700", // yellow belly/eyes
      R: "#FF4500", // red fire
      O: "#FF8C00", // orange fire
      E: "#FF0000", // red eye
      ".": null,
    },
    grid: [
      "..DDD...DDD.",
      ".DGGDDDGGGD.",
      "DGGGGGGGGGGD",
      "GGGYGGGYGGG.",
      "GGGEGGGGEGGG",
      "GGGYYYYYYGGG",
      ".GGGGGGGGGG.",
      "..GGGGGGGGG.",
      "..GGYYYYYGG.",
      ".GG.RORORO.GG",
      "GG..RORORO..G",
      ".....RORO....",
    ],
  },

  hamster: {
    name: "Hamster",
    emoji: "🐹",
    palette: {
      T: "#D2B48C", // tan body
      W: "#FFFAF0", // white belly/cheeks
      E: "#2C2C2C", // dark eyes
      N: "#FF9999", // pink nose
      P: "#FFB6C1", // pink ears
      ".": null,
    },
    grid: [
      "...TTPTPTT..",
      "..TTTTTTTTT.",
      ".TWWWWWWWWT.",
      "TTWWWWWWWWTT",
      "TTWETTWWETTW",
      "TTWWWNWWWWTT",
      "TTWWWWWWWWTT",
      ".TWWWWWWWWT.",
      "..TTTTTTTT..",
      "...TT..TT...",
      "..TT....TT..",
      ".TT......TT.",
    ],
  },
};

// Generate SVG pixel art from pet definition
function generatePetSVG(petKey, size = 12) {
  const pet = PETS[petKey];
  if (!pet) return null;

  const pixelSize = size;
  const grid = pet.grid;
  const rows = grid.length;
  const cols = Math.max(...grid.map((r) => r.length));
  const width = cols * pixelSize;
  const height = rows * pixelSize;

  let svgPixels = "";

  for (let r = 0; r < rows; r++) {
    const row = grid[r];
    for (let c = 0; c < row.length; c++) {
      const char = row[c];
      if (char === ".") continue;
      const color = pet.palette[char];
      if (!color) continue;
      svgPixels += `<rect x="${c * pixelSize}" y="${r * pixelSize}" width="${pixelSize}" height="${pixelSize}" fill="${color}"/>`;
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" shape-rendering="crispEdges">${svgPixels}</svg>`;
}

// Get a random pet type
function getRandomPetType() {
  const keys = Object.keys(PETS);
  return keys[Math.floor(Math.random() * keys.length)];
}

// Get pet info
function getPetInfo(petKey) {
  return PETS[petKey] || null;
}

module.exports = { PETS, generatePetSVG, getRandomPetType, getPetInfo };