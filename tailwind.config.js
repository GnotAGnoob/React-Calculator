function withOpacityValue(variable) {
	return ({ opacityValue }) => {
		if (opacityValue === undefined) {
			return `rgba(var(${variable}))`;
		}
		return `rgba(var(${variable}) / ${opacityValue})`;
	};
}

module.exports = {
	content: ["./src/**/*.{html,js,ts,tsx,jsx}"],
	theme: {
		extend: {
			colors: {
				primary: withOpacityValue("--clr-primary-900-hsl"),
			},
		},
	},
	plugins: [],
};
