import { useEffect, useState } from "react";

const MOBILE_MEDIA_QUERY = "(max-width: 767px)";

const isMobileUserAgent = () => {
  if (typeof navigator === "undefined") return false;

  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(
    navigator.userAgent
  );
};

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);
    const updateIsMobile = () =>
      setIsMobile(mediaQuery.matches || isMobileUserAgent());

    updateIsMobile();
    mediaQuery.addEventListener("change", updateIsMobile);

    return () => {
      mediaQuery.removeEventListener("change", updateIsMobile);
    };
  }, []);

  return isMobile;
};

export default useIsMobile;
