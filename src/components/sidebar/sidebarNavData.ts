
import { Home, Plus, FileText, Calendar, Settings, HelpCircle } from 'lucide-react';

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
    path: '/transcribe'  // Changed from /workflow/upload to /transcribe
  }, 
  {
    name: 'Generate Assessment',
    icon: FileText,
    path: '/workflow/upload'  // This is already correct
  },
  {
    name: 'All Consultations',
    icon: Calendar,
    path: '/consultations'  // Changed from /schedule to /consultations
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
  },
  {
    name: 'Help & Support',
    icon: HelpCircle,
    path: '/help-support'
  }
];
