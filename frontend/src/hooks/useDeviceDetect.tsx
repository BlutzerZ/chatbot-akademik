import { useEffect, useState } from "react";

export function useDeviceDetect() {
      const [isMobile, setIsMobile] = useState(false);

      useEffect(() => {
            const handleResize = () => {
                  setIsMobile(window.innerWidth <= 1024);
            };

            // Set the initial value on component mount
            handleResize();

            window.addEventListener("resize", handleResize);
            // Clean up the event listener on component unmount
            return () => window.removeEventListener("resize", handleResize);
      }, []);

      return isMobile;
}
