import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CheckCircle, ArrowRight, Home, Copy, Check } from 'lucide-react';
import { useState } from 'react';

const RepairRequestSuccess: React.FC = () => {
  const location = useLocation();
  const [copied, setCopied] = useState(false);
  const referenceNumber = (location.state as { referenceNumber?: string } | null)?.referenceNumber;

  const copyReference = async () => {
    if (!referenceNumber) return;
    try {
      await navigator.clipboard.writeText(referenceNumber);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch { setCopied(false); }
  };

  return (
    <div className="min-h-screen page-surface flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-green-100 rounded-full text-green-600">
              <CheckCircle className="h-16 w-16" />
            </div>
          </div>

          <h1 className="display-heading text-4xl md:text-5xl font-extrabold text-[#142825] mb-4">
            {referenceNumber ? 'Request received.' : 'Reference not available.'}
          </h1>
          <p className="text-lg text-gray-600 mb-10">
            {referenceNumber ? 'We have your details. Keep your reference number handy to follow the repair.' : 'This page does not contain a repair confirmation. If you just submitted a request, contact us for help.'}
          </p>

          <div className="card-surface p-8 md:p-12 mb-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-green-500" />
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 block">
              Your Reference Number
            </span>
            <div className="text-3xl sm:text-4xl md:text-5xl font-mono font-black text-[#142825] mb-6 tracking-tight break-all">
              {referenceNumber || 'Reference unavailable'}
            </div>
            <p className="text-gray-600 leading-relaxed">
              {referenceNumber ? 'Save this number to check your repair status later.' : 'Please contact us if you did not save your reference number.'}
            </p>
            {referenceNumber && <button type="button" onClick={copyReference} className="btn-secondary mt-6 mx-auto"><Copy className="w-4 h-4" /> {copied ? 'Copied' : 'Copy reference'}{copied && <Check className="w-4 h-4" />}</button>}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/track"
              state={{ referenceNumber }}
              className="btn-primary w-full sm:w-auto text-lg"
            >
              <ArrowRight className="h-5 w-5" />
              <span>Track My Repair</span>
            </Link>
            <Link
              to="/"
              className="btn-secondary w-full sm:w-auto text-lg"
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
