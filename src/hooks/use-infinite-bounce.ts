import { useMotionValue, animate } from "framer-motion";
import { useCallback, useRef } from "react";

export const useInfiniteBounce = () => {
  const y = useMotionValue(0);

  const shouldBounceRef = useRef(false);

  // wrap in useCallback to memoize function
  const bounce = useCallback(async () => {
    shouldBounceRef.current = true;

    // start animation animate function
    animate(y, [0, -100, 0], {
      onComplete: () => {
        if (shouldBounceRef.current) {
          bounce();
        }
      },
    });
  }, [y]);

  const enqueueStop = useCallback(() => (shouldBounceRef.current = false), []);

  return [y, bounce, enqueueStop] as const;
};
