export const combine = <T1, T2>(target: T1, source: T2): T1 & T2 => {
  return Object.defineProperties(
    target,
    Object.getOwnPropertyDescriptors(source)
  ) as T1 & T2
}
