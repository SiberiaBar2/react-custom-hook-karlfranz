/**
 *
 * @param value 初始值 | 计算初始值的函数
 * @param storgeKey stroage 存储的键
 * @returns [state, setState]
 */
export declare function useStorgeState<T>(value: T | (() => T), storgeKey?: string): readonly [T, (state: T | ((prev?: T) => T)) => void];
