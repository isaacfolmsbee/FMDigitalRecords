module.exports = {
	purge: ['./public/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			animation: {
				'slide-fade-in': 'slide-in 0.28s linear, fade-in 0.3s linear'
			},
			keyframes: {
				'slide-in': {
					'0%': { right: '-50px' },
					'100%': { right: 0 },
				},
				'fade-in': {
					'0%': { opacity: 0 },
					'100%': { opacity: 1 },
				}
			}
		},
		colors: {
			'blue': {
				'50': '#91d4f7',
				'100': '#88d0f7',
				'200': '#6bc5f5',
				'300': '#31aef2',
				'400': '#0e94dd',
				'500': '#0b71a8',
				'600': '#085781',
				'700': '#063d5b',
				'800': '#053048',
				'900': '#042a3e',
			},
			'green': {
				'50': '#a5f8ad',
				'100': '#99f5a2',
				'200': '#72ee7f',
				'300': '#22dd35',
				'400': '#23be32',
				'500': '#219c2d',
				'600': '#197b23',
				'700': '#13621b',
				'800': '#105116',
				'900': '#0f4d15',
			},
			'gray': {
				'50': '#ededed',
				'100': '#e6e6e6',
				'200': '#d4d4d4',
				'300': '#b5b5b5',
				'400': '#919191',
				'500': '#6e6e6e',
				'600': '#4a4a4a',
				'700': '#2b2b2b',
				'800': '#1a1a1a',
				'900': '#121212',
			},
		}
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
