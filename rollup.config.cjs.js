import config from './rollup.config';

export default Object.assign({}, config, {
  output: {
    file: 'dist/common.js',
    format: 'cjs'
  }
});
