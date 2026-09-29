import React from 'react';
import ServiceCategoryCard from './ServiceCategory';
import { serviceCategories } from '../data/content';

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 md:mb-16 max-w-2xl">
          <p className="eyebrow mb-4">What we can help with</p>
          <h2 className="section-heading text-4xl md:text-5xl font-extrabold text-[#142825] mb-5">
            Practical fixes for everyday tech problems.
          </h2>
          <p className="text-lg text-[#53645e] leading-relaxed">
            From a laptop that will not boot to a network that will not connect, start with the service that fits your problem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {serviceCategories.map((category) => (
            <ServiceCategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
