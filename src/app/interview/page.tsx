// src/app/book-interview/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { CircularProgress } from "@mui/material";
import DateInterview from "@/components/DateInterview";
import { toast, Toaster } from "react-hot-toast";

export default function BookInterviewPage() {
  const [company, setCompany] = useState<{ _id?: string; id?: string } | string>("");
  const [interviewDate, setInterviewDate] = useState<Date | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!company || !interviewDate) {
      toast.error("Please select both company and interview date");
      return;
    }
    const companyId = typeof company === "object" ? company._id ?? company.id : company;
  
    console.log("Company value:", company); // Debug what's being received
    console.log("Using company ID:", companyId); // Debug what's being used

    setIsSubmitting(true);
    
    try {
      // Format the interview data
      const formattedDate = dayjs(interviewDate).format("YYYY-MM-DD");
      
      const interviewData = {
        interviewDate: formattedDate
      };
      
      // Make API request to create interview
      const response = await fetch(`${process.env.BACKEND_URL}/api/v1/companies/${companyId}/interviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session?.user?.token}`
        },
        body: JSON.stringify(interviewData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Failed to book interview");
      }
      
      // Show success message
      toast.success("Interview booked successfully!");
      
      // Reset form
      setCompany("");
      setInterviewDate(null);
      
      // Redirect to my interviews page after short delay
      setTimeout(() => {
        router.push("/myinterview");
      }, 2000);
      
    } catch (error) {
      console.error("Error appointing interview:", error);
      toast.error((error as Error).message || "Failed to appoint interview");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Toaster position="top-center" />
      
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="p-8 w-full">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-1">Career Opportunity</div>
            <h1 className="block mt-1 text-2xl leading-tight font-bold text-black mb-6">Appoint an Interview (Up to 3 Interviews)</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <DateInterview 
              onDateChange={(date: Date | null) => setInterviewDate(date)}
              onCompanyChange={(companyId: string) => setCompany(companyId)}
              />
              
              <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <CircularProgress size={20} color="inherit" className="mr-2" />
                  <span>Appointing...</span>
                </div>
                ) : (
                "Appoint Interview"
                )}
              </button>
              </div>
            </form>
            
            <div className="mt-6 text-center">
              <button
                onClick={() => router.push("/my-interviews")}
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              >
                View my scheduled interviews
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
