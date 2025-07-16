// Payment request service utilities

export interface PaymentRequest {
  id: string;
  studentName: string;
  studentEmail?: string;
  parentEmail: string;
  parentName?: string;
  message?: string;
  amount: number;
  plan: 'monthly' | 'annual';
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

// Create a new payment request
export const createPaymentRequest = (
  studentName: string,
  parentEmail: string,
  parentName?: string,
  message?: string,
  studentEmail?: string
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
    amount: 34,
    plan: 'annual',
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