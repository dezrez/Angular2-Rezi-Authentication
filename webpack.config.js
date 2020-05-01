// Helper: root(), and rootDir() are defined at the bottom
var path = require('path');
var webpack = require('webpack');

// Webpack Plugins
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
//var ExtractTextPlugin = require('extract-text-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
var ENV = process.env.npm_lifecycle_event;
var isTest = ENV === 'test' || ENV === 'test-watch';
var isProd = ENV === 'build';

module.exports = {
	mode: "development",
	devtool: isTest ? "inline-source-map" : isProd ? 'source-map' : 'eval-source-map',
	entry: isTest ? {} : {
		'polyfills': './src/polyfills.ts',
		'vendor': './src/vendor.ts',
		'app': './src/bootstrap.ts' // our angular app
	},
	output: isTest ? {} : {
		path: root('dist'),
		publicPath: isProd ? '/' : 'https://localhost:8080/',
		filename: isProd ? 'js/[name].[hash].js' : 'js/[name].js',
		chunkFilename: isProd ? '[id].[hash].chunk.js' : '[id].chunk.js'
	},
	resolve: {
		// only discover files that have those extensions
		extensions: ['.ts', '.js', '.json', '.css', '.scss', '.html'],
		alias: {
			'app': 'src/app',
			'common': 'src/common'
		}
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				enforce: 'pre',
				use: [
						{
								loader: 'tslint-loader',
								options: { 
									emitErrors: false,
									failOnHint: false
								}
						}
				],
				exclude: [isTest ? /\.(e2e)\.ts$/ : /\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/]
			},
			{
				test: /\.ts$/,
				loader: 'ts-loader'
			},
			{
				test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'to-string-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ]
			},
			{
				test: /\.html$/, 
				loader: 'raw-loader'
			},
			{
				test: /\.css$/,
				exclude: root('src', 'app'),
				use: [ MiniCssExtractPlugin.loader, 'css-loader' ]
			},
			{
				test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/, 
				loader: 'file-loader?name=fonts/[name].[hash].[ext]?'
			},
			{
				test: /\.json$/, 
				loader: 'json'
			},
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/public/index.html',
			inject: 'body',
			chunksSortMode: packageSort(['polyfills', 'vendor', 'app'])
		}),
		new MiniCssExtractPlugin(), new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			// Environment helpers
			'process.env': {
				ENV: JSON.stringify(ENV),
			}
		}),
		new webpack.ProvidePlugin({
				$: "jquery",
				jQuery: "jquery",
				"window.jQuery": "jquery"
		})
	],
	optimization: {
			splitChunks: { 
			chunks: "all" 
		}
	},
	devServer: {
		contentBase: './src/public',
		historyApiFallback: true,
		https: true,
		hot: true
	}
}

// Helper functions
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}

function rootNode(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return root.apply(path, ['node_modules'].concat(args));
}

function packageSort(packages) {
  // packages = ['polyfills', 'vendor', 'app']
  var len = packages.length - 1;
  var first = packages[0];
  var last = packages[len];
  return function sort(a, b) {
		// polyfills always first
		if(a.names) {
			if (a.names[0] === first) {
				return -1;
			}
			// main always last
			if (a.names[0] === last) {
				return 1;
			}
			// vendor before app
			if (a.names[0] !== first && b.names[0] === last) {
				return -1;
			} else {
				return 1;
			}
		}
  }
}