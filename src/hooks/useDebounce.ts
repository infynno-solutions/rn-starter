import { useRef } from "react";

const BOUNCE_RATE = 2000;

export const useDebounce = () => {
  const busy = useRef<boolean>(false);

  const debounce = async (callback:()=>void) => {
    setTimeout(() => {
      busy.current = false;
    }, BOUNCE_RATE);

    if (!busy.current) {
      busy.current = true;
      callback();
    }
  };

  return { debounce };
};
