
import React from 'react';
import { useSidebar } from '@/context/SidebarContext';
import { navItems } from './sidebar/sidebarNavData';
import { DesktopSidebar } from './sidebar/DesktopSidebar';
import { MobileSidebar } from './sidebar/MobileSidebar';

export const ClinicalSidebar: React.FC = () => {
  const {
    isExpanded,
    setIsExpanded,
    isMobileOpen,
    setIsMobileOpen
  } = useSidebar();
  
  const [expandedSubmenus, setExpandedSubmenus] = React.useState<Record<string, boolean>>({
    Settings: true // Start with Settings submenu expanded
  });

  // Toggle submenu
  const toggleSubmenu = (itemName: string) => {
    setExpandedSubmenus(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };

  // Handle desktop sidebar hover
  const handleMouseEnter = () => {
    setIsExpanded(true);
  };
  
  const handleMouseLeave = () => {
    setIsExpanded(false);
  };

  return (
    <>
      <DesktopSidebar 
        navItems={navItems}
        isExpanded={isExpanded}
        expandedSubmenus={expandedSubmenus}
        toggleSubmenu={toggleSubmenu}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />
      
      <MobileSidebar
        navItems={navItems}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        expandedSubmenus={expandedSubmenus}
        toggleSubmenu={toggleSubmenu}
      />
    </>
  );
};
