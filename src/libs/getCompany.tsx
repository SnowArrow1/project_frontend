// src/libs/getVenue.tsx
import { CompanyItem } from '@/../../interface';
export default async function getCompany(cid: string): Promise<{data: CompanyItem}> {

  // Fetch venue data by ID from the API
  const response = await fetch(`http://localhost:5000/api/v1/companies/${cid}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch company');
  }
  
  return response.json();
}
