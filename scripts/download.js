import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

const BASE_URL =
	'https://bunny-wp-pullzone-ncfzohx2s9.b-cdn.net/app/themes/drinkzoi/resources/assets/images/frames/';
//   "https://www.drinkzoi.co/app/themes/drinkzoi/resources/assets/frames/";

const OUTPUT_DIR = path.resolve('frames');
const TOTAL_FRAMES = 192;

// ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
	fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function downloadFrames() {
	for (let i = 1; i <= TOTAL_FRAMES; i++) {
		const filename = `frame_${String(i).padStart(4, '0')}.webp`;
		const url = BASE_URL + filename;
		const filepath = path.join(OUTPUT_DIR, filename);

		try {
			const res = await fetch(url);

			if (!res.ok) {
				console.warn(`⚠️  Skip ${filename} (${res.status})`);
				continue;
			}

			const buffer = Buffer.from(await res.arrayBuffer());
			fs.writeFileSync(filepath, buffer);

			console.log(`✅ Downloaded ${filename}`);
		} catch (err) {
			console.error(`❌ Error downloading ${filename}:`, err);
		}
	}

	console.log('🎉 All frames processed');
}

downloadFrames();
