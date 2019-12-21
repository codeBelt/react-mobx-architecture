/*
 * Base is the default environment for production.
 * Add everything here and override value in other files if needed.
 */
export default function baseEnv(baseApi: string) {
  return {
    route: {
      baseRoute: '',
    },
    api: {
      cast: `${baseApi}/shows/:showId/cast`,
      episodes: `${baseApi}/shows/:showId/episodes`,
      shows: `${baseApi}/shows/:showId`,
      showsSearch: `${baseApi}/singlesearch/shows`,
      errorExample: 'https://httpstat.us/520',
    },
    isProduction: true,
    isDevelopment: false,
    isTesting: false,
  };
}
