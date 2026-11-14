import { defineConfig } from '@playwright/test';

export default defineConfig({
	use: { baseURL: 'http://localhost:4173' },
	webServer: {
		command: 'pnpm run build && pnpm run preview',
		port: 4173,
	},

	testDir: 'e2e',
});
