import React from 'react';
import { Link } from 'react-router-dom';
import { useGetScootersQuery } from '../features/products/productAPI';
import ProductCard from '../components/ProductCard';

const HomePage: React.FC = () => {
  // Fetch a few featured products
  const { data, isLoading, isError } = useGetScootersQuery({ limit: 4, sortBy: 'createdAt', order: 'DESC' });

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white rounded-lg overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/bikes/CityScape-Cruiser.webp" 
            alt="Hero Scooter" 
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Experience the Future of Riding
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-300">
            Discover our premium collection of electric scooters and bikes. Perfect for your daily commute or weekend adventures.
          </p>
          <div className="mt-8">
            <Link 
              to="/products" 
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Featured Products</h2>
        {isLoading && <div className="text-center">Loading...</div>}
        {isError && <div className="text-center text-red-500">Could not load products.</div>}
        {data && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.scooters.map(scooter => (
              <ProductCard key={scooter.id} scooter={scooter} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
