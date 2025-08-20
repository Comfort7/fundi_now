import { NextRequest, NextResponse } from 'next/server';

// Mock users for token verification
const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    userType: 'client'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com', 
    userType: 'worker'
  }
];

export async function GET(request: NextRequest) {
  try {
    // Get token from cookie or Authorization header
    const token = request.cookies.get('authToken')?.value || 
                 request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { message: 'No token provided' },
        { status: 401 }
      );
    }

    // Decode simple token (in production, use proper JWT verification)
    try {
      const decoded = Buffer.from(token, 'base64').toString();
      const [userId, email, timestamp] = decoded.split(':');

      // Find user by ID
      const user = mockUsers.find(u => u.id === parseInt(userId));
      
      if (!user || user.email !== email) {
        return NextResponse.json(
          { message: 'Invalid token' },
          { status: 401 }
        );
      }

      // Check if token is not too old (24 hours)
      const tokenTime = parseInt(timestamp);
      const now = Date.now();
      const hoursDiff = (now - tokenTime) / (1000 * 60 * 60);
      
      if (hoursDiff > 24) {
        return NextResponse.json(
          { message: 'Token expired' },
          { status: 401 }
        );
      }

      return NextResponse.json({
        message: 'Token valid',
        user
      });

    } catch {
      return NextResponse.json(
        { message: 'Invalid token format' },
        { status: 401 }
      );
    }

  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
