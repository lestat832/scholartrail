// Cookie consent management utilities

export interface CookieConsent {
  accepted: boolean;
  timestamp: string;
}

const COOKIE_CONSENT_KEY = 'cookieConsent';
const CONSENT_DURATION_DAYS = 365; // Consent expires after 1 year

export const getCookieConsent = (): CookieConsent | null => {
  const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
  if (!stored) return null;
  
  try {
    const consent = JSON.parse(stored) as CookieConsent;
    
    // Check if consent is expired
    const consentDate = new Date(consent.timestamp);
    const expiryDate = new Date(consentDate);
    expiryDate.setDate(expiryDate.getDate() + CONSENT_DURATION_DAYS);
    
    if (new Date() > expiryDate) {
      // Consent expired, remove it
      localStorage.removeItem(COOKIE_CONSENT_KEY);
      return null;
    }
    
    return consent;
  } catch {
    return null;
  }
};

export const setCookieConsent = (accepted: boolean): void => {
  const consent: CookieConsent = {
    accepted,
    timestamp: new Date().toISOString()
  };
  
  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
  
  // Handle cookie settings based on consent
  if (accepted) {
    // Enable analytics cookies
    // In a real implementation, you would initialize analytics here
    console.log('Analytics cookies enabled');
  } else {
    // Disable/remove non-essential cookies
    // In a real implementation, you would disable analytics here
    console.log('Only essential cookies enabled');
  }
};

export const shouldShowBanner = (): boolean => {
  const consent = getCookieConsent();
  return consent === null;
};

export const clearCookieConsent = (): void => {
  localStorage.removeItem(COOKIE_CONSENT_KEY);
};