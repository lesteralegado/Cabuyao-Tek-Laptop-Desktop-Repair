import React from 'react';
import type { ServiceCategory } from '../types';
import { Cpu, Monitor, Smartphone, Wrench } from 'lucide-react';

const iconMap = { Monitor, Cpu, Smartphone };

interface ServiceCategoryProps {
  category: ServiceCategory;
}

const ServiceCategoryCard: React.FC<ServiceCategoryProps> = ({ category }) => {
  const IconComponent = iconMap[category.icon as keyof typeof iconMap] || Wrench;

  return (
    <article className="card-surface p-7 md:p-8 flex flex-col group hover:border-[#9bc7bc] transition-colors">
      <div className="flex items-start justify-between mb-6">
        <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
          <IconComponent className="h-6 w-6" />
        </div>
        <span className="text-xs font-mono text-[#87958d]">{category.id.toUpperCase()}</span>
      </div>

      <h3 className="text-xl font-bold text-[#142825] mb-2">{category.title}</h3>
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
    </article>
  );
};

export default ServiceCategoryCard;
