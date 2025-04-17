
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarUserProfileProps {
  isExpanded?: boolean;
}

export const SidebarUserProfile: React.FC<SidebarUserProfileProps> = ({ isExpanded }) => {
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
        duration: 0.2,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <div className="px-3 py-4 border-t border-gray-200">
      <div className="flex items-center">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-medium">
          JD
        </div>
        {isExpanded !== undefined ? (
          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div 
                className="ml-3" 
                variants={textVariants} 
                initial="hidden" 
                animate="visible" 
                exit="hidden"
              >
                <p className="text-sm font-medium text-gray-800">John Doe</p>
                <p className="text-xs text-gray-500">Doctor</p>
              </motion.div>
            )}
          </AnimatePresence>
        ) : (
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-800">John Doe</p>
            <p className="text-xs text-gray-500">Doctor</p>
          </div>
        )}
      </div>
    </div>
  );
};
