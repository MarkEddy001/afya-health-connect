
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Navigation from '../components/Navigation';
import ClientCard from '../components/ClientCard';
import SearchBox from '../components/SearchBox';

const Clients = () => {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const { data: clients, isLoading, refetch } = useQuery({
    queryKey: ['clients', searchTerm],
    queryFn: () => searchTerm ? api.searchClients(searchTerm) : api.getClients(),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: 'Error',
        description: 'Client name is required',
        variant: 'destructive',
      });
      return;
    }

    try {
      await api.createClient({
        name,
        age: parseInt(age) || 0,
        gender: gender || 'Not specified',
        contactNumber: contactNumber || 'Not provided',
        address: address || 'Not provided',
      });

      toast({
        title: 'Success',
        description: 'Client registered successfully',
      });

      setName('');
      setAge('');
      setGender('');
      setContactNumber('');
      setAddress('');
      refetch();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to register client',
        variant: 'destructive',
      });
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900">Client Management</h1>
          <p className="mt-1 text-sm text-gray-600">
            Register and manage clients in the system
          </p>
        </div>

        <div className="mt-6 px-4 sm:px-0">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Register New Client</h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>Add a new client to the health information system.</p>
              </div>
              <form onSubmit={handleSubmit} className="mt-5">
                <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      className="mt-1"
                      required
                    />
                  </div>
                  
                  <div className="sm:col-span-1">
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                      Age
                    </label>
                    <Input
                      type="number"
                      name="age"
                      id="age"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="30"
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                      Gender
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
                      Contact Number
                    </label>
                    <Input
                      type="text"
                      name="contactNumber"
                      id="contactNumber"
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      placeholder="555-123-4567"
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="sm:col-span-3">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <Input
                      type="text"
                      name="address"
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="123 Main St, City"
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="sm:col-span-6">
                    <Button type="submit" className="mt-2 bg-health-primary hover:bg-health-secondary">
                      Register Client
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-8 px-4 sm:px-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-medium text-gray-900">Client Records</h2>
            <div className="mt-3 sm:mt-0 sm:ml-4">
              <SearchBox 
                onSearch={handleSearch}
                placeholder="Search clients by name..."
              />
            </div>
          </div>
          
          {isLoading ? (
            <p className="mt-4 text-sm text-gray-500">Loading clients...</p>
          ) : clients && clients.length > 0 ? (
            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {clients.map((client) => (
                <ClientCard key={client.id} client={client} />
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-gray-500">
              {searchTerm ? 'No clients found matching your search.' : 'No clients found. Register your first client above.'}
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Clients;
