
import React from 'react';

interface ProgressBarProps {
  label: string;
  percentage: number;
  count: number;
  icon: React.ReactNode;
  isRtl: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ label, percentage, count, icon, isRtl }) => {
  return (
    <div className="mb-6">
      <div className={`flex items-center justify-between mb-2 text-sm font-medium ${isRtl ? 'flex-row-reverse' : ''}`}>
        <div className={`flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
          <span className="text-gray-400">{icon}</span>
          <span className="text-gray-700">{label}</span>
        </div>
        <span className="text-gray-900">{percentage.toFixed(1)}% ({count.toLocaleString()})</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
        <div 
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
