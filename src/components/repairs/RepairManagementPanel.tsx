import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, Loader2 } from 'lucide-react';
import type { RepairStatus, RepairRequest } from '../../types/repair';
import { allowedTransitions, repairStatusLabels } from '../../types/repair';
import { updateRepairStatus } from '../../services/repairService';
import RepairStatusBadge from '../dashboard/RepairStatusBadge';

interface RepairManagementPanelProps {
  repair: RepairRequest;
  onUpdateSuccess: () => void;
}

const RepairManagementPanel: React.FC<RepairManagementPanelProps> = ({ repair, onUpdateSuccess }) => {
  const [newStatus, setNewStatus] = useState<RepairStatus>(repair.status);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  // Cancellation has its own confirmation flow; it must not be a one-click status update.
  const availableTransitions = allowedTransitions[repair.status].filter(status => status !== 'cancelled');
  const selectedStatus = availableTransitions.some(status => status === newStatus) ? newStatus : repair.status;

  const handleSave = async (statusToSet: RepairStatus) => {
    setIsSaving(true);
    setMessage(null);
    try {
      await updateRepairStatus(repair.id, statusToSet);
      setMessage({ type: 'success', text: 'Repair status updated successfully.' });
      setNewStatus(statusToSet);
      onUpdateSuccess();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Unable to update repair status. Please try again.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = async () => {
    setShowCancelConfirm(false);
    await handleSave('cancelled');
  };

  return (
    <div className="p-6 bg-gray-50 rounded-3xl border border-gray-200 space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
          <CheckCircle2 className="h-5 w-5" />
        </div>
        <h3 className="text-lg font-bold text-gray-900">Repair Management</h3>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-2">
          <span className="text-sm text-gray-500 block">Current Status</span>
          <RepairStatusBadge status={repair.status} />
        </div>

        <div className="space-y-2">
          <label htmlFor="next-repair-status" className="text-sm font-semibold text-[#30433e] block">Next status</label>
          <div className="flex flex-col sm:flex-row gap-2 min-w-0">
            <select
              id="next-repair-status"
              className="field-control min-w-0 flex-grow text-sm"
              value={selectedStatus}
              onChange={(e) => setNewStatus(e.target.value as RepairStatus)}
              disabled={isSaving || availableTransitions.length === 0}
            >
              {availableTransitions.length === 0 ? (
                <option value={repair.status}>No further status updates</option>
              ) : (
                <>
                  <option value={repair.status}>{repairStatusLabels[repair.status]} (current)</option>
                  {availableTransitions.map(status => (
                    <option key={status} value={status}>{repairStatusLabels[status]}</option>
                  ))}
                </>
              )}
            </select>
            <button
              type="button"
              onClick={() => handleSave(selectedStatus)}
              disabled={isSaving || selectedStatus === repair.status || availableTransitions.length === 0}
              className="btn-primary w-full sm:w-auto sm:shrink-0 text-sm"
            >
              {isSaving ? <><Loader2 className="h-4 w-4 animate-spin" /> Updating...</> : 'Update status'}
            </button>
          </div>
        </div>
      </div>

      {allowedTransitions[repair.status].includes('cancelled') && (
        <div className="pt-4 border-t border-gray-200">
          <button
            onClick={() => setShowCancelConfirm(true)}
            className="text-red-600 hover:text-red-800 text-sm font-semibold flex items-center space-x-1 transition-colors"
          >
            <AlertTriangle className="h-4 w-4" />
            <span>Cancel Repair</span>
          </button>
        </div>
      )}

      {message && (
        <div role={message.type === 'error' ? 'alert' : 'status'} className={`p-3 rounded-lg text-sm font-medium ${
          message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      {showCancelConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl space-y-4">
            <h4 className="text-lg font-bold text-gray-900">Cancel Repair?</h4>
            <p className="text-gray-600 text-sm">
              Are you sure you want to cancel repair <span className="font-mono font-bold">{repair.reference_number}</span>?
              This action cannot be automatically reversed.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowCancelConfirm(false)}
                className="px-4 py-2 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Keep Repair
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                Cancel Repair
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RepairManagementPanel;
