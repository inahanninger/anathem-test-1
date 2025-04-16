
import React from 'react';
import { ClinicalLayout } from '@/components/ClinicalLayout';
import { Link, useLocation } from 'react-router-dom';
import { User, Sliders } from 'lucide-react';

interface SettingsLayoutProps {
  title: string;
  children: React.ReactNode;
}

const SettingsLayout: React.FC<SettingsLayoutProps> = ({ title, children }) => {
  const location = useLocation();
  
  const settingsNavItems = [
    { name: 'Profile', icon: User, path: '/settings' },
    { name: 'Preferences', icon: Sliders, path: '/settings/preferences' },
  ];

  return (
    <ClinicalLayout>
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-blue-800">{title}</h1>
          <p className="text-gray-600">Manage your settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <nav className="space-y-1 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              {settingsNavItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center px-3 py-2 rounded-md text-sm ${
                      isActive 
                        ? 'bg-blue-100 text-blue-800 font-medium' 
                        : 'text-gray-700 hover:bg-gray-100'
                    } transition-colors duration-200`}
                  >
                    <Icon size={18} className="mr-2" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          
          {/* Main content */}
          <div className="md:col-span-3">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              {children}
            </div>
          </div>
        </div>
      </div>
    </ClinicalLayout>
  );
};

export default SettingsLayout;
