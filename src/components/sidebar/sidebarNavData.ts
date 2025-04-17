
import { Home, Plus, FileText, Calendar, Settings } from 'lucide-react';

export type NavSubItem = {
  name: string;
  path: string;
};

export type NavItem = {
  name: string;
  icon: React.ElementType;
  path: string;
  children?: NavSubItem[];
};

export const navItems: NavItem[] = [
  {
    name: 'Home',
    icon: Home,
    path: '/'
  }, 
  {
    name: 'New Session',
    icon: Plus,
    path: '/workflow/upload'
  }, 
  {
    name: 'Generate Assessment',
    icon: FileText,
    path: '/workflow/report'
  },
  {
    name: 'All Consultations',
    icon: Calendar,
    path: '/schedule'
  }, 
  {
    name: 'Settings',
    icon: Settings,
    path: '/settings',
    children: [
      {
        name: 'Profile',
        path: '/settings'
      },
      {
        name: 'Preferences',
        path: '/settings/preferences'
      }
    ]
  }
];
