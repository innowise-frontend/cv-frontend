import { useEffect, useState } from "react";

export const useMobileDevice = () => {
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkIsMobileDevice = () => {
      const userAgent = navigator.userAgent;
      const isMobile =
        /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent) ||
        /Mobile/i.test(userAgent);

      setIsMobileDevice(isMobile);
    };

    checkIsMobileDevice();
  }, []);

  return { isMobileDevice };
};
