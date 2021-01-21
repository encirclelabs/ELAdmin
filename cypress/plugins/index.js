// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
//require() '@cypress/code-coverage/support';
const {
	addMatchImageSnapshotPlugin,
} = require('cypress-image-snapshot/plugin');

// const {
// 	addMatchImageSnapshotPlugin,
// } = require('cypress-image-snapshot/plugin');
// 'npm install -D del' - https://www.npmjs.com/package/del
const del = require('del');
const wp = require('@cypress/webpack-preprocessor');
const path = require('path');

// module.exports = (on, config) => {
// 	on('after:spec', (spec, results) => {
// 		if (results.stats.failures === 0 && results.video) {
// 			// `del()` returns a promise, so it's important to return it to ensure
// 			// deleting the video is finished before moving on
// 			return del(result.video);
// 		}
// 	});
// };

module.exports = (on, config) => {
	addMatchImageSnapshotPlugin(on, config);
	require('@cypress/code-coverage/task')(on, config);

	const options = {
		webpackOptions: {
			resolve: {
				extensions: ['.ts', '.tsx', '.js'],
				// Uncomment once all tests are fixed on /azure-pipelines branch and merged into master
				/*         alias: {
                  "~": path.resolve(__dirname, "../../src"),
                  "~support": path.resolve(__dirname, "../support")
                } */
			},
			module: {
				rules: [
					{
						test: /\.ts$/,
						exclude: [/node_modules/],
						use: {
							loader: 'ts-loader',
							options: {
								transpileOnly: 'true',
							},
						},
					},
					{
						// when bundling application's own source code
						// transpile using and instrument code using babel-plugin-istanbul
						test: /\.(ts|tsx|js)$/,
						exclude: /(node_modules|bower_components)/,
						use: {
							loader: 'babel-loader',
							options: {
								presets: ['@babel/preset-typescript'],
								plugins: ['istanbul'],
							},
						},
					},
				],
			},
		},
	};

	// on('file:preprocessor', wp(options));
	// on('before:browser:launch', (browser, options) => {
	// 	const downloadDirectory = path.join(
	// 		__dirname,
	// 		'../fixtures/',
	// 		'outputfiles'
	// 	);

	// 	if (browser.family === 'chromium') {
	// 		options.preferences.default['download'] = {
	// 			prompt_for_download: false,
	// 			default_directory: downloadDirectory,
	// 		};

	// 		return options;
	// 	}
	// 	console.log(downloadDirectory, path, browser.family);
	// 	if (browser.family === 'firefox') {
	// 		options.preferences['browser.download.dir'] = downloadDirectory;
	// 		options.preferences['browser.download.folderList'] = 2;

	// 		// needed to prevent download prompt for text/csv files.
	// 		options.preferences['browser.helperApps.neverAsk.saveToDisk'] =
	// 			'text/csv';

	// 		return options;
	// 	}
	// });

	return require('@bahmutov/cypress-extends')(config.configFile);
};
