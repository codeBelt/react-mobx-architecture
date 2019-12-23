export type FlattenIfArray<T> = T extends (infer R)[] ? R : T;
