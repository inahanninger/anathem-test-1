
import React from 'react';
import { motion } from 'framer-motion';
import { NavItem } from './sidebarNavData';
import { SidebarNavItem } from './SidebarNavItem';
import { SidebarUserProfile } from './SidebarUserProfile';

interface DesktopSidebarProps {
  navItems: NavItem[];
  isExpanded: boolean;
  expandedSubmenus: Record<string, boolean>;
  toggleSubmenu: (itemName: string) => void;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
}

export const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  navItems,
  isExpanded,
  expandedSubmenus,
  toggleSubmenu,
  handleMouseEnter,
  handleMouseLeave
}) => {
  // Variants for framer-motion animations
  const sidebarVariants = {
    expanded: {
      width: '240px',
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    },
    collapsed: {
      width: '72px',
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <motion.div 
      initial="collapsed" 
      animate={isExpanded ? 'expanded' : 'collapsed'} 
      variants={sidebarVariants} 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave} 
      className="hidden md:flex flex-col h-screen border-r border-gray-200 overflow-hidden bg-neutral-50"
    >
      <div className="flex flex-col flex-1 py-6">
        <nav className="flex-1 space-y-2 px-3">
          {navItems.map(item => (
            <SidebarNavItem
              key={item.name}
              name={item.name}
              icon={item.icon}
              path={item.path}
              children={item.children}
              isExpanded={isExpanded}
              expandedSubmenus={expandedSubmenus}
              toggleSubmenu={toggleSubmenu}
            />
          ))}
        </nav>
      </div>

      <SidebarUserProfile isExpanded={isExpanded} />
    </motion.div>
  );
};
