# Google AdSense Setup Guide

## ✅ Completed Steps
1. ✅ Created Google AdSense account
2. ✅ Added site to AdSense
3. ✅ Created `ads.txt` file with verification snippet
4. ✅ Deployed to production
5. ✅ Requested site verification

## 🔄 Current Step: Consent Management

### Choose: Google's CMP with 2 choices
- **Consent** - User accepts all cookies and ads
- **Manage Options** - User can customize preferences

### Why 2 choices is best for your project:
- ✅ Simpler user experience for game players
- ✅ Easier implementation across multiple pages
- ✅ Better conversion rates
- ✅ Still GDPR compliant

## 🛠️ Implementation

### 1. Consent Banner Component
- ✅ Created `app/components/ConsentBanner.tsx`
- ✅ Added to main layout (`app/layout.tsx`)
- ✅ Automatically detects EEA/UK/Switzerland users
- ✅ Stores consent in localStorage
- ✅ Integrates with Google AdSense

### 2. How it works:
- Banner appears at bottom of page for EEA users
- User clicks "Accept" → ads are enabled
- User clicks "Manage Options" → banner closes (can expand later)
- Consent is remembered for future visits

### 3. Next Steps in AdSense Dashboard:
1. Choose "Google's CMP with 2 choices"
2. Configure the consent message text
3. Set up ad units for your games
4. Wait for approval (usually 1-2 weeks)

## 🎮 Ad Integration Strategy

### Ad Placement for Games:
- **Header Banner**: 728x90 (desktop) / 320x50 (mobile)
- **Sidebar**: 300x250 (desktop only)
- **In-Game**: 320x50 between rounds
- **Footer**: 728x90 (desktop) / 320x50 (mobile)

### Game-Specific Implementation:
```typescript
// In each game component
import { AdBanner, AdInGame } from '../components/ads';

// Header ad
<AdBanner position="header" />

// In-game ad (between rounds)
<AdInGame />
```

## 📊 Expected Timeline
- **Week 1**: AdSense approval
- **Week 2**: Ad implementation across games
- **Week 3**: Performance optimization
- **Week 4**: Revenue tracking and optimization

## 🔧 Technical Notes
- Consent banner only shows for EEA/UK/Switzerland users
- Uses timezone detection (can be enhanced with IP geolocation)
- Integrates with Google Analytics consent mode
- Mobile-responsive design
- Non-intrusive to gameplay experience
