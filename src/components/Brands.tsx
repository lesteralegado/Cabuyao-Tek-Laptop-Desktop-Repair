import React from 'react';
import { brands } from '../data/content';

const Brands: React.FC = () => {
  return (
    <section id="brands" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="eyebrow mb-4">Familiar devices</p>
        <h2 className="section-heading text-3xl md:text-4xl font-extrabold text-[#142825] mb-4">
          Brands We Service
        </h2>
        <p className="text-lg text-[#53645e] mb-10 max-w-2xl">
          We work with many of the most popular laptop and technology brands.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 items-center">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="flex items-center justify-center p-5 min-h-24 rounded-xl bg-[#f9f8f4] border border-[#e2e9e4] group"
            >
              <img
                src={brand.logoUrl}
                alt={`${brand.name} logo`}
                className="h-10 w-auto max-w-full object-contain"
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

        <p className="mt-8 text-sm text-[#718077]">
          We service devices from popular brands including the ones listed above.
        </p>
      </div>
    </section>
  );
};

export default Brands;
