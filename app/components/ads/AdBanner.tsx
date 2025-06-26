'use client';

import { useEffect, useRef } from 'react';

interface AdBannerProps {
  adSlot: string;
  adFormat?: 'auto' | 'fluid';
  className?: string;
  style?: React.CSSProperties;
}

export const AdBanner = ({
  adSlot,
  adFormat = 'auto',
  className = '',
  style = {}
}: AdBannerProps) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && adRef.current) {
      try {
        // @ts-ignore - Google AdSense types
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error('AdSense error:', error);
      }
    }
  }, []);

  return (
    <div
      ref={adRef}
      className={`ad-banner ${className}`}
      style={{
        display: 'block',
        textAlign: 'center',
        overflow: 'hidden',
        ...style
      }}
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-YOUR_PUBLISHER_ID" // Replace with your AdSense ID
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
};
