import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageSquare, ArrowRight } from 'lucide-react';
import { businessInfo } from '../data/content';

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Need Help With Your Device?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Contact Cabuyao Tek and tell us what you need help with.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center space-x-4 mb-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <Phone className="h-5 w-5" />
                </div>
                <span className="font-bold text-gray-900">Phone</span>
              </div>
              <a href={`tel:${businessInfo.phone}`} className="text-lg text-gray-600 hover:text-blue-600 transition-colors">
                {businessInfo.phone}
              </a>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center space-x-4 mb-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <Mail className="h-5 w-5" />
                </div>
                <span className="font-bold text-gray-900">Email</span>
              </div>
              <a href={`mailto:${businessInfo.email}`} className="text-lg text-gray-600 hover:text-blue-600 transition-colors truncate block">
                {businessInfo.email}
              </a>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center space-x-4 mb-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <MapPin className="h-5 w-5" />
                </div>
                <span className="font-bold text-gray-900">Location</span>
              </div>
              <p className="text-lg text-gray-600">
                {businessInfo.location}
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center space-x-4 mb-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <span className="font-bold text-gray-900">Service Options</span>
              </div>
              <p className="text-lg text-gray-600">
                {businessInfo.options}
              </p>
            </div>
          </div>

          {/* Action Area */}
          <div className="bg-blue-600 rounded-3xl p-8 md:p-12 text-white flex flex-col justify-center">
            <h3 className="text-3xl font-bold mb-6">Ready to get started?</h3>
            <p className="text-blue-100 mb-10 text-lg leading-relaxed">
              Whether it's a quick software update or a complex hardware repair,
              we're here to provide a fast and reliable solution for your devices.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={`tel:${businessInfo.phone}`}
                className="flex items-center justify-center space-x-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-all"
              >
                <Phone className="h-5 w-5" />
                <span>Call Us</span>
              </a>
              <a
                href={`mailto:${businessInfo.email}`}
                className="flex items-center justify-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-400 transition-all border border-blue-400"
              >
                <Mail className="h-5 w-5" />
                <span>Email Us</span>
              </a>
              <Link
                to="/request"
                className="sm:col-span-2 flex items-center justify-center space-x-2 bg-gray-900 text-white px-6 py-4 rounded-xl font-bold hover:bg-gray-800 transition-all shadow-xl"
              >
                <ArrowRight className="h-5 w-5" />
                <span>Request a Repair</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
