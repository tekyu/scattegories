/* eslint-disable react-hooks/rules-of-hooks */
const { useBabelRc, override, addWebpackAlias } = require(`customize-cra`);
const path = require(`path`);

module.exports = override(
  useBabelRc(),
  addWebpackAlias({
    root: path.resolve(__dirname, `src`),
    assets: path.resolve(__dirname, `src/assets`),
    store: path.resolve(__dirname, `src/store`),
    components: path.resolve(__dirname, `src/components`),
    containers: path.resolve(__dirname, `src/containers`),
    utils: path.resolve(__dirname, `src/utils`),
    theme: path.resolve(__dirname, `src/theme`),
    i18n: path.resolve(__dirname, `src/i18n`),
    mocks: path.resolve(__dirname, `src/mocks`)
  })
);
