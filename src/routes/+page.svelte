<script lang="ts">
	import { onMount } from 'svelte';

	let qr_code: any;
	let url_input = '';
	let qr_element: HTMLDivElement;

	const generate_qr_code = async () => {
		if (!url_input) return;

		const QRCodeStyling = (await import('qr-code-styling')).default;

		if (qr_code) {
			qr_code.update({
				data: url_input,
			});
		} else {
			const config = {
				width: 300,
				height: 300,
				type: 'canvas',
				data: url_input,
				dotsOptions: {
					color: '#000000',
					type: 'dots',
				},
				cornersSquareOptions: {
					type: 'square',
				},
				cornersDotOptions: {
					type: 'square',
				},
				backgroundOptions: {
					color: '#ffffff',
				},
			};
			qr_code = new QRCodeStyling(config);

			qr_code.append(qr_element);
		}
	};

	onMount(() => {
		if (url_input) {
			generate_qr_code();
		}
	});
</script>

<div class="container mx-auto max-w-xl p-4">
	<div class="card bg-base-100 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">QR Code Generator</h2>

			<div class="form-control w-full">
				<label for="url_input" class="label">
					<span class="label-text">Enter URL</span>
				</label>
				<input
					type="url"
					id="url_input"
					bind:value={url_input}
					placeholder="https://example.com"
					class="input input-bordered w-full"
				/>
			</div>
			<div class="card-actions mt-4 justify-end">
				<button class="btn btn-primary" onclick={generate_qr_code}>
					Generate QR Code
				</button>
			</div>

			<div
				class="mt-6 flex justify-center"
				bind:this={qr_element}
			></div>
		</div>
	</div>
</div>
