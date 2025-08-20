import { NextRequest, NextResponse } from 'next/server';

// This is a simple mock implementation
// In a real application, you would connect to your database
let mockUsers = [
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
    const { name, email, password, userType } = await request.json();

    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === email);
    
    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Create new user
    const newUser = {
      id: mockUsers.length + 1,
      name,
      email,
      password, // In production, hash this password
      userType
    };

    mockUsers.push(newUser);

    // Generate simple token (in production, use proper JWT)
    const token = Buffer.from(`${newUser.id}:${newUser.email}:${Date.now()}`).toString('base64');

    // Return user data (without password) and token
    const { password: _, ...userWithoutPassword } = newUser;
    
    const response = NextResponse.json({
      message: 'Registration successful',
      user: userWithoutPassword,
      token
    });

    // Set HTTP-only cookie for additional security
    response.cookies.set('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 // 24 hours
    });

    return response;

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
