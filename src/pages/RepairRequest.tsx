import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RepairRequestForm from '../components/RepairRequestForm';

const RepairRequest: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Request a Repair
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Tell us about your device and the problem you're experiencing.
              Submit your request and receive a reference number that you can use to track your repair.
            </p>
            <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              No account required.
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-10">
            <RepairRequestForm />
          </div>

          <div className="mt-12 p-6 bg-blue-50 rounded-2xl border border-blue-100 text-center">
            <h3 className="text-blue-900 font-bold mb-2">Need immediate help?</h3>
            <p className="text-blue-700 text-sm mb-4">
              If this is an emergency or you have urgent questions, feel free to contact us directly.
            </p>
            <div className="flex justify-center space-x-4">
              <a href="tel:09473019217" className="text-blue-600 font-bold hover:underline">Call Now</a>
              <span className="text-blue-300">|</span>
              <a href="mailto:johncomshop01@gmail.com" className="text-blue-600 font-bold hover:underline">Email Us</a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RepairRequest;
