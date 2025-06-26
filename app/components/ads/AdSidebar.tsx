"use client";

import { useEffect, useRef } from "react";

interface AdSidebarProps {
  adSlot: string;
  className?: string;
  style?: React.CSSProperties;
}

export const AdSidebar = ({
  adSlot,
  className = "",
  style = {},
}: AdSidebarProps) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && adRef.current) {
      try {
        // @ts-ignore - Google AdSense types
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        // Silently handle AdSense errors
      }
    }
  }, []);

  return (
    <div
      ref={adRef}
      className={`ad-sidebar hidden lg:block ${className}`}
      style={{
        display: "block",
        textAlign: "center",
        overflow: "hidden",
        minHeight: "250px",
        ...style,
      }}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-YOUR_PUBLISHER_ID" // Replace with your AdSense ID
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="false"
      />
    </div>
  );
};
