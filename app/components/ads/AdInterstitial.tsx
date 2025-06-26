"use client";

import { useEffect, useRef, useState } from "react";

interface AdInterstitialProps {
  adSlot: string;
  showOnGameComplete?: boolean;
  isGameComplete?: boolean;
  onClose?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const AdInterstitial = ({
  adSlot,
  showOnGameComplete = true,
  isGameComplete = false,
  onClose,
  className = "",
  style = {},
}: AdInterstitialProps) => {
  const adRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (showOnGameComplete && isGameComplete) {
      setIsVisible(true);
    }
  }, [showOnGameComplete, isGameComplete]);

  useEffect(() => {
    if (typeof window !== "undefined" && adRef.current && isVisible) {
      try {
        // @ts-ignore - Google AdSense types
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        // Silently handle AdSense errors
      }
    }
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 ${className}`}
      style={style}
    >
      <div className="relative bg-white rounded-lg p-4 max-w-4xl w-full mx-4">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
          aria-label="Close ad"
        >
          ×
        </button>

        <div
          ref={adRef}
          className="ad-interstitial"
          style={{
            display: "block",
            textAlign: "center",
            overflow: "hidden",
            minHeight: "400px",
          }}
        >
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-YOUR_PUBLISHER_ID" // Replace with your AdSense ID
            data-ad-slot={adSlot}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      </div>
    </div>
  );
};
