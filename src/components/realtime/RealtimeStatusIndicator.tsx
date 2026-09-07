import React, { useState, useEffect } from 'react';
import { realtimeService } from '../../services/realtimeService';

const RealtimeStatusIndicator: React.FC = () => {
  const [status, setStatus] = useState<'connected' | 'disconnected' | 'connecting'>('connecting');

  useEffect(() => {
    realtimeService.setOnStatusChange((newStatus) => {
      setStatus(newStatus);
    });
  }, []);

  const statusConfig = {
    connected: {
      color: 'bg-green-500',
      label: 'Live',
      tooltip: 'Realtime: Connected',
    },
    connecting: {
      color: 'bg-yellow-500',
      label: 'Connecting...',
      tooltip: 'Realtime: Connecting',
    },
    disconnected: {
      color: 'bg-red-500',
      label: 'Disconnected',
      tooltip: 'Realtime: Disconnected',
    },
  };

  const current = statusConfig[status];

  return (
    <div className="group relative flex items-center space-x-2 px-3 py-1 rounded-full bg-gray-100 border border-gray-200">
      <div className={`h-2 w-2 rounded-full ${current.color} animate-pulse`} />
      <span className="text-xs font-medium text-gray-600">{current.label}</span>

      <div className="absolute left-full ml-2 hidden group-hover:block z-50 px-2 py-1 bg-gray-800 text-white text-[10px] rounded whitespace-nowrap">
        {current.tooltip}
      </div>
    </div>
  );
};

export default RealtimeStatusIndicator;
