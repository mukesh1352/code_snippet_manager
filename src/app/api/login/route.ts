import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import redis from '@/lib/redis';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import { serialize } from 'cookie';

export async function POST(req: Request) {
  try {
    const { name, password } = await req.json();

    if (!name || !password) {
      return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('admin');
    const users = db.collection('signup_login');

    const user = await users.findOne({ username: name });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
    }

    const sessionId = randomUUID();
    await redis.set(`session:${sessionId}`, JSON.stringify({ username: name }), 'EX', 60 * 60 * 24); // 1 day

    // Set cookie
    const cookie = serialize('session_id', sessionId, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    const response = NextResponse.json({ message: 'Login successful' });
    response.headers.set('Set-Cookie', cookie);

    return response;
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
