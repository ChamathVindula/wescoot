import React, { useState } from 'react';
import { useGetScootersQuery } from '../features/products/productAPI';
import ProductCard from '../components/ProductCard';
import { useSearchParams } from 'react-router';

const ProductListPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    page: Number(searchParams.get('page')) || 1,
    limit: Number(searchParams.get('limit')) || 10,
    sortBy: searchParams.get('sortBy') || 'createdAt',
    order: (searchParams.get('order') === 'ASC' || searchParams.get('order') === 'DESC'
      ? searchParams.get('order')
      : 'DESC') as 'ASC' | 'DESC',
    brand: searchParams.get('brand') || '',
    category: searchParams.get('category') || '',
    motor: searchParams.get('motor') || '',
    maxSpeed: Number(searchParams.get('maxSpeed')) || undefined,
    maxRange: Number(searchParams.get('maxRange')) || undefined,
    price: searchParams.get('price') || '',
  });

  const { data, error, isLoading } = useGetScootersQuery(filters);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
      page: 1,
    }));
  };

  const handlePageChange = (newPage: number) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: newPage,
    }));
    setSearchParams(
      Object.fromEntries(
        Object.entries({ ...filters, page: newPage.toString() }).map(([key, value]) => [
          key,
          value?.toString() || '',
        ])
      )
    );
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products.</div>;

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold my-4">Our Scooters</h1>
      {/* Add filter controls here */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.scooters.map((scooter) => (
          <ProductCard key={scooter.id} scooter={scooter} />
        ))}
      </div>
      <div className="flex justify-center my-4">
        {Array.from({ length: data?.totalPages || 1 }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 mx-1 border rounded ${page === filters.page ? 'bg-blue-500 text-white' : ''}`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;
