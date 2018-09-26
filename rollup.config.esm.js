import config from './rollup.config';

export default Object.assign({}, config, {
  output: {
    file: 'dist/esm.js',
    format: 'esm'
  }
});
