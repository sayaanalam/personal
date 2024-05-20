// components/NavBar.tsx

import React from 'react';
import Link from 'next/link';

const NavBar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <Link href="/about">
          <a className="text-white text-lg">About</a>
        </Link>
        <a href="https://your-hashnode-username.hashnode.dev" className="text-white text-lg">
          Blog
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
