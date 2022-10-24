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
		"text-primary",
		"bg-hero-image",
		"bg-primary",
		"bg-darkGrey",
		"bg-pattern",
	],
	theme: {
		extend: {
			backgroundImage: {
				"hero-image": "url('/assets/home/desktop/image-hero.jpg')",
				"bg-pattern": "url('/assets/home/desktop/pattern-circles.svg')",
			},

			colors: {
				primary: "#D87D4A",
				primaryHover: "#fbaf85",
				error: "#CD2C2C",
				darkGrey: "#F1F1F1",
			},
			margin: {
				xl: "20em",
			},
			padding: {
				xl: "325px",
			},
		},
	},
	plugins: [],
};
