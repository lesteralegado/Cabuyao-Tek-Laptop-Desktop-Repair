import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Loader2, Package } from 'lucide-react';
import { getRecentRepairRequests } from '../services/repairService';
import type { RepairRequest, RepairStatus } from '../types/repair';
import RepairStatusBadge from '../components/dashboard/RepairStatusBadge';

const RepairsPage: React.FC = () => {
  const [repairs, setRepairs] = useState<RepairRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<RepairStatus | 'all'>('all');

  const fetchRepairs = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getRecentRepairRequests(
        searchQuery,
        statusFilter === 'all' ? undefined : statusFilter
      );
      setRepairs(data);
    } catch (err) {
      setError('Unable to load repair requests. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepairs();
  }, [searchQuery, statusFilter]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Repairs</h1>
          <p className="text-gray-500">Manage all repair requests and track their progress.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search repair requests..."
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
            >
              <option value="all">All Statuses</option>
              <option value="requested">Requested</option>
              <option value="received">Received</option>
              <option value="inspection">Inspection</option>
              <option value="diagnosis">Diagnosis</option>
              <option value="waiting_approval">Waiting Approval</option>
              <option value="repairing">Repairing</option>
              <option value="ready_for_pickup">Ready for Pickup</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-12 flex flex-col items-center justify-center space-y-4">
              <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
              <p className="text-gray-500 font-medium">Loading repair requests...</p>
            </div>
          ) : error ? (
            <div className="p-12 flex flex-col items-center justify-center text-center space-y-4">
              <p className="text-gray-900 font-bold">{error}</p>
            </div>
          ) : repairs.length === 0 ? (
            <div className="p-12 text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                <Package className="h-8 w-8" />
              </div>
              <p className="text-gray-500 font-medium">No repair requests found.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-semibold">Reference</th>
                  <th className="px-6 py-4 font-semibold">Customer</th>
                  <th className="px-6 py-4 font-semibold">Device</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {repairs.map((repair) => (
                  <tr key={repair.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-sm font-bold text-gray-900">
                      {repair.reference_number}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                      {repair.customer_name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {repair.device_brand} {repair.device_model}
                    </td>
                    <td className="px-6 py-4">
                      <RepairStatusBadge status={repair.status} />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(repair.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/repairs/${repair.id}`}
                        className="text-blue-600 hover:text-blue-800 text-sm font-bold"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default RepairsPage;
