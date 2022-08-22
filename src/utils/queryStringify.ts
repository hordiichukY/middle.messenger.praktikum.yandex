import { isPlainObject } from './helpers';
import { isArray } from './helpers';

type StringIndexed = Record<string, any>;

export function queryStringify(data: StringIndexed): string | never {
  if (!isPlainObject(data)) {
    throw 'input must be an object';
  }
  const result: string[] = [];

  function check(key: string, value: any) {
    if (typeof value !== 'object' || value === null) {
      result.push(`${key}=${value}`);
    }
    if (isArray(value)) {
      value.forEach((el, i) => {
        result.push(`${key}[${i}]=${el}`);
      });
    }
    if (isPlainObject(value)) {
      Object.entries(value).forEach((el) => {
        const checkIfNotObj = el.every((elem) => !isPlainObject(elem));
        if (checkIfNotObj) {
          result.push(`${key}[${el[0]}]=${el[1]}`);
        } else {
          const newKey = `${key}[${[el[0]]}]`;
          check(newKey, el[1]);
        }
      });
    }
  }

  for (const [key, value] of Object.entries(data)) {
    check(key, value);
  }
  return result.join('&');
}
