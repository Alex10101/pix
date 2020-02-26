module.exports = {
  presets: ['react-app'],
  env: {
    development: {},
    test: {
      presets: [['@babel/preset-env', { targets: { node: 'current' } }]]
    }
  }
};
