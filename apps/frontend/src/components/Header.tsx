import { ChevronDown } from 'lucide-react';
import React from 'react';

interface HeaderProps {
  username: string;
}

const Header: React.FC<HeaderProps> = ({ username }) => {
  return (
    <header className="flex justify-between items-center">
      <h1 className="text-gray-800 font-medium">Hello, {username}!</h1>
      <div className="flex items-center space-x-2">
        <button className="bg-gray-200 text-xs px-2 py-1 rounded-md flex items-center hover:text-gray-500">
          <span className="mr-1">{username}</span>
          <ChevronDown size={14} />
        </button>
      </div>
    </header>
  );
};

export default Header;