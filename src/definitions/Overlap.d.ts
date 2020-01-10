type Overlap<T, U> = { [K in Extract<keyof T, keyof U>]: U[K] | T[K] };
