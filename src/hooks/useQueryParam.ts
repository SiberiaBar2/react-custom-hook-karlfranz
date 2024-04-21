import { useCallback, useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { cleanObject } from "../utils";

export const useQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams] = useSearchParams();
  const setSearchParams = useSetUrlSearchParam();

  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParams.get(key) || "" };
        }, {} as { [key in K]: string }),
      [keys, searchParams]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      return setSearchParams(params);
    },
  ] as const;
};

export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (params: { [key in string]: unknown }) => {
    const o = cleanObject({
      ...Object.fromEntries(searchParams),
      ...params,
    }) as URLSearchParamsInit;
    return setSearchParams(o);
  };
};

export const useClealSearchParam = () => {
  const [searchParams] = useSearchParams();
  const clearSearchParams = useSetUrlSearchParam();

  return useCallback(() => {
    const clearParams = Object.keys(Object.fromEntries(searchParams)).reduce(
      (prev, key) => {
        return {
          ...prev,
          [key]: "",
        };
      },
      {} as { [x: string]: unknown }
    );

    clearSearchParams(clearParams);
  }, [clearSearchParams, searchParams]);
};
