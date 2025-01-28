/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				bannerImg: "url('/assets/images-mufasa.png')",
				blackOverlay:
					'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)',
			},
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
			},
			// Добавляем кастомные анимации
			animation: {
				slide: 'slide 5s infinite',
				fadeIn: 'fadeIn 1.5s ease-in-out',
				fadeOut: 'fadeOut 1.5s ease-in-out',
			},
			// Добавляем ключевые кадры
			keyframes: {
				slide: {
					'0%': { transform: 'translateX(0%)' },
					'100%': { transform: 'translateX(-100%)' },
				},
				fadeIn: {
					'0%': { opacity: 0 },
					'100%': { opacity: 1 },
				},
				fadeOut: {
					'0%': { opacity: 1 },
					'100%': { opacity: 0 },
				},
			},
		},
	},
	plugins: [
		require('tailwind-scrollbar-hide'), // Плагин для скрытия скроллбара
	],
}
