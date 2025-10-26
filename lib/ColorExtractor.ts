export async function extractDominantColors(imageUrl: string, k = 3): Promise<string[]> {
  const imageData = await new Promise<Uint8ClampedArray>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }
      ctx.drawImage(img, 0, 0);
      resolve(ctx.getImageData(0, 0, img.width, img.height).data);
    };
    img.onerror = (err) => reject(err);
    img.src = imageUrl;
  });
  // Convert image data to array of [r,g,b]
  const pixels: number[][] = [];
  for (let i = 0; i < imageData.length; i += 4) {
    pixels.push([imageData[i], imageData[i + 1], imageData[i + 2]]);
  }

  // K-means clustering
  function kMeans(data: number[][], k: number): number[][] {
    // Randomly initialize centroids
    let centroids = data.slice(0, k);
    let assignments = new Array(data.length).fill(0);
    for (let iter = 0; iter < 10; iter++) {
      // Assign each pixel to nearest centroid
      for (let i = 0; i < data.length; i++) {
        let minDist = Infinity, idx = 0;
        for (let j = 0; j < k; j++) {
          const dist = Math.sqrt(
            (data[i][0] - centroids[j][0]) ** 2 +
            (data[i][1] - centroids[j][1]) ** 2 +
            (data[i][2] - centroids[j][2]) ** 2
          );
          if (dist < minDist) {
            minDist = dist;
            idx = j;
          }
        }
        assignments[i] = idx;
      }
      // Update centroids
      for (let j = 0; j < k; j++) {
        const assigned = data.filter((_, i) => assignments[i] === j);
        if (assigned.length > 0) {
          centroids[j] = [
            Math.round(assigned.reduce((sum, p) => sum + p[0], 0) / assigned.length),
            Math.round(assigned.reduce((sum, p) => sum + p[1], 0) / assigned.length),
            Math.round(assigned.reduce((sum, p) => sum + p[2], 0) / assigned.length)
          ];
        }
      }
    }
    return centroids;
  }

  const dominantColors = kMeans(pixels, k);
  // Convert to hex
  return dominantColors.map(([r, g, b]) =>
    "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
  );
}
