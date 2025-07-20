import React from 'react';
import { useParams } from 'react-router';
import { useGetScooterByIdQuery } from '../features/products/productAPI';

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: scooter, error, isLoading } = useGetScooterByIdQuery(Number(id));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading product details.</div>;
  if (!scooter) return <div>Product not found.</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={scooter.imageUrl} alt={scooter.name} className="w-full rounded-lg shadow-lg" />
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-4">{scooter.name}</h1>
          <p className="text-xl text-gray-600 mb-4">{scooter.brand} - {scooter.model}</p>
          <p className="text-3xl font-semibold mb-4">${scooter.price}</p>
          {scooter.discount && (
            <p className="text-xl text-red-500 line-through mb-4">
              ${(scooter.price / (1 - scooter.discount.percentage / 100)).toFixed(2)}
            </p>
          )}
          <p className="mb-4">{scooter.description}</p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <p><strong>Motor:</strong> {scooter.motor}</p>
            <p><strong>Max Speed:</strong> {scooter.maxSpeed} km/h</p>
            <p><strong>Max Range:</strong> {scooter.maxRange} km</p>
            <p><strong>Weight:</strong> {scooter.weight} kg</p>
            <p><strong>Stock:</strong> {scooter.stock > 0 ? 'In Stock' : 'Out of Stock'}</p>
          </div>
          {scooter.safetyInfo && (
            <div>
              <h2 className="text-2xl font-bold mb-2">Safety Information</h2>
              <p>{scooter.safetyInfo.info}</p>
            </div>
          )}
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg mt-4 hover:bg-blue-600">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
