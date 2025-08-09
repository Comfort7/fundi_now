import React from 'react'
import Link from 'next/link'
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'For Customers',
      links: [
        { name: 'Find Fundis', href: '/dashboard' },
        { name: 'How It Works', href: '/how-it-works' },
        { name: 'Service Areas', href: '/areas' },
        { name: 'Pricing', href: '/pricing' },
      ]
    },
    {
      title: 'For Fundis',
      links: [
        { name: 'Register as Fundi', href: '/register/fundi' },
        { name: 'Fundi Dashboard', href: '/dashboard/fundi' },
        { name: 'Success Stories', href: '/success-stories' },
        { name: 'Resources', href: '/resources' },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'Careers', href: '/careers' },
        { name: 'Blog', href: '/blog' },
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '/help' },
        { name: 'Safety', href: '/safety' },
        { name: 'Community Guidelines', href: '/guidelines' },
        { name: 'Report Issue', href: '/report' },
      ]
    }
  ]

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'LinkedIn', href: '#', icon: Linkedin },
  ]

  const contactInfo = [
    { icon: Mail, text: 'hello@fundinow.co.ke', href: 'mailto:hello@fundinow.co.ke' },
    { icon: Phone, text: '+254 700 000 000', href: 'tel:+254700000000' },
    { icon: MapPin, text: 'Nairobi, Kenya', href: '#' },
  ]

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container-main">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <Link href="/" className="text-2xl font-bold text-black mb-4 inline-block">
                Fundi Now
              </Link>
              <p className="text-gray-600 mb-6 max-w-sm">
                Connecting local service providers with customers across Kenya. 
                Find skilled fundis for all your home and office needs.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                {contactInfo.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="flex items-center text-gray-600 hover:text-black transition-colors"
                  >
                    <item.icon className="w-4 h-4 mr-3 flex-shrink-0" />
                    <span className="text-sm">{item.text}</span>
                  </Link>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex space-x-4 mt-6">
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    className="p-2 border border-gray-300 hover:border-black hover:bg-black hover:text-white transition-all duration-200"
                    title={social.name}
                  >
                    <social.icon className="w-4 h-4" />
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <div key={index}>
                <h3 className="font-bold text-black mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        className="text-gray-600 hover:text-black transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="/dashboard" className="hover:text-black">Find Fundis</a></li>
                <li><a href="/how-it-works" className="hover:text-black">How It Works</a></li>
                <li><a href="/areas" className="hover:text-black">Service Areas</a></li>
                <li><a href="/pricing" className="hover:text-black">Pricing</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="py-8 border-t border-gray-200">
          <div className="max-w-md mx-auto text-center lg:text-left lg:max-w-none lg:flex lg:items-center lg:justify-between">
            <div className="lg:flex-1">
              <h3 className="text-lg font-bold text-black mb-2">Stay Updated</h3>
              <p className="text-gray-600 text-sm">Get the latest updates about new fundis and features.</p>
            </div>
            
            <div className="mt-6 lg:mt-0 lg:ml-8">
              <form 
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:max-w-none"
                suppressHydrationWarning={true}
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input-field flex-1"
                  required
                />
                <button
                  type="submit"
                  className="btn-primary whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-gray-200">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-center lg:text-left">
              <p className="text-gray-600 text-sm">
                &copy; {currentYear} Fundi Now. All rights reserved.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center lg:justify-end items-center space-x-6">
              <Link
                href="/privacy"
                className="text-gray-600 hover:text-black text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-600 hover:text-black text-sm transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="text-gray-600 hover:text-black text-sm transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}