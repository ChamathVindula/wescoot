import { PaymentIntent, CreatePaymentIntentRequest, ConfirmPaymentRequest, PaymentIntentResponse } from '../types/payment';
import logger from '../utils/logger';

// Mock payment storage (in a real app, you'd store this in Redis or database)
const paymentIntents = new Map<string, PaymentIntent>();

// Generate a random ID for mock payment intents
const generatePaymentIntentId = (): string => {
  return `pi_mock_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
};

// Generate a mock client secret
const generateClientSecret = (paymentIntentId: string): string => {
  return `${paymentIntentId}_secret_${Math.random().toString(36).substring(2, 15)}`;
};

export const createPaymentIntent = async (request: CreatePaymentIntentRequest): Promise<PaymentIntentResponse> => {
  try {
    const paymentIntentId = generatePaymentIntentId();
    const clientSecret = generateClientSecret(paymentIntentId);
    
    const paymentIntent: PaymentIntent = {
      id: paymentIntentId,
      amount: request.amount,
      currency: request.currency || 'usd',
      status: 'requires_payment_method',
      client_secret: clientSecret,
      created: Math.floor(Date.now() / 1000),
    };

    // Store the payment intent
    paymentIntents.set(paymentIntentId, paymentIntent);

    logger.info('Mock payment intent created', {
      paymentIntentId,
      amount: request.amount,
      currency: request.currency || 'usd',
    });

    return {
      paymentIntent,
      success: true,
    };
  } catch (error) {
    logger.error('Error creating payment intent', { error });
    throw new Error('Failed to create payment intent');
  }
};

export const confirmPayment = async (request: ConfirmPaymentRequest): Promise<PaymentIntentResponse> => {
  try {
    const paymentIntent = paymentIntents.get(request.paymentIntentId);
    
    if (!paymentIntent) {
      throw new Error('Payment intent not found');
    }

    // Mock payment confirmation logic
    // In a real implementation, you would validate the payment method with Stripe
    const { card } = request.paymentMethod;
    
    // Mock validation - reject if card number starts with '4000000000000002' (declined card)
    if (card.number.startsWith('4000000000000002')) {
      paymentIntent.status = 'canceled';
      paymentIntents.set(request.paymentIntentId, paymentIntent);
      
      return {
        paymentIntent,
        success: false,
        message: 'Your card was declined.',
      };
    }

    // Mock success for all other cards
    paymentIntent.status = 'succeeded';
    paymentIntents.set(request.paymentIntentId, paymentIntent);

    logger.info('Mock payment confirmed', {
      paymentIntentId: request.paymentIntentId,
      amount: paymentIntent.amount,
      cardLast4: card.number.slice(-4),
    });

    return {
      paymentIntent,
      success: true,
      message: 'Payment succeeded',
    };
  } catch (error) {
    logger.error('Error confirming payment', { error });
    throw new Error('Failed to confirm payment');
  }
};

export const getPaymentIntent = async (paymentIntentId: string): Promise<PaymentIntent | null> => {
  try {
    return paymentIntents.get(paymentIntentId) || null;
  } catch (error) {
    logger.error('Error retrieving payment intent', { error });
    throw new Error('Failed to retrieve payment intent');
  }
};