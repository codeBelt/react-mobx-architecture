/* tslint:disable no-any */
import {toCamelCase} from './stringUtil';

/**
 * @callback renameCallback
 * @param {string} the key value on the object
 * @return {string} the key value on the object
 */

/**
 * Recursively goes through all object and copy the values to a new object.
 * If a rename callback is passed in the property will be available to be transformed.
 *
 * @param {object} src The object you to clone.
 * @param {renameCallback} renamePropertyNameFunction Optional function to rename property names
 * @returns {any} Returns a clone object of the one passed in.
 */
export const clone =
  (src: any, renamePropertyNameFunction?: (keyName: string) => string): object => {
    if (src == null || typeof src !== 'object') {
      return src;
    }

    if (src instanceof Date) {
      return new Date(src.getTime());
    }

    if (src instanceof RegExp) {
      return new RegExp(src);
    }

    if (src instanceof Array) {
      return src.map(item => clone(item, renamePropertyNameFunction));
    }

    if (src instanceof Object) {
      const hasRenameFunction = typeof renamePropertyNameFunction === 'function';

      return Object.keys(src).reduce((newObject: {[key: string]: any}, propertyName: string) => {
        const name = hasRenameFunction
          ? renamePropertyNameFunction!(propertyName)
          : propertyName;

        newObject[name] = clone(src[propertyName], renamePropertyNameFunction);

        return newObject;
      }, {});
    }

    throw new Error(`Unable to copy. ${src} isn't supported.`);
  };

/**
 * Makes all property names camelCase so they are consistent in the application.
 * Also recursively goes through child objects.
 *
 * @param {object} json
 * @returns {any} Returns a cloned object with all property names camelCased
 */
export function propertyNormalizer(json: any): any {
  const dataOrEmptyObject = json ? json : {};

  return clone(dataOrEmptyObject, toCamelCase);
}
