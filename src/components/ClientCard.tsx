
import React from 'react';
import { Link } from 'react-router-dom';
import { Client } from '../data/models';

interface ClientCardProps {
  client: Client;
  compact?: boolean;
}

const ClientCard: React.FC<ClientCardProps> = ({ client, compact = false }) => {
  return (
    <div className="border rounded-lg shadow-sm bg-white overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{client.name}</h3>
            {!compact && (
              <p className="text-sm text-gray-500 mt-1">
                {client.gender}, {client.age} years old
              </p>
            )}
          </div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {client.enrolledPrograms.length} program{client.enrolledPrograms.length !== 1 ? 's' : ''}
          </span>
        </div>

        {!compact && (
          <>
            <div className="mt-3 grid grid-cols-1 gap-2">
              <div className="text-sm">
                <span className="text-gray-500">Contact: </span>
                <span className="text-gray-700">{client.contactNumber}</span>
              </div>
              <div className="text-sm">
                <span className="text-gray-500">Address: </span>
                <span className="text-gray-700">{client.address}</span>
              </div>
            </div>

            {client.enrolledPrograms.length > 0 && (
              <div className="mt-3">
                <p className="text-sm font-medium text-gray-700">Programs:</p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {client.enrolledPrograms.map((program) => (
                    <span
                      key={program.id}
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800"
                    >
                      {program.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        <div className="mt-4">
          <Link
            to={`/clients/${client.id}`}
            className="text-sm font-medium text-health-primary hover:text-health-secondary"
          >
            View Profile →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClientCard;
