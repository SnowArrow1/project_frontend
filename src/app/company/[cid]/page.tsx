import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import getCompany from '@/libs/getCompany';
import { Button } from '@mui/material';
import Link from 'next/link';

// Define the props for the page component
type CompanyDetailPageProps = {
  params: {
    cid: string;
  };
};

export default async function CompanyDetailPage({ params }: CompanyDetailPageProps) {
  const { cid } = params;
  
  try {
    const companyResponse = await getCompany(cid);
    const company = companyResponse.data;
    
    if (!company) {
      return notFound();
    }
    
    return (
      <main className="min-h-screen p-4 md:p-8 bg-gray-50">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 relative h-64 md:h-auto w-full overflow-hidden">
              <div className="w-full h-full bg-gray-200 flex items-center justify-center min-h-[300px] md:min-h-[400px]">
                <Image 
                  src='/img/company.jpg'
                  alt={company.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-tl-lg rounded-bl-lg"
                />
              </div>
            </div>
            <div className="md:w-1/2 p-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">{company.name}</h1>
              
              {company.address && (
                <div className="flex items-start mb-3">
                  <svg className="h-5 w-5 text-gray-500 mr-2 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-gray-600">{company.address}</p>
                </div>
              )}
              
              {company.tel && (
                <div className="flex items-center mb-3">
                  <svg className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <p className="text-gray-600">{company.tel}</p>
                </div>
              )}
              
              {company.website && (
                <div className="flex items-center mb-4">
                  <svg className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                  </svg>
                  <a 
                    href={company.website.startsWith('http') ? company.website : `https://${company.website}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 hover:text-blue-800 truncate"
                  >
                    {company.website}
                  </a>
                </div>
              )}
              
              {company.description && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-700 mb-2">About</h2>
                  <p className="text-gray-600">{company.description}</p>
                </div>
              )}
              
              {/* Company Industry */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-700 mb-2">Industry</h2>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                      Technology
                    </span>
                  </div>
                </div>

              
              {/* Company Size */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-700 mb-2">Company Size</h2>
                  <p className="text-gray-600">100-200 employees</p>
                </div>
              
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-700 mb-2">Founded</h2>
                  <p className="text-gray-600">2020</p>
                </div>

              <Link 
                href={{
                  pathname: '/interview',
                  query: { company: company.name, cid: cid }
                }}
                className="w-full block mb-6"
              >
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth
                  sx={{ 
                    mt: 2, 
                    textTransform: 'none',
                    fontSize: '1.5rem',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px'
                  }}
                >
                  Schedule Interview
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Additional company information section */}
          <div className="p-6 border-t border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Company Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Benefits */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Benefits & Perks</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Flexible working hours</li>
                  <li>Health insurance</li>
                  <li>Professional development opportunities</li>
                  <li>Competitive salary</li>
                  <li>Team building activities</li>
                </ul>
              </div>
              
              {/* Culture */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Company Culture</h3>
                <p className="text-gray-600">
                  "We foster an inclusive and collaborative environment where innovation thrives. Our team values open communication, mutual respect, and a healthy work-life balance."
                </p>
              </div>
            </div>
            
            {/* Current Openings */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Current Job Openings</h3>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-gray-600 italic">
                  Contact the company directly to learn about their current job openings and opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error("Error fetching company details:", error);
    return notFound();
  }
}
