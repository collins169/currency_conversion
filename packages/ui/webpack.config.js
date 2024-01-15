const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path')

module.exports = {
	resolve: {
		plugins: [new TsconfigPathsPlugin({})],
		alias: {
			"@/components": path.resolve(__dirname, "src/components"),
			"@/constants": path.resolve(__dirname, "src/constants"),
			"@/pages": path.resolve(__dirname, "src/pages"),
		},
	},
};