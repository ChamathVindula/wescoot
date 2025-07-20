import React from 'react';
import { Building, Zap, Users, Smile } from 'lucide-react';
import ContactForm from '../components/ContactForm';

const AboutUsPage: React.FC = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-indigo-800">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2830&q=80&sat=-100"
            alt="People working on laptops"
          />
          <div className="absolute inset-0 bg-indigo-800 mix-blend-multiply" aria-hidden="true" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">About Wescoot</h1>
          <p className="mt-6 text-xl text-indigo-100 max-w-3xl">
            We're revolutionizing urban travel, one electric scooter at a time. Discover our story, our mission, and the team dedicated to providing you with the best ride in town.
          </p>
        </div>
      </div>

      {/* Our Mission Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Our Mission</h2>
            <p className="mt-4 text-lg text-gray-500">
              To provide innovative, eco-friendly, and affordable transportation solutions that make city life more convenient, enjoyable, and sustainable for everyone.
            </p>
          </div>
          <div className="mt-12 lg:mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                <Zap className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h3 className="text-lg font-medium text-gray-900">Innovation</h3>
                <p className="mt-2 text-base text-gray-500">
                  We constantly seek the latest technology to bring you scooters that are faster, safer, and more efficient.
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                <Building className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h3 className="text-lg font-medium text-gray-900">Sustainability</h3>
                <p className="mt-2 text-base text-gray-500">
                  Our commitment to the planet drives us to promote green transportation and reduce urban carbon footprints.
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                <Users className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h3 className="text-lg font-medium text-gray-900">Community</h3>
                <p className="mt-2 text-base text-gray-500">
                  We believe in building a community of riders who share a passion for exploration and modern mobility.
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                <Smile className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h3 className="text-lg font-medium text-gray-900">Customer Joy</h3>
                <p className="mt-2 text-base text-gray-500">
                  Your happiness is our priority. We strive to provide exceptional service and support, from purchase to every ride.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-white shadow-xl">
            <div className="grid lg:grid-cols-2">
              {/* Contact Information */}
              <div className="relative px-6 py-10 sm:px-10 lg:py-24 xl:pr-24">
                <div className="max-w-lg mx-auto">
                  <h2 className="text-3xl font-extrabold text-gray-900">Get in Touch</h2>
                  <p className="mt-4 text-lg text-gray-500">
                    Have questions about our scooters, need help with an order, or just want to say hello? We'd love to hear from you.
                  </p>
                  <dl className="mt-8 text-base text-gray-500">
                    <div>
                      <dt className="sr-only">Postal address</dt>
                      <dd>
                        <p>123 Scooter Lane</p>
                        <p>Electric City, EC 54321</p>
                      </dd>
                    </div>
                    <div className="mt-6">
                      <dt className="sr-only">Phone number</dt>
                      <dd className="flex">
                        <svg className="flex-shrink-0 h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="ml-3">+1 (555) 123-4567</span>
                      </dd>
                    </div>
                    <div className="mt-3">
                      <dt className="sr-only">Email</dt>
                      <dd className="flex">
                        <svg className="flex-shrink-0 h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="ml-3">hello@wescoot.com</span>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              {/* Contact Form */}
              <div className="px-6 py-10 sm:px-10 lg:py-24">
                <div className="max-w-lg mx-auto">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
