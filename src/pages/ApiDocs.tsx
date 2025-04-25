
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import Navigation from '../components/Navigation';

const ApiDocs = () => {
  const [clientId, setClientId] = useState('1');
  
  const { data: client } = useQuery({
    queryKey: ['client', parseInt(clientId)],
    queryFn: () => api.getClient(parseInt(clientId)),
    enabled: !!clientId && !isNaN(parseInt(clientId)),
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900">API Documentation</h1>
          <p className="mt-1 text-sm text-gray-600">
            Access client information programmatically
          </p>
        </div>

        <div className="mt-6 px-4 sm:px-0">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">Client API</h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Retrieve client details and enrolled programs
              </p>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Endpoint</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <code className="bg-gray-100 px-2 py-1 rounded">GET /api/clients/:id</code>
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Description</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    Returns client details and their enrolled programs
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Parameters</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <p><strong>id</strong> - The unique identifier for the client</p>
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Response Format</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <p>JSON</p>
                    <pre className="mt-2 bg-gray-100 p-3 rounded overflow-x-auto">
                      {`{
  "id": 1,
  "name": "John Doe",
  "programs": ["TB Program", "HIV Support"]
}`}
                    </pre>
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Error Responses</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <p><strong>404 Not Found</strong> - When the client ID doesn't exist</p>
                    <pre className="mt-2 bg-gray-100 p-3 rounded overflow-x-auto">
                      {`{
  "error": "Client not found"
}`}
                    </pre>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div className="mt-8 px-4 sm:px-0">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">API Explorer</h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Test the API with different client IDs
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5">
              <div className="mb-4">
                <label htmlFor="clientId" className="block text-sm font-medium text-gray-700">
                  Enter Client ID
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                    /api/clients/
                  </span>
                  <input
                    type="text"
                    name="clientId"
                    id="clientId"
                    className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Response:</h3>
                <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                  <pre>
                    {client ? 
                      JSON.stringify(
                        {
                          id: client.id,
                          name: client.name,
                          programs: client.enrolledPrograms.map(p => p.name)
                        }, 
                        null, 
                        2
                      ) : 
                      JSON.stringify({ error: "Client not found" }, null, 2)
                    }
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 px-4 sm:px-0">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">Sample Code</h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Example code snippets to access the API
              </p>
            </div>
            <div className="border-t border-gray-200">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Python</h3>
                <pre className="bg-gray-100 p-3 rounded overflow-x-auto text-xs sm:text-sm">
{`import requests

def get_client(client_id):
    response = requests.get(f"https://api.healthsystem.org/api/clients/{client_id}")
    if response.status_code == 200:
        return response.json()
    else:
        return {"error": f"Failed to retrieve client: {response.status_code}"}

# Example usage
client = get_client(1)
print(client)
`}
                </pre>
              </div>
              
              <div className="px-4 py-5 sm:px-6 bg-gray-50">
                <h3 className="text-sm font-medium text-gray-900 mb-2">JavaScript</h3>
                <pre className="bg-gray-100 p-3 rounded overflow-x-auto text-xs sm:text-sm">
{`async function getClient(clientId) {
  try {
    const response = await fetch(\`https://api.healthsystem.org/api/clients/\${clientId}\`);
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching client data:', error);
    return { error: 'Failed to retrieve client' };
  }
}

// Example usage
getClient(1).then(client => {
  console.log(client);
});
`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ApiDocs;
