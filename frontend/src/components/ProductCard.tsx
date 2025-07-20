import React from 'react';
import { Link } from 'react-router-dom';
import type { Scooter } from '../features/products/productTypes';

interface ProductCardProps {
  scooter: Scooter;
}

const ProductCard: React.FC<ProductCardProps> = ({ scooter }) => {
  const imageName = scooter.name.replace(/\s+/g, '-');
  const categoryPath = scooter.category.name.toLowerCase() === 'electric bike' ? 'bikes' : 'scooters';
  const imageUrl = `/${categoryPath}/${imageName}.webp`;

  return (
    <Link to={`/scooters/${scooter.id}`} className="group block overflow-hidden border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300">
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
  );
};

export default ProductCard;
