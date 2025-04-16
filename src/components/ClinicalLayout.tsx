
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
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-white">
        <ClinicalSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="md:hidden px-4 py-2 border-b border-gray-200">
            <MobileSidebarTrigger />
          </div>
          <main className="flex-1 overflow-auto bg-gray-50">
            <div className="">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
