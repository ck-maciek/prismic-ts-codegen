import * as fs from "node:fs/promises";
import * as path from "node:path";

import findCacheDirectory from "find-cache-dir";

import * as pkg from "../../package.json";

export async function readCache(key: string): Promise<string | undefined> {
	const cacheDir = findCacheDirectory({ name: pkg.name });

	if (!cacheDir) {
		return;
	}

	const filePath = path.join(cacheDir, key);

	try {
		await fs.mkdir(path.dirname(filePath), { recursive: true });

		return await fs.readFile(filePath, "utf8");
	} catch {
		// noop
	}
}
