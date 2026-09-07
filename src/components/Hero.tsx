import React from 'react';
import { Link } from 'react-router-dom';
import { Laptop, Smartphone, Network, Video, CheckCircle2 } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-6">
              <CheckCircle2 className="h-4 w-4" />
              <span>Meet-up & Home Service Available</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Reliable Tech Repair, <span className="text-blue-600">Made Simple.</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto lg:mx-0">
              From computer troubleshooting and reformatting to smartphone repair,
              networking, CCTV installation, and hardware replacement,
              Cabuyao Tek helps keep your technology working.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/request"
                className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 hover:-translate-y-1"
              >
                Request a Repair
              </Link>
              <a
                href="/#services"
                className="w-full sm:w-auto bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all hover:-translate-y-1"
              >
                Our Services
              </a>
            </div>
          </div>

          <div className="flex-1 relative">
            <div className="grid grid-cols-2 gap-4 relative z-10">
              <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 translate-y-4">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Laptop className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900">Laptops & PC</h3>
                <p className="text-sm text-gray-500">Hardware & Software</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 -translate-y-8">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Smartphone className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900">Smartphones</h3>
                <p className="text-sm text-gray-500">All Major Brands</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 -translate-y-4">
                <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Network className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-900">Networking</h3>
                <p className="text-sm text-gray-500">Setup & Fix</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 translate-y-8">
                <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Video className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="font-bold text-gray-900">CCTV Systems</h3>
                <p className="text-sm text-gray-500">Installation</p>
              </div>
            </div>
            {/* Decorative ring behind elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
