import React from 'react';
import { Navbar } from './components/Navbar';
import { PriceComparison } from './components/PriceComparison';
import { Calculator } from './components/Calculator';
import { OrganicAlternatives } from './components/OrganicAlternatives';
import { AiAgronomist } from './components/AiAgronomist';
import { ContactForm } from './components/ContactForm';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <a 
        href="#main" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-green-700 text-white px-4 py-2 rounded-md shadow-md"
      >
        Skip to main content
      </a>
      
      <Navbar />

      <main id="main" className="flex-grow">
        {/* Hero Section */}
        <section className="bg-stone-900 text-white py-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-40">
            <img src="https://picsum.photos/1920/1080" alt="Farm field at sunset" className="w-full h-full object-cover" />
          </div>
          <div className="container mx-auto max-w-4xl relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
              Smarter Protection for Your Crops
            </h1>
            <p className="text-xl text-stone-200 mb-8">
              Compare pesticide prices, calculate treatment costs accurately, and explore organic alternatives—all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#comparison" className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-8 rounded-lg transition-colors">
                Compare Prices
              </a>
              <a href="#calculator" className="bg-white hover:bg-stone-100 text-stone-900 font-bold py-3 px-8 rounded-lg transition-colors">
                Calculate Costs
              </a>
            </div>
          </div>
        </section>

        <PriceComparison />
        <Calculator />
        <OrganicAlternatives />
        <AiAgronomist />
        <ContactForm />
      </main>

      <footer className="bg-stone-900 text-stone-400 py-8 border-t border-stone-800">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">&copy; {new Date().getFullYear()} FarmGuard. All rights reserved.</p>
          <p className="text-sm">
            Disclaimer: Prices are estimates based on national averages. Always read and follow label directions.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;