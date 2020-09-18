const path = require('path')
const resolve = require('@rollup/plugin-node-resolve').default
const commonjs = require('@rollup/plugin-commonjs')
const {rollup} = require('rollup')

async function build() {
	const bundle = await rollup({
		input : require.resolve('./app.js'),
		plugins: [
			resolve({
				resolveOnly: [
					/app|module/
				],
				dedupe(importee) {
					console.log(importee)
					return false
				}
			}),
			commonjs(),
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
