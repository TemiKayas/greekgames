"use client";

import { useEffect, useState } from "react";

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

interface ConsentBannerProps {
  onConsentChange?: (consent: boolean) => void;
}

export default function ConsentBanner({ onConsentChange }: ConsentBannerProps) {
  const [showBanner, setShowBanner] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is in EEA, UK, or Switzerland
    const isEEAUser = checkIfEEAUser();

    // Check if consent has already been given
    const hasConsent = localStorage.getItem("adConsent");

    if (isEEAUser && !hasConsent) {
      setShowBanner(true);
    }

    setIsLoading(false);
  }, []);

  const checkIfEEAUser = (): boolean => {
    // This is a simplified check - you might want to use a more robust solution
    // like a geolocation API or IP-based detection
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const eeaTimezones = [
      "Europe/London",
      "Europe/Paris",
      "Europe/Berlin",
      "Europe/Rome",
      "Europe/Madrid",
      "Europe/Amsterdam",
      "Europe/Brussels",
      "Europe/Vienna",
      "Europe/Zurich",
      "Europe/Stockholm",
      "Europe/Oslo",
      "Europe/Copenhagen",
      "Europe/Helsinki",
      "Europe/Warsaw",
      "Europe/Prague",
      "Europe/Budapest",
      "Europe/Bratislava",
      "Europe/Ljubljana",
      "Europe/Riga",
      "Europe/Tallinn",
      "Europe/Vilnius",
      "Europe/Dublin",
      "Europe/Luxembourg",
      "Europe/Malta",
      "Europe/Nicosia",
      "Europe/Sofia",
      "Europe/Bucharest",
      "Europe/Zagreb",
    ];

    return eeaTimezones.includes(timezone);
  };

  const handleConsent = () => {
    localStorage.setItem("adConsent", "true");
    localStorage.setItem("adConsentDate", new Date().toISOString());
    setShowBanner(false);
    onConsentChange?.(true);

    // Initialize Google AdSense
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        ad_storage: "granted",
        analytics_storage: "granted",
      });
    }
  };

  const handleManageOptions = () => {
    // Open a modal or redirect to a consent management page
    // For now, we'll just show the banner with more options
    setShowBanner(false);
    // You can implement a more detailed consent management interface here
  };

  if (isLoading || !showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 p-4">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">
            We value your privacy
          </h3>
          <p className="text-sm text-gray-600">
            We use cookies and similar technologies to provide you with the best
            experience and to show you relevant ads. By clicking &quot;Accept&quot;,
            you consent to our use of cookies and data collection.
          </p>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={handleManageOptions}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            Manage Options
          </button>
          <button
            onClick={handleConsent}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
