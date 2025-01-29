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

<div class="min-h-screen bg-base-200 py-8">
	<div class="container mx-auto px-4">
		<!-- Header -->
		<div class="mb-8 text-center">
			<h1 class="text-4xl font-bold">QR Code Generator</h1>
			<p class="mt-2 text-base-content/70">
				Create beautiful, customized QR codes in seconds
			</p>
		</div>

		<div class="grid gap-8 lg:grid-cols-12">
			<!-- Controls -->
			<div class="order-1 lg:col-span-6">
				<div class="card bg-base-100 shadow-xl">
					<div class="card-body space-y-4">
						<!-- Main Options -->
						<div class="rounded-box bg-base-200">
							<div
								class="flex items-center justify-between rounded-box bg-base-300 px-4 py-2"
							>
								<h3 class="text-sm font-medium">Main Options</h3>
							</div>
							<div class="space-y-4 p-4">
								<!-- URL Input -->
								<div class="form-control w-full">
									<label for="url_input" class="label">
										<span class="label-text">Enter URL</span>
									</label>
									<input
										type="url"
										id="url_input"
										bind:value={qr_state.url_input}
										placeholder="https://example.com"
										class="input w-full border-0 bg-base-100 focus:outline-none"
									/>
								</div>

								<!-- Image Upload -->
								<div class="form-control w-full">
									<label for="image_upload" class="label">
										<span class="label-text">Upload Logo</span>
									</label>
									<input
										type="file"
										accept="image/*"
										class="file-input file-input-sm w-full border-0 bg-base-100"
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
								</div>

								<!-- Size Control -->
								<div class="form-control w-full">
									<label for="size" class="label">
										<span class="label-text">Size</span>
										<span class="label-text-alt opacity-60"
											>{qr_state.qr_size}px</span
										>
									</label>
									<div class="flex items-center gap-2">
										<span class="text-xs opacity-60">100px</span>
										<input
											type="range"
											id="size"
											bind:value={qr_state.qr_size}
											min="100"
											max="500"
											step="10"
											class="range range-xs flex-1"
											oninput={generate_qr_code}
										/>
										<span class="text-xs opacity-60">500px</span>
									</div>
								</div>

								<!-- Margin -->
								<div class="form-control w-full">
									<label for="margin" class="label">
										<span class="label-text">Margin</span>
										<span class="label-text-alt opacity-60"
											>{qr_state.margin}px</span
										>
									</label>
									<div class="flex items-center gap-2">
										<span class="text-xs opacity-60">0px</span>
										<input
											type="range"
											id="margin"
											bind:value={qr_state.margin}
											min="0"
											max="50"
											step="5"
											class="range range-xs flex-1"
											oninput={generate_qr_code}
										/>
										<span class="text-xs opacity-60">50px</span>
									</div>
								</div>
							</div>
						</div>

						<!-- Dots Options -->
						<div class="collapse bg-base-200">
							<input type="checkbox" class="min-h-0" checked />
							<div
								class="collapse-title min-h-0 bg-base-300 px-4 py-2"
							>
								<h3 class="text-sm font-medium">Dots Options</h3>
							</div>
							<div class="collapse-content space-y-4 p-4">
								<div class="form-control">
									<label for="style" class="label">
										<span class="label-text">Pattern</span>
									</label>
									<select
										id="style"
										bind:value={qr_state.dot_style}
										class="select select-sm w-full border-0 bg-base-100"
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
								</div>

								<div class="form-control">
									<label class="label cursor-pointer">
										<span class="label-text">Color Type</span>
										<div class="flex gap-4">
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
									</label>
								</div>

								<div class="form-control">
									<label for="dot_color" class="label">
										<span class="label-text">Color</span>
										<span class="label-text-alt opacity-60"
											>{qr_state.dot_color}</span
										>
									</label>
									<input
										type="color"
										id="dot_color"
										bind:value={qr_state.dot_color}
										class="h-8 w-8 cursor-pointer appearance-none border-0 bg-transparent"
										oninput={generate_qr_code}
									/>
								</div>
							</div>
						</div>

						<!-- Corner Square Options -->
						<div class="collapse bg-base-200">
							<input type="checkbox" class="min-h-0" checked />
							<div
								class="collapse-title min-h-0 bg-base-300 px-4 py-2"
							>
								<h3 class="text-sm font-medium">
									Corner Square Options
								</h3>
							</div>
							<div class="collapse-content space-y-4 p-4">
								<div class="form-control">
									<label for="corner_square_style" class="label">
										<span class="label-text">Pattern</span>
									</label>
									<select
										id="corner_square_style"
										bind:value={qr_state.corner_square_style}
										class="select select-sm w-full border-0 bg-base-100"
										onchange={generate_qr_code}
									>
										<option value="rounded">Rounded</option>
										<option value="dots">Dots</option>
										<option value="square">Square</option>
										<option value="extra-rounded"
											>Extra Rounded</option
										>
									</select>
								</div>

								<div class="form-control">
									<label class="label cursor-pointer">
										<span class="label-text">Color Type</span>
										<div class="flex gap-4">
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
									</label>
								</div>

								<div class="form-control">
									<label for="corner_square_color" class="label">
										<span class="label-text">Color</span>
										<span class="label-text-alt opacity-60"
											>{qr_state.corner_square_color}</span
										>
									</label>
									<input
										type="color"
										id="corner_square_color"
										bind:value={qr_state.corner_square_color}
										class="h-8 w-8 cursor-pointer appearance-none border-0 bg-transparent"
										oninput={generate_qr_code}
									/>
								</div>
							</div>
						</div>

						<!-- Corner Dot Options -->
						<div class="collapse bg-base-200">
							<input type="checkbox" class="min-h-0" checked />
							<div
								class="collapse-title min-h-0 bg-base-300 px-4 py-2"
							>
								<h3 class="text-sm font-medium">
									Corner Dot Options
								</h3>
							</div>
							<div class="collapse-content space-y-4 p-4">
								<div class="form-control">
									<label for="corner_dot_style" class="label">
										<span class="label-text">Pattern</span>
									</label>
									<select
										id="corner_dot_style"
										bind:value={qr_state.corner_dot_style}
										class="select select-sm w-full border-0 bg-base-100"
										onchange={generate_qr_code}
									>
										<option value="rounded">Rounded</option>
										<option value="dots">Dots</option>
										<option value="square">Square</option>
									</select>
								</div>

								<div class="form-control">
									<label class="label cursor-pointer">
										<span class="label-text">Color Type</span>
										<div class="flex gap-4">
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
									</label>
								</div>

								<div class="form-control">
									<label for="corner_dot_color" class="label">
										<span class="label-text">Color</span>
										<span class="label-text-alt opacity-60"
											>{qr_state.corner_dot_color}</span
										>
									</label>
									<input
										type="color"
										id="corner_dot_color"
										bind:value={qr_state.corner_dot_color}
										class="h-8 w-8 cursor-pointer appearance-none border-0 bg-transparent"
										oninput={generate_qr_code}
									/>
								</div>
							</div>
						</div>

						<!-- Background Options -->
						<div class="collapse bg-base-200">
							<input type="checkbox" class="min-h-0" checked />
							<div
								class="collapse-title min-h-0 bg-base-300 px-4 py-2"
							>
								<h3 class="text-sm font-medium">
									Background Options
								</h3>
							</div>
							<div class="collapse-content space-y-4 p-4">
								<div class="form-control">
									<label class="label cursor-pointer">
										<span class="label-text">Color Type</span>
										<div class="flex gap-4">
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
									</label>
								</div>

								<div class="form-control">
									<label for="background_color" class="label">
										<span class="label-text">Color</span>
										<span class="label-text-alt opacity-60"
											>{qr_state.background_color}</span
										>
									</label>
									<input
										type="color"
										id="background_color"
										bind:value={qr_state.background_color}
										class="h-8 w-8 cursor-pointer appearance-none border-0 bg-transparent"
										oninput={generate_qr_code}
									/>
								</div>
							</div>
						</div>

						<!-- Image Options -->
						{#if qr_state.image_src}
							<div class="collapse bg-base-200">
								<input type="checkbox" class="min-h-0" checked />
								<div
									class="collapse-title min-h-0 bg-base-300 px-4 py-2"
								>
									<h3 class="text-sm font-medium">Image Options</h3>
								</div>
								<div class="collapse-content space-y-4 p-4">
									<div class="form-control">
										<label class="label cursor-pointer">
											<span class="label-text"
												>Hide Background Dots</span
											>
											<input
												type="checkbox"
												class="checkbox checkbox-sm"
												checked
											/>
										</label>
									</div>

									<div class="form-control">
										<label for="image_size" class="label">
											<span class="label-text">Image Size</span>
											<span class="label-text-alt opacity-60"
												>{Math.round(
													qr_state.image_size * 100,
												)}%</span
											>
										</label>
										<div class="flex items-center gap-2">
											<span class="text-xs opacity-60">10%</span>
											<input
												type="range"
												id="image_size"
												bind:value={qr_state.image_size}
												min="0.1"
												max="0.9"
												step="0.1"
												class="range range-xs flex-1"
												oninput={generate_qr_code}
											/>
											<span class="text-xs opacity-60">90%</span>
										</div>
									</div>

									<div class="form-control">
										<label for="image_margin" class="label">
											<span class="label-text">Image Margin</span>
											<span class="label-text-alt opacity-60"
												>{qr_state.image_margin}px</span
											>
										</label>
										<div class="flex items-center gap-2">
											<span class="text-xs opacity-60">0px</span>
											<input
												type="range"
												id="image_margin"
												bind:value={qr_state.image_margin}
												min="0"
												max="20"
												step="1"
												class="range range-xs flex-1"
												oninput={generate_qr_code}
											/>
											<span class="text-xs opacity-60">20px</span>
										</div>
									</div>
								</div>
							</div>
						{/if}

						<!-- QR Options -->
						<div class="collapse bg-base-200">
							<input type="checkbox" class="min-h-0" checked />
							<div
								class="collapse-title min-h-0 bg-base-300 px-4 py-2"
							>
								<h3 class="text-sm font-medium">QR Options</h3>
							</div>
							<div class="collapse-content space-y-4 p-4">
								<div class="form-control">
									<label for="type_number" class="label">
										<span class="label-text">Type Number</span>
									</label>
									<input
										type="number"
										id="type_number"
										bind:value={qr_state.type_number}
										min="0"
										max="40"
										class="input input-sm w-full border-0 bg-base-100"
										oninput={generate_qr_code}
									/>
								</div>

								<div class="form-control">
									<label for="error_correction" class="label">
										<span class="label-text">Error Correction</span>
									</label>
									<select
										id="error_correction"
										bind:value={qr_state.error_correction}
										class="select select-sm w-full border-0 bg-base-100"
										onchange={generate_qr_code}
									>
										<option value="L">Low (7%)</option>
										<option value="M">Medium (15%)</option>
										<option value="Q">Quartile (25%)</option>
										<option value="H">High (30%)</option>
									</select>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- QR Code Preview -->
			<div class="order-2 h-fit lg:sticky lg:top-8 lg:col-span-6">
				<div class="card bg-base-100 shadow-xl">
					<div class="card-body">
						<h2 class="card-title">Preview</h2>
						<div
							class="flex aspect-square w-full items-center justify-center rounded-box bg-base-200/50"
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
			</div>
		</div>
	</div>
</div>
