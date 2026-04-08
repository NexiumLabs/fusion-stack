import deepmerge from "deepmerge"

type JsonObject = Record<string, unknown>

const arrayDedup = (dest: unknown[], src: unknown[]) =>
  [...new Set([...dest, ...src])]

export function mergePackageJsons(fragments: JsonObject[]): JsonObject {
  if (fragments.length === 0) return {}

  return fragments.reduce<JsonObject>((acc, frag) => {
    return deepmerge(acc, frag, {
      arrayMerge: arrayDedup,
      // For plain objects (scripts, deps) deepmerge does the right thing:
      // keys from `frag` (later slice) win on conflict.
    })
  }, {})
}

export function mergeTsconfigs(fragments: JsonObject[]): JsonObject {
  if (fragments.length === 0) return {}
  return fragments.reduce<JsonObject>((acc, frag) =>
    deepmerge(acc, frag, { arrayMerge: arrayDedup })
  , {})
}
