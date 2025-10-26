import React, { useState } from "react";

export type PaletteOption = {
  name: string;
  colors: string[];
};

const paletteOptions: PaletteOption[] = [
  { name: "Classic Neutrals", colors: ["#FFFFFF", "#000000", "#808080"] },
  { name: "Warm Sunset", colors: ["#FFB347", "#FF6961", "#FFD700"] },
  { name: "Cool Ocean", colors: ["#00BFFF", "#1E90FF", "#20B2AA"] },
  { name: "Earthy Tones", colors: ["#8B4513", "#DEB887", "#228B22"] },
  { name: "Pastel Dream", colors: ["#FFB6C1", "#B0E0E6", "#E6E6FA"] }
];

export default function PalettePickerMobile({ onSelect }: { onSelect: (palette: PaletteOption) => void }) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  return (
    <div className="max-w-md mx-auto p-4">
      <header className="mb-4 text-center">
        <h2 className="text-lg font-bold">Pick Your Outfit Palette</h2>
        <p className="text-sm text-gray-500">Tap a palette that matches your outfit colors.</p>
      </header>
      <div className="flex flex-col gap-4 mb-6">
        {paletteOptions.map((palette, idx) => (
          <div
            key={palette.name}
            className={`border rounded-xl p-4 flex items-center gap-4 cursor-pointer transition-all ${selectedIdx === idx ? "border-blue-500 shadow-lg" : "border-gray-200"}`}
            onClick={() => setSelectedIdx(idx)}
          >
            <div className="flex gap-2">
              {palette.colors.map((color, i) => (
                <span key={i} className="w-8 h-8 rounded-full border" style={{ background: color }} />
              ))}
            </div>
            <span className="font-medium ml-2">{palette.name}</span>
          </div>
        ))}
      </div>
      <button
        className="w-full py-3 bg-blue-600 text-white rounded-xl text-lg disabled:bg-gray-300"
        disabled={selectedIdx === null}
        onClick={() => selectedIdx !== null && onSelect(paletteOptions[selectedIdx])}
      >
        Confirm Palette
      </button>
    </div>
  );
}
