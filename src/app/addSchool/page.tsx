'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';

const schema = yup.object({
  name: yup.string().required('School name is required'),
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  contact: yup.string()
    .required('Contact number is required')
    .matches(/^[0-9]{10}$/, 'Contact number must be 10 digits'),
  email_id: yup.string()
    .required('Email is required')
    .email('Please enter a valid email'),
  image: yup.mixed()
    .required('Image is required')
    .test('fileSize', 'File size must be less than 5MB', (value: unknown) => {
      const fileList = value as FileList;
      if (!fileList || fileList.length === 0) return false;
      return fileList[0].size <= 5 * 1024 * 1024;
    })
    .test('fileType', 'Only image files are allowed', (value: unknown) => {
      const fileList = value as FileList;
      if (!fileList || fileList.length === 0) return false;
      return ['image/jpeg', 'image/png', 'image/gif'].includes(fileList[0].type);
    }),
  facilities: yup.string().notRequired(),
  achievements: yup.string().notRequired(),
  description: yup.string().notRequired(),
  established: yup.string().notRequired(),
  studentCount: yup.string().notRequired(),
});

type FormData = yup.InferType<typeof schema> & {
  image: FileList;
};

export default function AddSchool() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setMessage('');

    try {
      // Convert image to base64 (for demonstration, you may want to handle file uploads differently)
      let imageUrl = '';
      if (data.image && data.image[0]) {
        const file = data.image[0];
        imageUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      }

      const response = await fetch('/api/schools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          address: data.address,
          city: data.city,
          state: data.state,
          contact: data.contact,
          email_id: data.email_id,
          image: imageUrl,
          facilities: data.facilities ? data.facilities.split(',').map(f => f.trim()) : [],
          achievements: data.achievements ? data.achievements.split(',').map(a => a.trim()) : [],
          description: data.description || '',
          established: data.established || '',
          studentCount: data.studentCount || '',
        }),
      });

      if (response.ok) {
        setMessage('School added successfully!');
        reset();
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message || 'Failed to add school'}`);
      }
    } catch (error) {
      setMessage('Error: Failed to add school');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg mb-6">
            <span className="text-3xl">🏫</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Add New School
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enter the details of the school to add it to our comprehensive database
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 sm:p-12 border border-white/20">
          {/* Success/Error Message */}
          {message && (
            <div className={`mb-8 p-6 rounded-2xl border-2 ${message.includes('Error')
                ? 'bg-red-50 text-red-700 border-red-200 shadow-lg'
                : 'bg-green-50 text-green-700 border-green-200 shadow-lg'
              }`}>
              <div className="flex items-center">
                <span className="text-2xl mr-3">
                  {message.includes('Error') ? '⚠️' : '✅'}
                </span>
                <span className="font-semibold">{message}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* School Name and Contact */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="group">
                <label htmlFor="name" className="block text-lg font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                  <span className="mr-2">📚</span>
                  School Name *
                </label>
                <input
                  {...register('name')}
                  type="text"
                  id="name"
                  className={`w-full px-4 py-4 text-lg border-2 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 font-semibold text-gray-800 placeholder-gray-500 ${errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-blue-300 focus:border-blue-500'
                    }`}
                  placeholder="Enter school name"
                />
                {errors.name && (
                  <p className="mt-2 text-red-600 font-bold flex items-center">
                    <span className="mr-1">❌</span>
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="group">
                <label htmlFor="contact" className="block text-lg font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                  <span className="mr-2">📞</span>
                  Contact Number *
                </label>
                <input
                  {...register('contact')}
                  type="tel"
                  id="contact"
                  className={`w-full px-4 py-4 text-lg border-2 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 font-semibold text-gray-800 placeholder-gray-500 ${errors.contact ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-blue-300 focus:border-blue-500'
                    }`}
                  placeholder="Enter 10-digit contact number"
                />
                {errors.contact && (
                  <p className="mt-2 text-red-600 font-bold flex items-center">
                    <span className="mr-1">❌</span>
                    {errors.contact.message}
                  </p>
                )}
              </div>
            </div>

            {/* Address */}
            <div className="group">
              <label htmlFor="address" className="block text-lg font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                <span className="mr-2">📍</span>
                Address *
              </label>
              <textarea
                {...register('address')}
                id="address"
                rows={4}
                className={`w-full px-4 py-4 text-lg border-2 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 resize-none font-semibold text-gray-800 placeholder-gray-500 ${errors.address ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-blue-300 focus:border-blue-500'
                  }`}
                placeholder="Enter complete address"
              />
              {errors.address && (
                <p className="mt-2 text-red-600 font-bold flex items-center">
                  <span className="mr-1">❌</span>
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* City and State */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="group">
                <label htmlFor="city" className="block text-lg font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                  <span className="mr-2">🏙️</span>
                  City *
                </label>
                <input
                  {...register('city')}
                  type="text"
                  id="city"
                  className={`w-full px-4 py-4 text-lg border-2 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 font-semibold text-gray-800 placeholder-gray-500 ${errors.city ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-blue-300 focus:border-blue-500'
                    }`}
                  placeholder="Enter city name"
                />
                {errors.city && (
                  <p className="mt-2 text-red-600 font-bold flex items-center">
                    <span className="mr-1">❌</span>
                    {errors.city.message}
                  </p>
                )}
              </div>

              <div className="group">
                <label htmlFor="state" className="block text-lg font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                  <span className="mr-2">🗺️</span>
                  State *
                </label>
                <input
                  {...register('state')}
                  type="text"
                  id="state"
                  className={`w-full px-4 py-4 text-lg border-2 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 font-semibold text-gray-800 placeholder-gray-500 ${errors.state ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-blue-300 focus:border-blue-500'
                    }`}
                  placeholder="Enter state name"
                />
                {errors.state && (
                  <p className="mt-2 text-red-600 font-bold flex items-center">
                    <span className="mr-1">❌</span>
                    {errors.state.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="group">
              <label htmlFor="email_id" className="block text-lg font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                <span className="mr-2">✉️</span>
                Email ID *
              </label>
              <input
                {...register('email_id')}
                type="email"
                id="email_id"
                className={`w-full px-4 py-4 text-lg border-2 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 font-semibold text-gray-800 placeholder-gray-500 ${errors.email_id ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-blue-300 focus:border-blue-500'
                  }`}
                placeholder="Enter email address"
              />
              {errors.email_id && (
                <p className="mt-2 text-red-600 font-bold flex items-center">
                  <span className="mr-1">❌</span>
                  {errors.email_id.message}
                </p>
              )}
            </div>

            {/* Image Upload */}
            <div className="group">
              <label htmlFor="image" className="block text-lg font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                <span className="mr-2">🖼️</span>
                School Image *
              </label>
              <div className="relative">
                <input
                  {...register('image')}
                  type="file"
                  id="image"
                  accept="image/*"
                  className={`w-full px-4 py-4 text-lg border-2 rounded-xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 cursor-pointer font-semibold text-gray-800 ${errors.image ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-blue-300 focus:border-blue-500'
                    }`}
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-gray-500 text-sm font-medium">📁 Choose an image file</span>
                </div>
              </div>
              {errors.image && (
                <p className="mt-2 text-red-600 font-bold flex items-center">
                  <span className="mr-1">❌</span>
                  {errors.image.message}
                </p>
              )}
              <div className="mt-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <p className="text-blue-800 text-sm font-bold">
                  <span className="mr-2">ℹ️</span>
                  Accepted formats: JPEG, PNG, GIF. Maximum size: 5MB
                </p>
              </div>
            </div>

            {/* Optional Fields */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="group">
                <label htmlFor="facilities" className="block text-lg font-bold text-gray-800 mb-3">
                  <span className="mr-2">🏅</span>
                  Facilities (comma separated)
                </label>
                <input
                  {...register('facilities')}
                  type="text"
                  id="facilities"
                  className="w-full px-4 py-4 text-lg border-2 rounded-xl shadow-sm border-gray-200 font-semibold text-gray-800 placeholder-gray-500"
                  placeholder="Library, Sports, Labs"
                />
              </div>
              <div className="group">
                <label htmlFor="achievements" className="block text-lg font-bold text-gray-800 mb-3">
                  <span className="mr-2">🏆</span>
                  Achievements (comma separated)
                </label>
                <input
                  {...register('achievements')}
                  type="text"
                  id="achievements"
                  className="w-full px-4 py-4 text-lg border-2 rounded-xl shadow-sm border-gray-200 font-semibold text-gray-800 placeholder-gray-500"
                  placeholder="Best School 2022, Science Olympiad Winner"
                />
              </div>
            </div>
            <div className="group">
              <label htmlFor="description" className="block text-lg font-bold text-gray-800 mb-3">
                <span className="mr-2">📝</span>
                Description
              </label>
              <textarea
                {...register('description')}
                id="description"
                rows={3}
                className="w-full px-4 py-4 text-lg border-2 rounded-xl shadow-sm border-gray-200 font-semibold text-gray-800 placeholder-gray-500"
                placeholder="Describe the school"
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="group">
                <label htmlFor="established" className="block text-lg font-bold text-gray-800 mb-3">
                  <span className="mr-2">📅</span>
                  Established Year
                </label>
                <input
                  {...register('established')}
                  type="text"
                  id="established"
                  className="w-full px-4 py-4 text-lg border-2 rounded-xl shadow-sm border-gray-200 font-semibold text-gray-800 placeholder-gray-500"
                  placeholder="e.g. 1995"
                />
              </div>
              <div className="group">
                <label htmlFor="studentCount" className="block text-lg font-bold text-gray-800 mb-3">
                  <span className="mr-2">👨‍🎓</span>
                  Student Count
                </label>
                <input
                  {...register('studentCount')}
                  type="text"
                  id="studentCount"
                  className="w-full px-4 py-4 text-lg border-2 rounded-xl shadow-sm border-gray-200 font-semibold text-gray-800 placeholder-gray-500"
                  placeholder="e.g. 1200"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 pt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1 transition-all duration-200"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    Adding School...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <span className="mr-2">🚀</span>
                    Add School
                  </span>
                )}
              </button>
              <button
                type="button"
                onClick={() => reset()}
                className="flex-1 bg-gray-100 text-gray-700 py-4 px-8 rounded-xl font-bold text-lg border-2 border-gray-200 hover:bg-gray-200 hover:border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-500/20 transform hover:-translate-y-1 transition-all duration-200"
              >
                <span className="flex items-center justify-center">
                  <span className="mr-2">🔄</span>
                  Reset Form
                </span>
              </button>
            </div>
          </form>

          {/* Navigation Link */}
          <div className="mt-12 text-center">
            <a
              href="/showSchools"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-bold text-lg transition-colors group"
            >
              <span className="mr-2">👀</span>
              View All Schools
              <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}