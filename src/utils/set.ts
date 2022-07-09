import { merge } from './merge'
import { isPlainObject, PlainObject } from './helpers'

export function set(
  object: PlainObject | unknown,
  path: string,
  value: unknown
): PlainObject | unknown {
  if (typeof path !== 'string') {
    throw 'path must be string'
  }
  if (!isPlainObject(object)) {
    return object
  }

  const splittedPath = path.split('.')

  const o = splittedPath.slice(0, -1).reduceRight(
    (acc, el) => {
      const origin = { [el]: acc }
      return origin
    },
    { [splittedPath[splittedPath.length - 1]]: value }
  )

  return merge(object as PlainObject, o)
}
