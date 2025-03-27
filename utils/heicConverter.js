// utils/heicConverter.js
import heic2any from 'heic2any';

/**
 * Converts HEIC/HEIF file to JPEG
 * @param {File} heicFile - The HEIC/HEIF file to convert
 * @param {object} options - Conversion options
 * @param {number} [options.quality=0.8] - JPEG quality (0-1)
 * @param {boolean} [options.returnBlob=true] - Return as Blob or Object URL
 * @returns {Promise<Blob|string>} Converted JPEG as Blob or Object URL
 */
export async function convertHeicToJpg(heicFile, options = {}) {
  const { quality = 0.8, returnBlob = true } = options;

  // Validate input
  if (!(heicFile instanceof File)) {
    throw new Error('Input must be a File object');
  }

  if (!heicFile.name.match(/\.(heic|heif)$/i)) {
    throw new Error('File must be HEIC/HEIF format');
  }

  try {
    // Convert using heic2any
    const jpegBlob = await heic2any({
      blob: heicFile,
      toType: 'image/jpeg',
      quality
    });

    return returnBlob ? jpegBlob : URL.createObjectURL(jpegBlob);
  } catch (error) {
    console.error('Conversion error:', error);
    throw new Error('Failed to convert HEIC to JPG');
  }
}

/**
 * Server-side HEIC to JPG conversion (for Node.js/API routes)
 * @param {string} inputPath - Path to HEIC file
 * @param {string} outputPath - Path to save JPG
 * @param {object} options - Conversion options
 * @param {number} [options.quality=80] - JPEG quality (1-100)
 */
export async function convertHeicToJpgServer(inputPath, outputPath, options = {}) {
  const { quality = 80 } = options;
  
  try {
    const { exec } = await import('child_process');
    const { promisify } = await import('util');
    const execAsync = promisify(exec);

    await execAsync(`convert "${inputPath}" -quality ${quality} "${outputPath}"`);
  } catch (error) {
    console.error('Server conversion error:', error);
    throw new Error('Server-side HEIC conversion failed');
  }
}