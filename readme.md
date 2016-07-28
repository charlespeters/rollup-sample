# Rollup.js Build

There's a lot of tools for bundling JavaScript files, browserify, webpack, require.js, and I wanted to checkout this one. [Rollup.js](http://rollupjs.org/) does [tree-shaking](https://medium.com/@Rich_Harris/tree-shaking-versus-dead-code-elimination-d3765df85c80#.nl42xh6eo) which can lead to smaller bundle sizes. Rollup does have some config to it and this is an example using npm scripts.

## Setup

Setup the project by cloning the repo and installing the dependencies:

```Shell
git clone https://github.com/charlespeters/rollup-sample.git; cd rollup-sample; npm install
```

Run the build:

```Shell
npm run scripts:build
```

### Config

In this configuration, I'm using babel, commonjs and uglify. Setting up the config took a little bit of effort but once I setup [node-resolve](https://github.com/rollup/rollup-plugin-node-resolve) with [commonjs](https://github.com/rollup/rollup-plugin-commonjs) it started performing the build as you'd expect it.

```JavaScript
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';

const config = {
  entry: 'src/global.js',
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    commonjs({include: 'node_modules/**'}),
    babel({exclude: 'node_modules/**'}),
    uglify()
  ],
  external: ['path', 'fs', 'builtin-modules']
};

export default config;
```
