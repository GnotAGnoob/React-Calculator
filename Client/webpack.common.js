const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: "./src/tsx/index.tsx",
	devtool: "source-map",

	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/html/index.html",
		}),
	],

	resolve: {
		extensions: [".tsx", ".ts", ".jsx", ".js"],
	},

	module: {
		rules: [
			{
				test: /\.html$/,
				use: ["html-loader"],
			},
			{
				test: /\.(js|ts)x?$/,
				use: ["babel-loader"],
				exclude: /node_modules/,
			},
		],
	},
};
