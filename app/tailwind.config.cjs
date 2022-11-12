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
		"text-primary",
		"border-success",
		"border-error",
		"border-warning",
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
				warning: "#A56300",
				success: "#00801A",
				darkGrey: "#F1F1F1",
				grey: "#F2F2F2",
			},
			margin: {
				lg: "160px",
				xl: "20em",
			},
			padding: {
				xl: "325px",
			},
		},
	},
	plugins: [],
};
