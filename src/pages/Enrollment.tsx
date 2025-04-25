
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Navigation from '../components/Navigation';
import ProgramCard from '../components/ProgramCard';
import ClientCard from '../components/ClientCard';
import SearchBox from '../components/SearchBox';

const Enrollment = () => {
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const preselectedClientId = queryParams.get('clientId');

  const [selectedClient, setSelectedClient] = useState<number | null>(preselectedClientId ? parseInt(preselectedClientId) : null);
  const [selectedProgram, setSelectedProgram] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const { data: programs, isLoading: programsLoading } = useQuery({
    queryKey: ['programs'],
    queryFn: api.getPrograms,
  });

  const { data: searchResults, isLoading: searchLoading } = useQuery({
    queryKey: ['clientSearch', searchTerm],
    queryFn: () => api.searchClients(searchTerm),
    enabled: searchTerm.length > 0,
  });

  const { data: selectedClientData, isLoading: clientLoading } = useQuery({
    queryKey: ['client', selectedClient],
    queryFn: () => selectedClient ? api.getClient(selectedClient) : null,
    enabled: selectedClient !== null,
  });

  const enrollMutation = useMutation({
    mutationFn: ({ clientId, programId }: { clientId: number, programId: number }) => 
      api.enrollClient(clientId, programId),
  });

  useEffect(() => {
    if (preselectedClientId) {
      setSelectedClient(parseInt(preselectedClientId));
    }
  }, [preselectedClientId]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleClientSelect = (clientId: number) => {
    setSelectedClient(clientId);
    setSearchTerm('');
  };

  const handleProgramSelect = (program: { id: number }) => {
    setSelectedProgram(program.id);
  };

  const handleEnroll = async () => {
    if (selectedClient === null || selectedProgram === null) {
      toast({
        title: 'Error',
        description: 'Please select both a client and a program',
        variant: 'destructive',
      });
      return;
    }

    try {
      const result = await enrollMutation.mutateAsync({ 
        clientId: selectedClient, 
        programId: selectedProgram 
      });
      
      if (result) {
        toast({
          title: 'Success',
          description: 'Client successfully enrolled in program',
        });
        
        // Refresh client data
        navigate(0);
      } else {
        toast({
          title: 'Note',
          description: 'Client is already enrolled in this program',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to enroll client in program',
        variant: 'destructive',
      });
    }
  };

  const isClientEnrolledInProgram = (programId: number) => {
    return selectedClientData?.enrolledPrograms.some(p => p.id === programId) ?? false;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900">Program Enrollment</h1>
          <p className="mt-1 text-sm text-gray-600">
            Enroll clients in health programs
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-y-6 lg:grid-cols-2 lg:gap-x-6">
          {/* Client Selection Area */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Select Client</h3>
              <div className="mt-2">
                <SearchBox
                  onSearch={handleSearch}
                  placeholder="Search clients by name..."
                  className="mb-4"
                />
                
                {searchTerm && (
                  <div className="mt-2">
                    {searchLoading ? (
                      <p>Searching...</p>
                    ) : searchResults && searchResults.length > 0 ? (
                      <div className="space-y-2">
                        {searchResults.map((client) => (
                          <div 
                            key={client.id} 
                            className={`p-2 border rounded cursor-pointer ${
                              selectedClient === client.id ? 'bg-blue-50 border-health-primary' : 'hover:bg-gray-50'
                            }`}
                            onClick={() => handleClientSelect(client.id)}
                          >
                            <p className="font-medium">{client.name}</p>
                            <p className="text-xs text-gray-500">ID: {client.id}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p>No clients found.</p>
                    )}
                  </div>
                )}

                {selectedClient !== null && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Selected Client:</h4>
                    {clientLoading ? (
                      <p>Loading client information...</p>
                    ) : selectedClientData ? (
                      <div className="border rounded-lg p-3">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium">{selectedClientData.name}</p>
                            <p className="text-sm text-gray-500">
                              {selectedClientData.gender}, {selectedClientData.age} years old
                            </p>
                            <p className="text-xs text-gray-500 mt-1">ID: {selectedClientData.id}</p>
                          </div>
                          <Button 
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedClient(null)}
                          >
                            Change
                          </Button>
                        </div>
                        
                        {selectedClientData.enrolledPrograms.length > 0 && (
                          <div className="mt-3">
                            <p className="text-xs font-medium text-gray-700">Already enrolled in:</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {selectedClientData.enrolledPrograms.map((program) => (
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
                      </div>
                    ) : (
                      <p>Client not found.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Program Selection Area */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Select Program</h3>
              <div className="mt-2">
                {programsLoading ? (
                  <p>Loading programs...</p>
                ) : programs && programs.length > 0 ? (
                  <div className="space-y-3">
                    {programs.map((program) => (
                      <div 
                        key={program.id}
                        className={`border rounded-lg ${
                          isClientEnrolledInProgram(program.id) ? 'bg-green-50 border-green-300' : ''
                        }`}
                      >
                        {isClientEnrolledInProgram(program.id) && (
                          <div className="bg-green-100 px-3 py-1 text-xs text-green-800 font-medium">
                            Already enrolled
                          </div>
                        )}
                        <div 
                          className={`p-3 ${isClientEnrolledInProgram(program.id) ? 'opacity-70' : ''}`}
                          onClick={
                            isClientEnrolledInProgram(program.id) 
                              ? undefined 
                              : () => handleProgramSelect(program)
                          }
                          style={{ 
                            cursor: isClientEnrolledInProgram(program.id) ? 'default' : 'pointer'
                          }}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{program.name}</h4>
                              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                {program.description}
                              </p>
                            </div>
                            {!isClientEnrolledInProgram(program.id) && (
                              <div 
                                className={`h-5 w-5 rounded-full border ${
                                  selectedProgram === program.id 
                                    ? 'bg-health-primary border-health-primary' 
                                    : 'border-gray-300'
                                }`}
                              >
                                {selectedProgram === program.id && (
                                  <svg 
                                    className="h-5 w-5 text-white" 
                                    viewBox="0 0 20 20" 
                                    fill="currentColor"
                                  >
                                    <path 
                                      fillRule="evenodd" 
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                                      clipRule="evenodd" 
                                    />
                                  </svg>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No programs available.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 px-4 sm:px-0 flex justify-end">
          <Button
            onClick={handleEnroll}
            disabled={
              selectedClient === null || 
              selectedProgram === null || 
              (selectedClientData?.enrolledPrograms.some(p => p.id === selectedProgram) ?? false)
            }
            className="bg-health-primary hover:bg-health-secondary"
          >
            Enroll Client in Program
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Enrollment;
