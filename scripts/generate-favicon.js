const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Create a simple PNG favicon using Sharp
async function generateFavicon() {
  try {
    // Create a 32x32 PNG with the logo design
    const svgBuffer = fs.readFileSync(path.join(__dirname, '../public/logo.svg'));
    
    // Convert SVG to PNG at 32x32
    await sharp(svgBuffer)
      .resize(32, 32)
      .png()
      .toFile(path.join(__dirname, '../public/favicon-32.png'));
    
    // Also create a 16x16 version
    await sharp(svgBuffer)
      .resize(16, 16)
      .png()
      .toFile(path.join(__dirname, '../public/favicon-16.png'));
    
    console.log('PNG favicons generated successfully!');
    console.log('Files created:');
    console.log('- public/favicon-16.png');
    console.log('- public/favicon-32.png');
    console.log('');
    console.log('To convert to ICO format, you can:');
    console.log('1. Use an online converter like favicon.io');
    console.log('2. Or use ImageMagick: convert favicon-32.png favicon.ico');
    
  } catch (error) {
    console.error('Error generating favicon:', error);
  }
}

generateFavicon();
