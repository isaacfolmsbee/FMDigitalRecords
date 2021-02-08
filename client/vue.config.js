const path = require('path');

module.exports = {
	outputDir: path.resolve(__dirname, '../dist/static'),
	devServer: {
		proxy: {
			'api/': {
				target: 'http://localhost:5000'
			}
		}
	}
};