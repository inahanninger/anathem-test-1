
import React from 'react';
import { ClinicalLayout } from '@/components/ClinicalLayout';
import { Link, useLocation } from 'react-router-dom';
import { User, Sliders } from 'lucide-react';

interface SettingsLayoutProps {
  title: string;
  children: React.ReactNode;
}

const SettingsLayout: React.FC<SettingsLayoutProps> = ({
  title,
  children
}) => {
  const location = useLocation();
  const settingsNavItems = [{
    name: 'Profile',
    icon: User,
    path: '/settings'
  }, {
    name: 'Preferences',
    icon: Sliders,
    path: '/settings/preferences'
  }];

  return (
    <ClinicalLayout>
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-clinical-blue">{title}</h1>
          <p className="text-gray-600">Manage your settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Sidebar */}
          
          
          {/* Main content */}
          <div className="md:col-span-3">
            <div className="bg-transparent">
              {children}
            </div>
          </div>
        </div>
      </div>
    </ClinicalLayout>
  );
};

export default SettingsLayout;
