import sharp from 'sharp';
import * as fs from 'fs';
import path from 'path';

// Define common sizes for favicons and icons
const iconSizes = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 48, name: 'favicon-48x48.png' },
  { size: 64, name: 'favicon-64x64.png' },
  { size: 96, name: 'favicon-96x96.png' },
  { size: 128, name: 'favicon-128x128.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 192, name: 'icon-192x192.png' },
  { size: 256, name: 'icon-256x256.png' },
  { size: 512, name: 'icon-512x512.png' },
];

// Function to generate icons of different sizes
export async function generateImages(image: string) {
  const outputDirectory = './icons';

  try {
    // Create the output directory if it doesn't exist
    if (!fs.existsSync(outputDirectory)) {
      fs.mkdirSync(outputDirectory);
    }

    // Loop through each icon size and create the resized image
    for (const { size, name } of iconSizes) {
      const outputPath = path.join(outputDirectory, name);
      await sharp(image)
        .resize(size, size)
        .toFile(outputPath);
      console.log(`Generated ${name} (${size}x${size})`);
    }

    // Generate favicon.ico (combination of multiple sizes)
    const faviconOutputPath = path.join(outputDirectory, 'favicon.ico');
    await sharp(image)
      .resize(16, 16)
      .toFormat('ico' as any)
      .toFile(faviconOutputPath);
    console.log('Generated favicon.ico');

  } catch (error) {
    console.error('Error generating icons:', error);
  }
}