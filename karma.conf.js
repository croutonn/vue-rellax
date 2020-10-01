process.env.CHROME_BIN = process.env.IS_CI ? process.env.CHROME_BIN : require('puppeteer').executablePath()

module.exports = function (config) {
  config.set({
    frameworks: ['mocha', 'karma-typescript'],

    files: [
      'src/**/*.ts',
      'tests/unit/**/*.spec.ts'
    ],

    preprocessors: {
      '**/*.ts': 'karma-typescript'
    },

    reporters: ['spec', 'karma-typescript'],

    browsers: ['ChromeHeadless'],

    karmaTypescriptConfig: {
      compilerOptions: {
        module: 'commonjs',
        lib: [
          'es2015',
          'es2015.collection',
          'dom'
        ],
        suppressImplicitAnyIndexErrors: true,
        importHelpers: true,
        allowSyntheticDefaultImports: true,
        esModuleInterop: true
      }
    }
  })
}