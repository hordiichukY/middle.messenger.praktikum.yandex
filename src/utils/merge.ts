import { isPlainObject, PlainObject } from './helpers'

export function merge(target: PlainObject, source: PlainObject): PlainObject {
  const result = Object.assign({}, target)
  if (isPlainObject(target) && isPlainObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isPlainObject(source[key])) {
        if (!(key in target)) {
          Object.assign(result, { [key]: source[key] })
        } else {
          result[key] = merge(
            target[key] as PlainObject,
            source[key] as PlainObject
          )
        }
      } else {
        Object.assign(result, { [key]: source[key] })
      }
    })
  }
  return result
}
