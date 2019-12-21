/*
 * Base is the default environment for production.
 * Add everything here and override value in other files if needed.
 */
export default function baseEnv(baseApi: string) {
  return {
    route: {
      baseRoute: '',
    },
    apiCacheTime: {
      duration: 7,
      unit: 'CacheService.DAYS',
    },
    api: {
      shows: `https://api.tvmaze.com/shows/:showId`,
      episodes: `https://api.tvmaze.com/shows/:showId/episodes`,
      cast: `https://api.tvmaze.com/shows/:showId/cast`,

      categories: `${baseApi}/api/`,
      people: `${baseApi}/api/people/`,
      planets: `${baseApi}/api/planets/`,
      films: `${baseApi}/api/films/`,
      species: `${baseApi}/api/species/`,
      vehicles: `${baseApi}/api/vehicles/`,
      starships: `${baseApi}/api/starships/`,
      errorExample: 'https://httpstat.us/520',
    },
    isProduction: true,
    isDevelopment: false,
    isTesting: false,
  };
}
