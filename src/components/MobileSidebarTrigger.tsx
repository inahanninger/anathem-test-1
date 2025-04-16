
import React from 'react';
import { Menu } from 'lucide-react';
import { useSidebar } from '@/context/SidebarContext';

export const MobileSidebarTrigger: React.FC = () => {
  const { toggleMobileSidebar } = useSidebar();

  return (
    <button 
      onClick={toggleMobileSidebar}
      className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-200 flex items-center justify-center"
      aria-label="Toggle sidebar"
    >
      <Menu size={24} />
    </button>
  );
};
