import { qr_state } from '$lib/state/qr-code.state.svelte';

export const generate_qr_code = async () => {
	if (!qr_state.qr_config.data) return;

	const QRCodeStyling = (await import('qr-code-styling')).default;

	if (qr_state.qr_code) {
		qr_state.qr_code.update(qr_state.qr_config);
	} else {
		const new_qr = new QRCodeStyling(qr_state.qr_config);
		qr_state.qr_code = new_qr;
		if (qr_state.qr_element) {
			new_qr.append(qr_state.qr_element);
		}
	}
};

export const copy_to_clipboard = async () => {
	if (!qr_state.qr_code) return;

	try {
		// Get the SVG data
		const svg_data = await qr_state.qr_code.getRawData('svg');

		// Create SVG blob and URL
		const svg_blob = new Blob([svg_data], { type: 'image/svg+xml' });
		const blob_url = URL.createObjectURL(svg_blob);

		// Create an Image object
		const temp_img = new Image();
		temp_img.src = blob_url;

		// Wait for image to load
		await new Promise((resolve) => {
			temp_img.onload = resolve;
		});

		// Create canvas and draw image
		const temp_canvas = document.createElement('canvas');
		temp_canvas.width = qr_state.qr_size;
		temp_canvas.height = qr_state.qr_size;
		const canvas_ctx = temp_canvas.getContext('2d');
		canvas_ctx?.drawImage(
			temp_img,
			0,
			0,
			qr_state.qr_size,
			qr_state.qr_size,
		);

		// Convert to blob and copy
		const png_blob = await new Promise<Blob | null>((resolve) => {
			temp_canvas.toBlob(resolve, 'image/png');
		});

		if (png_blob) {
			await navigator.clipboard.write([
				new ClipboardItem({
					'image/png': png_blob,
				}),
			]);
		}

		// Cleanup
		URL.revokeObjectURL(blob_url);
	} catch (error) {
		console.error('Failed to copy:', error);
	}
};

export const download_qr = async () => {
	if (!qr_state.qr_code) return;
	await qr_state.qr_code.download({ extension: 'svg' });
};
