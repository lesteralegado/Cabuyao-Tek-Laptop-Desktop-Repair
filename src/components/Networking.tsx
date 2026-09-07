import React from 'react';
import { specializedServices } from '../data/content';
import * as Icons from 'lucide-react';

const Networking: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Networking & Security Solutions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Professional setup and installation for your home or business connectivity and security needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {specializedServices.map((service) => {
            const IconComponent = (Icons as any)[service.icon] || Icons.Wifi;
            return (
              <div key={service.id} className="flex p-8 rounded-3xl bg-blue-600 text-white shadow-xl hover:bg-blue-700 transition-colors group">
                <div className="mr-6 shrink-0">
                  <div className="p-4 bg-white/20 rounded-2xl group-hover:bg-white/30 transition-colors">
                    <IconComponent className="h-8 w-8" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-blue-100 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Networking;
