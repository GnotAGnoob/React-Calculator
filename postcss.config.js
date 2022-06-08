if (process.env.NODE_ENV === "production") {
	module.exports = {
		plugins: [
			require("tailwindcss"),
			require("@fullhuman/postcss-purgecss")({
				content: ["./src/**/*.{html,js,ts}"],
			}),
			require("postcss-preset-env"),
		],
	};
} else {
	module.exports = {
		plugins: [require("tailwindcss")],
	};
}
