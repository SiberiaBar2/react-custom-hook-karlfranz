import { useEffect, useRef } from "react";

/**
 * Identify the status of component mounting and uninstallation
 * 
 * true indicates that it has been mounted
 * 
 * @returns React.MutableRefObject<boolean>
 */
export const useMountRef = () => {
  const mountedRef = useRef(false);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });

  return mountedRef;
};
