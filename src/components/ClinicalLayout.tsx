
import React from 'react';
import { ClinicalSidebar } from './ClinicalSidebar';
import { MobileSidebarTrigger } from './MobileSidebarTrigger';
import { SidebarProvider } from '@/context/SidebarContext';

interface ClinicalLayoutProps {
  children: React.ReactNode;
}

export const ClinicalLayout: React.FC<ClinicalLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-white">
        <ClinicalSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="h-16 bg-white border-b border-gray-200 flex items-center px-4 md:px-6">
            <MobileSidebarTrigger />
            <div className="ml-4 md:ml-0">
              <h1 className="text-xl font-medium text-gray-900">Medical Reports</h1>
            </div>
          </header>
          <main className="flex-1 overflow-auto bg-gray-50">
            <div className="container mx-auto py-6 px-4 md:px-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
