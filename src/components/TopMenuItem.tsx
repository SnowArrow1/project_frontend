import React from 'react';
import Link from 'next/link';

interface TopMenuItemProps {
  pageRef: string;
  title: React.ReactNode;
}

const TopMenuItem: React.FC<TopMenuItemProps> = ({ title, pageRef }) => {
  return (
    <Link 
      href={pageRef}
      className="px-4 py-2 text-gray-700 hover:text-blue-600 text-base transition-colors duration-300"
    >
    {title}
    </Link>
  );
};

export default TopMenuItem;