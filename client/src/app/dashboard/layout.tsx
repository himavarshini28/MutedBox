'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Home, 
  LayoutDashboard, 
  MessageCircle, 
  Bell, 
  Settings, 
  LogOut, 
  Menu, 
  ChevronLeft, 
  User, 
  X 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const sideNavItems = [
  { name: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard size={20} /> },
  { name: 'Feedbacks', href: '/dashboard/feedbacks', icon: <MessageCircle size={20} /> },
  { name: 'Notifications', href: '/dashboard/notifications', icon: <Bell size={20} /> },
  { name: 'Settings', href: '/dashboard/settings', icon: <Settings size={20} /> },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  // Sidebar animation variants
  const sidebarVariants = {
    expanded: { width: '240px' },
    collapsed: { width: '80px' },
  };

  // Mobile sidebar animation variants
  const mobileSidebarVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: '-100%', opacity: 0 },
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top navbar */}
      <header className="fixed top-0 left-0 right-0 h-16 z-40 bg-background/80 backdrop-blur-lg border-b border-white/5 flex items-center px-4">
        <div className="flex w-full max-w-7xl mx-auto justify-between items-center">
          <div className="flex items-center">
            {/* Mobile menu button */}
            <button 
              onClick={toggleMobileSidebar}
              className="mr-4 md:hidden p-1"
              aria-label="Toggle menu"
            >
              <Menu size={24} />
            </button>
            
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="bg-gradient-to-r from-primary to-secondary rounded-lg h-8 w-8 flex items-center justify-center mr-2">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="font-bold text-lg hidden sm:inline-block">MutedBox</span>
            </Link>
          </div>
          
          {/* User menu */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full bg-background-light/30">
              <Bell size={18} />
            </Button>
            
            <Button variant="ghost" size="icon" className="rounded-full bg-background-light/30">
              <Settings size={18} />
            </Button>
            
            <Button variant="ghost" size="sm" className="ml-2 flex items-center">
              <span className="w-8 h-8 rounded-full bg-background-light/90 flex items-center justify-center mr-2">
                <User size={16} />
              </span>
              <span className="hidden sm:inline-block">John Doe</span>
            </Button>
          </div>
        </div>
      </header>
      
      {/* Desktop Sidebar */}
      <motion.aside
        variants={sidebarVariants}
        initial="expanded"
        animate={sidebarCollapsed ? 'collapsed' : 'expanded'}
        transition={{ type: 'tween', duration: 0.3 }}
        className={`fixed top-16 left-0 bottom-0 z-30 bg-background-light/30 backdrop-blur-md border-r border-white/5 hidden md:block`}
      >
        {/* Collapse button */}
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-4 bg-background border border-white/10 rounded-full p-1"
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <ChevronLeft className={`h-4 w-4 transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`} />
        </button>
        
        <nav className="p-4 mt-2">
          <ul className="space-y-2">
            {sideNavItems.map((item) => (
              <li key={item.name}>
                <Link href={item.href}>
                  <div
                    className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                      pathname === item.href
                        ? 'bg-primary/10 text-primary'
                        : 'text-text-muted hover:bg-background-light hover:text-text'
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span className={`${sidebarCollapsed ? 'hidden' : 'block'} whitespace-nowrap`}>
                      {item.name}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
            <div className="mt-auto pt-8 border-t border-white/5">
            <Button
              variant="ghost"
              className={`w-full flex items-center justify-${sidebarCollapsed ? 'center' : 'start'} text-red-400 hover:text-red-300 hover:bg-red-500/10`}
            >
              <LogOut size={20} className="mr-3" />
              <span className={sidebarCollapsed ? 'hidden' : 'block'}>Logout</span>
            </Button>
          </div>
        </nav>
      </motion.aside>
      
      {/* Mobile Sidebar */}
      <motion.div
        variants={mobileSidebarVariants}
        initial="closed"
        animate={mobileSidebarOpen ? 'open' : 'closed'}
        transition={{ type: 'tween', duration: 0.3 }}
        className="fixed inset-0 z-50 md:hidden"
      >
        {/* Backdrop */}
        {mobileSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={toggleMobileSidebar}
          />
        )}
        
        {/* Sidebar */}
        <div className="absolute top-0 left-0 bottom-0 w-64 bg-background-light/90 backdrop-blur-lg border-r border-white/5">
          <div className="p-4 flex justify-between items-center border-b border-white/5">
            <Link href="/" className="flex items-center">
              <div className="bg-gradient-to-r from-primary to-secondary rounded-lg h-8 w-8 flex items-center justify-center mr-2">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="font-bold text-lg">MutedBox</span>
            </Link>
            <button
              onClick={toggleMobileSidebar}
              className="p-1"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>
          
          <nav className="p-4">
            <Link href="/" className="flex items-center px-3 py-2 rounded-md text-text-muted hover:bg-background-light hover:text-text mb-4">
              <Home size={20} className="mr-3" />
              <span>Back to Home</span>
            </Link>
            
            <ul className="space-y-2">
              {sideNavItems.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} onClick={toggleMobileSidebar}>
                    <div
                      className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                        pathname === item.href
                          ? 'bg-primary/10 text-primary'
                          : 'text-text-muted hover:bg-background-light hover:text-text'
                      }`}
                    >
                      <span className="mr-3">{item.icon}</span>
                      <span>{item.name}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
              <div className="mt-auto pt-8 border-t border-white/5">
              <div className="px-3 py-2 mb-4">
                <p className="text-text-muted text-sm">Signed in as</p>
                <p className="font-medium">John Doe</p>
              </div>
              
              <Button
                variant="ghost"
                className="w-full flex items-center justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10"
              >
                <LogOut size={20} className="mr-3" />
                <span>Logout</span>
              </Button>
            </div>
          </nav>
        </div>
      </motion.div>
      
      {/* Main content */}
      <main className={`flex-grow md:ml-${sidebarCollapsed ? '20' : '60'} transition-all duration-300`}>
        {children}
      </main>
    </div>
  );
}
