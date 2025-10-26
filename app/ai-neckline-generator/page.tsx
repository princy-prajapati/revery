"use client"

import React, { useState } from "react";
import { necklineImages } from "@/lib/necklineImages";

const necklineOptions = [
  "Boat Neck",
  "Jewel",
  "Square",
  "Scoop",
  "V-Neck",
  "Asymmetric",
  "High Neck",
  "Halter",
  "Off-Shoulders",
  "Queen Anna",
  "Halter Strap",
  "Illusion",
  "Sweetheart",
  "Strapless",
  "Deep V-Neck",
  "Deep Round",
  "Collar",
  "Off-the-Shoulder",
  "Scoop Neck",
  "Turtleneck",
  "Cowl",
  "Keyhole",
  "Queen Anne",
  "Bateau",
  "One Shoulder",
  "Portrait",
  "Surplice",
  "Yoke"
];

export default function NecklineImageGenerator() {
  const [neckline, setNeckline] = useState("");
  const [outfit, setOutfit] = useState("");
  const [style, setStyle] = useState("");
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGeneratePrompt = () => {
    setPrompt(
      `A full-length photo of a person wearing a ${outfit} with a ${neckline} neckline. The style is ${style}.`
    );
  };

  // Call the DALL·E API route for real image generation
  const handleGenerateImage = async () => {
    setLoading(true);
    setImageUrl("");
    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      if (data.imageUrl) {
        setImageUrl(data.imageUrl);
      } else {
        alert(data.error || "Image generation failed");
      }
    } catch (err) {
      alert("Error generating image");
    }
    setLoading(false);
  };

  return (
    <main className="max-w-xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">AI Outfit Image Generator</h1>
      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Neckline Style</label>
          <select
            className="w-full border rounded px-3 py-2 mb-2"
            value={neckline}
            onChange={e => setNeckline(e.target.value)}
          >
            <option value="">Select neckline</option>
            {necklineOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {neckline && necklineImages[neckline] && (
            <div className="mt-2 flex flex-col items-center">
              <img src={necklineImages[neckline]} alt={neckline + " example"} className="w-32 h-32 object-contain rounded border" />
              <span className="mt-1 text-sm text-gray-700">{neckline}</span>
            </div>
          )}
        </div>
        <div>
          <label className="block font-medium mb-1">Outfit Description</label>
          <input
            className="w-full border rounded px-3 py-2"
            type="text"
            placeholder="e.g. casual gray sweater, black dress, red top and white skirt"
            value={outfit}
            onChange={e => setOutfit(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Style</label>
          <input
            className="w-full border rounded px-3 py-2"
            type="text"
            placeholder="e.g. minimalist, modern, vintage"
            value={style}
            onChange={e => setStyle(e.target.value)}
          />
        </div>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={handleGeneratePrompt}
          disabled={!neckline || !outfit || !style}
        >
          Generate Prompt
        </button>
        {prompt && (
          <div className="bg-gray-100 p-4 rounded mt-2">
            <div className="font-semibold mb-2">Prompt:</div>
            <div className="text-gray-800">{prompt}</div>
            <button
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
              onClick={handleGenerateImage}
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Image"}
            </button>
          </div>
        )}
        {imageUrl && (
          <div className="mt-6">
            <img src={imageUrl} alt="AI Outfit" className="rounded shadow" />
          </div>
        )}
      </div>
    </main>
  );
}
