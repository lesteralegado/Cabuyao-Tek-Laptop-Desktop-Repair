import React from 'react';
import { MapPin, Home, PhoneCall } from 'lucide-react';

const ServiceOptions: React.FC = () => {
  return (
    <section className="py-20 md:py-24 page-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow mb-4">Flexible service</p>
          <h2 className="section-heading text-4xl md:text-5xl font-extrabold text-[#142825] mb-5">
            Help that fits your day.
          </h2>
          <p className="text-lg text-[#53645e]">
            Ask about meet-up or home service for eligible repairs and technical work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="card-surface p-8">
            <div className="bg-blue-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <MapPin className="h-7 w-7" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Meet-up Service</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Arrange a convenient location for your device service. Perfect for those who prefer a neutral meeting point.
            </p>
          </div>

          <div className="card-surface p-8">
            <div className="bg-blue-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Home className="h-7 w-7" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Home Service</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Get technical assistance at your location for applicable services. We come to you for maximum convenience.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <a
            href="/#contact"
            className="btn-primary"
          >
            <PhoneCall className="h-5 w-5" />
            <span>Contact Us Now</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServiceOptions;
