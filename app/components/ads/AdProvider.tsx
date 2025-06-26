'use client';

import { useEffect } from 'react';

interface AdProviderProps {
  children: React.ReactNode;
  adSenseId?: string;
}

export const AdProvider = ({ children, adSenseId }: AdProviderProps) => {
  useEffect(() => {
    // Initialize Google AdSense
    if (typeof window !== 'undefined' && adSenseId) {
      // Add AdSense script
      const script = document.createElement('script');
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adSenseId}`;
      script.async = true;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);

      // Add AdSense meta tag
      const meta = document.createElement('meta');
      meta.name = 'google-adsense-account';
      meta.content = adSenseId;
      document.head.appendChild(meta);
    }
  }, [adSenseId]);

  return <>{children}</>;
};
