
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import ClientCard from '../components/ClientCard';

const Index = () => {
  const { data: clients, isLoading: clientsLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: api.getClients,
  });

  const { data: programs, isLoading: programsLoading } = useQuery({
    queryKey: ['programs'],
    queryFn: api.getPrograms,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Dashboard Header */}
        <div className="px-4 py-6 sm:px-0">
          <div className="health-gradient rounded-lg p-6 text-white shadow">
            <h1 className="text-3xl font-bold">Health Information System</h1>
            <p className="mt-2">Manage health programs and client enrollments</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mt-6 px-4 sm:px-0">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Clients</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          {clientsLoading ? "Loading..." : clients?.length || 0}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <Link to="/clients" className="font-medium text-health-primary hover:text-health-secondary">
                    View all clients<span aria-hidden="true"> &rarr;</span>
                  </Link>
                </div>
              </div>
            </Card>

            <Card className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Active Programs</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          {programsLoading ? "Loading..." : programs?.length || 0}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <Link to="/programs" className="font-medium text-health-primary hover:text-health-secondary">
                    View all programs<span aria-hidden="true"> &rarr;</span>
                  </Link>
                </div>
              </div>
            </Card>

            <Card className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Quick Actions</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">
                          Enrollment
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <Link to="/enroll" className="font-medium text-health-primary hover:text-health-secondary">
                    Enroll clients<span aria-hidden="true"> &rarr;</span>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Recent Clients */}
        <div className="mt-8 px-4 sm:px-0">
          <h2 className="text-lg font-medium text-gray-900">Recent Clients</h2>
          <div className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {clientsLoading ? (
              <p>Loading clients...</p>
            ) : clients && clients.length > 0 ? (
              clients.slice(0, 3).map((client) => (
                <ClientCard key={client.id} client={client} compact />
              ))
            ) : (
              <p>No clients found.</p>
            )}
          </div>
        </div>

        {/* API Section */}
        <div className="mt-8 px-4 sm:px-0">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">API Access</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Get client data programmatically using our RESTful API
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Endpoint</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <code className="bg-gray-100 px-2 py-1 rounded">GET /api/clients/:id</code>
                  </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Documentation</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <Link to="/api-docs" className="text-health-primary hover:text-health-secondary">
                      View API documentation
                    </Link>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
