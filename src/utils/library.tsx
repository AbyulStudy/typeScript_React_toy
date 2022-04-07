import {
  ExternalProvider,
  JsonRpcFetchFunc,
  Web3Provider,
} from '@ethersproject/providers';

const getLibrary = (provider: ExternalProvider | JsonRpcFetchFunc) => {
  const libray = new Web3Provider(provider);
  libray.pollingInterval = 12000;

  return libray;
};

export default getLibrary;
