import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGetScooterByIdQuery } from '../features/products/productAPI';
import { addItem } from '../features/cart/cartSlice';
import type { AppDispatch } from '../app/store';
import { ShieldCheck, Zap, ArrowRight, Gauge, Weight, ShoppingCart } from 'lucide-react';

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  const { data: scooter, error, isLoading } = useGetScooterByIdQuery(Number(id));

  if (isLoading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-500">Error loading product details.</div>;
  if (!scooter) return <div className="text-center py-20">Product not found.</div>;

  const imageName = scooter.name.replace(/\s+/g, '-');
  const categoryPath = scooter.category.name.toLowerCase() === 'electric bike' ? 'bikes' : 'scooters';
  const imageUrl = `/${categoryPath}/${imageName}.webp`;

  const handleAddToCart = () => {
    if (scooter) {
      dispatch(addItem({
        id: scooter.id,
        name: scooter.name,
        price: scooter.price,
        image: imageUrl,
      }));
    }
  };

  const specs = [
    { icon: <Zap className="w-6 h-6 text-indigo-500" />, label: 'Motor', value: scooter.motor },
    { icon: <Gauge className="w-6 h-6 text-indigo-500" />, label: 'Max Speed', value: `${scooter.maxSpeed} km/h` },
    { icon: <ArrowRight className="w-6 h-6 text-indigo-500" />, label: 'Max Range', value: `${scooter.maxRange} km` },
    { icon: <Weight className="w-6 h-6 text-indigo-500" />, label: 'Weight', value: `${scooter.weight} kg` },
  ];
  console.log('sctr', scooter);
  return (
    <div className="bg-white p-4 sm:p-8 rounded-lg shadow-lg">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image Gallery */}
        <div className="flex justify-center items-center">
          <img 
            src={imageUrl} 
            alt={scooter.name} 
            className="w-full max-w-md h-auto object-contain rounded-lg"
          />
        </div>

        {/* Product Info */}
        <div>
          <p className="text-sm font-medium text-indigo-600">{scooter.brand}</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-1">{scooter.name}</h1>
          
          <div className="mt-4 flex items-baseline gap-3">
            <p className="text-3xl font-bold text-gray-900">${scooter.price}</p>
            {scooter.discount && (
              <p className="text-xl text-red-500 line-through">
                ${(scooter.price / (1 - scooter.discount.percentage / 100)).toFixed(2)}
              </p>
            )}
          </div>

          <p className="mt-6 text-gray-600 text-base leading-relaxed">{scooter.description}</p>

          {/* Specifications */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Key Specifications</h2>
            <div className="grid grid-cols-2 gap-4">
              {specs.map(spec => (
                <div key={spec.label} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  {spec.icon}
                  <div>
                    <p className="text-sm text-gray-500">{spec.label}</p>
                    <p className="font-semibold text-gray-800">{spec.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <div className="mt-8">
            <button 
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-transform transform hover:scale-105 disabled:bg-gray-400"
              disabled={scooter.stock <= 0}
            >
              <ShoppingCart className="w-6 h-6" />
              <span>{scooter.stock > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
            </button>
          </div>

          {/* Safety Info */}
          {scooter.safetyInfo && (
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
              <ShieldCheck className="w-8 h-8 text-blue-500 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-blue-800">Safety First</h3>
                <p className="text-sm text-blue-700 mt-1">{scooter.safetyInfo.info}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
