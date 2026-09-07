import React from 'react';

import type { RepairStatus } from '../types/repair';

const STATUS_MAP: Record<RepairStatus, { label: string; description: string; index: number }> = {
  requested: { label: 'Request Received', description: 'Your repair request has been received by Cabuyao Tek.', index: 0 },
  received: { label: 'Device Received', description: 'Your device has been received and is waiting for the next step.', index: 1 },
  inspection: { label: 'Under Inspection', description: 'Your device is currently being inspected.', index: 2 },
  diagnosis: { label: 'Diagnosis', description: 'We are identifying the cause of the issue.', index: 3 },
  waiting_approval: { label: 'Waiting for Approval', description: 'A repair decision or approval is currently required before work can continue.', index: 4 },
  repairing: { label: 'Repair in Progress', description: 'Our technician is currently working on your device.', index: 5 },
  ready_for_pickup: { label: 'Ready for Pickup', description: 'Your device is ready to be picked up or arranged for service completion.', index: 6 },
  completed: { label: 'Completed', description: 'This repair request has been completed.', index: 7 },
  cancelled: { label: 'Cancelled', description: 'This repair request has been cancelled.', index: -1 },
};

interface RepairTimelineProps {
  status: RepairStatus;
}

const RepairTimeline: React.FC<RepairTimelineProps> = ({ status }) => {
  // Removed unused currentStatusInfo variable


  // Filter out cancelled as it's a terminal state
  const workflow = [
    'requested',
    'received',
    'inspection',
    'diagnosis',
    'waiting_approval',
    'repairing',
    'ready_for_pickup',
    'completed',
  ];

  if (status === 'cancelled') {
    return (
      <div className="flex flex-col items-center space-y-4">
        <div className="flex items-center space-x-3 text-red-600 font-bold">
          <div className="h-4 w-4 rounded-full bg-red-600" />
          <span>Request Cancelled</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative max-w-md mx-auto py-8">
      {workflow.map((stepStatus, index) => {
        const stepInfo = STATUS_MAP[stepStatus as RepairStatus];
        const isCompleted = STATUS_MAP[status].index >= stepInfo.index;
        const isCurrent = status === stepStatus;

        return (
          <div key={stepStatus} className="flex items-start space-x-4 mb-8 last:mb-0 relative">
            {/* Line connector */}
            {index !== workflow.length - 1 && (
              <div className={`absolute left-3 top-6 w-0.5 h-full ${isCompleted ? 'bg-blue-600' : 'bg-gray-200'}`} />
            )}

            {/* Step Circle */}
            <div className={`relative z-10 flex items-center justify-center w-6 h-6 rounded-full border-2 transition-colors ${
              isCurrent ? 'bg-blue-600 border-blue-600 text-white' :
              isCompleted ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-300 text-gray-300'
            }`}>
              {isCompleted && <span className="text-[10px]">✓</span>}
              {!isCompleted && isCurrent && <span className="w-2 h-2 bg-white rounded-full" />}
            </div>

            {/* Step Label */}
            <div className={`flex flex-col ${isCurrent ? 'font-bold text-blue-600' : 'text-gray-600'}`}>
              <span className="text-sm">{stepInfo.label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RepairTimeline;
