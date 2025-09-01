'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface School {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  contact: string;
  image: string;
  email_id: string;
  description: string;
  established: string;
  studentCount: string;
  facilities: string[];
  achievements: string[];
}

export default function ShowSchools() {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const [filterState, setFilterState] = useState('');

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      const response = await fetch('/api/schools');
      if (response.ok) {
        const data = await response.json();
        setSchools(data);
      } else {
        setError('Failed to fetch schools');
      }
    } catch (error) {
      setError('Error fetching schools');
    } finally {
      setLoading(false);
    }
  };

  const filteredSchools = schools.filter(school => {
    const matchesSearch = school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = !filterCity || school.city.toLowerCase() === filterCity.toLowerCase();
    const matchesState = !filterState || school.state.toLowerCase() === filterState.toLowerCase();

    return matchesSearch && matchesCity && matchesState;
  });

  const uniqueCities = [...new Set(schools.map(school => school.city))];
  const uniqueStates = [...new Set(schools.map(school => school.state))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg mb-6">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading Schools...</h2>
          <p className="text-gray-600">Please wait while we fetch the latest data</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full mb-6">
            <span className="text-6xl">⚠️</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-8 text-lg">{error}</p>
          <button
            onClick={fetchSchools}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
          >
            <span className="mr-2">🔄</span>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-6 sm:mb-0">
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-2xl">🏫</span>
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gray-900">Schools Directory</h1>
                  <p className="text-lg text-gray-600">Discover and explore schools in your area</p>
                </div>
              </div>
            </div>
            <Link
              href="/addSchool"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
            >
              <span className="mr-2">➕</span>
              Add New School
            </Link>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="group">
              <label htmlFor="search" className="block text-lg font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                <span className="mr-2">🔍</span>
                Search Schools
              </label>
              <input
                type="text"
                id="search"
                placeholder="Search by name, address, or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 hover:border-blue-300 transition-all duration-200 font-semibold text-gray-800 placeholder-gray-500"
              />
            </div>
            <div className="group">
              <label htmlFor="city" className="block text-lg font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                <span className="mr-2">🏙️</span>
                Filter by City
              </label>
              <select
                id="city"
                value={filterCity}
                onChange={(e) => setFilterCity(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 hover:border-blue-300 transition-all duration-200 font-semibold text-gray-800"
              >
                <option value="">All Cities</option>
                {uniqueCities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <div className="group">
              <label htmlFor="state" className="block text-lg font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                <span className="mr-2">🗺️</span>
                Filter by State
              </label>
              <select
                id="state"
                value={filterState}
                onChange={(e) => setFilterState(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 hover:border-blue-300 transition-all duration-200 font-semibold text-gray-800"
              >
                <option value="">All States</option>
                {uniqueStates.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterCity('');
                  setFilterState('');
                }}
                className="w-full px-6 py-3 border-2 border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-500/20 transition-all duration-200 font-bold"
              >
                <span className="mr-2">🧹</span>
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-8 mb-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <p className="text-lg text-gray-700 font-bold">
              <span className="mr-2">📊</span>
              Showing <span className="text-blue-600 font-bold">{filteredSchools.length}</span> of <span className="text-purple-600 font-bold">{schools.length}</span> schools
            </p>
          </div>
        </div>

        {/* Schools Grid */}
        {filteredSchools.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 border border-white/20 shadow-xl">
              <div className="text-gray-400 text-8xl mb-6">🏫</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No schools found</h3>
              <p className="text-gray-600 mb-8 text-lg">
                {searchTerm || filterCity || filterState
                  ? 'Try adjusting your search criteria or filters to find what you\'re looking for.'
                  : 'No schools have been added yet. Be the first to add a school!'
                }
              </p>
              {!searchTerm && !filterCity && !filterState && (
                <Link
                  href="/addSchool"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
                >
                  <span className="mr-2">🚀</span>
                  Add First School
                </Link>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredSchools.map((school) => (
              <div
                key={school.id}
                className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-white/20 transform hover:-translate-y-2"
              >
                <div className="relative overflow-hidden">
                  {school.image ? (
                    <img
                      src={school.image}
                      alt={school.name}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-56 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                      <div className="text-gray-400 text-6xl">🏫</div>
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-bold text-gray-700 shadow-lg">
                      #{school.id}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {school.name}
                  </h3>
                  <div className="space-y-3 text-gray-600 mb-6">
                    <div className="flex items-start">
                      <span className="mr-2 mt-1">📍</span>
                      <p className="line-clamp-2 text-sm font-medium">
                        {school.address}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">🏙️</span>
                      <p className="text-sm font-bold">{school.city}</p>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">🗺️</span>
                      <p className="text-sm font-bold">{school.state}</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex justify-between items-center gap-2">
                      <span className="text-gray-500 text-sm font-bold">
                        <span className="mr-1">📞</span>
                        {school.contact}
                      </span>
                      <div className="flex gap-2">
                        <Link
                          href={`/school/${school.id}`}
                          className="text-blue-600 font-bold text-sm group-hover:text-blue-700 transition-colors hover:underline"
                        >
                          View Details →
                        </Link>
                        {/* <button
                          onClick={async () => {
                            if (confirm('Are you sure you want to delete this school?')) {
                              const res = await fetch(`/api/schools/${school.id}`, { method: 'DELETE' });
                              if (res.ok) {
                                // Remove the deleted school from the UI without reload
                                setSchools((prev) => prev.filter((s) => s.id !== school.id));
                              } else {
                                alert('Failed to delete school');
                              }
                            }
                          }}
                          className="bg-red-600 text-white px-3 py-1 rounded text-xs font-bold hover:bg-red-700 transition"
                        >
                          Delete
                        </button> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
