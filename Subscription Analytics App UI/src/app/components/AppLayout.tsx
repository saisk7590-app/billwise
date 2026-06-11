import { ReactNode, useState, useEffect } from 'react';
import { DrawerNav } from './DrawerNav';

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const handleToggleDrawer = () => {
      setIsDrawerOpen(prev => !prev);
    };

    window.addEventListener('toggleDrawer', handleToggleDrawer);
    return () => window.removeEventListener('toggleDrawer', handleToggleDrawer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <DrawerNav isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      {children}
    </div>
  );
}
