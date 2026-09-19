import React from 'react';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';

const EligibilityScore = ({ score, status }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Highly Eligible':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Likely Eligible':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Partially Eligible':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Check Requirements':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Highly Eligible':
        return <CheckCircle size={20} />;
      case 'Likely Eligible':
        return <CheckCircle size={20} />;
      case 'Partially Eligible':
        return <AlertCircle size={20} />;
      case 'Check Requirements':
        return <XCircle size={20} />;
      default:
        return null;
    }
  };

  return (
    <div className={`p-4 rounded-lg border ${getStatusColor(status)}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {getStatusIcon(status)}
          <div>
            <p className="font-semibold text-sm">{status}</p>
            <p className="text-xs opacity-75">Eligibility Score: {score}%</p>
          </div>
        </div>
        <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white bg-opacity-50">
          <span className="text-lg font-bold">{score}%</span>
        </div>
      </div>
    </div>
  );
};

export default EligibilityScore;
