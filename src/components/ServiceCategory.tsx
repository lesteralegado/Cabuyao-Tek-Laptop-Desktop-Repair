import React from 'react';
import type { ServiceCategory } from '../types';
import * as Icons from 'lucide-react';

interface ServiceCategoryProps {
  category: ServiceCategory;
}

const ServiceCategoryCard: React.FC<ServiceCategoryProps> = ({ category }) => {
  // Dynamically resolve the Lucide icon
  const IconComponent = (Icons as any)[category.icon] || Icons.Wrench;

  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
      <div className="flex items-start justify-between mb-6">
        <div className="bg-blue-50 p-3 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
          <IconComponent className="h-6 w-6" />
        </div>
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Service Group</span>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-2">{category.title}</h3>
      <p className="text-gray-600 text-sm mb-6 leading-relaxed">
        {category.description}
      </p>

      <ul className="space-y-3">
        {category.services.map((service) => (
          <li key={service.id} className="flex items-center text-sm text-gray-700">
            <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-3" />
            {service.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceCategoryCard;
