import environment, { Environments } from './base';

/*
 * base.ts is the default environment for production.
 * You shouldn't have override anything.
 */

const baseApi = 'https://swapi.co';
const env = environment(baseApi);

const productionEnv: Environments = {
  ...env,
  route: {
    ...env.route,
    baseRoute: '/react-redux-architecture', // Fixes issue with Github Pages
  },
};

export default productionEnv;
