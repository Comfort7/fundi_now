'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function WorkerDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('requests')
  const [stats, setStats] = useState({
    totalRequests: 24,
    completedJobs: 18,
    totalEarnings: 45600,
    averageRating: 4.7,
    totalReviews: 32
  })

  // Mock service requests data - all state hooks at the top
  const [serviceRequests, setServiceRequests] = useState([
    {
      id: 1,
      clientName: 'Sarah Muthoni',
      clientLocation: 'Westlands, Nairobi',
      serviceType: 'Plumbing',
      description: 'Kitchen sink is leaking and needs urgent repair. Water is dripping continuously.',
      requestedDate: '2024-08-15',
      requestedTime: '10:00 AM',
      budget: '2500',
      status: 'pending',
      urgency: 'urgent',
      clientPhone: '+254712345678',
      clientImage: '👩‍💼',
      requestTime: '2 hours ago'
    },
    {
      id: 2,
      clientName: 'John Kiprotich',
      clientLocation: 'Karen, Nairobi',
      serviceType: 'Plumbing',
      description: 'Bathroom shower head replacement and pipe maintenance check.',
      requestedDate: '2024-08-16',
      requestedTime: '2:00 PM',
      budget: '3000',
      status: 'pending',
      urgency: 'normal',
      clientPhone: '+254723456789',
      clientImage: '👨‍💼',
      requestTime: '5 hours ago'
    }
  ])

  // Check authentication and user type
  useEffect(() => {
    const userData = localStorage.getItem('fundiUser')
    const token = localStorage.getItem('authToken')
    
    if (!userData || !token) {
      router.push('/login')
      return
    }
    
    const parsedUser = JSON.parse(userData)
    
    // Redirect clients to their dashboard
    if (parsedUser.userType === 'client') {
      router.push('/dashboard')
      return
    }
    
    setUser(parsedUser)
    setLoading(false)
  }, [router])

  const handleRequestAction = (requestId: number, action: string) => {
    setServiceRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, status: action } : req
    ))
  }

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-xl font-bold text-gray-900">
                Fundi Now
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Worker Dashboard</h1>
                <p className="text-sm text-gray-600">Manage your services and bookings</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {user?.name}!
              </span>
              <Link href="/profile" className="text-gray-600 hover:text-gray-900 text-sm">
                Profile
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-medium">📋</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Requests</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalRequests}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-medium">✅</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed Jobs</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completedJobs}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-medium">💰</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                <p className="text-2xl font-bold text-gray-900">KSh {stats.totalEarnings.toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-medium">⭐</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Average Rating</p>
                <p className="text-2xl font-bold text-gray-900">{stats.averageRating}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('requests')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'requests'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Service Requests
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'completed'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Completed Jobs
              </button>
              <button
                onClick={() => setActiveTab('earnings')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'earnings'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Earnings
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'requests' && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Pending Service Requests</h3>
                {serviceRequests.map((request) => (
                  <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-2xl">{request.clientImage}</span>
                          <div>
                            <h4 className="font-medium text-gray-900">{request.clientName}</h4>
                            <p className="text-sm text-gray-600">{request.clientLocation}</p>
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            request.urgency === 'urgent' 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {request.urgency}
                          </span>
                          <span className="ml-2 text-sm font-medium text-gray-900">{request.serviceType}</span>
                        </div>
                        
                        <p className="text-gray-700 mb-3">{request.description}</p>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <span>📅 {request.requestedDate}</span>
                          <span>🕒 {request.requestedTime}</span>
                          <span>💰 KSh {request.budget}</span>
                          <span>📞 {request.clientPhone}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col space-y-2 ml-4">
                        {request.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleRequestAction(request.id, 'accepted')}
                              className="px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleRequestAction(request.id, 'declined')}
                              className="px-4 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700"
                            >
                              Decline
                            </button>
                          </>
                        )}
                        {request.status === 'accepted' && (
                          <span className="px-4 py-2 bg-green-100 text-green-800 text-sm rounded-md">
                            ✅ Accepted
                          </span>
                        )}
                        {request.status === 'declined' && (
                          <span className="px-4 py-2 bg-red-100 text-red-800 text-sm rounded-md">
                            ❌ Declined
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'completed' && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Completed Jobs</h3>
                <div className="text-center py-8 text-gray-500">
                  <p>No completed jobs yet. Complete some service requests to see them here.</p>
                </div>
              </div>
            )}

            {activeTab === 'earnings' && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Earnings History</h3>
                <div className="text-center py-8 text-gray-500">
                  <p>No earnings yet. Complete jobs to start earning.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
