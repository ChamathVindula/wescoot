import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import type { Scooter } from '../features/products/productTypes';
import { addItem } from '../features/cart/cartSlice';
import type { AppDispatch } from '../app/store';

interface ProductCardProps {
  scooter: Scooter;
}

const ProductCard: React.FC<ProductCardProps> = ({ scooter }) => {
  const dispatch: AppDispatch = useDispatch();
  const imageName = scooter.name.replace(/\s+/g, '-');
  const categoryPath = scooter.category.name.toLowerCase() === 'electric bike' ? 'bikes' : 'scooters';
  const imageUrl = `/${categoryPath}/${imageName}.webp`;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the button
    dispatch(addItem({
      id: scooter.id,
      name: scooter.name,
      price: scooter.price,
      image: imageUrl,
    }));
  };

  return (
    <div className="group block overflow-hidden border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
      <Link to={`/scooters/${scooter.id}`} className="block">
        <div className="relative">
          <img 
            src={imageUrl} 
            alt={scooter.name} 
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4 bg-white">
          <p className="text-sm text-gray-500 mb-1">{scooter.brand}</p>
          <h2 className="text-lg font-semibold text-gray-800 truncate">{scooter.name}</h2>
          <div className="mt-2 flex items-baseline">
            <p className="text-xl font-bold text-gray-900">${scooter.price}</p>
            {scooter.discount && (
              <p className="ml-2 text-sm text-red-500 line-through">
                ${(scooter.price / (1 - scooter.discount.percentage / 100)).toFixed(2)}
              </p>
            )}
          </div>
        </div>
      </Link>
      <div className="mt-auto p-4 bg-white">
        <button 
          onClick={handleAddToCart}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
