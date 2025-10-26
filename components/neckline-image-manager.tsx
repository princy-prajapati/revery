"use client"

import React, { useState } from 'react';
import Image from 'next/image';

export default function NecklineImageManager() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [refresh, setRefresh] = useState(false);

  // Fetch images from public/necklines
  React.useEffect(() => {
    fetch('/api/neckline-images')
      .then(res => res.json())
      .then(data => setImages(data.images));
  }, [refresh]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append('file', selectedFile);
    await fetch('/api/upload-neckline-image', {
      method: 'POST',
      body: formData,
    });
    setSelectedFile(null);
    setRefresh(r => !r);
  };

  const handleDelete = async (img: string) => {
    await fetch('/api/delete-neckline-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename: img }),
    });
    setRefresh(r => !r);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Neckline Image Manager</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!selectedFile} className="ml-2 px-4 py-2 bg-blue-600 text-white rounded">Upload</button>
      <div className="grid grid-cols-2 gap-4 mt-6">
        {images.map(img => (
          <div key={img} className="border p-2 flex flex-col items-center">
            <Image src={`/necklines/${img}`} alt={img} width={120} height={120} className="object-contain" />
            <span className="mt-2 text-sm">{img}</span>
            <button onClick={() => handleDelete(img)} className="mt-2 px-2 py-1 bg-red-500 text-white rounded">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
