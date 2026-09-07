import React from 'react';
import { brands } from '../data/content';

const Brands: React.FC = () => {
  return (
    <section id="brands" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
          Brands We Service
        </h2>
        <p className="text-lg text-gray-600 mb-16 max-w-2xl mx-auto">
          We work with many of the most popular laptop and technology brands.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 items-center">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="flex items-center justify-center p-6 rounded-xl bg-white border border-gray-100 shadow-sm group transition-all hover:shadow-md"
            >
              <img
                src={brand.logoUrl}
                alt={`${brand.name} logo`}
                className="h-12 w-auto object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                onError={(e) => {
                  // Fallback to text if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const next = target.nextElementSibling as HTMLElement;
                  if (next) next.style.display = 'block';
                }}
              />
              <span className="hidden text-xl font-bold text-gray-500 group-hover:text-gray-900 transition-colors">
                {brand.name}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-12 text-sm text-gray-400 italic">
          We service devices from popular brands including the ones listed above.
        </p>
      </div>
    </section>
  );
};

export default Brands;
