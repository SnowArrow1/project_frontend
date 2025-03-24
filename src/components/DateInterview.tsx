'use client';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { InputLabel, MenuItem, Select, CircularProgress } from '@mui/material';
import { CompanyItem, CompanyJson } from '../../interface';
import { useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import getCompanies from '@/libs/getCompanies';

export default function DateInterview({
  onDateChange, 
  onCompanyChange
}: {
  onDateChange: Function, 
  onCompanyChange: Function
}) {
  const [interviewDate, setInterviewDate] = useState<Dayjs|null>(null);
  const [selectedCompany, setSelectedCompany] = useState<CompanyItem>();
  const [companies, setCompanies] = useState<CompanyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        // Use your existing getCompanies function
        const data: CompanyJson = await getCompanies();
        const companyData = data.data;
        
        // Format the data if needed
        const formattedCompanies = Array.isArray(companyData) ? companyData.map(company => ({
            _id: company._id,
            name: company.name,
            address: company.address,
            website: company.website,
            description: company.description,
            tel: company.tel,
            __v: company.__v,
            value: company._id,
        })) : [];
        
        setCompanies(formattedCompanies);
        setError(null);
      } catch (err) {
        console.error('Error fetching companies:', err);
        setError('Failed to load companies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
    
    // Set up polling to check for new companies periodically
    const intervalId = setInterval(fetchCompanies, 30000); // Check every 30 seconds
    
    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <InputLabel id="venue-label">Select Company</InputLabel>
      <Select 
        variant='standard' 
        fullWidth
        id="venue"
        labelId="venue-label"
        value={selectedCompany}
        onChange={(e) => {
          const selected = companies.find(company => company.value === e.target.value);
          setSelectedCompany(selected); 
          onCompanyChange(selected);
        }}
        required
        disabled={loading}
      >
        {loading ? (
          <MenuItem disabled>
            <CircularProgress size={20} /> Loading companies...
          </MenuItem>
        ) : error ? (
          <MenuItem disabled>
            Error: {error}
          </MenuItem>
        ) : companies.length > 0 ? (
          companies.map((company) => (
            <MenuItem key={company._id} value={company.value}>
              {company.name}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No companies available</MenuItem>
        )}
      </Select>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker 
          label="Event Date (May 10-13, 2022)"
          value={interviewDate}
          onChange={(value) => {
            setInterviewDate(value); 
            onDateChange(value);
          }}
          slotProps={{ 
            textField: { 
              fullWidth: true, 
              margin: "normal",
              helperText: "Please select a date between May 10-13, 2022"
            } 
          }}
          minDate={dayjs('2022-05-10')}
          maxDate={dayjs('2022-05-13')}
          shouldDisableDate={(date) => {
            const d = dayjs(date);
            return d < dayjs('2022-05-10') || d > dayjs('2022-05-13');
          }}
        />
      </LocalizationProvider>

    </>
  );
}
