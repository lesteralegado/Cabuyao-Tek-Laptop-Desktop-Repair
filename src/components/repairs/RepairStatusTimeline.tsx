import React from 'react';
import type { RepairStatus } from '../../types/repair';

const STATUS_STEPS: { id: RepairStatus; label: string }[] = [
  { id: 'requested', label: 'Request Received' },
  { id: 'received', label: 'Device Received' },
  { id: 'inspection', label: 'Under Inspection' },
  { id: 'diagnosis', label: 'Diagnosis' },
  { id: 'waiting_approval', label: 'Waiting for Approval' },
  { id: 'repairing', label: 'Repair in Progress' },
  { id: 'ready_for_pickup', label: 'Ready for Pickup' },
  { id: 'completed', label: 'Completed' },
];

interface RepairStatusTimelineProps {
  currentStatus: RepairStatus;
}

const RepairStatusTimeline: React.FC<RepairStatusTimelineProps> = ({ currentStatus }) => {
  const currentIndex = STATUS_STEPS.findIndex(step => step.id === currentStatus);

  return (
    <div className="space-y-0">
      {STATUS_STEPS.map((step, index) => {
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex;

        return (
          <div key={step.id} className="flex items-start group">
            <div className="flex flex-col items-center mr-4">
              <div className={`
                w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors duration-300
                ${isCompleted ? 'bg-blue-600 border-blue-600 text-white' :
                  isCurrent ? 'bg-white border-blue-600 text-blue-600 ring-4 ring-blue-100' :
                  'bg-white border-gray-300 text-gray-300'}
              `}>
                {isCompleted && <span className="text-[10px] font-bold">✓</span>}
                {isCurrent && <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />}
              </div>
              {index !== STATUS_STEPS.length - 1 && (
                <div className={`w-0.5 h-8 ${isCompleted ? 'bg-blue-600' : 'bg-gray-200'}`} />
              )}
            </div>
            <div className="pt-1">
              <span className={`text-sm font-medium transition-colors duration-300 ${
                isCompleted ? 'text-gray-500' :
                isCurrent ? 'text-blue-700 font-bold' :
                'text-gray-400'
              }`}>
                {step.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RepairStatusTimeline;
