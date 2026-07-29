"use client";

import { useEffect, useState } from "react";
import BlackHole from "./Blackhole";

const LoadingScreen = ({ onLoadingComplete }) => {
  const [visible, setVisible] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Check if the loader has already been shown
  useEffect(() => {
    const shown = sessionStorage.getItem("loaderShown");

    if (!shown) {
      setVisible(true);
    }

    setInitialized(true);
  }, []);

  useEffect(() => {
    // Wait until we've checked sessionStorage
    if (!initialized) return;

    // Loader was already shown
    if (!visible) {
      onLoadingComplete();
      return;
    }

    const handleLoad = () => {
      setTimeout(() => {
        sessionStorage.setItem("loaderShown", "true");
        setVisible(false);
        onLoadingComplete();
      }, 10000);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);

      return () => {
        window.removeEventListener("load", handleLoad);
      };
    }
  }, [visible, initialized, onLoadingComplete]);

  // Don't render anything until we know whether to show the loader
  if (!initialized || !visible) return null;

  return (
    <div className="fixed inset-0 z-50">
      <BlackHole />
    </div>
  );
};

export default LoadingScreen;