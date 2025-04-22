
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface NavSubItem {
  name: string;
  path: string;
}

interface SidebarNavItemProps {
  name: string;
  icon: React.ElementType;
  path: string;
  children?: NavSubItem[];
  isExpanded: boolean;
  expandedSubmenus: Record<string, boolean>;
  toggleSubmenu: (itemName: string) => void;
  onMobileClick?: () => void;
}

export const SidebarNavItem: React.FC<SidebarNavItemProps> = ({
  name,
  icon: Icon,
  path,
  children,
  isExpanded,
  expandedSubmenus,
  toggleSubmenu,
  onMobileClick,
}) => {
  const location = useLocation();
  const isActive = location.pathname === path || 
                (children && children.some(child => location.pathname === child.path));
  const hasChildren = children && children.length > 0;
  const isSubmenuExpanded = expandedSubmenus[name];

  // Variants for framer-motion animations
  const textVariants = {
    visible: {
      opacity: 1,
      x: 0,
      display: 'block',
      transition: {
        duration: 0.2,
        ease: 'easeInOut'
      }
    },
    hidden: {
      opacity: 0,
      x: -10,
      transitionEnd: {
        display: 'none'
      },
      transition: {
        duration:.2,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <div className="flex flex-col">
      {hasChildren ? (
        <button 
          onClick={() => toggleSubmenu(name)}
          className={`flex items-center justify-between px-3 py-2 rounded-md ${isActive ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover-bg-blue-100'} transition-colors duration-200 w-full`}
        >
          <div className="flex items-center">
            <Icon size={20} className={isActive ? 'text-blue-800' : 'text-gray-600'} />
            {isExpanded !== undefined && (
              <AnimatePresence initial={false}>
                <motion.span 
                  variants={textVariants} 
                  initial="hidden" 
                  animate={isExpanded ? 'visible' : 'hidden'} 
                  className="ml-3 whitespace-nowrap text-sm font-normal"
                >
                  {name}
                </motion.span>
              </AnimatePresence>
            )}
            {isExpanded === undefined && (
              <span className="ml-3">{name}</span>
            )}
          </div>
          {(isExpanded === undefined || isExpanded) && hasChildren && (
            isSubmenuExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />
          )}
        </button>
      ) : (
        <Link
          to={path}
          className={`flex items-center px-3 py-2 rounded-md ${isActive ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover-bg-blue-100'} transition-colors duration-200`}
          onClick={onMobileClick}
        >
          <Icon size={20} className={isActive ? 'text-blue-800' : 'text-gray-600'} />
          {isExpanded !== undefined && (
            <AnimatePresence initial={false}>
              <motion.span 
                variants={textVariants} 
                initial="hidden" 
                animate={isExpanded ? 'visible' : 'hidden'} 
                className="ml-3 whitespace-nowrap text-sm font-normal"
              >
                {name}
              </motion.span>
            </AnimatePresence>
          )}
          {isExpanded === undefined && (
            <span className="ml-3">{name}</span>
          )}
        </Link>
      )}
      
      {/* Submenu items */}
      {hasChildren && isSubmenuExpanded && (isExpanded === undefined || isExpanded) && (
        <div className="ml-7 mt-1 space-y-1">
          {children?.map((subItem) => {
            const isSubActive = location.pathname === subItem.path;
            return (
              <Link
                key={subItem.name}
                to={subItem.path}
                className={`flex items-center px-3 py-1.5 text-xs rounded-md ${isSubActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover-bg-blue-100'} transition-colors duration-200`}
                onClick={onMobileClick}
              >
                {subItem.name}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};
