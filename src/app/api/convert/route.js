import { NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const format = formData.get('format'); // e.g., 'png'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Sharp conversion
    const convertedBuffer = await sharp(buffer)
      .toFormat(format)
      .toBuffer();

    return new NextResponse(convertedBuffer, {
      status: 200,
      headers: {
        'Content-Type': `image/${format}`,
        'Content-Disposition': `attachment; filename="converted.${format}"`
      }
    });

  } catch (error) {
    console.error('Server conversion error:', error);
    return NextResponse.json({ error: 'Conversion failed' }, { status: 500 });
  }
}