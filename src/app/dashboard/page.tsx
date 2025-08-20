/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Dashboard() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Check authentication
  useEffect(() => {
    const userData = localStorage.getItem('fundiUser')
    const token = localStorage.getItem('authToken')
    
    if (!userData || !token) {
      router.push('/login')
      return
    }
    
    const parsedUser = JSON.parse(userData)
    
    // Redirect workers to their dashboard
    if (parsedUser.userType === 'worker') {
      router.push('/worker-dashboard')
      return
    }
    
    setUser(parsedUser)
    setLoading(false)
  }, [router])

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-black"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render if no user (will redirect)
  if (!user) {
    return null
  }

  // Mock data - replace with real data later
  const categories = [
    { id: 'all', name: 'All Services', icon: '🔧', count: 156 },
    { id: 'plumbing', name: 'Plumbing', icon: '🚰', count: 23 },
    { id: 'electrical', name: 'Electrical', icon: '⚡', count: 18 },
    { id: 'carpentry', name: 'Carpentry', icon: '🔨', count: 31 },
    { id: 'cleaning', name: 'Cleaning', icon: '🧹', count: 42 },
    { id: 'painting', name: 'Painting', icon: '🎨', count: 19 },
    { id: 'gardening', name: 'Gardening', icon: '🌱', count: 15 },
    { id: 'appliance', name: 'Appliance Repair', icon: '🔧', count: 8 }
  ]

  const workers = [
    {
      id: 1,
      name: 'John Mwangi',
      category: 'plumbing',
      rating: 4.8,
      reviews: 47,
      hourlyRate: 1500,
      location: 'Westlands, Nairobi',
      skills: ['Plumbing', 'Pipe Installation', 'Water Heating'],
      experience: '5+ years',
      image: '👨‍🔧',
      availability: 'Available Now',
      verified: true
    },
    {
      id: 2,
      name: 'Mary Wanjiku',
      category: 'cleaning',
      rating: 4.9,
      reviews: 73,
      hourlyRate: 800,
      location: 'Kilimani, Nairobi',
      skills: ['House Cleaning', 'Office Cleaning', 'Deep Cleaning'],
      experience: '3+ years',
      image: '👩‍💼',
      availability: 'Available Today',
      verified: true
    },
    {
      id: 3,
      name: 'David Kamau',
      category: 'electrical',
      rating: 4.7,
      reviews: 32,
      hourlyRate: 2000,
      location: 'Karen, Nairobi',
      skills: ['Wiring', 'Solar Installation', 'Electrical Repair'],
      experience: '7+ years',
      image: '👨‍💻',
      availability: 'Available Tomorrow',
      verified: true
    },
    {
      id: 4,
      name: 'Grace Akinyi',
      category: 'carpentry',
      rating: 4.6,
      reviews: 28,
      hourlyRate: 1200,
      location: 'Langata, Nairobi',
      skills: ['Furniture Making', 'Cabinet Installation', 'Wood Repair'],
      experience: '4+ years',
      image: '👩‍🔧',
      availability: 'Available Now',
      verified: false
    },
    {
      id: 5,
      name: 'Peter Ochieng',
      category: 'painting',
      rating: 4.8,
      reviews: 51,
      hourlyRate: 1000,
      location: 'Kasarani, Nairobi',
      skills: ['Interior Painting', 'Exterior Painting', 'Wall Preparation'],
      experience: '6+ years',
      image: '👨‍🎨',
      availability: 'Available Now',
      verified: true
    },
    {
      id: 6,
      name: 'Susan Njeri',
      category: 'gardening',
      rating: 4.5,
      reviews: 19,
      hourlyRate: 900,
      location: 'Runda, Nairobi',
      skills: ['Landscaping', 'Plant Care', 'Garden Design'],
      experience: '2+ years',
      image: '👩‍🌾',
      availability: 'Available This Week',
      verified: true
    }
  ]

  const filteredWorkers = workers.filter(worker => {
    const matchesCategory = selectedCategory === 'all' || worker.category === selectedCategory
    const matchesSearch = worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         worker.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const handleBookWorker = (worker: { id: number; name: string; category: string; rating: number; reviews: number; hourlyRate: number; location: string; skills: string[]; experience: string; image: string; availability: string; verified: boolean }) => {
    // TODO: Open booking modal or navigate to booking page
    console.log('Booking worker:', worker)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <Link href="/" className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <span className="text-white font-bold">F</span>
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Fundi</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {user && (
                <span className="text-sm text-gray-600">
                  Welcome, {user.name}!
                </span>
              )}
              <Link 
                href="/profile"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Profile
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Find the Perfect Fundi</h2>
          <p className="text-gray-600 mb-6">Connect with skilled workers in your area</p>
          
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder="Search by name or skill..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-all ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                }`}
              >
                <span>{category.icon}</span>
                <span className="font-medium">{category.name}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  selectedCategory === category.id
                    ? 'bg-blue-500'
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Workers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkers.map((worker) => (
            <div key={worker.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              {/* Worker Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-4xl">{worker.image}</div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-900">{worker.name}</h3>
                        {worker.verified && (
                          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{worker.location}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-yellow-500 mb-1">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-900">{worker.rating}</span>
                      <span className="text-xs text-gray-500">({worker.reviews})</span>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {worker.skills.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Availability & Rate */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">{worker.availability}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-semibold text-gray-900">KSh {worker.hourlyRate}</span>
                    <span className="text-sm text-gray-500">/hour</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="px-6 py-4 bg-gray-50 border-t">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleBookWorker(worker)}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Book Now
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredWorkers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No workers found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}