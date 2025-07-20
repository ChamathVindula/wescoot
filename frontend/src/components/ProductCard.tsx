import React from 'react';
import { Link } from 'react-router';
import type { Scooter } from '../features/products/productTypes';

interface ProductCardProps {
  scooter: Scooter;
}

const ProductCard: React.FC<ProductCardProps> = ({ scooter }) => {
  const imageName = scooter.name.replace(/\s+/g, '-');
  const categoryPath = scooter.category.name.toLowerCase() === 'electric bike' ? 'bikes' : 'scooters';
  const imageUrl = `/${categoryPath}/${imageName}.webp`;

  return (
    <div className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow">
      <Link to={`/scooters/${scooter.id}`}>
        <img src={imageUrl} alt={scooter.name} className="w-full h-48 object-cover rounded-t-lg" />
        <div className="p-4">
          <h2 className="text-xl font-bold">{scooter.name}</h2>
          <p className="text-gray-600">{scooter.brand}</p>
          <p className="text-lg font-semibold mt-2">${scooter.price}</p>
          {scooter.discount && (
            <p className="text-red-500 line-through">
              ${(scooter.price / (1 - scooter.discount.percentage / 100)).toFixed(2)}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
