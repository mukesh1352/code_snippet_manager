// app/api/login/route.ts
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb'; // Reuse the same MongoDB connection

export async function POST(req: Request) {
  try {
    const { name, password } = await req.json();

    const client = await clientPromise;
    const db = client.db('admin');
    const users = db.collection('signup_login');

    const user = await users.findOne({ username: name });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    if (user.password !== password) {
      return NextResponse.json({ message: 'Incorrect password' }, { status: 401 });
    }

    return NextResponse.json({ message: 'Login successful' }, { status: 200 });
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
