const HtmlWebPackPlugin = require('html-webpack-plugin')

const htmlPlugin = new HtmlWebPackPlugin({
	template: './playground/index.html',
	filename: './index.html',
	inject: 'head'
})

module.exports = {
	output: {
		library: 'Cropolis',
		libraryTarget: 'umd'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
			          presets: ['@babel/react'],
			          plugins: ['@babel/plugin-proposal-class-properties']
			        }
				}
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader'
					}
				]
			}
		]
	},
	plugins: [htmlPlugin]
}
