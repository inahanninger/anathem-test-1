
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { NavItem } from './sidebarNavData';
import { SidebarNavItem } from './SidebarNavItem';
import { SidebarUserProfile } from './SidebarUserProfile';

interface MobileSidebarProps {
  navItems: NavItem[];
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
  expandedSubmenus: Record<string, boolean>;
  toggleSubmenu: (itemName: string) => void;
}

export const MobileSidebar: React.FC<MobileSidebarProps> = ({
  navItems,
  isMobileOpen,
  setIsMobileOpen,
  expandedSubmenus,
  toggleSubmenu
}) => {
  return (
    <AnimatePresence>
      {isMobileOpen && (
        <>
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={() => setIsMobileOpen(false)} 
          />
          <motion.div 
            className="fixed inset-y-0 left-0 w-64 bg-neutral-100 z-40 flex flex-col h-full" 
            initial={{ x: '-100%' }} 
            animate={{ x: 0 }} 
            exit={{ x: '-100%' }} 
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
              <h1 className="text-xl font-semibold text-blue-800">MediAssist</h1>
              <button 
                onClick={() => setIsMobileOpen(false)} 
                className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-200"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col flex-1 py-6">
              <nav className="flex-1 space-y-2 px-3">
                {navItems.map(item => (
                  <SidebarNavItem
                    key={item.name}
                    name={item.name}
                    icon={item.icon}
                    path={item.path}
                    children={item.children}
                    isExpanded={undefined} // Mobile sidebar doesn't need this prop
                    expandedSubmenus={expandedSubmenus}
                    toggleSubmenu={toggleSubmenu}
                    onMobileClick={() => setIsMobileOpen(false)}
                  />
                ))}
              </nav>
            </div>

            <SidebarUserProfile />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
