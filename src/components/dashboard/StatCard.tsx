import React from 'react';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => {
  return (
    <div className="card-surface p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3">
      <div className={`p-3 rounded-xl ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs sm:text-sm font-medium text-[#61726b]">{title}</p>
        <p className="text-2xl font-extrabold text-[#142825]">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
