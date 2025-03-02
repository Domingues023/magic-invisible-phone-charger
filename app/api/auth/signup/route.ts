import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Check if user already exists
    // 2. Hash the password
    // 3. Store user in database
    
    // For now, we'll just mock the success response
    const hashedPassword = await hash(password, 12);
    
    // Mock successful user creation
    const user = {
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
    };

    return NextResponse.json(
      { message: 'User created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 