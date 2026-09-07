import React, { useState, useEffect } from 'react';
import { Loader2, History } from 'lucide-react';
import { getRepairHistory } from '../../services/repairService';
import type { RepairHistoryEntry, RepairStatus } from '../../types/repair';

interface RepairHistoryProps {
  repairId: string;
  onHistoryUpdated?: () => void;
}

const STATUS_LABELS: Record<RepairStatus, string> = {
  requested: 'Request Received',
  received: 'Device Received',
  inspection: 'Under Inspection',
  diagnosis: 'Diagnosis',
  waiting_approval: 'Waiting for Approval',
  repairing: 'Repair in Progress',
  ready_for_pickup: 'Ready for Pickup',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

const RepairHistory: React.FC<RepairHistoryProps> = ({ repairId }) => {
  const [history, setHistory] = useState<RepairHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getRepairHistory(repairId);
      setHistory(data);
    } catch (err) {
      setError('Unable to load repair history.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [repairId]);

  if (loading) {
    return (
      <div className="p-8 text-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
        <p className="text-gray-500 font-medium">Loading repair history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center space-y-2">
        <p className="text-red-600 font-bold">{error}</p>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500 italic">No repair history available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-6">
        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
          <History className="h-5 w-5" />
        </div>
        <h3 className="text-lg font-bold text-gray-900">Repair History</h3>
      </div>

      <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-blue-500 before:via-gray-200 before:to-transparent">
        {history.map((entry) => {
          const isInitial = entry.previous_status === null;

          return (
            <div key={entry.id} className="relative pl-12">
              <div className={`absolute left-0 top-1 w-10 h-10 rounded-full border-4 border-white shadow-sm flex items-center justify-center transition-colors ${
                isInitial ? 'bg-gray-400' : 'bg-blue-600'
              }`}>
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>

              <div className="flex flex-col space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-900">
                    {entry.staff_name || 'System'}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(entry.created_at).toLocaleString()}
                  </span>
                </div>

                <div className="text-sm text-gray-600">
                  {isInitial ? (
                    <span className="font-medium">Repair request created</span>
                  ) : (
                    <span className="flex items-center space-x-2">
                      <span className="text-gray-400">{STATUS_LABELS[entry.previous_status!]}</span>
                      <span className="text-gray-300">&rarr;</span>
                      <span className="text-blue-600 font-semibold">{STATUS_LABELS[entry.new_status]}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RepairHistory;
