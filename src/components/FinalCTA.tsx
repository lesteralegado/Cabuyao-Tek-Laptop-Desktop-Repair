import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench } from 'lucide-react';

const FinalCTA: React.FC = () => {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-blue-600 rounded-[3rem] p-8 md:p-16 text-center text-white shadow-2xl overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-64 h-64 bg-blue-700 rounded-full blur-3xl opacity-50" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center p-3 bg-white/20 rounded-2xl mb-6 text-white">
              <Wrench className="h-8 w-8" />
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
              Let's Get Your Device Working Again.
            </h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Whether you're dealing with a software problem, hardware issue, network problem, or device repair, Cabuyao Tek is ready to help.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/request"
                className="w-full sm:w-auto bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-lg"
              >
                Request a Repair
              </Link>
              <Link
                to="/track"
                className="w-full sm:w-auto bg-blue-700 text-white border border-blue-500 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-800 transition-all"
              >
                Track My Repair
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
