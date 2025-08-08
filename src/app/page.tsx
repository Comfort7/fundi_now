import React from 'react';
import { Search, Star, Shield, Clock, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const services = [
    'Plumbing', 'TV Mounting', 'Cleaning', 'Electrical', 'Carpentry', 'Painting'
  ];

  const features = [
    {
      icon: <Search className="w-8 h-8" />,
      title: "Easy Search",
      description: "Find qualified fundis in your area with our simple search"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Rated & Reviewed",
      description: "All fundis are rated by previous customers for quality assurance"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Verified Professionals",
      description: "Every fundi is verified to ensure reliable service delivery"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Quick Booking",
      description: "Book services instantly and get work done on your schedule"
    }
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero Section */}
      <section className="section-padding">
        <div className="container-main text-center">
          <h1 className="heading-xl mb-6">
            Find Local Fundis
            <br />
            <span className="text-gray-600">Get Work Done</span>
          </h1>
          <p className="text-body mb-12 max-w-3xl mx-auto">
            Connect with verified local service providers. From plumbing to TV mounting, find skilled fundis in your area.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button className="btn-primary text-lg flex items-center justify-center px-8 py-4">
              Find a Fundi
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <button className="btn-secondary text-lg px-8 py-4">
              Register as Fundi
            </button>
          </div>

          {/* Service Tags */}
          <div className="flex flex-wrap justify-center gap-3">
            {services.map((service, index) => (
              <span
                key={index}
                className="px-4 py-2 border border-gray-300 text-gray-700 hover:border-black hover:text-black transition-colors cursor-pointer"
              >
                {service}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-main">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">How It Works</h2>
            <p className="text-body text-gray-600">Simple steps to get your work done</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 border-2 border-black">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center container-main">
          <h2 className="heading-lg mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-body text-gray-600 mb-12">
            Join thousands of customers and fundis already using our platform
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card p-8">
              <h3 className="text-2xl font-bold mb-4">For Customers</h3>
              <p className="text-gray-600 mb-6">Find and hire verified fundis for all your home and office needs.</p>
              <button className="btn-primary w-full">
                Find Fundis
              </button>
            </div>
            
            <div className="card p-8">
              <h3 className="text-2xl font-bold mb-4">For Fundis</h3>
              <p className="text-gray-600 mb-6">Grow your business by connecting with customers in your area.</p>
              <button className="btn-secondary w-full">
                Register Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}