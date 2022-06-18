const common = require("./webpack.common");
const { merge } = require("webpack-merge");

module.exports = merge(common, {
	mode: "development",
	output: {
		filename: "[name].bundle.js",
		//every asset is put into assets unless overriden by test
		assetModuleFilename: "assets/[name].[ext]",
		path: __dirname + "/dev",
		publicPath: "/",
	},

	//plugins: [new MiniCssExtractPlugin({ filename: "[name].css" })],

	devServer: {
		//makes it so that when the html is changed, live server
		//will hard reset the page
		watchFiles: ["./src/**/*.html"],
		historyApiFallback: true,
	},

	module: {
		rules: [
			{
				test: /\.scss$/i,
				//modules load in reverse order
				use: [
					//MiniCssExtractPlugin.loader,
					"style-loader",
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
							sourceMap: true,
						},
					},
				],
			},
		],
	},
});
