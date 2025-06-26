# Google AdSense Integration Guide

## 🚀 Quick Setup

### 1. Get Your AdSense Account
1. Go to [Google AdSense](https://www.google.com/adsense)
2. Sign up for an AdSense account
3. Wait for approval (usually 1-2 weeks)
4. Get your publisher ID (format: `ca-pub-XXXXXXXXXX`)

### 2. Configure Your Site
1. Update `app/utils/ads/config.ts`:
   ```typescript
   PUBLISHER_ID: 'ca-pub-YOUR_ACTUAL_PUBLISHER_ID',
   ```

2. Create ad units in AdSense dashboard:
   - Header Banner (728x90)
   - Footer Banner (728x90)
   - Sidebar (300x250)
   - In-Game (320x50)
   - Interstitial (responsive)

3. Update slot IDs in `config.ts`:
   ```typescript
   SLOTS: {
     HEADER_BANNER: 'YOUR_ACTUAL_SLOT_ID',
     FOOTER_BANNER: 'YOUR_ACTUAL_SLOT_ID',
     // ... etc
   }
   ```

### 3. Integrate Ads into Your App

#### Layout Integration
```typescript
// app/layout.tsx
import { AdProvider } from '@/app/components/ads';
import { AD_CONFIG } from '@/app/utils/ads/config';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AdProvider adSenseId={AD_CONFIG.PUBLISHER_ID}>
          {children}
        </AdProvider>
      </body>
    </html>
  );
}
```

#### Homepage Integration
```typescript
// app/page.tsx
import { AdBanner } from '@/app/components/ads';
import { getAdSlot } from '@/app/utils/ads/config';

export default function HomePage() {
  return (
    <div>
      <AdBanner adSlot={getAdSlot('HEADER_BANNER')} />
      {/* Your content */}
      <AdBanner adSlot={getAdSlot('FOOTER_BANNER')} />
    </div>
  );
}
```

#### Game Page Integration
```typescript
// app/games/memory/page.tsx
import { AdSidebar, AdInGame } from '@/app/components/ads';
import { getAdSlot } from '@/app/utils/ads/config';

export default function MemoryGame() {
  return (
    <div className="flex">
      <div className="flex-1">
        {/* Game content */}
        <AdInGame
          adSlot={getAdSlot('IN_GAME')}
          showAfterRounds={3}
          currentRound={currentRound}
        />
      </div>
      <AdSidebar adSlot={getAdSlot('SIDEBAR')} />
    </div>
  );
}
```

## 📱 Ad Placement Strategy

### Homepage
- **Header Banner**: Above main content
- **Footer Banner**: Below main content
- **Sidebar**: Right side (desktop only)

### Game Pages
- **Sidebar**: Right side (desktop only)
- **In-Game**: Between rounds (every 3 rounds)
- **Interstitial**: After game completion

### About Page
- **Header Banner**: Above content
- **Footer Banner**: Below content

## ⚙️ Configuration Options

### Ad Frequency
```typescript
// Show in-game ads every X rounds
IN_GAME_FREQUENCY: 3,

// Show interstitial ads after completion
SHOW_INTERSTITIAL_ON_COMPLETE: true,

// Minimum time between interstitial ads
INTERSTITIAL_COOLDOWN: 2, // minutes
```

### Device Targeting
```typescript
// Enable/disable ads on different devices
MOBILE_ENABLED: true,
DESKTOP_ENABLED: true,
```

### Responsive Formats
```typescript
FORMATS: {
  BANNER: {
    desktop: '728x90',
    tablet: '468x60',
    mobile: '320x50',
  },
  // ... etc
}
```

## 🎯 Best Practices

### User Experience
1. **Don't overwhelm users** - Space ads appropriately
2. **Don't block content** - Ensure ads don't interfere with gameplay
3. **Load ads asynchronously** - Don't block page rendering
4. **Provide close options** - Especially for interstitial ads

### Performance
1. **Lazy load ads** - Only load when needed
2. **Use responsive ads** - Adapt to screen size
3. **Monitor Core Web Vitals** - Ensure ads don't hurt performance
4. **Test on multiple devices** - Ensure good experience everywhere

### Compliance
1. **Follow AdSense policies** - No clickbait, no excessive ads
2. **Respect user privacy** - Implement proper consent mechanisms
3. **Test thoroughly** - Ensure ads work correctly before going live

## 🔧 Troubleshooting

### Common Issues
1. **Ads not showing**: Check publisher ID and slot IDs
2. **Layout issues**: Ensure proper CSS for ad containers
3. **Performance problems**: Use lazy loading and async loading
4. **Mobile issues**: Test responsive ad formats

### Testing
1. **Use AdSense test mode** - Test without affecting revenue
2. **Check browser console** - Look for AdSense errors
3. **Test on multiple devices** - Ensure responsive behavior
4. **Monitor AdSense dashboard** - Check for policy violations

## 📊 Analytics & Optimization

### Track Performance
- Page RPM (Revenue Per Mille)
- Click-through rates
- User engagement metrics
- Ad viewability

### Optimize Placement
- A/B test different ad positions
- Monitor user behavior
- Adjust frequency based on engagement
- Test different ad formats

## 🚨 Important Notes

1. **Don't click your own ads** - This violates AdSense policies
2. **Wait for approval** - Don't expect immediate revenue
3. **Follow policies strictly** - Violations can result in account suspension
4. **Monitor regularly** - Check for policy changes and updates

## 📞 Support

- [AdSense Help Center](https://support.google.com/adsense)
- [AdSense Policies](https://support.google.com/adsense/answer/48182)
- [AdSense Community](https://support.google.com/adsense/community)
