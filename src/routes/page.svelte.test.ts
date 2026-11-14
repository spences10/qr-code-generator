import { expect, test } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-svelte';
import Page from './+page.svelte';

test('renders the QR generator and its default QR code', async () => {
	await render(Page);
	await expect
		.element(page.getByRole('heading', { name: 'QR Code Generator' }))
		.toBeVisible();
	await expect
		.element(page.getByRole('textbox').first())
		.toHaveValue('https://scottspence.com');
	await expect
		.element(document.querySelector<SVGElement>('main svg'))
		.toBeVisible();
});
