/* eslint-disable no-prototype-builtins */
import { PlainObject } from './helpers';

export function merge(target: PlainObject, source: PlainObject): PlainObject {
  for (const prop in source) {
    if (!source.hasOwnProperty(prop)) {
      continue;
    }

    try {
      if ((source[prop] as PlainObject).constructor === Object) {
        source[prop] = merge(
          target[prop] as PlainObject,
          source[prop] as PlainObject
        );
      } else {
        target[prop] = source[prop];
      }
    } catch (e) {
      target[prop] = source[prop];
    }
  }

  return target;
}
