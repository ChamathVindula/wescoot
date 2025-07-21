import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  removeItem,
  updateQuantity,
  selectCartItems,
  selectCartTotalPrice,
} from '../features/cart/cartSlice';
import type { AppDispatch } from '../app/store';

const CartPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectCartTotalPrice);

  const handleRemoveItem = (id: number) => {
    dispatch(removeItem(id));
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link
          to="/products"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Shopping Cart</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {cartItems.map((item) => (
            <li key={item.id} className="flex items-center py-6 px-4 sm:px-6">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md mr-6" />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                  <p className="text-gray-600">${item.price}</p>
                </div>
                <div className="flex items-center mt-2">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value, 10))}
                    className="w-16 text-center border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="ml-4 text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
        <div className="bg-gray-50 px-4 sm:px-6 py-4 flex justify-end items-center">
          <h2 className="text-xl font-bold text-gray-800">
            Total: ${totalPrice.toFixed(2)}
          </h2>
          <Link
            to="/checkout"
            className="ml-6 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
