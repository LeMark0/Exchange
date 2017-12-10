import axios from 'axios';
import get from 'lodash/get';
import flow from 'lodash/flow';
import resourceList from './resources';
import apiConfig from './config';
import methodList from './methodList';

function getResourceHost(resourceConfig) {
  if (resourceConfig.useStub) {
    return apiConfig.api.stub.host;
  }

  return (resourceConfig.host)
    ? resourceConfig.host
    : apiConfig.defaultHost.host;
}

const createStubURI = (uri = '') => `${(
  uri
    .replace(/(\/\{\w+\})/g, '')
    .replace(/\//g, '_')
)}.json`;

function prepareResource(resourceConfig = {}) {
  return flow(
    (config) => ({ ...config, host: getResourceHost(config) }),
    (config) => ({
      ...config,
      url: (resourceConfig.useStub) ? createStubURI(config.url) : config.url,
    }),
  )(resourceConfig);
}

export default function (resource, params) {
  const resourceConfig = prepareResource(get(resourceList, resource));
  const clientConfig = {
    method: resourceConfig.method,
    baseURL: getResourceHost(resourceConfig),
    url: resourceConfig.url,
    transformRequest: [resourceConfig.transformRequest],
  };
  if ([methodList.put, methodList.post, methodList.patch].includes(resourceConfig.method)) {
    clientConfig.data = params;
  }
  if (resourceConfig.method === methodList.get) {
    clientConfig.params = (resourceConfig.transformRequest)
      ? resourceConfig.transformRequest(params)
      : params;
  }
  if (resourceConfig.transformResponse) {
    clientConfig.transformResponse = [].concat(
      axios.defaults.transformResponse,
      resourceConfig.transformResponse,
    );
  }

  return axios(clientConfig);
}
