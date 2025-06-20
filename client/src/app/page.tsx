'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CreateFeedbackForm from '@/components/CreateFeedbackForm';
import FeatureSection from '@/components/FeatureSection';
import HowItWorks from '@/components/HowItWorks';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      
      <div className="container mx-auto px-4 py-8 flex-grow">
        <section className="text-center mb-12 py-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Anonymous Feedback Made Simple
          </h1>
          <p className="text-xl mb-8 text-text-muted max-w-3xl mx-auto">
            Create a unique link, share it, and collect honest feedback without 
            revealing who said what. No signup required.
          </p>
          
          <CreateFeedbackForm />
        </section>
        
        <FeatureSection />
        
        <HowItWorks />
      </div>
      
      <Footer />
    </main>
  );
}
