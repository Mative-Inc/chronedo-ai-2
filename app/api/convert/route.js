// app/api/convert/route.js
import { promises as fs } from 'fs';
import path from 'path';
import { tmpdir } from 'os';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Create temporary paths
    const tempDir = tmpdir();
    const inputPath = path.join(tempDir, file.name);
    const outputPath = path.join(tempDir, `${Date.now()}.jpg`);

    // Write file to disk
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await fs.writeFile(inputPath, buffer);

    // Convert using ImageMagick (Windows-compatible command)
    const { exec } = require('child_process');
    const { promisify } = require('util');
    const execAsync = promisify(exec);

    // Modified command for Windows compatibility
    await execAsync(`magick "${inputPath}" -quality 90 "${outputPath}"`);

    // Read converted file
    const imageBuffer = await fs.readFile(outputPath);

    // Clean up
    await Promise.all([
      fs.unlink(inputPath),
      fs.unlink(outputPath)
    ]);

    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Content-Disposition': 'attachment; filename="converted.jpg"'
      }
    });
  } catch (error) {
    console.error('Conversion error:', error);
    return NextResponse.json(
      { error: 'Conversion failed. Please ensure ImageMagick is installed correctly.' },
      { status: 500 }
    );
  }
}