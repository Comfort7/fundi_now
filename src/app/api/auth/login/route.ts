import { NextRequest, NextResponse } from 'next/server';

// This is a simple mock implementation
// In a real application, you would connect to your database
const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    userType: 'client'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com', 
    password: 'password123',
    userType: 'worker'
  }
];

export async function POST(request: NextRequest) {
  try {
    const { email, password, rememberMe } = await request.json();

    // Find user by email
    const user = mockUsers.find(u => u.email === email);
    
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Simple password check (in production, use proper hashing)
    if (password !== user.password) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Generate simple token (in production, use proper JWT)
    const token = Buffer.from(`${user.id}:${user.email}:${Date.now()}`).toString('base64');

    // Return user data (without password) and token
    const { password: userPassword, ...userWithoutPassword } = user;
    
    const response = NextResponse.json({
      message: 'Login successful',
      user: userWithoutPassword,
      token
    });

    // Set HTTP-only cookie for additional security
    response.cookies.set('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60 // 30 days or 24 hours
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
