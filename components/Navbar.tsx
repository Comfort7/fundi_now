'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavigationItem {
  name: string
  href: string
}

interface User {
  name: string
  email: string
  userType: 'client' | 'worker'
}

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isClient, setIsClient] = useState(false) // Add client-side check
  const pathname = usePathname()

  // Check if we're on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Check for user authentication - only run on client side
  useEffect(() => {
    if (!isClient) return // Don't run on server
    
    try {
      const userData = localStorage.getItem('fundiUser')
      if (userData) {
        setUser(JSON.parse(userData))
      }
    } catch (error) {
      console.error('Error reading user data:', error)
    }
  }, [isClient])

  const handleLogout = async () => {
    if (!isClient) return // Safety check
    
    try {
      // Call logout API to clear server-side cookie
      await fetch('/api/auth/logout', { method: 'POST' });
      
      // Clear client-side storage
      localStorage.removeItem('fundiUser')
      localStorage.removeItem('authToken')
      setUser(null)
      
      // Redirect to home page
      window.location.href = '/'
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local storage and redirect even if API fails
      localStorage.removeItem('fundiUser')
      localStorage.removeItem('authToken')
      setUser(null)
      window.location.href = '/'
    }
  }

  // Handle scroll effect
  useEffect(() => {
    if (!isClient) return // Only run on client
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isClient])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const navigation: NavigationItem[] = [
    { name: 'Home', href: '/' },
    { name: 'Find Fundis', href: '/dashboard' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  const isActive = (path: string): boolean => {
    if (path === '/' && pathname === '/') return true
    if (path !== '/' && pathname.startsWith(path)) return true
    return false
  }

  return (
    <header 
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm' 
          : 'bg-white border-b border-gray-200'
      }`}
    >
      <nav className="container-main">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              href="/" 
              className="text-2xl font-bold text-black hover:text-gray-700 transition-colors"
            >
              Fundi Now
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`nav-link ${
                    isActive(item.href) ? 'nav-link-active' : ''
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/search"
              className="p-2 text-gray-600 hover:text-black transition-colors"
              title="Search Fundis"
            >
              <span className="text-lg">🔍</span>
            </Link>
            
            {/* Only show user info after client-side hydration */}
            {isClient ? (
              user ? (
                <div className="flex items-center space-x-4">
                  <Link
                    href={user.userType === 'worker' ? '/worker-dashboard' : '/dashboard'}
                    className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
                  >
                    Dashboard
                  </Link>
                  <span className="text-sm text-gray-600">
                    Hi, {user.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="btn-outline text-sm"
                  >
                    Login
                  </Link>
                  
                  <Link
                    href="/register"
                    className="btn-primary text-sm"
                  >
                    Sign Up
                  </Link>
                </>
              )
            ) : (
              // Show loading state or default buttons during SSR
              <>
                <Link
                  href="/login"
                  className="btn-outline text-sm"
                >
                  Login
                </Link>
                
                <Link
                  href="/register"
                  className="btn-primary text-sm"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <Link
              href="/search"
              className="p-2 text-gray-600 hover:text-black transition-colors"
            >
              <span className="text-lg">🔍</span>
            </Link>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-black transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <span className="text-lg">✕</span> : <span className="text-lg">☰</span>}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen 
              ? 'max-h-96 opacity-100 border-t border-gray-200' 
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="py-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-4 py-3 text-base hover:bg-gray-50 transition-colors ${
                  isActive(item.href) 
                    ? 'text-black font-medium bg-gray-50' 
                    : 'text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            <div className="px-4 py-3 space-y-3 border-t border-gray-200 mt-4">
              {isClient ? (
                user ? (
                  <div className="space-y-3">
                    <Link
                      href={user.userType === 'worker' ? '/worker-dashboard' : '/dashboard'}
                      className="block text-center text-sm font-medium text-gray-700 hover:text-black transition-colors"
                    >
                      Dashboard
                    </Link>
                    <div className="text-center text-sm text-gray-600">
                      Hi, {user.name}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-center text-sm font-medium text-gray-700 hover:text-black transition-colors border border-gray-300 rounded-md py-2"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="block w-full text-center btn-outline"
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="block w-full text-center btn-primary"
                    >
                      Sign Up
                    </Link>
                  </>
                )
              ) : (
                // Default mobile menu during SSR
                <>
                  <Link
                    href="/login"
                    className="block w-full text-center btn-outline"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="block w-full text-center btn-primary"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}