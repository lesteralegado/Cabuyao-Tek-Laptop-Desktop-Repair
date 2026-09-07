import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CheckCircle, ArrowRight, Home } from 'lucide-react';

const RepairRequestSuccess: React.FC = () => {
  const location = useLocation();
  // Get the reference number from React Router state, fallback to a generic message
  const referenceNumber = location.state?.referenceNumber || 'Not Available';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-green-100 rounded-full text-green-600">
              <CheckCircle className="h-16 w-16" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Repair Request Submitted!
          </h1>
          <p className="text-lg text-gray-600 mb-10">
            Your repair request has been successfully submitted. Our technicians will review the information and get back to you soon.
          </p>

          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 md:p-12 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-green-500" />
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 block">
              Your Reference Number
            </span>
            <div className="text-4xl md:text-6xl font-mono font-black text-gray-900 mb-6 tracking-tight">
              {referenceNumber}
            </div>
            <p className="text-gray-600 leading-relaxed">
              Please save this reference number. You will need it to track your repair status.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/track"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
            >
              <ArrowRight className="h-5 w-5" />
              <span>Track My Repair</span>
            </Link>
            <Link
              to="/"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all"
            >
              <Home className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RepairRequestSuccess;
