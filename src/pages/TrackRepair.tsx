import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Search, Package, RefreshCcw, Copy, Check, Phone, Mail } from 'lucide-react';
import { getRepairStatus } from '../services/repairTrackingService';
import type { PublicRepairStatus } from '../types/repair';
import RepairStatusCard from '../components/RepairStatusCard';
import RepairTimeline from '../components/RepairTimeline';
import { formatDeviceType } from '../utils/formatDeviceType';

const TrackRepair: React.FC = () => {
  const location = useLocation();
  const [refNumber, setRefNumber] = useState(() => (location.state as { referenceNumber?: string } | null)?.referenceNumber || '');
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

  const copyRef = async () => {
    if (result?.reference_number) {
      try {
        await navigator.clipboard.writeText(result.reference_number);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch { setError('Could not copy the reference number. Please select it manually.'); }
    }
  };

  return (
    <div className="min-h-screen page-surface flex flex-col">
      <Navbar />
      <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <p className="eyebrow mb-4">Repair status · No account needed</p>
            <h1 className="display-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#142825] mb-5">
              See where things stand.
            </h1>
            <p className="text-lg text-[#53645e] max-w-2xl">
              Enter your repair reference number to check the current status of your device.
            </p>
          </div>

          {/* Search Card */}
          <div className="card-surface p-5 sm:p-8 md:p-10 mb-10">
            <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow min-w-0 relative">
                <label htmlFor="repair-reference" className="block text-sm font-semibold text-[#30433e] mb-2">Reference number</label>
                <div className="relative">
                  <Search className="h-5 w-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
                  <input
                    id="repair-reference"
                    type="text"
                    placeholder="FR-2026-A1B2C3D4E5F6"
                    className="field-control pl-12 py-3 text-lg uppercase font-mono"
                    value={refNumber}
                    onChange={(e) => setRefNumber(e.target.value)}
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full md:w-auto md:self-end md:shrink-0 text-lg py-3"
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
              <p className="mt-4 text-red-700 text-sm font-medium" role="alert">{error}</p>
            )}
          </div>

          {/* Result Section */}
          {result && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="card-surface overflow-hidden">
                <div className="p-6 md:p-10">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Repair Found</h2>
                      <div className="flex items-center gap-2 mt-1 min-w-0">
                        <span className="text-lg font-mono font-bold text-blue-600 break-all">{result.reference_number}</span>
                        <button
                          type="button"
                          onClick={copyRef}
                          className="w-11 h-11 shrink-0 flex items-center justify-center hover:bg-blue-50 rounded-xl transition-colors text-blue-700"
                          aria-label={copied ? 'Reference number copied' : 'Copy reference number'}
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
                          {formatDeviceType(result.device_type)} • {result.device_brand} {result.device_model ? `• ${result.device_model}` : ''}
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

              <div className="card-surface p-6 md:p-10">
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
