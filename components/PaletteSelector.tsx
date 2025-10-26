import React, { useState } from "react";

export type PaletteOption = {
  name: string;
  colors: string[]; // hex codes
};

const paletteOptions: PaletteOption[] = [
  { name: "Classic Neutrals", colors: ["#FFFFFF", "#000000", "#808080"] },
  { name: "Warm Sunset", colors: ["#FFB347", "#FF6961", "#FFD700"] },
  { name: "Cool Ocean", colors: ["#00BFFF", "#1E90FF", "#20B2AA"] },
  { name: "Earthy Tones", colors: ["#8B4513", "#DEB887", "#228B22"] },
  { name: "Pastel Dream", colors: ["#FFB6C1", "#B0E0E6", "#E6E6FA"] }
];

export default function PaletteSelector({ onSelect }: { onSelect: (palette: PaletteOption) => void }) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-lg font-bold mb-4">Select Your Outfit Color Palette</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {paletteOptions.map((palette, idx) => (
          <div
            key={palette.name}
            className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer transition-all ${selectedIdx === idx ? "border-blue-500 shadow-lg" : "border-gray-200"}`}
            onClick={() => setSelectedIdx(idx)}
          >
            <div className="flex gap-2 mb-2">
              {palette.colors.map((color, i) => (
                <span key={i} className="w-8 h-8 rounded-full border" style={{ background: color }} />
              ))}
            </div>
            <span className="font-medium">{palette.name}</span>
          </div>
        ))}
      </div>
      <button
        className="w-full py-2 bg-blue-600 text-white rounded disabled:bg-gray-300"
        disabled={selectedIdx === null}
        onClick={() => selectedIdx !== null && onSelect(paletteOptions[selectedIdx])}
      >
        Continue
      </button>
    </div>
  );
}
