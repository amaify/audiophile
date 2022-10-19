/** @type {import('tailwindcss').Config} */

module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./layouts/**/*.{js,ts,jsx,tsx}",
		"./lib/**/*.{js,ts,jsx,tsx}",
	],
	safelist: [
		"text-error",
		"text-warning",
		"text-success",
		"bg-error",
		"bg-warning",
		"bg-success",
		"bg-hero-image",
		"border-success",
		"border-error",
		"border-warning",
		"form-success",
		"form-error",
		"form-warning",
	],
	theme: {
		extend: {
			backgroundImage: {
				"hero-image": "url('/assets/home/desktop/image-hero.jpg')",
			},
		},
	},
	plugins: [],
};
