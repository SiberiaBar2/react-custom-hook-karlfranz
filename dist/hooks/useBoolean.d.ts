export declare const useBoolean: (initValue?: boolean) => readonly [boolean, {
    readonly toggle: () => void;
    readonly on: () => void;
    readonly off: () => void;
}];
