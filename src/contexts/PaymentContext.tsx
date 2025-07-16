import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface SubscriptionData {
  status: 'free' | 'trial' | 'active' | 'expired';
  tier: 'free' | 'basic' | 'premium';
  expiresAt?: string;
  paymentMethod?: 'direct' | 'parent';
  payerEmail?: string;
  payerName?: string;
  trialEndsAt?: string;
}

interface PaymentContextType {
  subscription: SubscriptionData;
  updateSubscription: (data: Partial<SubscriptionData>) => void;
  checkSubscriptionStatus: () => boolean;
  isFeatureLocked: (feature: string) => boolean;
  isPremiumUser: () => boolean;
  clearSubscription: () => void;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

const SUBSCRIPTION_KEY = 'scholartrail_subscription';
const TRIAL_DURATION_DAYS = 7;

// Define which features require payment
const PREMIUM_FEATURES = [
  'unlimited_scholarships',
  'advanced_filters',
  'export_data',
  'priority_matching',
  'application_tracking'
];

export const PaymentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [subscription, setSubscription] = useState<SubscriptionData>(() => {
    // Load subscription from localStorage
    const saved = localStorage.getItem(SUBSCRIPTION_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Invalid data, return default
      }
    }
    
    // Check if user should have a trial
    const firstVisit = localStorage.getItem('scholartrail_first_visit');
    if (!firstVisit) {
      localStorage.setItem('scholartrail_first_visit', new Date().toISOString());
      const trialEnd = new Date();
      trialEnd.setDate(trialEnd.getDate() + TRIAL_DURATION_DAYS);
      
      return {
        status: 'trial',
        tier: 'premium',
        trialEndsAt: trialEnd.toISOString()
      };
    }
    
    // Default free tier
    return {
      status: 'free',
      tier: 'free'
    };
  });

  // Save subscription changes to localStorage
  useEffect(() => {
    localStorage.setItem(SUBSCRIPTION_KEY, JSON.stringify(subscription));
  }, [subscription]);

  // Check and update subscription status on mount and periodically
  useEffect(() => {
    const checkExpiration = () => {
      if (subscription.status === 'trial' && subscription.trialEndsAt) {
        const trialEnd = new Date(subscription.trialEndsAt);
        if (new Date() > trialEnd) {
          setSubscription(prev => ({
            ...prev,
            status: 'free',
            tier: 'free',
            trialEndsAt: undefined
          }));
        }
      } else if (subscription.status === 'active' && subscription.expiresAt) {
        const expiryDate = new Date(subscription.expiresAt);
        if (new Date() > expiryDate) {
          setSubscription(prev => ({
            ...prev,
            status: 'expired'
          }));
        }
      }
    };

    checkExpiration();
    // Check every hour
    const interval = setInterval(checkExpiration, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [subscription.status, subscription.trialEndsAt, subscription.expiresAt]);

  const updateSubscription = (data: Partial<SubscriptionData>) => {
    setSubscription(prev => ({ ...prev, ...data }));
  };

  const checkSubscriptionStatus = (): boolean => {
    return subscription.status === 'active' || subscription.status === 'trial';
  };

  const isFeatureLocked = (feature: string): boolean => {
    if (subscription.status === 'active' || subscription.status === 'trial') {
      return false;
    }
    return PREMIUM_FEATURES.includes(feature);
  };

  const isPremiumUser = (): boolean => {
    return subscription.tier === 'premium' && 
           (subscription.status === 'active' || subscription.status === 'trial');
  };

  const clearSubscription = () => {
    setSubscription({
      status: 'free',
      tier: 'free'
    });
    localStorage.removeItem(SUBSCRIPTION_KEY);
  };

  return (
    <PaymentContext.Provider
      value={{
        subscription,
        updateSubscription,
        checkSubscriptionStatus,
        isFeatureLocked,
        isPremiumUser,
        clearSubscription
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
};