// app/api/signup/route.ts
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb'; 

export async function POST(req: Request) {
  try {
    const { name, password } = await req.json();

    const client = await clientPromise;
    const db = client.db('admin');
    const users = db.collection('signup_login');

    const existingUser = await users.findOne({ username: name });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    await users.insertOne({ username: name, password }); // store password as plain-text only for learning
    return NextResponse.json({ message: 'User signed up successfully' }, { status: 201 });
  } catch (err) {
    console.error('Signup error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
