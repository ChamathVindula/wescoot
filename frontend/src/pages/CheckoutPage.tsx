import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCartItems, selectCartTotalPrice, clearCart } from '../features/cart/cartSlice';
import { useCreatePaymentIntentMutation, useConfirmPaymentMutation } from '../features/payment/paymentAPI';
import type { ShippingAddress, PaymentFormData } from '../features/payment/paymentTypes';
import ShippingForm from '../components/ShippingForm';
import PaymentForm from '../components/PaymentForm';
import OrderSummary from '../components/OrderSummary';
import { ArrowLeft } from 'lucide-react';
import type { AppDispatch } from '../app/store';

type CheckoutStep = 'shipping' | 'payment' | 'processing';

const CheckoutPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartTotalPrice);
  
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
  const [shippingData, setShippingData] = useState<ShippingAddress | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const [confirmPayment] = useConfirmPaymentMutation();
  
  // Calculate totals
  const shipping = 15.00; // Fixed shipping cost
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  // Redirect to cart if empty
  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleShippingSubmit = (data: ShippingAddress) => {
    setShippingData(data);
    setCurrentStep('payment');
  };

  const handlePaymentSubmit = async (paymentData: PaymentFormData) => {
    if (!shippingData) return;
    
    setIsProcessing(true);
    setError(null);

    try {
      // Step 1: Create payment intent
      const paymentIntentResult = await createPaymentIntent({
        amount: Math.round(total * 100), // Convert to cents
        currency: 'usd',
        metadata: {
          shipping_address: JSON.stringify(shippingData),
          cart_items: JSON.stringify(cartItems),
        },
      }).unwrap();

      if (!paymentIntentResult.success) {
        throw new Error('Failed to create payment intent');
      }

      // Step 2: Confirm payment
      const confirmResult = await confirmPayment({
        paymentIntentId: paymentIntentResult.paymentIntent.id,
        paymentMethod: {
          type: 'card',
          card: {
            number: paymentData.cardNumber.replace(/\s/g, ''), // Remove spaces
            exp_month: parseInt(paymentData.expiryMonth),
            exp_year: parseInt(paymentData.expiryYear),
            cvc: paymentData.cvc,
          },
        },
      }).unwrap();

      if (confirmResult.success && confirmResult.paymentIntent.status === 'succeeded') {
        // Payment successful - clear cart and redirect
        dispatch(clearCart());
        navigate('/order-confirmation', {
          state: {
            paymentIntent: confirmResult.paymentIntent,
            shippingAddress: shippingData,
            orderTotal: total,
          },
        });
      } else {
        setError(confirmResult.message || 'Payment failed. Please try again.');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during payment processing.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBackToShipping = () => {
    setCurrentStep('shipping');
    setError(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Checkout</h1>
          
          {/* Progress indicator */}
          <div className="flex items-center space-x-4 mb-6">
            <div className={`flex items-center ${currentStep === 'shipping' ? 'text-indigo-600' : 'text-green-600'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep === 'shipping' ? 'bg-indigo-600 text-white' : 'bg-green-600 text-white'
              }`}>
                1
              </div>
              <span className="ml-2 font-medium">Shipping</span>
            </div>
            
            <div className={`h-px flex-1 ${currentStep === 'payment' ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
            
            <div className={`flex items-center ${
              currentStep === 'shipping' ? 'text-gray-400' : 
              currentStep === 'payment' ? 'text-indigo-600' : 'text-green-600'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep === 'shipping' ? 'bg-gray-300 text-gray-600' :
                currentStep === 'payment' ? 'bg-indigo-600 text-white' : 'bg-green-600 text-white'
              }`}>
                2
              </div>
              <span className="ml-2 font-medium">Payment</span>
            </div>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {currentStep === 'shipping' && (
              <ShippingForm
                onSubmit={handleShippingSubmit}
                defaultValues={shippingData || undefined}
              />
            )}
            
            {currentStep === 'payment' && (
              <div>
                <button
                  onClick={handleBackToShipping}
                  className="flex items-center text-indigo-600 hover:text-indigo-700 mb-6"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Shipping
                </button>
                
                <PaymentForm
                  onSubmit={handlePaymentSubmit}
                  isProcessing={isProcessing}
                />
              </div>
            )}
          </div>

          {/* Order summary sidebar */}
          <div className="lg:col-span-1">
            <OrderSummary shipping={shipping} tax={tax} />
            
            {shippingData && (
              <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Shipping Address</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p className="font-medium text-gray-800">{shippingData.name}</p>
                  <p>{shippingData.line1}</p>
                  {shippingData.line2 && <p>{shippingData.line2}</p>}
                  <p>{shippingData.city}, {shippingData.state} {shippingData.postal_code}</p>
                  <p>{shippingData.country}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;