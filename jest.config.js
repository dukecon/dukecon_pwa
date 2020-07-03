module.exports = {
	moduleFileExtensions: ['js', 'json', 'vue'],
	testURL: 'http://localhost/',
	transform: {
		'^.+\\.js$': '<rootDir>/node_modules/babel-jest',
		'^.+\\.vue$': '<rootDir>/node_modules/vue-jest',
	},
	transformIgnorePatterns: ['/node_modules/(?!vis)/.+\\.js'],
	moduleNameMapper: {
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|ico|oga)$': '<rootDir>/test/mocks/file-mock',
		'\\.(css|less|scss|sass)$': '<rootDir>/test/mocks/style-mock',
		'^vue$': 'vue/dist/vue.common.js',
		'@/(.*)$': '<rootDir>/src/$1',
		'^test/(.*)$': '<rootDir>/test/$1',
	},
	setupFiles: ['<rootDir>/test/setup'],
};
