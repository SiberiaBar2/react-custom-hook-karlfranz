export declare const useFuncDebounce: () => <T extends Function, K, U extends unknown[]>(callback: T, delay?: number, change?: boolean) => (object?: K | undefined, ...args: U) => void;
