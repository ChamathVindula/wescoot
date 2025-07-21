import React from 'react';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotalPrice } from '../features/cart/cartSlice';

interface OrderSummaryProps {
  shipping?: number;
  tax?: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ shipping = 0, tax = 0 }) => {
  const cartItems = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartTotalPrice);
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
      
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center space-x-4">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-16 h-16 object-cover rounded-md"
            />
            <div className="flex-1">
              <h3 className="font-medium text-gray-800">{item.name}</h3>
              <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-800">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 mt-6 pt-6 space-y-2">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        {shipping > 0 && (
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
        )}
        
        {tax > 0 && (
          <div className="flex justify-between text-gray-600">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
        )}
        
        <div className="border-t border-gray-200 pt-2">
          <div className="flex justify-between text-lg font-bold text-gray-800">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;