'use client'

import React from 'react'
import Link from 'next/link'

export default function HomePage() {
  const services = [
    "Plumbing",
    "TV Mounting", 
    "Cleaning",
    "Electrical",
    "Carpentry",
    "Painting",
  ]

  const features = [
    {
      icon: "🔍",
      title: "Easy Search", 
      description: "Find qualified fundis in your area with our simple search",
    },
    {
      icon: "⭐",
      title: "Rated & Reviewed",
      description: "All fundis are rated by previous customers for quality assurance",
    },
    {
      icon: "🛡️", 
      title: "Verified Professionals",
      description: "Every fundi is verified to ensure reliable service delivery",
    },
    {
      icon: "⏰",
      title: "Quick Booking",
      description: "Book services instantly and get work done on your schedule",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Find the Best{" "}
              <span className="text-blue-600">Local Fundis</span> in Kenya
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Connect with verified professionals for plumbing, electrical work,
              cleaning, and more. Book instantly and get work done on your
              schedule.
            </p>

            {/* Service Tags */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {services.map((service) => (
                <span
                  key={service}
                  className="px-4 py-2 bg-white text-gray-700 rounded-full shadow-sm border border-gray-200"
                >
                  {service}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="px-8 py-4 bg-black text-white text-lg hover:bg-gray-800 transition-colors flex items-center justify-center rounded-lg"
              >
                Find a Fundi
                <span className="ml-2">→</span>
              </Link>
              <Link
                href="/register"
                className="px-8 py-4 bg-white text-black border-2 border-black text-lg hover:bg-gray-50 transition-colors flex items-center justify-center rounded-lg"
              >
                Register as Fundi
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Fundi Now?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We make it easy to find, hire, and work with local service
              providers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <span className="text-4xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Get your work done in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Post Your Job
              </h3>
              <p className="text-gray-600">
                Describe what you need done and when you need it completed
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Choose Your Fundi
              </h3>
              <p className="text-gray-600">
                Review profiles, ratings, and quotes from qualified fundis
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Get It Done
              </h3>
              <p className="text-gray-600">
                Work gets completed on time and you pay securely through our
                platform
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Fundi Now for their
            home and office needs
          </p>
          <Link
            href="/register"
            className="inline-block px-8 py-4 bg-white text-black text-lg font-semibold hover:bg-gray-100 transition-colors rounded-lg"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  )
}
