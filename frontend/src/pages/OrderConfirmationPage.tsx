import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Package, Truck, CreditCard } from 'lucide-react';
import type { PaymentIntent, ShippingAddress } from '../features/payment/paymentTypes';

interface OrderConfirmationState {
  paymentIntent: PaymentIntent;
  shippingAddress: ShippingAddress;
  orderTotal: number;
}

const OrderConfirmationPage: React.FC = () => {
  const location = useLocation();
  const state = location.state as OrderConfirmationState;

  // Redirect to home if no order data
  if (!state || !state.paymentIntent) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Order Not Found</h1>
        <p className="text-gray-600 mb-8">We couldn't find your order information.</p>
        <Link
          to="/"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  const { paymentIntent, shippingAddress, orderTotal } = state;
  const orderNumber = paymentIntent.id.replace('pi_mock_', '').slice(0, 8).toUpperCase();
  const estimatedDelivery = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Order Confirmed!</h1>
          <p className="text-xl text-gray-600 mb-2">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
          <p className="text-lg text-gray-500">
            Order Number: <span className="font-semibold text-gray-800">#{orderNumber}</span>
          </p>
        </div>

        {/* Order Status Steps */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Status</h2>
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mb-2">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800">Order Placed</h3>
              <p className="text-sm text-gray-500">Just now</p>
            </div>
            
            <div className="flex-1 h-1 bg-gray-200 mx-4"></div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mb-2">
                <Package className="w-6 h-6 text-gray-600" />
              </div>
              <h3 className="font-semibold text-gray-600">Processing</h3>
              <p className="text-sm text-gray-500">1-2 business days</p>
            </div>
            
            <div className="flex-1 h-1 bg-gray-200 mx-4"></div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mb-2">
                <Truck className="w-6 h-6 text-gray-600" />
              </div>
              <h3 className="font-semibold text-gray-600">Shipped</h3>
              <p className="text-sm text-gray-500">3-5 business days</p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800">
              <strong>Estimated Delivery:</strong> {estimatedDelivery.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <CreditCard className="w-6 h-6 text-indigo-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-800">Payment Information</h2>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Status:</span>
                <span className="font-semibold text-green-600">Paid</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-semibold text-gray-800">Card ending in ••••</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Amount:</span>
                <span className="font-semibold text-gray-800">${orderTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Transaction ID:</span>
                <span className="font-mono text-sm text-gray-600">{paymentIntent.id}</span>
              </div>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Truck className="w-6 h-6 text-indigo-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-800">Shipping Address</h2>
            </div>
            <div className="text-gray-600 space-y-1">
              <p className="font-semibold text-gray-800">{shippingAddress.name}</p>
              <p>{shippingAddress.line1}</p>
              {shippingAddress.line2 && <p>{shippingAddress.line2}</p>}
              <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.postal_code}</p>
              <p>{shippingAddress.country}</p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-lg shadow-md p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">What's Next?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-indigo-600 font-bold">1</span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Order Processing</h3>
                <p className="text-gray-600 text-sm">
                  We'll prepare your scooter and run quality checks before shipping.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-indigo-600 font-bold">2</span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">Shipping Updates</h3>
                <p className="text-gray-600 text-sm">
                  You'll receive tracking information once your order ships.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Link
            to="/products"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg text-center transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            to="/"
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-8 rounded-lg text-center transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;