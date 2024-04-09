/**
 * react useState 结合 sessionStorage，在改变状态时会存储状态到sessionStorage
 *
 * @param value 初始值 | 计算初始值的函数
 *
 * @param storgeKey stroage 存储的键
 *
 * @returns [state, setState]
 */
/**
 * react useState combined with sessionStorage will store the state to sessionStorage when changing the state.
 *
 * @param value initial value | function to calculate initial value
 *
 * @param storageKey stroage stored key
 *
 * @returns [state, setState]
 */
export declare function useSessonState<T>(value: T | (() => T), storgeKey?: string): readonly [T, (state: T | ((prev?: T) => T)) => void];
