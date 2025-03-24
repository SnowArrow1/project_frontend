// src/libs/getVenues.tsx
export default async function getCompanies() {
 
  // Fetch venues data from the API
  const response = await fetch('http://localhost:5000/api/v1/companies');
  
  if (!response.ok) {
    throw new Error('Failed to fetch companies');
  }
  
  return response.json();
}