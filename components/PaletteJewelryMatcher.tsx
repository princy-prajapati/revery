import React from "react";

export type PaletteJewelryMatcherProps = {
  palette: string[]; // Array of hex color codes or color names
};

// Color theory rules for matching metals and stones
const colorMatchingRules = [
  {
    colors: ["#FFD700", "gold", "yellow"],
    metal: "Gold",
    gemstones: ["Citrine", "Amber", "Yellow Sapphire"]
  },
  {
    colors: ["#C0C0C0", "silver", "gray", "#808080"],
    metal: "Silver",
    gemstones: ["Blue Topaz", "Aquamarine", "Moonstone"]
  },
  {
    colors: ["#E5C1CD", "rose", "pink", "#FFC0CB"],
    metal: "Rose Gold",
    gemstones: ["Morganite", "Rose Quartz", "Pink Sapphire"]
  },
  {
    colors: ["#000000", "black"],
    metal: "Platinum",
    gemstones: ["Onyx", "Black Diamond", "Pearl"]
  },
  {
    colors: ["#FFFFFF", "white"],
    metal: "White Gold",
    gemstones: ["Diamond", "Opal", "Pearl"]
  }
];

function matchJewelryByPalette(palette: string[]) {
  // Find best metal and stones for each color in palette
  let matches: { color: string; metal: string; gemstones: string[] }[] = [];
  palette.forEach(color => {
    let found = colorMatchingRules.find(rule =>
      rule.colors.some(c => c.toLowerCase() === color.toLowerCase())
    );
    if (found) {
      matches.push({ color, metal: found.metal, gemstones: found.gemstones });
    }
  });
  // Fallback: suggest gold for warm, silver for cool
  if (matches.length === 0) {
    matches.push({ color: palette[0], metal: "Gold", gemstones: ["Diamond"] });
  }
  return matches;
}

export default function PaletteJewelryMatcher({ palette }: PaletteJewelryMatcherProps) {
  const matches = matchJewelryByPalette(palette);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
      {matches.map((match, idx) => (
        <div key={idx} className="border rounded-lg p-4 flex flex-col items-center bg-white shadow">
          <div className="w-10 h-10 rounded-full mb-2" style={{ background: match.color }} />
          <h3 className="font-semibold text-lg mb-1">{match.metal} Jewelry</h3>
          <p className="text-sm text-gray-600 text-center mb-2">Best for: <span style={{ color: match.color }}>{match.color}</span></p>
          <div className="flex flex-wrap gap-2 justify-center">
            {match.gemstones.map(stone => (
              <span key={stone} className="px-2 py-1 bg-gray-100 rounded text-xs">{stone}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
