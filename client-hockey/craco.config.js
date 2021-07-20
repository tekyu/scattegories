const path = require('path');

module.exports = {
  webpack: {
    alias: {
      assets: path.resolve(__dirname, 'src/assets/'),
      store: path.resolve(__dirname, 'src/store/'),
      components: path.resolve(__dirname, 'src/components/'),
      containers: path.resolve(__dirname, 'src/containers/'),
      utils: path.resolve(__dirname, 'src/utils/'),
      i18n: path.resolve(__dirname, 'src/i18n/'),
      mocks: path.resolve(__dirname, 'src/mocks/'),
    },
  },
};
