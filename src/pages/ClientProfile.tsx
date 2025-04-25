
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { Card } from '@/components/ui/card';
import Navigation from '../components/Navigation';
import ProgramCard from '../components/ProgramCard';

const ClientProfile = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const id = parseInt(clientId || '0');

  const { data: client, isLoading, error } = useQuery({
    queryKey: ['client', id],
    queryFn: () => api.getClient(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
            <div className="h-64 bg-gray-200 rounded mb-4"></div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !client) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
            <h2 className="text-xl font-medium text-gray-900 mb-2">Error</h2>
            <p className="text-red-500">Client not found or error loading client data.</p>
            <div className="mt-4">
              <Link to="/clients" className="text-health-primary hover:text-health-secondary">
                &larr; Back to clients
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <Link to="/clients" className="text-health-primary hover:text-health-secondary text-sm">
            &larr; Back to clients
          </Link>
          <h1 className="text-2xl font-semibold text-gray-900 mt-2">{client.name}</h1>
          <p className="mt-1 text-sm text-gray-600">
            Client Profile
          </p>
        </div>

        <div className="mt-6 px-4 sm:px-0">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Client Information</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and program enrollments.</p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Full name</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{client.name}</dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Age</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{client.age} years</dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Gender</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{client.gender}</dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Contact number</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{client.contactNumber}</dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Address</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{client.address}</dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Client ID</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{client.id}</dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Registered on</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {new Date(client.createdAt).toLocaleDateString()}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div className="mt-8 px-4 sm:px-0">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Enrolled Programs</h2>
            <Link 
              to={`/enroll?clientId=${client.id}`} 
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-health-primary hover:bg-health-secondary"
            >
              Manage Enrollments
            </Link>
          </div>

          {client.enrolledPrograms.length > 0 ? (
            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {client.enrolledPrograms.map((program) => (
                <ProgramCard key={program.id} program={program} />
              ))}
            </div>
          ) : (
            <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-lg p-6">
              <p className="text-sm text-gray-500">This client is not enrolled in any programs.</p>
              <Link 
                to={`/enroll?clientId=${client.id}`} 
                className="mt-2 inline-block text-health-primary hover:text-health-secondary"
              >
                Enroll in programs
              </Link>
            </div>
          )}
        </div>

        {/* API Information */}
        <div className="mt-8 px-4 sm:px-0">
          <Card className="bg-white overflow-hidden">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">API Access</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Access this client's data programmatically
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Endpoint</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <code className="bg-gray-100 px-2 py-1 rounded">GET /api/clients/{client.id}</code>
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Example Response</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <pre className="bg-gray-100 p-2 rounded overflow-x-auto">
                      {JSON.stringify(
                        {
                          id: client.id,
                          name: client.name,
                          programs: client.enrolledPrograms.map(p => p.name)
                        }, 
                        null, 
                        2
                      )}
                    </pre>
                  </dd>
                </div>
              </dl>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ClientProfile;
