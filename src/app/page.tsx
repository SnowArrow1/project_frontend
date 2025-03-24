// src/app/page.tsx
import React from 'react';
import Banner from '@/components/Banner';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Banner />
      <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl text-gray-800 font-semibold text-center mb-4">Welcome to Career Connect</h2>
        <p className="text-center text-gray-800 mb-6">
          Visit our <a href="/company" className="text-blue-600 hover:underline">companies page</a> to explore job opportunities and potential employers.
        </p>
      </div>
      </section>
      <Footer />
    </main>
  );
}
