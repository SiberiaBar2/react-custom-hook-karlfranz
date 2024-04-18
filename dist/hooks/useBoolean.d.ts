/**
 * @value useState维护的布尔值状态
 *
 * @on 将状态设置为true的函数
 *
 * @off 将状态设置为false的函数
 *
 * @toggle 对状态取反的函数
 */
/**
 * Boolean value state maintained by @value useState
 *
 * @on function that sets the status to true
 *
 * @off function that sets the status to false
 *
 * @toggle function to invert the state
 */
export declare const useBoolean: (initValue?: boolean) => {
    readonly value: boolean;
    readonly toggle: () => void;
    readonly on: () => void;
    readonly off: () => void;
};
