import React from 'react';

import type { RepairStatus } from '../types/repair';

const STATUS_DETAILS: Record<RepairStatus, { label: string; description: string }> = {
  requested: { label: 'Request Received', description: 'Your repair request has been received by Cabuyao Tek.' },
  received: { label: 'Device Received', description: 'Your device has been received and is waiting for the next step.' },
  inspection: { label: 'Under Inspection', description: 'Your device is currently being inspected.' },
  diagnosis: { label: 'Diagnosis', description: 'We are identifying the cause of the issue.' },
  waiting_approval: { label: 'Waiting for Approval', description: 'A repair decision or approval is currently required before work can continue.' },
  repairing: { label: 'Repair in Progress', description: 'Our technician is currently working on your device.' },
  ready_for_pickup: { label: 'Ready for Pickup', description: 'Your device is ready to be picked up or arranged for service completion.' },
  completed: { label: 'Completed', description: 'This repair request has been completed.' },
  cancelled: { label: 'Cancelled', description: 'This repair request has been cancelled.' },
};

interface RepairStatusCardProps {
  status: RepairStatus;
}

const RepairStatusCard: React.FC<RepairStatusCardProps> = ({ status }) => {
  const details = STATUS_DETAILS[status];

  return (
    <div className="bg-blue-600 rounded-2xl p-6 md:p-8 text-white text-center shadow-lg">
      <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wide mb-3">
        {details.label}
      </h3>
      <p className="text-blue-100 leading-relaxed">
        {details.description}
      </p>
    </div>
  );
};

export default RepairStatusCard;
