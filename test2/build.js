const path = require('path')
const resolve = require('@rollup/plugin-node-resolve').default
const commonjs = require('@rollup/plugin-commonjs')
const {rollup} = require('rollup')
const {babel} = require('@rollup/plugin-babel')

async function build() {
	const bundle = await rollup({
		input : require.resolve('./app.js'),
		plugins: [
			resolve({
				resolveOnly: [
					/babel|core-js/
				],
				// dedupe(importee) {
				// 	console.log(importee)
				// 	return false
				// },
			}),
			commonjs(),
			babel({
				babelrc: false,
				exclude: 'node_modules/**',
				babelHelpers: 'runtime',
				plugins: [
					[
						'@babel/plugin-transform-runtime', {
							corejs      : 3,
							useESModules: true,
						}
					],
				],
			}),
		],
	})

	const result = await bundle.write({
		file: 'bundle.js',
		format: 'cjs'
	})

	console.log(result.output[0].code)
}

build()
	.catch(ex => console.error(ex))
