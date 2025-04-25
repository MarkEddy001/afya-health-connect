
import React from 'react';
import { Program } from '../data/models';

interface ProgramCardProps {
  program: Program;
  onSelect?: (program: Program) => void;
  isSelected?: boolean;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ 
  program, 
  onSelect,
  isSelected = false 
}) => {
  return (
    <div 
      className={`border rounded-lg ${isSelected ? 'border-health-primary ring-2 ring-health-secondary ring-opacity-50' : ''} 
                  shadow-sm bg-white overflow-hidden cursor-pointer transition-all`}
      onClick={() => onSelect && onSelect(program)}
    >
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900">{program.name}</h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{program.description}</p>
        <div className="mt-3 text-xs text-gray-400">
          Created: {new Date(program.createdAt).toLocaleDateString()}
        </div>
      </div>
      {onSelect && (
        <div className={`border-t px-4 py-2 flex justify-end ${isSelected ? 'bg-blue-50' : ''}`}>
          {isSelected ? (
            <div className="inline-flex items-center px-2 py-1 bg-health-primary text-white text-xs font-medium rounded">
              Selected
            </div>
          ) : (
            <div className="inline-flex items-center px-2 py-1 border border-gray-300 text-gray-600 text-xs font-medium rounded">
              Select
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProgramCard;
