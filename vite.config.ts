import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite-plus';
import { playwright } from 'vite-plus/test/browser-playwright';

export default defineConfig({
	plugins: [
		sveltekit({ adapter: adapter(), preprocess: vitePreprocess() }),
		tailwindcss(),
	],
	test: {
		projects: [
			{
				extends: './vite.config.ts',
				test: {
					name: 'client',
					browser: {
						enabled: true,
						provider: playwright(),
						instances: [{ browser: 'chromium', headless: true }],
					},
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**'],
				},
			},
			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}'],
				},
			},
		],
	},
	fmt: {
		useTabs: true,
		singleQuote: true,
		printWidth: 70,
		trailingComma: 'all',
		proseWrap: 'always',
		svelte: true,
		sortTailwindcss: { stylesheet: './src/app.css' },
		ignorePatterns: [
			'.svelte-kit/**',
			'build/**',
			'coverage/**',
			'playwright-report/**',
			'test-results/**',
			'pnpm-lock.yaml',
		],
	},
	lint: {
		ignorePatterns: [
			'.svelte-kit/**',
			'build/**',
			'coverage/**',
			'playwright-report/**',
			'test-results/**',
		],
		options: { typeAware: true, typeCheck: true },
	},
});
