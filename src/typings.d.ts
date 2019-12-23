declare module 'environment' {
  const value: {
    route: {
      baseRoute: string;
    };
    api: {
      shows: string;
      showsSearch: string;
      episodes: string;
      cast: string;
      errorExample: string;
    };
    isDevelopment: boolean;
    isProduction: boolean;
    isTesting?: boolean;
  };

  export default value;
}
