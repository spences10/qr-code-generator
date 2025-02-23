<script lang="ts">
	import { qr_state } from '$lib/state/qr-code.state.svelte';
	import {
		copy_to_clipboard,
		download_qr,
		generate_qr_code,
	} from './qr-functions';

	let element: HTMLDivElement;

	$effect(() => {
		if (element) {
			qr_state.qr_element = element;
		}
	});

	$effect(() => {
		if (qr_state.url_input) {
			generate_qr_code();
		}
	});
</script>

<main class="bg-base-200 min-h-screen py-8">
	<div class="container mx-auto px-4">
		<header class="mb-8 text-center">
			<h1 class="text-4xl font-bold">QR Code Generator</h1>
			<p class="text-base-content/70 mt-2">
				Create beautiful, customized QR codes in seconds
			</p>
		</header>

		<div class="grid gap-8 lg:grid-cols-12">
			<!-- Controls -->
			<section class="order-1 lg:col-span-6">
				<div class="card bg-base-100 shadow-xl">
					<form class="card-body space-y-4">
						<!-- Main Options -->
						<fieldset class="rounded-box bg-base-200">
							<legend
								class="rounded-box bg-base-300 w-full px-4 py-2"
							>
								<h3 class="text-sm font-medium">Main Options</h3>
							</legend>
							<div class="space-y-4 p-4">
								<!-- URL Input -->
								<label class="w-full">
									<span class="label-text">Enter URL</span>
									<input
										type="url"
										bind:value={qr_state.url_input}
										placeholder="https://example.com"
										class="input bg-base-100 mt-2 w-full border-0 focus:outline-none"
									/>
								</label>

								<!-- Image Upload -->
								<label class="w-full">
									<span class="label-text">Upload Logo</span>
									<input
										type="file"
										accept="image/*"
										class="file-input file-input-sm bg-base-100 mt-2 w-full border-0"
										onchange={(e) => {
											const input = e.target as HTMLInputElement;
											const file = input.files?.[0];
											if (file) {
												const reader = new FileReader();
												reader.onload = (e) => {
													const result = e.target?.result;
													if (typeof result === 'string') {
														qr_state.image_src = result;
														generate_qr_code();
													}
												};
												reader.readAsDataURL(file);
											}
										}}
									/>
								</label>

								<!-- Size Control -->
								<label class="w-full">
									<div class="flex justify-between">
										<span class="label-text">Size</span>
										<span class="text-sm opacity-60">
											{qr_state.qr_size}px
										</span>
									</div>
									<div class="mt-2 flex items-center gap-2">
										<span class="text-xs opacity-60">100px</span>
										<input
											type="range"
											bind:value={qr_state.qr_size}
											min="100"
											max="500"
											step="10"
											class="range range-xs flex-1"
											oninput={generate_qr_code}
										/>
										<span class="text-xs opacity-60">500px</span>
									</div>
								</label>

								<!-- Margin -->
								<label class="w-full">
									<div class="flex justify-between">
										<span class="label-text">Margin</span>
										<span class="text-sm opacity-60">
											{qr_state.margin}px
										</span>
									</div>
									<div class="mt-2 flex items-center gap-2">
										<span class="text-xs opacity-60">0px</span>
										<input
											type="range"
											bind:value={qr_state.margin}
											min="0"
											max="50"
											step="5"
											class="range range-xs flex-1"
											oninput={generate_qr_code}
										/>
										<span class="text-xs opacity-60">50px</span>
									</div>
								</label>
							</div>
						</fieldset>

						<!-- Dots Options -->
						<fieldset class="bg-base-200 collapse">
							<input type="checkbox" class="min-h-0" checked />
							<legend
								class="collapse-title bg-base-300 min-h-0 px-4 py-2"
							>
								<h3 class="text-sm font-medium">Dots Options</h3>
							</legend>
							<div class="collapse-content space-y-4 p-4">
								<label>
									<span class="label-text">Pattern</span>
									<select
										bind:value={qr_state.dot_style}
										class="select select-sm bg-base-100 mt-2 w-full border-0"
										onchange={generate_qr_code}
									>
										<option value="rounded">Rounded</option>
										<option value="dots">Dots</option>
										<option value="classy">Classy</option>
										<option value="classy-rounded"
											>Classy Rounded</option
										>
										<option value="square">Square</option>
										<option value="extra-rounded"
											>Extra Rounded</option
										>
									</select>
								</label>

								<fieldset>
									<legend class="label-text">Color Type</legend>
									<div class="mt-2 flex gap-4">
										<label class="flex items-center gap-2">
											<input
												type="radio"
												class="radio radio-sm"
												name="dot_color_type"
												checked
											/>
											<span class="label-text">Single</span>
										</label>
										<label class="flex items-center gap-2">
											<input
												type="radio"
												class="radio radio-sm"
												name="dot_color_type"
											/>
											<span class="label-text">Gradient</span>
										</label>
									</div>
								</fieldset>

								<label>
									<div class="flex justify-between">
										<span class="label-text">Color</span>
										<span class="text-sm opacity-60"
											>{qr_state.dot_color}</span
										>
									</div>
									<input
										type="color"
										bind:value={qr_state.dot_color}
										class="mt-2 h-8 w-8 cursor-pointer appearance-none border-0 bg-transparent"
										oninput={generate_qr_code}
									/>
								</label>
							</div>
						</fieldset>

						<!-- Corner Square Options -->
						<fieldset class="bg-base-200 collapse">
							<input type="checkbox" class="min-h-0" checked />
							<legend
								class="collapse-title bg-base-300 min-h-0 px-4 py-2"
							>
								<h3 class="text-sm font-medium">
									Corner Square Options
								</h3>
							</legend>
							<div class="collapse-content space-y-4 p-4">
								<label>
									<span class="label-text">Pattern</span>
									<select
										bind:value={qr_state.corner_square_style}
										class="select select-sm bg-base-100 mt-2 w-full border-0"
										onchange={generate_qr_code}
									>
										<option value="rounded">Rounded</option>
										<option value="dots">Dots</option>
										<option value="square">Square</option>
										<option value="extra-rounded"
											>Extra Rounded</option
										>
									</select>
								</label>

								<fieldset>
									<legend class="label-text">Color Type</legend>
									<div class="mt-2 flex gap-4">
										<label class="flex items-center gap-2">
											<input
												type="radio"
												class="radio radio-sm"
												name="corner_square_color_type"
												checked
											/>
											<span class="label-text">Single</span>
										</label>
										<label class="flex items-center gap-2">
											<input
												type="radio"
												class="radio radio-sm"
												name="corner_square_color_type"
											/>
											<span class="label-text">Gradient</span>
										</label>
									</div>
								</fieldset>

								<label>
									<div class="flex justify-between">
										<span class="label-text">Color</span>
										<span class="text-sm opacity-60"
											>{qr_state.corner_square_color}</span
										>
									</div>
									<input
										type="color"
										bind:value={qr_state.corner_square_color}
										class="mt-2 h-8 w-8 cursor-pointer appearance-none border-0 bg-transparent"
										oninput={generate_qr_code}
									/>
								</label>
							</div>
						</fieldset>

						<!-- Corner Dot Options -->
						<fieldset class="bg-base-200 collapse">
							<input type="checkbox" class="min-h-0" checked />
							<legend
								class="collapse-title bg-base-300 min-h-0 px-4 py-2"
							>
								<h3 class="text-sm font-medium">
									Corner Dot Options
								</h3>
							</legend>
							<div class="collapse-content space-y-4 p-4">
								<label>
									<span class="label-text">Pattern</span>
									<select
										bind:value={qr_state.corner_dot_style}
										class="select select-sm bg-base-100 mt-2 w-full border-0"
										onchange={generate_qr_code}
									>
										<option value="rounded">Rounded</option>
										<option value="dots">Dots</option>
										<option value="square">Square</option>
									</select>
								</label>

								<fieldset>
									<legend class="label-text">Color Type</legend>
									<div class="mt-2 flex gap-4">
										<label class="flex items-center gap-2">
											<input
												type="radio"
												class="radio radio-sm"
												name="corner_dot_color_type"
												checked
											/>
											<span class="label-text">Single</span>
										</label>
										<label class="flex items-center gap-2">
											<input
												type="radio"
												class="radio radio-sm"
												name="corner_dot_color_type"
											/>
											<span class="label-text">Gradient</span>
										</label>
									</div>
								</fieldset>

								<label>
									<div class="flex justify-between">
										<span class="label-text">Color</span>
										<span class="text-sm opacity-60"
											>{qr_state.corner_dot_color}</span
										>
									</div>
									<input
										type="color"
										bind:value={qr_state.corner_dot_color}
										class="mt-2 h-8 w-8 cursor-pointer appearance-none border-0 bg-transparent"
										oninput={generate_qr_code}
									/>
								</label>
							</div>
						</fieldset>

						<!-- Background Options -->
						<fieldset class="bg-base-200 collapse">
							<input type="checkbox" class="min-h-0" checked />
							<legend
								class="collapse-title bg-base-300 min-h-0 px-4 py-2"
							>
								<h3 class="text-sm font-medium">
									Background Options
								</h3>
							</legend>
							<div class="collapse-content space-y-4 p-4">
								<fieldset>
									<legend class="label-text">Color Type</legend>
									<div class="mt-2 flex gap-4">
										<label class="flex items-center gap-2">
											<input
												type="radio"
												class="radio radio-sm"
												name="background_color_type"
												checked
											/>
											<span class="label-text">Single</span>
										</label>
										<label class="flex items-center gap-2">
											<input
												type="radio"
												class="radio radio-sm"
												name="background_color_type"
											/>
											<span class="label-text">Gradient</span>
										</label>
									</div>
								</fieldset>

								<label>
									<div class="flex justify-between">
										<span class="label-text">Color</span>
										<span class="text-sm opacity-60"
											>{qr_state.background_color}</span
										>
									</div>
									<input
										type="color"
										bind:value={qr_state.background_color}
										class="mt-2 h-8 w-8 cursor-pointer appearance-none border-0 bg-transparent"
										oninput={generate_qr_code}
									/>
								</label>
							</div>
						</fieldset>

						<!-- Image Options -->
						{#if qr_state.image_src}
							<fieldset class="bg-base-200 collapse">
								<input type="checkbox" class="min-h-0" checked />
								<legend
									class="collapse-title bg-base-300 min-h-0 px-4 py-2"
								>
									<h3 class="text-sm font-medium">Image Options</h3>
								</legend>
								<div class="collapse-content space-y-4 p-4">
									<label class="flex items-center justify-between">
										<span class="label-text"
											>Hide Background Dots</span
										>
										<input
											type="checkbox"
											class="checkbox checkbox-sm"
											checked
										/>
									</label>

									<label>
										<div class="flex justify-between">
											<span class="label-text">Image Size</span>
											<span class="text-sm opacity-60"
												>{Math.round(
													qr_state.image_size * 100,
												)}%</span
											>
										</div>
										<div class="mt-2 flex items-center gap-2">
											<span class="text-xs opacity-60">10%</span>
											<input
												type="range"
												bind:value={qr_state.image_size}
												min="0.1"
												max="0.9"
												step="0.1"
												class="range range-xs flex-1"
												oninput={generate_qr_code}
											/>
											<span class="text-xs opacity-60">90%</span>
										</div>
									</label>

									<label>
										<div class="flex justify-between">
											<span class="label-text">Image Margin</span>
											<span class="text-sm opacity-60"
												>{qr_state.image_margin}px</span
											>
										</div>
										<div class="mt-2 flex items-center gap-2">
											<span class="text-xs opacity-60">0px</span>
											<input
												type="range"
												bind:value={qr_state.image_margin}
												min="0"
												max="20"
												step="1"
												class="range range-xs flex-1"
												oninput={generate_qr_code}
											/>
											<span class="text-xs opacity-60">20px</span>
										</div>
									</label>
								</div>
							</fieldset>
						{/if}

						<!-- QR Options -->
						<fieldset class="bg-base-200 collapse">
							<input type="checkbox" class="min-h-0" checked />
							<legend
								class="collapse-title bg-base-300 min-h-0 px-4 py-2"
							>
								<h3 class="text-sm font-medium">QR Options</h3>
							</legend>
							<div class="collapse-content space-y-4 p-4">
								<label>
									<span class="label-text">Type Number</span>
									<input
										type="number"
										bind:value={qr_state.type_number}
										min="0"
										max="40"
										class="input input-sm bg-base-100 mt-2 w-full border-0"
										oninput={generate_qr_code}
									/>
								</label>

								<label>
									<span class="label-text">Error Correction</span>
									<select
										bind:value={qr_state.error_correction}
										class="select select-sm bg-base-100 mt-2 w-full border-0"
										onchange={generate_qr_code}
									>
										<option value="L">Low (7%)</option>
										<option value="M">Medium (15%)</option>
										<option value="Q">Quartile (25%)</option>
										<option value="H">High (30%)</option>
									</select>
								</label>
							</div>
						</fieldset>
					</form>
				</div>
			</section>

			<!-- QR Code Preview -->
			<section class="order-2 h-fit lg:sticky lg:top-8 lg:col-span-6">
				<div class="card bg-base-100 shadow-xl">
					<div class="card-body">
						<h2 class="card-title">Preview</h2>
						<div
							class="rounded-box bg-base-200/50 flex aspect-square w-full items-center justify-center"
							bind:this={element}
						></div>
						<div class="card-actions justify-end gap-2">
							<button
								class="btn btn-outline btn-sm"
								onclick={copy_to_clipboard}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-4 w-4"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									><rect
										width="14"
										height="14"
										x="8"
										y="8"
										rx="2"
										ry="2"
									/><path
										d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
									/></svg
								>
								Copy
							</button>
							<button
								class="btn btn-outline btn-sm"
								onclick={download_qr}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-4 w-4"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									><path
										d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
									/><polyline points="7 10 12 15 17 10" /><line
										x1="12"
										x2="12"
										y1="15"
										y2="3"
									/></svg
								>
								Download SVG
							</button>
						</div>
					</div>
				</div>
			</section>
		</div>
	</div>
</main>
