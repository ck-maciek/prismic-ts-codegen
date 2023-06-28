import * as fs from "node:fs/promises";
import * as path from "node:path";

import findCacheDirectory from "find-cache-dir";

import * as pkg from "../../package.json";

export async function setCache(key: string, value: string): Promise<void> {
	const cacheDir = findCacheDirectory({ name: pkg.name });

	if (!cacheDir) {
		return;
	}

	const filePath = path.join(cacheDir, key);

	try {
		await fs.mkdir(path.dirname(filePath), { recursive: true });
		await fs.writeFile(filePath, value);
	} catch {
		// noop
	}
}
