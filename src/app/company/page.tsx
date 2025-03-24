// src/app/(venueinfo)/venue/page.tsx
import CompanyCatalog from '@/components/CompanyCatalog';
import getCompanies from '@/libs/getCompanies';

export default async function CompanyPage() {
  const companies = await getCompanies();
  return (
    <main className="min-h-screen">
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl text-gray-800 font-bold text-center mb-8">Find your company</h1>
            <CompanyCatalog companyJson={companies} />
        </div>
      </section>
    </main>
  );
}
