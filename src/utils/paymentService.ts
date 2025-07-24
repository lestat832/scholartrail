// Payment request service utilities

export type SubscriptionType = 'student' | 'parent';
export type ParentAccountType = 'payment-only' | 'parent-free' | 'parent-paid';
export type BillingPeriod = 'monthly' | 'annual';

export interface PricingPlan {
  type: SubscriptionType;
  monthlyPrice: number;
  annualPrice: number;
  features: string[];
  limits: {
    studentProfiles: number;
    parentDashboard: boolean;
    progressTracking: boolean;
  };
}

export interface ParentAccountCapabilities {
  accountType: ParentAccountType;
  billing: boolean;
  studentFeatures: 'none' | 'limited' | 'full';
  maxStudents: number;
  maxScholarships: number | 'unlimited';
  dashboardAccess: 'billing-only' | 'limited' | 'full';
  progressTracking: boolean;
  canUpgrade: boolean;
  upgradeOptions: ParentAccountType[];
}

// Parent account capabilities matrix
export const PARENT_ACCOUNT_CAPABILITIES: Record<ParentAccountType, ParentAccountCapabilities> = {
  'payment-only': {
    accountType: 'payment-only',
    billing: true,
    studentFeatures: 'none',
    maxStudents: 0, // Can see student they pay for but can't manage
    maxScholarships: 0,
    dashboardAccess: 'billing-only',
    progressTracking: false,
    canUpgrade: true,
    upgradeOptions: ['parent-free', 'parent-paid']
  },
  'parent-free': {
    accountType: 'parent-free',
    billing: false,
    studentFeatures: 'limited',
    maxStudents: 1,
    maxScholarships: 3,
    dashboardAccess: 'limited',
    progressTracking: true,
    canUpgrade: true,
    upgradeOptions: ['parent-paid']
  },
  'parent-paid': {
    accountType: 'parent-paid',
    billing: true,
    studentFeatures: 'full',
    maxStudents: 3,
    maxScholarships: 'unlimited',
    dashboardAccess: 'full',
    progressTracking: true,
    canUpgrade: false,
    upgradeOptions: []
  }
};

// Pricing constants
export const PRICING_PLANS: Record<SubscriptionType, PricingPlan> = {
  student: {
    type: 'student',
    monthlyPrice: 2.99,
    annualPrice: 35.88, // $2.99 * 12
    features: [
      'Full scholarship matching',
      'Save & apply tracking',
      'Profile management',
      'Basic parent connection'
    ],
    limits: {
      studentProfiles: 1,
      parentDashboard: false,
      progressTracking: false
    }
  },
  parent: {
    type: 'parent',
    monthlyPrice: 4.99,
    annualPrice: 59.88, // $4.99 * 12
    features: [
      'Everything in Student Plan',
      'Parent dashboard with progress tracking',
      'Up to 3 student profiles',
      'Scholarship application timeline',
      'Success metrics and insights',
      'Email notifications for milestones'
    ],
    limits: {
      studentProfiles: 3,
      parentDashboard: true,
      progressTracking: true
    }
  }
};

export interface PaymentRequest {
  id: string;
  studentName: string;
  studentEmail?: string;
  parentEmail: string;
  parentName?: string;
  message?: string;
  subscriptionType?: SubscriptionType; // Default to student if not specified
  amount: number;
  plan: BillingPeriod;
  status: 'pending' | 'completed' | 'expired';
  createdAt: string;
  expiresAt: string;
  token: string;
}

const PAYMENT_REQUESTS_KEY = 'scholartrail_payment_requests';
const REQUEST_EXPIRY_DAYS = 7;

// Generate a unique token for payment requests
export const generatePaymentToken = (): string => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 15);
  return `${timestamp}-${randomStr}`;
};

// Get pricing for a subscription type and billing period
export const getPrice = (subscriptionType: SubscriptionType, billingPeriod: BillingPeriod): number => {
  const plan = PRICING_PLANS[subscriptionType];
  return billingPeriod === 'monthly' ? plan.monthlyPrice : plan.annualPrice;
};

// Get plan comparison data for payment page
export const getPlanComparison = (billingPeriod: BillingPeriod = 'monthly') => {
  return {
    student: {
      ...PRICING_PLANS.student,
      price: getPrice('student', billingPeriod),
      savings: billingPeriod === 'annual' ? 'Save 2 months' : null
    },
    parent: {
      ...PRICING_PLANS.parent,
      price: getPrice('parent', billingPeriod),
      savings: billingPeriod === 'annual' ? 'Save 2 months' : null,
      valueProposition: billingPeriod === 'monthly' 
        ? 'Only $1.66 per student with 3 students'
        : 'Only $19.96 per student with 3 students'
    }
  };
};

// Create a new payment request
export const createPaymentRequest = (
  studentName: string,
  parentEmail: string,
  parentName?: string,
  message?: string,
  studentEmail?: string,
  subscriptionType: SubscriptionType = 'student',
  billingPeriod: BillingPeriod = 'monthly'
): PaymentRequest => {
  const now = new Date();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + REQUEST_EXPIRY_DAYS);

  const request: PaymentRequest = {
    id: generatePaymentToken(),
    studentName,
    studentEmail,
    parentEmail,
    parentName,
    message,
    subscriptionType,
    amount: getPrice(subscriptionType, billingPeriod),
    plan: billingPeriod,
    status: 'pending',
    createdAt: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
    token: generatePaymentToken()
  };

  // Save to localStorage
  const existingRequests = getPaymentRequests();
  existingRequests.push(request);
  localStorage.setItem(PAYMENT_REQUESTS_KEY, JSON.stringify(existingRequests));

  return request;
};

// Get all payment requests
export const getPaymentRequests = (): PaymentRequest[] => {
  const stored = localStorage.getItem(PAYMENT_REQUESTS_KEY);
  if (!stored) return [];
  
  try {
    const requests = JSON.parse(stored) as PaymentRequest[];
    // Filter out expired requests
    const now = new Date();
    return requests.filter(req => new Date(req.expiresAt) > now);
  } catch {
    return [];
  }
};

// Get a specific payment request by token
export const getPaymentRequestByToken = (token: string): PaymentRequest | null => {
  const requests = getPaymentRequests();
  return requests.find(req => req.token === token) || null;
};

// Update payment request status
export const updatePaymentRequestStatus = (
  token: string, 
  status: 'completed' | 'expired'
): boolean => {
  const requests = getPaymentRequests();
  const index = requests.findIndex(req => req.token === token);
  
  if (index === -1) return false;
  
  requests[index].status = status;
  localStorage.setItem(PAYMENT_REQUESTS_KEY, JSON.stringify(requests));
  return true;
};

// Check if student has pending payment request
export const hasPendingPaymentRequest = (): boolean => {
  const requests = getPaymentRequests();
  return requests.some(req => req.status === 'pending');
};

// Get the most recent pending request
export const getMostRecentPendingRequest = (): PaymentRequest | null => {
  const requests = getPaymentRequests();
  const pending = requests
    .filter(req => req.status === 'pending')
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  
  return pending[0] || null;
};

// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Format payment link URL
export const getPaymentLinkUrl = (token: string): string => {
  const baseUrl = window.location.origin;
  return `${baseUrl}/pay/${token}`;
};

// Simulate sending email (in real app, this would call backend API)
export const sendPaymentRequestEmail = async (request: PaymentRequest): Promise<boolean> => {
  // In a real application, this would make an API call to send the email
  console.log('Sending payment request email:', {
    to: request.parentEmail,
    studentName: request.studentName,
    paymentLink: getPaymentLinkUrl(request.token)
  });
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // For demo purposes, always return success
  return true;
};

// Parent account creation after payment
export interface ParentAccount {
  id: string;
  email: string;
  firstName?: string;
  password?: string; // In real app, this would be hashed
  accountType: ParentAccountType;
  subscriptionType?: SubscriptionType; // Only for paid accounts
  billingPeriod?: BillingPeriod;
  subscriptionStatus: 'active' | 'inactive' | 'cancelled' | 'trial';
  createdAt: string;
  linkedStudents: string[];
  studentPaidFor?: string; // For payment-only accounts
  capabilities: ParentAccountCapabilities;
}

const PARENT_ACCOUNTS_KEY = 'scholartrail_parent_accounts';

// Create parent account after successful payment
export const createParentAccount = (
  email: string,
  password: string,
  studentName: string,
  accountType: ParentAccountType = 'payment-only',
  subscriptionType?: SubscriptionType,
  billingPeriod?: BillingPeriod,
  firstName?: string
): ParentAccount => {
  const capabilities = PARENT_ACCOUNT_CAPABILITIES[accountType];
  
  const account: ParentAccount = {
    id: generatePaymentToken(),
    email,
    firstName,
    password, // In real app, this would be hashed
    accountType,
    subscriptionType: accountType === 'parent-paid' ? subscriptionType : undefined,
    billingPeriod: accountType === 'parent-paid' ? billingPeriod : undefined,
    subscriptionStatus: accountType === 'parent-free' ? 'trial' : 'active',
    createdAt: new Date().toISOString(),
    linkedStudents: accountType === 'payment-only' ? [] : [studentName],
    studentPaidFor: accountType === 'payment-only' ? studentName : undefined,
    capabilities
  };

  // Save to localStorage
  const existingAccounts = getParentAccounts();
  existingAccounts.push(account);
  localStorage.setItem(PARENT_ACCOUNTS_KEY, JSON.stringify(existingAccounts));

  return account;
};

// Create free parent account (for direct signups)
export const createFreeParentAccount = (
  email: string,
  password: string,
  firstName?: string
): ParentAccount => {
  return createParentAccount(email, password, '', 'parent-free', undefined, undefined, firstName);
};

// Check if parent can add more students
export const canParentAddMoreStudents = (parentAccount: ParentAccount): boolean => {
  return parentAccount.linkedStudents.length < parentAccount.capabilities.maxStudents;
};

// Get parent dashboard capabilities
export const getParentCapabilities = (parentAccount: ParentAccount) => {
  const accountCapabilities = parentAccount.capabilities;
  return {
    ...accountCapabilities,
    currentStudents: parentAccount.linkedStudents.length,
    canAddMoreStudents: canParentAddMoreStudents(parentAccount),
    accountType: parentAccount.accountType,
    subscriptionType: parentAccount.subscriptionType,
    subscriptionStatus: parentAccount.subscriptionStatus
  };
};

// Check if parent account exists and get upgrade options
export const getParentUpgradeOptions = (email: string) => {
  const existingAccount = getParentAccountByEmail(email);
  
  if (!existingAccount) {
    return {
      hasAccount: false,
      canLinkStudent: false,
      needsUpgrade: false,
      accountType: null,
      options: ['payment-only', 'parent-paid'] as ('payment-only' | 'parent-paid')[]
    };
  }

  const canLink = canParentAddMoreStudents(existingAccount);
  const capabilities = existingAccount.capabilities;

  return {
    hasAccount: true,
    existingAccount,
    accountType: existingAccount.accountType,
    canLinkStudent: canLink && capabilities.studentFeatures !== 'none',
    needsUpgrade: !capabilities.canUpgrade ? false : (!canLink || capabilities.maxStudents === 0),
    upgradeOptions: capabilities.upgradeOptions
  };
};

// Get all parent accounts
export const getParentAccounts = (): ParentAccount[] => {
  const stored = localStorage.getItem(PARENT_ACCOUNTS_KEY);
  if (!stored) return [];
  
  try {
    return JSON.parse(stored) as ParentAccount[];
  } catch {
    return [];
  }
};

// Get parent account by email
export const getParentAccountByEmail = (email: string): ParentAccount | null => {
  const accounts = getParentAccounts();
  return accounts.find(acc => acc.email === email) || null;
};

// Generate temporary password
export const generateTemporaryPassword = (): string => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  let password = '';
  for (let i = 0; i < 8; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

// Upgrade parent account to a higher tier
export const upgradeParentAccount = (
  accountId: string,
  newAccountType: ParentAccountType,
  subscriptionType?: SubscriptionType,
  billingPeriod?: BillingPeriod
): ParentAccount | null => {
  const accounts = getParentAccounts();
  const accountIndex = accounts.findIndex(acc => acc.id === accountId);
  
  if (accountIndex === -1) return null;
  
  const account = accounts[accountIndex];
  const newCapabilities = PARENT_ACCOUNT_CAPABILITIES[newAccountType];
  
  // Update account
  account.accountType = newAccountType;
  account.capabilities = newCapabilities;
  account.subscriptionType = newAccountType === 'parent-paid' ? subscriptionType : undefined;
  account.billingPeriod = newAccountType === 'parent-paid' ? billingPeriod : undefined;
  account.subscriptionStatus = newAccountType === 'parent-free' ? 'trial' : 'active';
  
  // Save updated accounts
  localStorage.setItem(PARENT_ACCOUNTS_KEY, JSON.stringify(accounts));
  
  return account;
};

// Check if account can be upgraded to a specific type
export const canUpgradeToAccountType = (
  currentAccount: ParentAccount,
  targetAccountType: ParentAccountType
): boolean => {
  return currentAccount.capabilities.upgradeOptions.includes(targetAccountType);
};

// Get pricing for parent account types
export const getParentAccountTypePrice = (
  accountType: ParentAccountType,
  billingPeriod: BillingPeriod = 'monthly'
): number => {
  switch (accountType) {
    case 'payment-only':
      return getPrice('student', billingPeriod);
    case 'parent-free':
      return 0;
    case 'parent-paid':
      return getPrice('parent', billingPeriod);
    default:
      return 0;
  }
};

// Get account type display information
export const getAccountTypeInfo = (accountType: ParentAccountType) => {
  switch (accountType) {
    case 'payment-only':
      return {
        name: 'Payment Only',
        description: 'Basic parent account for payment management',
        features: [
          'Payment and billing management',
          'Basic subscription overview',
          'Can upgrade to full parent account'
        ],
        limitations: [
          'No student progress tracking',
          'No additional student profiles',
          'Limited dashboard access'
        ]
      };
    case 'parent-free':
      return {
        name: 'Parent Trial',
        description: 'Free trial with limited features',
        features: [
          'Add 1 student profile',
          'View up to 3 scholarships',
          'Basic progress tracking',
          'Trial dashboard access'
        ],
        limitations: [
          'Limited to 1 student',
          'Only 3 scholarships visible',
          'No premium features'
        ]
      };
    case 'parent-paid':
      return {
        name: 'Parent Premium',
        description: 'Full parent account with all features',
        features: [
          'Up to 3 student profiles',
          'Unlimited scholarship access',
          'Full progress tracking',
          'Complete dashboard access',
          'Priority support'
        ],
        limitations: []
      };
    default:
      return {
        name: 'Unknown',
        description: '',
        features: [],
        limitations: []
      };
  }
};