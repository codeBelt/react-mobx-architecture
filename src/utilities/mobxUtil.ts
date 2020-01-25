import { UnknownResponseStatus } from '../models/IResponseStatus';
import { APIResponse, SuccessfulResponse, UnsuccessfulResponse } from '../models/api';
import { runInAction } from 'mobx';
import pWaterfall from 'p-waterfall';

type APITransformer<T> = (response: APIResponse<T>) => APIResponse<T>;

export const requestAction = async <T, E>(
  callback: (status: UnknownResponseStatus<T>) => void,
  effect: Promise<APIResponse<T, E>>,
  ...transformers: APITransformer<T>[] // Return type should be the last type in the array.
): Promise<UnknownResponseStatus<T>> => {
  // if there are no transformers args then the type should be the "effect" arg type
  let statusData: UnknownResponseStatus<T> = {
    isRequesting: true,
  };

  runInAction(() => callback(statusData));

  const { data, error } = await pWaterfall<APIResponse<T, E>, SuccessfulResponse<T> | UnsuccessfulResponse<E>>(transformers, effect);

  statusData = {
    isRequesting: false,
  };

  if (error) {
    statusData.error = error;
  } else {
    statusData.data = data!;
  }

  runInAction(() => callback(statusData));

  return statusData;
};

// https://stackoverflow.com/questions/46312206/narrowing-a-return-type-from-a-generic-discriminated-union-in-typescript
// https://medium.com/@KevinBGreene/surviving-the-typescript-ecosystem-type-guards-and-discriminated-unions-3b833c7aff04

// https://dev.to/miracleblue/how-2-typescript-get-the-last-item-type-from-a-tuple-of-types-3fh3
type Prev<T extends number> = [
  -1,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
  32,
  33,
  34,
  35,
  36,
  37,
  38,
  39,
  40,
  41,
  42,
  43,
  44,
  45,
  46,
  47,
  48,
  49,
  50,
  51,
  52,
  53,
  54,
  55,
  56,
  57,
  58,
  59,
  60,
  61,
  62
][T];
type GetLength<original extends any[]> = original extends { length: infer L } ? L : never;
type GetLast<original extends any[]> = original[Prev<GetLength<original>>];

// Here are our test-subject tuples:
type Stuff = [number, boolean, string];
type OtherStuff = [string, number, object, boolean];

// How long is the `Stuff` tuple?
type LengthStuff = GetLength<Stuff>; // => 3

// What is the last element of each tuple?
type LastStuff = GetLast<Stuff>; // => string
type LastOtherStuff = GetLast<OtherStuff>; // => boolean

// Gets the length of an array/tuple type. Example:
//
//   type FooLength = LengthOfTuple<[string, number, boolean]>;
//   //=> 3
//
export type LengthOfTuple<T extends any[]> = T extends { length: infer L } ? L : never;

// Drops the first element of a tuple. Example:
//
//   type Foo = DropFirstInTuple<[string, number, boolean]>;
//   //=> [number, boolean]
//
export type DropFirstInTuple<T extends any[]> = ((...args: T) => any) extends (arg: any, ...rest: infer U) => any ? U : T;

// Gets the type of the last element of a tuple. Example:
//
//   type Foo = LastInTuple<[string, number, boolean]>;
//   //=> boolean
//
//   function lastArg<T extends any[]>(...args: T): LastInTuple<T> {
//     return args[args.length - 1];
//   }
//
//   const bar = lastArg(1);
//   type Bar = typeof bar;
//   //=> number
//
//   const baz = lastArg(1, true, "hey", 123, 1, 2, 3, 4, 5, 6, 7, -1, false);
//   type Baz = typeof baz;
//   //=> boolean
//
export type LastInTuple<T extends any[]> = T[LengthOfTuple<DropFirstInTuple<T>>];
