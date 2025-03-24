// src/components/Card.tsx

import React from 'react';
import Link from 'next/link';

interface CardProps {
  cid: string;
  companyName: string;
  address: string;
  website: string;
  description: string;
  telephone: string;
}

export default function Card({ cid, companyName, address, website, description, telephone}: CardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-auto">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{companyName}</h3>
        
        {address && (
          <div className="flex items-start mb-2">
            <svg className="h-5 w-5 text-gray-500 mr-2 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <p className="text-gray-600 text-sm">{address}</p>
          </div>
        )}
        
        {telephone && (
          <div className="flex items-center mb-2">
            <svg className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <p className="text-gray-600 text-sm">{telephone}</p>
          </div>
        )}
        
        {website && (
          <div className="flex items-center mb-3">
            <svg className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
            </svg>
            <a href={website.startsWith('http') ? website : `https://${website}`} 
               target="_blank" 
               rel="noopener noreferrer" 
               className="text-blue-600 hover:text-blue-800 text-sm truncate">
              {website}
            </a>
          </div>
        )}
        
        {description && (
          <div className="mt-3">
            <p className="text-gray-700 text-sm line-clamp-3">{description}</p>
          </div>
        )}
        
        <div className="mt-4">
          <Link href={`/company/${cid}`} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
