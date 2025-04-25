
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Navigation from '../components/Navigation';
import ProgramCard from '../components/ProgramCard';

const Programs = () => {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const { data: programs, isLoading, refetch } = useQuery({
    queryKey: ['programs'],
    queryFn: api.getPrograms,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: 'Error',
        description: 'Program name is required',
        variant: 'destructive',
      });
      return;
    }

    try {
      await api.createProgram({
        name,
        description: description || 'No description provided',
      });

      toast({
        title: 'Success',
        description: 'Program created successfully',
      });

      setName('');
      setDescription('');
      refetch();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create program',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900">Health Programs</h1>
          <p className="mt-1 text-sm text-gray-600">
            Create and manage health programs for your clients
          </p>
        </div>

        <div className="mt-6 px-4 sm:px-0">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Create New Program</h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>Add a new health program to the system.</p>
              </div>
              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Program Name
                  </label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Tuberculosis Management"
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                      placeholder="Program details..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Button type="submit" className="bg-health-primary hover:bg-health-secondary">
                    Create Program
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-8 px-4 sm:px-0">
          <h2 className="text-lg font-medium text-gray-900">Existing Programs</h2>
          {isLoading ? (
            <p className="mt-4 text-sm text-gray-500">Loading programs...</p>
          ) : programs && programs.length > 0 ? (
            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {programs.map((program) => (
                <ProgramCard key={program.id} program={program} />
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-gray-500">No programs found. Create your first program above.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Programs;
