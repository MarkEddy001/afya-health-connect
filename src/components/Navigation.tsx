
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-health-primary text-white' : 'text-gray-600 hover:bg-blue-50';
  };

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-health-primary">Health Connect</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link 
                to="/"
                className={`${isActive('/')} inline-flex items-center px-1 pt-1 border-b-2 ${
                  location.pathname === '/' ? 'border-health-primary' : 'border-transparent'
                } text-sm font-medium`}
              >
                Dashboard
              </Link>
              <Link 
                to="/programs"
                className={`${isActive('/programs')} inline-flex items-center px-1 pt-1 border-b-2 ${
                  location.pathname === '/programs' ? 'border-health-primary' : 'border-transparent'
                } text-sm font-medium`}
              >
                Programs
              </Link>
              <Link 
                to="/clients"
                className={`${isActive('/clients')} inline-flex items-center px-1 pt-1 border-b-2 ${
                  location.pathname === '/clients' ? 'border-health-primary' : 'border-transparent'
                } text-sm font-medium`}
              >
                Clients
              </Link>
              <Link 
                to="/enroll"
                className={`${isActive('/enroll')} inline-flex items-center px-1 pt-1 border-b-2 ${
                  location.pathname === '/enroll' ? 'border-health-primary' : 'border-transparent'
                } text-sm font-medium`}
              >
                Enrollment
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Link 
              to="/api-docs"
              className="px-3 py-1 rounded text-sm font-medium text-white bg-health-accent hover:bg-green-600"
            >
              API Docs
            </Link>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <button
              type="button"
              className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="sm:hidden" id="mobile-menu">
        <div className="pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className={`${
              location.pathname === '/'
                ? 'bg-blue-50 border-health-primary text-health-primary'
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
            } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
          >
            Dashboard
          </Link>
          <Link
            to="/programs"
            className={`${
              location.pathname === '/programs'
                ? 'bg-blue-50 border-health-primary text-health-primary'
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
            } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
          >
            Programs
          </Link>
          <Link
            to="/clients"
            className={`${
              location.pathname === '/clients'
                ? 'bg-blue-50 border-health-primary text-health-primary'
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
            } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
          >
            Clients
          </Link>
          <Link
            to="/enroll"
            className={`${
              location.pathname === '/enroll'
                ? 'bg-blue-50 border-health-primary text-health-primary'
                : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
            } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
          >
            Enrollment
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
