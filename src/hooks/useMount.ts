import { useEffect } from "react";

export const useMount = (callback: () => void, effect?: () => void) => {
  useEffect(() => {
    callback();
    return () => {
      effect instanceof Function && effect();
    };
  }, []);
};
