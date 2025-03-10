import { useState, useRef, useEffect, startTransition } from "react";

export const useDebounce = <T>(
  value: T,
  delay: number,
  shouldSuspend: boolean = true
) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const latestValueRef = useRef<T>(value);

  const cancel = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    latestValueRef.current = value;

    cancel();

    timerRef.current = setTimeout(() => {
      if (latestValueRef.current === value) {
        if (!shouldSuspend) {
          startTransition(() => {
            setDebouncedValue(value);
          });
        } else {
          setDebouncedValue(value);
        }
      }
      timerRef.current = null;
    }, delay);

    return cancel;
  }, [value, delay, shouldSuspend]);

  return { debouncedValue, cancel };
};
