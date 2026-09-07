import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Search, Package, RefreshCcw, Copy, Check, Phone, Mail } from 'lucide-react';
import { getRepairStatus } from '../services/repairTrackingService';
import type { PublicRepairStatus } from '../types/repair';
import RepairStatusCard from '../components/RepairStatusCard';
import RepairTimeline from '../components/RepairTimeline';

const TrackRepair: React.FC = () => {
  const [refNumber, setRefNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PublicRepairStatus | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();

    const normalizedRef = refNumber.trim().toUpperCase();
    if (!normalizedRef) {
      setError('Please enter your repair reference number.');
      setResult(null);
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await getRepairStatus(normalizedRef);
      if (data) {
        setResult(data);
      } else {
        setError("We couldn't find a repair request with that reference number. Please check your reference number and try again.");
      }
    } catch (err) {
      setError("We couldn't check your repair status right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyRef = () => {
    if (result?.reference_number) {
      navigator.clipboard.writeText(result.reference_number);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Track Your Repair
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
              Enter your repair reference number to check the current status of your device.
            </p>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
              No account required.
            </div>
          </div>

          {/* Search Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-10 mb-12">
            <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="FR-2026-00027"
                  className="w-full pl-11 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-lg uppercase font-mono"
                  value={refNumber}
                  onChange={(e) => setRefNumber(e.target.value)}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 disabled:bg-blue-400 flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <RefreshCcw className="h-5 w-5 animate-spin" />
                    <span>Checking...</span>
                  </>
                ) : (
                  <span>Track Repair</span>
                )}
              </button>
            </form>
            {error && (
              <p className="mt-4 text-red-600 text-sm text-center font-medium">{error}</p>
            )}
          </div>

          {/* Result Section */}
          {result && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="p-6 md:p-10">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Repair Found</h2>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-lg font-mono font-bold text-blue-600">{result.reference_number}</span>
                        <button
                          onClick={copyRef}
                          className="p-1 hover:bg-gray-100 rounded transition-colors text-gray-400 hover:text-blue-600"
                          title="Copy reference number"
                        >
                          {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="hidden sm:block">
                      <Package className="h-12 w-12 text-blue-100" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                    <div className="space-y-4">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-500 font-medium">Device</span>
                        <span className="text-lg font-bold text-gray-900">
                          {result.device_type} • {result.device_brand} {result.device_model ? `• ${result.device_model}` : ''}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-500 font-medium">Service</span>
                        <span className="text-lg font-bold text-gray-900">{result.service}</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-500 font-medium">Submitted</span>
                        <span className="text-lg text-gray-900">
                          {new Date(result.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-500 font-medium">Last Updated</span>
                        <span className="text-lg text-gray-900">
                          {new Date(result.updated_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                    </div>
                  </div>

                  <RepairStatusCard status={result.status} />
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-10">
                <h3 className="text-xl font-bold text-gray-900 mb-8 text-center">Repair Timeline</h3>
                <RepairTimeline status={result.status} />
              </div>
            </div>
          )}

          {/* Help Section */}
          <div className="mt-16 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Need Help?</h3>
            <p className="text-gray-600 mb-6">
              If you have questions about your repair, contact Cabuyao Tek.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a href="tel:09473019217" className="flex items-center space-x-2 text-blue-600 font-bold hover:underline">
                <Phone className="h-5 w-5" />
                <span>09473019217</span>
              </a>
              <a href="mailto:johncomshop01@gmail.com" className="flex items-center space-x-2 text-blue-600 font-bold hover:underline">
                <Mail className="h-5 w-5" />
                <span>johncomshop01@gmail.com</span>
              </a>
            </div>
            <p className="mt-6 text-sm text-gray-500 italic">
              Meet-up and home service available.
            </p>
          </div>

          {/* Bottom Navigation */}
          <div className="mt-12 flex justify-center space-x-4">
            <Link
              to="/"
              className="px-6 py-2 rounded-lg text-gray-600 font-medium hover:text-gray-900 transition-colors"
            >
              ← Back to Home
            </Link>
            <Link
              to="/request"
              className="px-6 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors"
            >
              Request a Repair
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TrackRepair;
