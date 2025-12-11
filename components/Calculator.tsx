import React, { useState, useEffect } from 'react';
import { products } from '../services/data';
import { CalculatorResult, Unit } from '../types';

export const Calculator: React.FC = () => {
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [acres, setAcres] = useState<number>(0);
  const [appRate, setAppRate] = useState<number>(0);
  const [laborCostPerAcre, setLaborCostPerAcre] = useState<number>(10); // Default $10/acre
  const [result, setResult] = useState<CalculatorResult | null>(null);

  const selectedProduct = products.find(p => p.id === selectedProductId);

  // Auto-fill application rate when product changes
  useEffect(() => {
    if (selectedProduct) {
      setAppRate(selectedProduct.rateMin);
    }
  }, [selectedProductId, selectedProduct]);

  const handleCalculate = () => {
    if (!selectedProduct || acres <= 0 || appRate <= 0) return;

    // Unit Conversion Logic
    // We normalize everything to ounces to calculate cost per ounce first
    let packageSizeInOunces = 0;

    switch (selectedProduct.packageUnit) {
      case Unit.GALLON:
        packageSizeInOunces = selectedProduct.packageSize * 128;
        break;
      case Unit.QUART:
        packageSizeInOunces = selectedProduct.packageSize * 32;
        break;
      case Unit.POUND:
        packageSizeInOunces = selectedProduct.packageSize * 16;
        break;
      case Unit.OUNCE:
        packageSizeInOunces = selectedProduct.packageSize;
        break;
      default:
        packageSizeInOunces = selectedProduct.packageSize; // Fallback
    }

    const pricePerOunce = selectedProduct.price / packageSizeInOunces;
    const productCostPerAcre = pricePerOunce * appRate; // Assuming appRate is in oz/acre
    
    const totalProductCost = productCostPerAcre * acres;
    const totalLaborCost = laborCostPerAcre * acres;
    const totalCost = totalProductCost + totalLaborCost;
    const costPerAcre = totalCost / acres;

    setResult({
      productCost: totalProductCost,
      laborCost: totalLaborCost,
      totalCost: totalCost,
      costPerAcre: costPerAcre
    });
  };

  return (
    <section id="calculator" className="py-12 bg-stone-100">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Treatment Cost Calculator</h2>
            <p className="mt-2 text-gray-600">Estimate chemical vs. organic treatment costs per acre.</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
            <div className="p-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Input Parameters</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="product-select" className="block text-sm font-medium text-gray-700 mb-1">Select Product</label>
                  <select
                    id="product-select"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 border p-2"
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                  >
                    <option value="">-- Select a product --</option>
                    <optgroup label="Chemical">
                      {products.filter(p => !p.isOrganic).map(p => (
                        <option key={p.id} value={p.id}>{p.name} (${p.price})</option>
                      ))}
                    </optgroup>
                    <optgroup label="Organic">
                      {products.filter(p => p.isOrganic).map(p => (
                        <option key={p.id} value={p.id}>{p.name} (${p.price})</option>
                      ))}
                    </optgroup>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="acres" className="block text-sm font-medium text-gray-700 mb-1">Area (Acres)</label>
                    <input
                      type="number"
                      id="acres"
                      min="0"
                      className="w-full rounded-md border-gray-300 border p-2"
                      value={acres || ''}
                      onChange={(e) => setAcres(parseFloat(e.target.value))}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label htmlFor="rate" className="block text-sm font-medium text-gray-700 mb-1">Rate (oz/acre)</label>
                    <input
                      type="number"
                      id="rate"
                      min="0"
                      className="w-full rounded-md border-gray-300 border p-2"
                      value={appRate || ''}
                      onChange={(e) => setAppRate(parseFloat(e.target.value))}
                      placeholder="0"
                    />
                    {selectedProduct && <span className="text-xs text-gray-500">Rec: {selectedProduct.rateMin}-{selectedProduct.rateMax}</span>}
                  </div>
                </div>

                <div>
                  <label htmlFor="labor" className="block text-sm font-medium text-gray-700 mb-1">Labor Cost ($/acre)</label>
                  <input
                    type="number"
                    id="labor"
                    min="0"
                    className="w-full rounded-md border-gray-300 border p-2"
                    value={laborCostPerAcre}
                    onChange={(e) => setLaborCostPerAcre(parseFloat(e.target.value))}
                  />
                </div>

                <button
                  onClick={handleCalculate}
                  className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md transition duration-200"
                >
                  Calculate Cost
                </button>
              </div>
            </div>

            <div className="bg-green-50 p-8 flex flex-col justify-center border-l border-green-100">
              <h3 className="text-xl font-semibold text-green-800 mb-6">Estimated Breakdown</h3>
              
              {result ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-green-200 pb-2">
                    <span className="text-green-700">Product Cost</span>
                    <span className="text-xl font-bold text-gray-800">${result.productCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-green-200 pb-2">
                    <span className="text-green-700">Labor Cost</span>
                    <span className="text-xl font-bold text-gray-800">${result.laborCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-lg font-bold text-green-900">Total Cost</span>
                    <span className="text-3xl font-bold text-green-700">${result.totalCost.toFixed(2)}</span>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-green-200 text-center mt-4">
                    <p className="text-sm text-gray-500 uppercase tracking-wide">Cost Per Acre</p>
                    <p className="text-2xl font-bold text-gray-800">${result.costPerAcre.toFixed(2)}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center text-green-600/60 py-10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <p>Enter parameters to view cost estimate.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};