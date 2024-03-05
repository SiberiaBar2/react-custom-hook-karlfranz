type SyncFunc<K> = (value: K) => void | undefined;
type DispatchFunc<K> = (newData: K | ((prev: K) => K), callF?: SyncFunc<K>) => Promise<K>;
type ReturnArray<K> = [K, DispatchFunc<K>];
export declare const useStateSync: <T>(initValue: T) => ReturnArray<T>;
export {};
