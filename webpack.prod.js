const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { extendDefaultPlugins } = require("svgo");

const common = require("./webpack.common");
const { merge } = require("webpack-merge");

module.exports = merge(common, {
	mode: "production",
	output: {
		//hash to force download because of the cache in production
		filename: "[name].[contenthash].bundle.js",
		//every asset is put into imgs unless overriden by test
		assetModuleFilename: "imgs/[name].[contenthash].[ext]",
		path: __dirname + "/public",
	},

	plugins: [
		new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }),
		new CleanWebpackPlugin(),
	],

	module: {
		rules: [
			{
				test: /\.scss$/i,
				//modules load in reverse order
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							sourceMap: true,
						},
					},
					"postcss-loader",
					//"sass-loader",
					{
						loader: "sass-loader",
						options: {
							sassOptions: {
								outputStyle: "expanded",
							},
						},
					},
				],
			},
			{
				test: /\.(woff2?|ttf|eot)(\?v=\w+)?$/,
				generator: {
					filename: "fonts/[name].[ext]",
				},
			},
		],
	},

	optimization: {
		minimizer: [
			`...`,
			new CssMinimizerPlugin(),
			new ImageMinimizerPlugin({
				minimizer: {
					implementation: ImageMinimizerPlugin.imageminMinify,
					options: {
						// Lossless optimization with custom option
						// Feel free to experiment with options for better result for you
						plugins: [
							["gifsicle", { interlaced: true }],
							["jpegtran", { progressive: true }],
							["optipng", { optimizationLevel: 5 }],
							// Svgo configuration here https://github.com/svg/svgo#configuration
							[
								"svgo",
								{
									plugins: [
										{
											name: "removeViewBox",
											active: false,
										},
										{
											name: "addAttributesToSVGElement",
											params: {
												attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
											},
										},
									],
								},
							],
						],
					},
				},
			}),
		],
	},
});
