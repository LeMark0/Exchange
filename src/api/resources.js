import config from './config';
import methodList from './methodList';

const endpointList = {
  currency: {
    latest: {
      useStub: false,
      host: config.api.openexchangerates.host,
      method: methodList.get,
      url: 'latest', // required
      transformRequest: (params) => ({
        ...params,
        app_id: config.api.openexchangerates.appId,
      }),
    },
  },
  user: {
    balance: {
      useStub: true,
      host: config.api.localhost.host,
      method: methodList.get,
      url: 'user/balance', // required
      transformRequest: (/* params */) => ({}),
    },
  },
};

function generateAlias(list, pathList = []) {
  return Object.keys(list).reduce((acc, curr) => {
    const paths = [...pathList, curr];

    acc[curr] = (list[curr].url)
      ? { ...list[curr], alias: paths.join('.') }
      : generateAlias(list[curr], paths);

    return acc;
  }, {});
}

export default generateAlias(endpointList);
