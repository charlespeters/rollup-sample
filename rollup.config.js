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
