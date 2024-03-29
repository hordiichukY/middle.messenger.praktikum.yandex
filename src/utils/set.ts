import { merge } from './merge';
import { isPlainObject, PlainObject } from './helpers';

export function set(
  object: PlainObject | unknown,
  path: string,
  value: unknown
): PlainObject | unknown {
  if (!isPlainObject(object)) {
    return object;
  }

  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  const result = path.split('.').reduceRight<PlainObject>(
    (acc, key) => ({
      [key]: acc,
    }),
    value as any
  );
  return merge(object as PlainObject, result);
}
