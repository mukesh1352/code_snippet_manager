'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../components/ui/button';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const Header = () => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="bg-gray-800 shadow-md h-16 flex items-center justify-between px-6 relative">
      <div className="text-xl font-bold text-white">
        Code-Snippet-Manager
      </div>

      <div className="relative">
        <Button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="bg-white text-gray-800 hover:bg-gray-100 flex items-center gap-1"
        >
          Options
          <ChevronDownIcon className="w-4 h-4" />
        </Button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg py-2 z-50">
            <button
              onClick={() => {
                router.push('/signup');
                setIsDropdownOpen(false);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Sign Up
            </button>
            <button
              onClick={() => {
                router.push('/login');
                setIsDropdownOpen(false);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
