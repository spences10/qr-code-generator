import type {
	CornerDotType,
	CornerSquareType,
	DotType,
	ErrorCorrectionLevel,
	Options,
	TypeNumber,
} from 'qr-code-styling';

function create_qr_state() {
	// Basic QR code state
	let url_input = $state('https://scottspence.com');
	let qr_size = $state(300);
	let dot_style = $state<DotType>('rounded' as DotType);
	let dot_color = $state('#000000');
	let background_color = $state('#ffffff');

	// Advanced QR code state
	let margin = $state(20);
	let corner_square_style = $state<CornerSquareType>(
		'rounded' as CornerSquareType,
	);
	let corner_dot_style = $state<CornerDotType>(
		'rounded' as CornerDotType,
	);
	let corner_square_color = $state('#000000');
	let corner_dot_color = $state('#000000');

	// Image options state
	let image_src = $state<string | null>(null);
	let image_margin = $state(5);
	let image_size = $state(0.4); // 40% of QR size

	// QR code settings
	let error_correction = $state<ErrorCorrectionLevel>('M');
	let type_number = $state<TypeNumber>(0);

	// QR code instance reference
	let qr_code = $state<any>(null);
	let qr_element = $state<HTMLDivElement | null>(null);

	// Derived state for QR code configuration
	let qr_config = $derived<Partial<Options>>(
		(() => {
			const base_config = {
				width: qr_size,
				height: qr_size,
				type: 'svg' as const,
				data: url_input,
				margin,
				qrOptions: {
					typeNumber: type_number,
					errorCorrectionLevel: error_correction,
				},
				dotsOptions: {
					color: dot_color || '#000000',
					type: dot_style,
				},
				cornersSquareOptions: {
					type: corner_square_style,
					color: corner_square_color || '#000000',
				},
				cornersDotOptions: {
					type: corner_dot_style,
					color: corner_dot_color || '#000000',
				},
				backgroundOptions: {
					color: background_color || '#ffffff',
				},
			};

			if (image_src) {
				return {
					...base_config,
					image: image_src,
					imageOptions: {
						hideBackgroundDots: true,
						imageSize: image_size,
						margin: image_margin,
						crossOrigin: 'anonymous',
					},
				};
			}

			return base_config;
		})(),
	);

	return {
		get url_input() {
			return url_input;
		},
		set url_input(v: string) {
			url_input = v;
		},

		get qr_size() {
			return qr_size;
		},
		set qr_size(v: number) {
			qr_size = v;
		},

		get dot_style() {
			return dot_style;
		},
		set dot_style(v: DotType) {
			dot_style = v;
		},

		get dot_color() {
			return dot_color;
		},
		set dot_color(v: string) {
			dot_color = v;
		},

		get background_color() {
			return background_color;
		},
		set background_color(v: string) {
			background_color = v;
		},

		get margin() {
			return margin;
		},
		set margin(v: number) {
			margin = v;
		},

		get corner_square_style() {
			return corner_square_style;
		},
		set corner_square_style(v: CornerSquareType) {
			corner_square_style = v;
		},

		get corner_dot_style() {
			return corner_dot_style;
		},
		set corner_dot_style(v: CornerDotType) {
			corner_dot_style = v;
		},

		get corner_square_color() {
			return corner_square_color;
		},
		set corner_square_color(v: string) {
			corner_square_color = v;
		},

		get corner_dot_color() {
			return corner_dot_color;
		},
		set corner_dot_color(v: string) {
			corner_dot_color = v;
		},

		get image_src() {
			return image_src;
		},
		set image_src(v: string | null) {
			image_src = v;
		},

		get image_margin() {
			return image_margin;
		},
		set image_margin(v: number) {
			image_margin = v;
		},

		get image_size() {
			return image_size;
		},
		set image_size(v: number) {
			image_size = v;
		},

		get error_correction() {
			return error_correction;
		},
		set error_correction(v: ErrorCorrectionLevel) {
			error_correction = v;
		},

		get type_number() {
			return type_number;
		},
		set type_number(v: TypeNumber) {
			type_number = v;
		},

		get qr_code() {
			return qr_code;
		},
		set qr_code(v: any) {
			qr_code = v;
		},

		get qr_element() {
			return qr_element;
		},
		set qr_element(v: HTMLDivElement | null) {
			qr_element = v;
		},

		get qr_config() {
			return qr_config;
		},
	};
}

export const qr_state = create_qr_state();
