const fs = require('fs')
const path = require('path')
const { rollup } = require('rollup')
const replace = require('rollup-plugin-replace')
const nodeResolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const { uglify } = require('rollup-plugin-uglify')
const meta = require('../package.json')

const banner = `/*!
 * Vue Rellax v${meta.version}
 * ${meta.homepage}
 *
 * @license
 * Copyright (c) 2018 ${meta.author}
 * Released under the MIT license
 * ${meta.homepage}/blob/master/LICENSE
 */`

const name = meta.name.split('/').pop();

const configs = [
  {
    format: 'es',
    dest: `dist/${name}.esm.js`
  },
  {
    format: 'cjs',
    dest: `dist/${name}.cjs.js`
  },
  {
    format: 'umd',
    env: 'development',
    dest: `dist/${name}.js`
  },
  {
    format: 'umd',
    env: 'production',
    dest: `dist/${name}.min.js`
  }
]

const baseConfig = {
  input: 'lib/index.js',
  output: {
    name: 'Vue Rellax',
    banner,
    globals: {
      vue: 'Vue'
    }
  },
  external: ['vue'],
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true
    }),
    commonjs({
      sourceMap: false
    })
  ]
}

function build (c) {
  const config = Object.assign({}, baseConfig, {
    output: Object.assign({}, baseConfig.output, {
      format: c.format,
      file: c.dest
    }),
    plugins: baseConfig.plugins.slice()
  })

  if (c.env) {
    config.plugins.push(
      replace({
        'process.env.NODE_ENV': JSON.stringify(c.env)
      })
    )
  }

  if (c.env === 'production') {
    config.plugins.push(
      uglify({
        output: {
          comments: function(node, comment) {
            if (comment.type === "comment2") {
              // multiline comment
              return /@preserve|@license|@cc_on/i.test(comment.value);
            }
            return false;
          }
        }
      })
    )
  }

  rollup(config)
    .then(bundle => {
      return bundle.write(config.output)
    })
    .catch(err => {
      console.error(err)
      process.exit(1)
    })
}

configs.forEach(build)

fs.copyFileSync(
  path.resolve(__dirname, '../src/nuxt-plugin.js'),
  path.resolve(__dirname, '../lib/nuxt-plugin.js')
)
