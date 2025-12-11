import React, { useState } from 'react';
import { resourceGuides } from '../services/data';
import { Modal } from './Modal';
import { ResourceGuide } from '../types';

export const OrganicAlternatives: React.FC = () => {
  const [activeGuide, setActiveGuide] = useState<ResourceGuide | null>(null);

  const closeModal = () => setActiveGuide(null);

  return (
    <section id="alternatives" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Transitioning to Organic?</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Reducing chemical dependency not only helps the environment but can open up new premium markets for your produce. 
              We provide resources to help you understand certification, soil health, and organic pest management.
            </p>
            <div className="grid gap-4">
              {resourceGuides.map((guide) => (
                <button
                  key={guide.id}
                  onClick={() => setActiveGuide(guide)}
                  className="text-left group bg-stone-50 hover:bg-green-50 p-4 rounded-lg border border-stone-200 hover:border-green-300 transition-all duration-200"
                >
                  <h3 className="font-semibold text-green-800 group-hover:text-green-700 flex items-center justify-between">
                    {guide.title}
                    <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{guide.summary}</p>
                </button>
              ))}
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="absolute inset-0 bg-green-200 rounded-2xl transform rotate-3"></div>
            <img 
              src="https://picsum.photos/600/400" 
              alt="Farmer inspecting organic crops" 
              className="relative rounded-2xl shadow-xl w-full object-cover h-80 md:h-96"
            />
          </div>
        </div>
      </div>

      <Modal 
        isOpen={!!activeGuide} 
        onClose={closeModal} 
        title={activeGuide?.title || ''}
      >
        <div className="prose prose-green max-w-none">
          <p className="text-gray-700 leading-7">{activeGuide?.content}</p>
          <div className="mt-6 p-4 bg-yellow-50 rounded-md border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Did you know?
            </h4>
            <p className="text-sm text-yellow-800 mt-1">
              Organic certification requires keeping detailed records of all inputs applied to your land for at least 5 years.
            </p>
          </div>
        </div>
        <div className="mt-8 flex justify-end">
          <button 
            onClick={closeModal}
            className="bg-stone-200 hover:bg-stone-300 text-stone-800 px-4 py-2 rounded-md font-medium transition-colors"
          >
            Close Guide
          </button>
        </div>
      </Modal>
    </section>
  );
};