
import React from 'react';
import { ClinicalSidebar } from './ClinicalSidebar';
import { MobileSidebarTrigger } from './MobileSidebarTrigger';
import { SidebarProvider } from '@/context/SidebarContext';

interface ClinicalLayoutProps {
  children: React.ReactNode;
}

export const ClinicalLayout: React.FC<ClinicalLayoutProps> = ({
  children
}) => {
  return <SidebarProvider>
      <div className="flex h-screen bg-gray-50">
        <ClinicalSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="md:hidden">
            <MobileSidebarTrigger />
          </div>
          <main className="flex-1 overflow-auto bg-white">
            {/* The patient name strip will be part of each page but sticky */}
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>;
};
