import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/esm.js',
    format: 'esm'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
      presets: ['@babel/preset-env'],
      plugins: ['babel-plugin-transform-class-properties']
    })
  ]
};
