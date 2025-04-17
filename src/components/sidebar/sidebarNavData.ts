
import { Home, Plus, Calendar, Settings, User, FileText, Clipboard, Upload, FileInput, Mic } from 'lucide-react';

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
    name: 'Dashboard',
    icon: Home,
    path: '/'
  }, 
  {
    name: 'New Report',
    icon: Plus,
    path: '/workflow/upload'
  }, 
  {
    name: 'Workflow',
    icon: Clipboard,
    path: '/workflow',
    children: [
      {
        name: 'Upload Documents',
        path: '/workflow/upload'
      },
      {
        name: 'Review Information',
        path: '/workflow/review'
      },
      {
        name: 'Transcribe',
        path: '/workflow/transcribe'
      }
    ]
  },
  {
    name: 'Schedule',
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
