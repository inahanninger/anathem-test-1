import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Plus, Calendar, Settings, X } from 'lucide-react';
import { useSidebar } from '@/context/SidebarContext';
type NavItem = {
  name: string;
  icon: React.ElementType;
  path: string;
};
const navItems: NavItem[] = [{
  name: 'Dashboard',
  icon: Home,
  path: '/'
}, {
  name: 'New Report',
  icon: Plus,
  path: '/workflow/upload'
}, {
  name: 'Schedule',
  icon: Calendar,
  path: '/schedule'
}, {
  name: 'Settings',
  icon: Settings,
  path: '/settings'
}];
export const ClinicalSidebar: React.FC = () => {
  const location = useLocation();
  const {
    isExpanded,
    setIsExpanded,
    isMobileOpen,
    setIsMobileOpen
  } = useSidebar();

  // Handle desktop sidebar hover
  const handleMouseEnter = () => {
    setIsExpanded(true);
  };
  const handleMouseLeave = () => {
    setIsExpanded(false);
  };

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
        duration: 0.2,
        ease: 'easeInOut'
      }
    }
  };
  const logoVariants = {
    expanded: {
      opacity: 1,
      scale: 1
    },
    collapsed: {
      opacity: 0,
      scale: 0.8
    }
  };
  const iconVariants = {
    expanded: {
      opacity: 0,
      scale: 0.8
    },
    collapsed: {
      opacity: 1,
      scale: 1
    }
  };

  // Desktop sidebar
  const DesktopSidebar = <motion.div initial="collapsed" animate={isExpanded ? 'expanded' : 'collapsed'} variants={sidebarVariants} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="hidden md:flex flex-col h-screen border-r border-gray-200 overflow-hidden bg-neutral-50">
      <div className="flex items-center justify-left h-16 px-4">
        <motion.div className="w-full" variants={logoVariants} initial="collapsed" animate={isExpanded ? 'expanded' : 'collapsed'}>
          
        </motion.div>
        
        <motion.div className="absolute" variants={iconVariants} initial="expanded" animate={isExpanded ? 'collapsed' : 'expanded'}>
          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-800 text-white font-bold">A</span>
        </motion.div>
      </div>

      <div className="flex flex-col flex-1 py-6">
        <nav className="flex-1 space-y-2 px-3">
          {navItems.map(item => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return <Link key={item.name} to={item.path} className={`flex items-center px-3 py-2 rounded-md ${isActive ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover:bg-gray-200'} transition-colors duration-200`}>
                <Icon size={20} className={isActive ? 'text-blue-800' : 'text-gray-600'} />
                <AnimatePresence initial={false}>
                  <motion.span className="ml-3 whitespace-nowrap" variants={textVariants} initial="hidden" animate={isExpanded ? 'visible' : 'hidden'}>
                    {item.name}
                  </motion.span>
                </AnimatePresence>
              </Link>;
        })}
        </nav>
      </div>

      <div className="px-3 py-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-medium">
            JD
          </div>
          <AnimatePresence initial={false}>
            {isExpanded && <motion.div className="ml-3" variants={textVariants} initial="hidden" animate="visible" exit="hidden">
                <p className="text-sm font-medium text-gray-800">John Doe</p>
                <p className="text-xs text-gray-500">Doctor</p>
              </motion.div>}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>;

  // Mobile sidebar
  const MobileSidebar = <AnimatePresence>
      {isMobileOpen && <>
          <motion.div className="fixed inset-0 bg-black bg-opacity-50 z-30" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} onClick={() => setIsMobileOpen(false)} />
          <motion.div className="fixed inset-y-0 left-0 w-64 bg-neutral-100 z-40 flex flex-col h-full" initial={{
        x: '-100%'
      }} animate={{
        x: 0
      }} exit={{
        x: '-100%'
      }} transition={{
        duration: 0.3,
        ease: 'easeInOut'
      }}>
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
              <h1 className="text-xl font-semibold text-blue-800">MediAssist</h1>
              <button onClick={() => setIsMobileOpen(false)} className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-200">
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col flex-1 py-6">
              <nav className="flex-1 space-y-2 px-3">
                {navItems.map(item => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return <Link key={item.name} to={item.path} className={`flex items-center px-3 py-2 rounded-md ${isActive ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover:bg-gray-200'} transition-colors duration-200`} onClick={() => setIsMobileOpen(false)}>
                      <Icon size={20} className={isActive ? 'text-blue-800' : 'text-gray-600'} />
                      <span className="ml-3">{item.name}</span>
                    </Link>;
            })}
              </nav>
            </div>

            <div className="px-3 py-4 border-t border-gray-200">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-medium">
                  JD
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-800">John Doe</p>
                  <p className="text-xs text-gray-500">Doctor</p>
                </div>
              </div>
            </div>
          </motion.div>
        </>}
    </AnimatePresence>;
  return <>
      {DesktopSidebar}
      {MobileSidebar}
    </>;
};