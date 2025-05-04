'use client';

// TODO => Need to implement the signup security policies
// TODO =>Need to improve the ui for the login and the signup
import { useState } from 'react';

export default function Signup() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, password }),
    });

    const data = await res.json();
    setMessage(data.message || data.error);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label>
          Username:
          <input
            type="text"
            className="border p-2 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            className="border p-2 w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Sign Up
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-red-500">{message}</p>}
    </div>
  );
}
