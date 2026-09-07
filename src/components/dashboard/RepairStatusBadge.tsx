import React from 'react';
import type { RepairStatus } from '../../types/repair';

const STATUS_MAP: Record<RepairStatus, { label: string; color: string }> = {
  requested: { label: 'Request Received', color: 'bg-gray-100 text-gray-700 border-gray-200' },
  received: { label: 'Device Received', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  inspection: { label: 'Under Inspection', color: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
  diagnosis: { label: 'Diagnosis', color: 'bg-purple-100 text-purple-700 border-purple-200' },
  waiting_approval: { label: 'Waiting for Approval', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  repairing: { label: 'Repair in Progress', color: 'bg-orange-100 text-orange-700 border-orange-200' },
  ready_for_pickup: { label: 'Ready for Pickup', color: 'bg-green-100 text-green-700 border-green-200' },
  completed: { label: 'Completed', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-700 border-red-200' },
};

interface RepairStatusBadgeProps {
  status: RepairStatus;
}

const RepairStatusBadge: React.FC<RepairStatusBadgeProps> = ({ status }) => {
  const { label, color } = STATUS_MAP[status];

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${color}`}>
      {label}
    </span>
  );
};

export default RepairStatusBadge;
