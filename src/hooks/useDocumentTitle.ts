import { useCallback, useEffect, useRef } from "react";

/**
 *
 * change title
 *
 * @param title
 *
 * @param keepOnUnmount
 * 
 * @returns () => void; a function to change title
 */
export const useDocumentTitle = (title: string, keepOnUnmount = true) => {
  const oldTitle = useRef(document.title).current;

  const changeTitle = useCallback(() => {
    document.title = title;
  }, []);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle;
      }
    };
  }, [keepOnUnmount, oldTitle]);

  return changeTitle;
};
