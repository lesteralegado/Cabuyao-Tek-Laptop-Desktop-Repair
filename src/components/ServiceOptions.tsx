import React from 'react';
import { MapPin, Home, PhoneCall } from 'lucide-react';

const ServiceOptions: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Can't Bring Your Device to Us?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            No problem. Cabuyao Tek also offers meet-up and home service for selected technical services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
            <div className="bg-blue-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <MapPin className="h-7 w-7" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Meet-up Service</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Arrange a convenient location for your device service. Perfect for those who prefer a neutral meeting point.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
            <div className="bg-blue-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Home className="h-7 w-7" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Home Service</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Get technical assistance at your location for applicable services. We come to you for maximum convenience.
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <a
            href="/#contact"
            className="inline-flex items-center space-x-2 bg-gray-900 text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all shadow-lg"
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
