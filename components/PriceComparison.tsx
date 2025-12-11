import React, { useState, useMemo } from 'react';
import { Product, ProductType } from '../types';
import { products } from '../services/data';

export const PriceComparison: React.FC = () => {
  const [filterType, setFilterType] = useState<string>('All');
  const [filterCrop, setFilterCrop] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Extract unique options for filters
  const cropOptions = useMemo(() => {
    const crops = new Set<string>();
    products.forEach(p => p.crops.forEach(c => crops.add(c)));
    return ['All', ...Array.from(crops).sort()];
  }, []);

  const typeOptions = ['All', ...Object.values(ProductType)];

  const filteredProducts = products.filter(product => {
    const matchesType = filterType === 'All' || product.type === filterType;
    const matchesCrop = filterCrop === 'All' || product.crops.includes(filterCrop);
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesCrop && matchesSearch;
  });

  return (
    <section id="comparison" className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Pesticide Price Comparison</h2>
          <p className="mt-4 text-lg text-gray-600">Find the best products for your crops at the best prices.</p>
        </div>

        {/* Filters */}
        <div className="bg-stone-50 p-6 rounded-lg shadow-sm border border-stone-200 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search Product</label>
              <input 
                type="text" 
                id="search" 
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 py-2 px-3 border"
                placeholder="Name or manufacturer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="type-filter" className="block text-sm font-medium text-gray-700 mb-1">Filter by Type</label>
              <select 
                id="type-filter"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 py-2 px-3 border"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                {typeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="crop-filter" className="block text-sm font-medium text-gray-700 mb-1">Filter by Crop</label>
              <select 
                id="crop-filter"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 py-2 px-3 border"
                value={filterCrop}
                onChange={(e) => setFilterCrop(e.target.value)}
              >
                {cropOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-stone-200 shadow-sm">
          <table className="min-w-full divide-y divide-stone-200">
            <thead className="bg-stone-100">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-stone-500 uppercase tracking-wider">Product</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-stone-500 uppercase tracking-wider">Type</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-stone-500 uppercase tracking-wider">Active Ingredient</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-stone-500 uppercase tracking-wider">Rate</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-stone-500 uppercase tracking-wider">Price / Unit</th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-bold text-stone-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-stone-200">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-stone-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      <div className="text-xs text-gray-500">{product.manufacturer}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        product.isOrganic ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {product.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.activeIngredient}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.rateMin}-{product.rateMax} {product.rateUnit}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      ${product.price.toFixed(2)} <span className="text-gray-500 text-xs">/ {product.packageSize} {product.packageUnit}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      <a href="#contact" className="text-green-600 hover:text-green-900">Find Vendor</a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-sm text-gray-500">
                    No products found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};