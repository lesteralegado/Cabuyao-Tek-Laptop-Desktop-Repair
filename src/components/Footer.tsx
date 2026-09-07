import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, Mail, Phone, MapPin } from 'lucide-react';
import { businessInfo } from '../data/content';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2 text-white">
              <Wrench className="h-6 w-6 text-blue-500" />
              <span className="text-xl font-bold tracking-tight">
                Cabuyao <span className="text-blue-500">Tek</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              Your trusted local partner for computer, laptop, smartphone, networking, CCTV, and professional technical services in Laguna.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-sm">
                <Phone className="h-4 w-4 shrink-0 text-blue-500" />
                <span>{businessInfo.phone}</span>
              </li>
              <li className="flex items-start space-x-3 text-sm">
                <Mail className="h-4 w-4 shrink-0 text-blue-500" />
                <a href={`mailto:${businessInfo.email}`} className="hover:text-white transition-colors">{businessInfo.email}</a>
              </li>
              <li className="flex items-start space-x-3 text-sm">
                <MapPin className="h-4 w-4 shrink-0 text-blue-500" />
                <span>{businessInfo.location}</span>
              </li>
            </ul>
          </div>

          {/* Services Summary */}
          <div>
            <h4 className="text-white font-bold mb-6">Services</h4>
            <ul className="space-y-4 text-sm">
              <li>Computer Repair</li>
              <li>Laptop Services</li>
              <li>Smartphone Repair</li>
              <li>Networking</li>
              <li>CCTV</li>
              <li>Hardware Repair</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-sm">
          <p>&copy; {currentYear} Cabuyao Tek. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
