import React from 'react';
import { whyChooseUs } from '../data/content';
import { ShieldCheck, Zap, Clock, MapPin } from 'lucide-react';

const icons = [ShieldCheck, Zap, Clock, MapPin];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Why Choose Cabuyao Tek
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We combine technical expertise with a commitment to customer convenience and transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyChooseUs.map((item, index) => {
            const Icon = icons[index] || ShieldCheck;
            return (
              <div key={item.id} className="p-6 rounded-2xl bg-gray-50 hover:bg-blue-50 transition-colors border border-transparent hover:border-blue-100 group">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm text-gray-600 group-hover:text-blue-600 transition-colors">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
