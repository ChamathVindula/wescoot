import React, { useState, useMemo } from 'react';
import { useGetScootersQuery } from '../features/products/productAPI';
import ProductCard from '../components/ProductCard';
import { useSearchParams } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const ProductListPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    page: Number(searchParams.get('page')) || 1,
    limit: Number(searchParams.get('limit')) || 12,
    sortBy: searchParams.get('sortBy') || 'createdAt',
    order: (searchParams.get('order') || 'DESC') as 'ASC' | 'DESC',
    brand: searchParams.get('brand') || '',
    category: searchParams.get('category') || '',
    // Add other filters from your state if needed
  });

  const debouncedFilters = useMemo(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, String(value));
      }
    });
    setSearchParams(params);
    return filters;
  }, [filters, setSearchParams]);

  const { data, error, isLoading } = useGetScootersQuery(debouncedFilters);

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
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Filters Sidebar */}
      <aside className="w-full lg:w-1/4 xl:w-1/5">
        <div className="sticky top-24">
          <h2 className="text-2xl font-bold mb-4">Filters</h2>
          <div className="space-y-6">
            <div>
              <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Brand</label>
              <input
                type="text"
                name="brand"
                id="brand"
                value={filters.brand}
                onChange={handleFilterChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
                placeholder="e.g., Segway"
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
              <select
                name="category"
                id="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2"
              >
                <option value="">All</option>
                <option value="1">Electric Scooter</option>
                <option value="2">Electric Bike</option>
              </select>
            </div>
            {/* Add more filters here */}
          </div>
        </div>
      </aside>

      {/* Product Grid */}
      <main className="w-full lg:w-3/4 xl:w-4/5">
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-gray-600">
            Showing {data?.scooters.length || 0} of {data?.total || 0} results
          </p>
          <div className="relative">
            <select
              name="sortBy"
              id="sortBy"
              value={filters.sortBy}
              onChange={handleFilterChange}
              className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="createdAt">Latest</option>
              <option value="price">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {isLoading && <div className="text-center py-12">Loading...</div>}
        {error && <div className="text-center py-12 text-red-500">Error loading products.</div>}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {data?.scooters.map((scooter) => (
            <ProductCard key={scooter.id} scooter={scooter} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-8 space-x-2">
          <button 
            onClick={() => handlePageChange(filters.page - 1)} 
            disabled={filters.page <= 1}
            className="px-4 py-2 border rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          {Array.from({ length: Math.ceil((data?.total || 0) / filters.limit) }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 border rounded-md text-sm font-medium ${page === filters.page ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              {page}
            </button>
          ))}
          <button 
            onClick={() => handlePageChange(filters.page + 1)} 
            disabled={filters.page >= Math.ceil((data?.total || 0) / filters.limit)}
            className="px-4 py-2 border rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

export default ProductListPage;
