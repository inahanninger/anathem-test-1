import React from 'react';
import { ClinicalLayout } from '@/components/ClinicalLayout';

const HomePage = () => {
  return (
    <ClinicalLayout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        {/* Rest of homepage content */}
      </div>
    </ClinicalLayout>
  );
};

export default HomePage;
