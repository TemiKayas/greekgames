'use client';

import { useEffect, useRef, useState } from 'react';

interface AdInGameProps {
  adSlot: string;
  showAfterRounds?: number;
  currentRound?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const AdInGame = ({
  adSlot,
  showAfterRounds = 3,
  currentRound = 1,
  className = '',
  style = {}
}: AdInGameProps) => {
  const adRef = useRef<HTMLDivElement>(null);
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    // Show ad after specified number of rounds
    if (currentRound > 0 && currentRound % showAfterRounds === 0) {
      setShouldShow(true);
    }
  }, [currentRound, showAfterRounds]);

  useEffect(() => {
    if (typeof window !== 'undefined' && adRef.current && shouldShow) {
      try {
        // @ts-ignore - Google AdSense types
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error('AdSense error:', error);
      }
    }
  }, [shouldShow]);

  if (!shouldShow) {
    return null;
  }

  return (
    <div
      ref={adRef}
      className={`ad-in-game ${className}`}
      style={{
        display: 'block',
        textAlign: 'center',
        overflow: 'hidden',
        margin: '20px 0',
        ...style
      }}
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-YOUR_PUBLISHER_ID" // Replace with your AdSense ID
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};
