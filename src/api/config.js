import stubServerConfig from './stubServerConfig';

const config = {
  api: {
    stub: {
      host: `http://localhost:${stubServerConfig.port}/`,
      appId: 0,
    },
    localhost: {
      host: 'http://localhost:3000/',
      appId: 0,
    },
    fixer: {
      host: 'http://api.fixer.io/',
    },
    openexchangerates: {
      host: 'https://openexchangerates.org/api/',
      appId: '6eef3f05cd1240038ac66da30384cb5c',
    },
  },
};

config.defaultHost = config.api.localhost;

export default config;
