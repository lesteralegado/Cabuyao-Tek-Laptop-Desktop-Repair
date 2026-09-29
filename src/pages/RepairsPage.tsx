import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Loader2, Package } from 'lucide-react';
import { getRepairRequestsPage } from '../services/repairService';
import { repairStatusLabels, type RepairRequest, type RepairStatus } from '../types/repair';
import RepairStatusBadge from '../components/dashboard/RepairStatusBadge';
import RepairMobileList from '../components/dashboard/RepairMobileList';

const RepairsPage: React.FC = () => {
  const [repairs, setRepairs] = useState<RepairRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<RepairStatus | 'all'>('all');
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedSearch(searchQuery), 250);
    return () => window.clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    getRepairRequestsPage(debouncedSearch, statusFilter === 'all' ? undefined : statusFilter, page)
      .then(({ repairs: data, total: count }) => {
        if (active) { setRepairs(data); setTotal(count); }
      })
      .catch(() => { if (active) setError('Unable to load repair requests. Please try again.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [debouncedSearch, statusFilter, page]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="eyebrow mb-2">Service desk</p>
          <h1 className="display-heading text-4xl font-extrabold text-[#142825]">Repairs</h1>
          <p className="text-gray-500">Manage all repair requests and track their progress.</p>
        </div>
      </div>

      <div className="card-surface overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-grow">
            <label htmlFor="repairs-search" className="sr-only">Search repair requests</label>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              id="repairs-search"
              type="text"
              placeholder="Search repair requests..."
              className="field-control pl-9 text-sm"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setPage(0); }}
            />
          </div>
          <div className="relative sm:min-w-56">
            <label htmlFor="repairs-filter" className="sr-only">Filter by status</label>
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" aria-hidden="true" />
            <select
              id="repairs-filter"
              className="field-control pl-9 text-sm"
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value as RepairStatus | 'all'); setPage(0); }}
            >
              <option value="all">All statuses</option>
              {Object.entries(repairStatusLabels).map(([status, label]) => (
                <option key={status} value={status}>{label}</option>
              ))}
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
            <>
            <RepairMobileList repairs={repairs} />
            <table className="hidden lg:table w-full text-left border-collapse">
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
            </>
          )}
        </div>
      </div>
      {total > 0 && <nav aria-label="Repair pages" className="flex flex-wrap items-center justify-between gap-3 text-sm text-gray-600">
        <span>Showing {page * 20 + 1}–{Math.min((page + 1) * 20, total)} of {total}</span>
        <div className="flex gap-2">
          <button type="button" className="btn-secondary" disabled={page === 0 || loading} onClick={() => setPage(value => value - 1)}>Previous</button>
          <button type="button" className="btn-secondary" disabled={(page + 1) * 20 >= total || loading} onClick={() => setPage(value => value + 1)}>Next</button>
        </div>
      </nav>}
    </div>
  );
};

export default RepairsPage;
