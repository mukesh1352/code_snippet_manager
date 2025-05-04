'use client';

import { useRouter } from 'next/navigation';
import { Button } from '../components/ui/button';

const Header = () => {
  const router = useRouter();

  return (
    <header className="bg-gray-800 shadow-md h-16 flex items-center justify-between px-6">
      <div className="text-xl font-bold text-white">
        Code-Snippet-Manager
      </div>
      <Button
        variant="default"
        onClick={() => router.push('/signup')}
        className="bg-white text-gray-800 hover:bg-gray-200"
      >
        Sign Up
      </Button>
    </header>
  );
};

export default Header;
