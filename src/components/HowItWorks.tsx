import React from 'react';
import { howItWorks } from '../data/content';
import { MessageSquare, Receipt, Search, PackageCheck } from 'lucide-react';

const icons = [MessageSquare, Receipt, Search, PackageCheck];

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Getting Your Device Repaired Is Simple
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our streamlined process ensures your technology is back in your hands as quickly as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Desktop Arrow Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -z-10" />

          {howItWorks.map((step, index) => {
            const Icon = icons[index] || MessageSquare;
            return (
              <div key={step.id} className="relative text-center group">
                <div className="mx-auto w-16 h-16 bg-white border-2 border-gray-100 rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:border-blue-600 group-hover:text-blue-600 transition-all">
                  <Icon className="h-8 w-8" />
                </div>
                <div className="text-blue-600 font-bold text-lg mb-2">{step.id} — {step.title}</div>
                <p className="text-gray-600 text-sm leading-relaxed px-4">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
