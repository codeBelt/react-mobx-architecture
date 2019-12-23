import environment, { Environments } from './base';

const baseApi = 'https://api.tvmaze.com';
const env = environment(baseApi);

const testEnv: Environments = {
  ...env,
  // override anything that gets added from base.
  isProduction: false,
  isDevelopment: true,
  isTesting: true,
};

export default testEnv;
