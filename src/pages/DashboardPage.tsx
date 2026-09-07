import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Loader2, AlertCircle, Package } from 'lucide-react';
import { getRepairStatistics, getRecentRepairRequests, type RepairStatistics } from '../services/repairService';
import type { RepairRequest, RepairStatus } from '../types/repair';
import StatCard from '../components/dashboard/StatCard';
import RepairStatusBadge from '../components/dashboard/RepairStatusBadge';

const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState<RepairStatistics | null>(null);
  const [repairs, setRepairs] = useState<RepairRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<RepairStatus | 'all'>('all');

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [statsData, repairsData] = await Promise.all([
        getRepairStatistics(),
        getRecentRepairRequests(searchQuery, statusFilter === 'all' ? undefined : statusFilter),
      ]);
      setStats(statsData);
      setRepairs(repairsData);
    } catch (err) {
      setError('Unable to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [searchQuery, statusFilter]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Overview of your repair service activity.</p>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats && (
          <>
            <StatCard
              title="Total Requests"
              value={stats.total}
              icon={<div className="h-6 w-6 bg-gray-200 rounded-full" />}
              color="bg-gray-100 text-gray-600"
            />
            <StatCard
              title="Requested"
              value={stats.requested}
              icon={<div className="h-6 w-6 bg-blue-100 rounded-full" />}
              color="bg-blue-50 text-blue-600"
            />
            <StatCard
              title="In Progress"
              value={stats.inProgress}
              icon={<div className="h-6 w-6 bg-orange-100 rounded-full" />}
              color="bg-orange-50 text-orange-600"
            />
            <StatCard
              title="Ready for Pickup"
              value={stats.readyForPickup}
              icon={<div className="h-6 w-6 bg-green-100 rounded-full" />}
              color="bg-green-50 text-green-600"
            />
            <StatCard
              title="Completed"
              value={stats.completed}
              icon={<div className="h-6 w-6 bg-emerald-100 rounded-full" />}
              color="bg-emerald-50 text-emerald-600"
            />
          </>
        )}
      </div>

      {/* Recent Repairs Section */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-gray-900">Recent Repair Requests</h2>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search repairs..."
                className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
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
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-12 flex flex-col items-center justify-center space-y-4">
              <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
              <p className="text-gray-500 font-medium">Loading repair requests...</p>
            </div>
          ) : error ? (
            <div className="p-12 flex flex-col items-center justify-center text-center space-y-4">
              <AlertCircle className="h-12 w-12 text-red-500" />
              <p className="text-gray-900 font-bold">{error}</p>
              <button
                onClick={fetchDashboardData}
                className="text-blue-600 font-semibold hover:underline"
              >
                Try Again
              </button>
            </div>
          ) : repairs.length === 0 ? (
            <div className="p-12 text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                <Package className="h-8 w-8" />
              </div>
              <p className="text-gray-500 font-medium">No repair requests found.</p>
              <p className="text-sm text-gray-400">Try changing your search or status filter.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-semibold">Reference</th>
                  <th className="px-6 py-4 font-semibold">Customer</th>
                  <th className="px-6 py-4 font-semibold">Device</th>
                  <th className="px-6 py-4 font-semibold">Service</th>
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
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {repair.service}
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

export default DashboardPage;
