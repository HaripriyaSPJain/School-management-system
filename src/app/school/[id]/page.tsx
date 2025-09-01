'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

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

export default function SchoolDetails() {
  const params = useParams();
  const [school, setSchool] = useState<School | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (params.id) {
      fetchSchoolDetails();
    }
  }, [params.id]);

  const fetchSchoolDetails = async () => {
    try {
      const response = await fetch('/api/schools');
      if (response.ok) {
        const schools = await response.json();
        const foundSchool = schools.find((s: School) => s.id === parseInt(params.id as string));
        if (foundSchool) {
          setSchool(foundSchool);
        } else {
          setError('School not found');
        }
      } else {
        setError('Failed to fetch school details');
      }
    } catch (error) {
      setError('Error fetching school details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg mb-6">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading School Details...</h2>
          <p className="text-gray-600">Please wait while we fetch the information</p>
        </div>
      </div>
    );
  }

  if (error || !school) {

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full mb-6">
            <span className="text-6xl">⚠️</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-8 text-lg">{error || 'School not found'}</p>
          <Link
            href="/showSchools"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
          >
            <span className="mr-2">🔙</span>
            Back to Schools
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/showSchools"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-bold transition-colors group"
              >
                <span className="mr-2 group-hover:-translate-x-1 transition-transform duration-200">←</span>
                Back to Schools
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🏫</span>
              <span className="text-xl font-bold text-gray-900">School Details</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* School Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* School Image */}
            <div className="lg:col-span-1">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={school.image}
                  alt={school.name}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-bold text-gray-700 shadow-lg">
                    #{school.id}
                  </div>
                </div>
              </div>
            </div>

            {/* School Basic Info */}
            <div className="lg:col-span-2">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{school.name}</h1>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">{school.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className="font-bold text-gray-900">Address</p>
                    <p className="text-gray-600">{school.address}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🏙️</span>
                  <div>
                    <p className="font-bold text-gray-900">City</p>
                    <p className="text-gray-600">{school.city}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🗺️</span>
                  <div>
                    <p className="font-bold text-gray-900">State</p>
                    <p className="text-gray-600">{school.state}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📞</span>
                  <div>
                    <p className="font-bold text-gray-900">Contact</p>
                    <p className="text-gray-600">{school.contact}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">✉️</span>
                  <div>
                    <p className="font-bold text-gray-900">Email</p>
                    <p className="text-gray-600">{school.email_id}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📅</span>
                  <div>
                    <p className="font-bold text-gray-900">Established</p>
                    <p className="text-gray-600">{school.established}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{school.studentCount}</div>
                  <div className="text-sm text-gray-600 font-medium">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{school.facilities.length}</div>
                  <div className="text-sm text-gray-600 font-medium">Facilities</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{school.achievements.length}</div>
                  <div className="text-sm text-gray-600 font-medium">Achievements</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Facilities Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="mr-3">🏗️</span>
            Facilities & Infrastructure
          </h2>
          {/*
    Parse facilities as array if needed
  */}
          {(() => {
            const facilities = Array.isArray(school.facilities)
              ? school.facilities
              : (school.facilities ? JSON.parse(school.facilities) : []);
            return (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {facilities.map((facility, index) => (
                  <div key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">✅</span>
                      <span className="font-semibold text-gray-800">{facility}</span>
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>

        {/* Achievements Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="mr-3">🏆</span>
            Achievements & Awards
          </h2>
          {(() => {
            const achievements = Array.isArray(school.achievements)
              ? school.achievements
              : (school.achievements ? JSON.parse(school.achievements) : []);
            return (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-100">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">🎖️</span>
                      <span className="font-semibold text-gray-800">{achievement}</span>
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>

        {/* Action Buttons */}
        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/addSchool"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
            >
              <span className="mr-2">➕</span>
              Add Another School
            </Link>
            <Link
              href="/showSchools"
              className="inline-flex items-center px-8 py-4 bg-white text-gray-800 font-bold rounded-xl shadow-lg hover:shadow-xl border-2 border-gray-200 hover:border-blue-300 transform hover:-translate-y-1 transition-all duration-200"
            >
              <span className="mr-2">🔍</span>
              View All Schools
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
