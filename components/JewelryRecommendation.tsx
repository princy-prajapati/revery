import React from "react";

export type OutfitAttributes = {
  style: string;
  neckline: string;
  color: string;
  occasion?: string;
};

export type JewelryItem = {
  name: string;
  image: string;
  description: string;
};

const jewelryDatabase: JewelryItem[] = [
  {
    name: "Pearl Necklace",
    image: "/jewelry/pearl-necklace.jpg",
    description: "Classic pearls that complement formal and semi-formal outfits, especially boat neck and crew necklines."
  },
  {
    name: "Statement Earrings",
    image: "/jewelry/statement-earrings.jpg",
    description: "Bold earrings for off-shoulder and strapless styles, perfect for parties and evening occasions."
  },
  {
    name: "Pendant Necklace",
    image: "/jewelry/pendant-necklace.jpg",
    description: "Simple pendant for V-neck and scoop neck outfits, ideal for casual and work settings."
  },
  {
    name: "Choker",
    image: "/jewelry/choker.jpg",
    description: "Trendy choker for high-neck and turtleneck styles, adds edge to modern looks."
  },
  {
    name: "Stud Earrings",
    image: "/jewelry/stud-earrings.jpg",
    description: "Minimalist studs for any neckline, great for everyday wear and understated elegance."
  }
];

function getJewelryRecommendations(outfit: OutfitAttributes): JewelryItem[] {
  // Simple logic based on neckline and occasion
  const { neckline, occasion } = outfit;
  let recommendations: JewelryItem[] = [];

  if (["boat neck", "crew neck"].includes(neckline.toLowerCase())) {
    recommendations.push(jewelryDatabase[0]); // Pearl Necklace
  }
  if (["off-shoulder", "strapless"].includes(neckline.toLowerCase())) {
    recommendations.push(jewelryDatabase[1]); // Statement Earrings
  }
  if (["v-neck", "scoop neck"].includes(neckline.toLowerCase())) {
    recommendations.push(jewelryDatabase[2]); // Pendant Necklace
  }
  if (["high-neck", "turtleneck"].includes(neckline.toLowerCase())) {
    recommendations.push(jewelryDatabase[3]); // Choker
  }
  // Always suggest studs for versatility
  recommendations.push(jewelryDatabase[4]);

  // Optionally filter by occasion
  if (occasion === "party" || occasion === "evening") {
    recommendations = recommendations.filter(j => j.name !== "Stud Earrings");
  }

  return recommendations;
}

export default function JewelryRecommendation({ outfit }: { outfit: OutfitAttributes }) {
  const recommendations = getJewelryRecommendations(outfit);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
      {recommendations.map(jewelry => (
        <div key={jewelry.name} className="border rounded-lg p-4 flex flex-col items-center bg-white shadow">
          <img src={jewelry.image} alt={jewelry.name} className="w-24 h-24 object-contain mb-2" />
          <h3 className="font-semibold text-lg mb-1">{jewelry.name}</h3>
          <p className="text-sm text-gray-600 text-center">{jewelry.description}</p>
        </div>
      ))}
    </div>
  );
}
