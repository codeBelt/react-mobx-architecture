import { Constructor } from '../definitions/Constructor';
import { FlattenIfArray } from '../definitions/FlattenIfArray';

export const createModels = <T>(Model: Constructor<FlattenIfArray<T>>, data: T) => {
  return !Array.isArray(data) ? new Model(data) : (data.map((json) => new Model(json)) as any);
};
