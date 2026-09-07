import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Loader2, ArrowLeft } from 'lucide-react';
import { getRepairRequestById } from '../services/repairService';
import type { RepairRequest } from '../types/repair';
import RepairStatusBadge from '../components/dashboard/RepairStatusBadge';
import RepairStatusTimeline from '../components/repairs/RepairStatusTimeline';
import RepairManagementPanel from '../components/repairs/RepairManagementPanel';
import StaffNotes from '../components/repairs/StaffNotes';
import RepairHistory from '../components/repairs/RepairHistory';

const RepairDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [repair, setRepair] = useState<RepairRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDetails = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const data = await getRepairRequestById(id);
      setRepair(data);
    } catch (err) {
      setError('Unable to load repair details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
          <p className="text-gray-600 font-medium">Loading repair details...</p>
        </div>
      </div>
    );
  }

  if (error || !repair) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Repair Not Found</h1>
          <p className="text-gray-600 mb-8">{error || 'The requested repair record could not be found.'}</p>
          <Link to="/dashboard" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold">Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-8">
          <Link to="/repairs" className="inline-flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors mb-6 font-medium">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Repairs List</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Information */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-blue-600 p-6 md:p-10 text-white">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h1 className="text-2xl md:text-3xl font-extrabold mb-2">Repair Request Details</h1>
                      <p className="text-blue-100 font-mono">{repair.reference_number}</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl inline-block">
                      <RepairStatusBadge status={repair.status} />
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-12">
                  {/* Customer Info */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Customer Information</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <span className="text-sm text-gray-500 block">Full Name</span>
                        <span className="text-gray-900 font-semibold">{repair.customer_name}</span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500 block">Phone</span>
                        <span className="text-gray-900 font-semibold">{repair.customer_phone}</span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500 block">Email</span>
                        <span className="text-gray-900 font-semibold">{repair.customer_email || 'Not provided'}</span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500 block">Preferred Contact</span>
                        <span className="text-gray-900 font-semibold capitalize">{repair.preferred_contact_method}</span>
                      </div>
                    </div>
                  </div>

                  {/* Device Info */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Device Information</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <span className="text-sm text-gray-500 block">Device Type</span>
                        <span className="text-gray-900 font-semibold">{repair.device_type}</span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500 block">Brand</span>
                        <span className="text-gray-900 font-semibold">{repair.device_brand}</span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500 block">Model</span>
                        <span className="text-gray-900 font-semibold">{repair.device_model || 'Not provided'}</span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500 block">Serial Number</span>
                        <span className="text-gray-900 font-mono text-sm">{repair.serial_number || 'Not provided'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Service Info */}
                  <div className="space-y-6 md:col-span-2">
                    <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Service Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <span className="text-sm text-gray-500 block">Requested Service</span>
                        <span className="text-gray-900 font-semibold">{repair.service}</span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500 block">Service Method</span>
                        <span className="text-gray-900 font-semibold capitalize">{repair.service_method.replace('_', ' ')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Problem Description */}
                  <div className="space-y-6 md:col-span-2">
                    <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Problem Description</h3>
                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-gray-700 leading-relaxed">
                      {repair.problem_description}
                    </div>
                    {repair.additional_notes && (
                      <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 text-blue-800 text-sm italic">
                        <strong className="block mb-1 not-italic">Additional Notes:</strong> {repair.additional_notes}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <StaffNotes repairId={repair.id} onNotesUpdated={fetchDetails} />

              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-10">
                <RepairHistory
                  repairId={repair.id}
                  onHistoryUpdated={fetchDetails}
                />
              </div>
            </div>

            {/* Right Column: Management & Progress */}
            <div className="space-y-8">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-6">Repair Progress</h3>
                  <RepairStatusTimeline currentStatus={repair.status} />
                </div>

                <div className="pt-8 border-t border-gray-100">
                  <RepairManagementPanel repair={repair} onUpdateSuccess={fetchDetails} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RepairDetailsPage;
