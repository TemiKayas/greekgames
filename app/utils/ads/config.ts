// Google AdSense Configuration
export const AD_CONFIG = {
  // Replace with your actual AdSense publisher ID
  PUBLISHER_ID: 'ca-pub-YOUR_PUBLISHER_ID',

  // Ad slots for different placements
  SLOTS: {
    // Header banner ads
    HEADER_BANNER: 'YOUR_HEADER_BANNER_SLOT',

    // Footer banner ads
    FOOTER_BANNER: 'YOUR_FOOTER_BANNER_SLOT',

    // Sidebar ads (desktop only)
    SIDEBAR: 'YOUR_SIDEBAR_SLOT',

    // In-game ads (between rounds)
    IN_GAME: 'YOUR_IN_GAME_SLOT',

    // Interstitial ads (between games)
    INTERSTITIAL: 'YOUR_INTERSTITIAL_SLOT',

    // About page ads
    ABOUT_PAGE: 'YOUR_ABOUT_PAGE_SLOT',
  },

  // Ad display settings
  SETTINGS: {
    // Show in-game ads every X rounds
    IN_GAME_FREQUENCY: 3,

    // Show interstitial ads after game completion
    SHOW_INTERSTITIAL_ON_COMPLETE: true,

    // Minimum time between interstitial ads (minutes)
    INTERSTITIAL_COOLDOWN: 2,

    // Enable ads on mobile
    MOBILE_ENABLED: true,

    // Enable ads on desktop
    DESKTOP_ENABLED: true,
  },

  // Responsive ad formats
  FORMATS: {
    BANNER: {
      desktop: '728x90',
      tablet: '468x60',
      mobile: '320x50',
    },
    SIDEBAR: {
      desktop: '300x250',
    },
    IN_GAME: {
      desktop: '320x50',
      mobile: '320x50',
    },
  },
};

// Helper function to get ad slot by placement
export const getAdSlot = (placement: keyof typeof AD_CONFIG.SLOTS): string => {
  return AD_CONFIG.SLOTS[placement];
};

// Helper function to check if ads should be shown
export const shouldShowAds = (): boolean => {
  if (typeof window === 'undefined') return false;

  // Check if user is on mobile or desktop
  const isMobile = window.innerWidth < 768;

  if (isMobile && !AD_CONFIG.SETTINGS.MOBILE_ENABLED) return false;
  if (!isMobile && !AD_CONFIG.SETTINGS.DESKTOP_ENABLED) return false;

  return true;
};
