import React from 'react';
import { repairStatusLabels, type RepairStatus } from '../../types/repair';

const STATUS_COLORS: Record<RepairStatus, string> = {
  requested: 'bg-gray-100 text-gray-700 border-gray-200',
  received: 'bg-blue-100 text-blue-700 border-blue-200',
  inspection: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  diagnosis: 'bg-purple-100 text-purple-700 border-purple-200',
  waiting_approval: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  repairing: 'bg-orange-100 text-orange-700 border-orange-200',
  ready_for_pickup: 'bg-green-100 text-green-700 border-green-200',
  completed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  cancelled: 'bg-red-100 text-red-700 border-red-200',
};

interface RepairStatusBadgeProps {
  status: RepairStatus;
}

const RepairStatusBadge: React.FC<RepairStatusBadgeProps> = ({ status }) => {
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${STATUS_COLORS[status]}`}>
      {repairStatusLabels[status]}
    </span>
  );
};

export default RepairStatusBadge;
