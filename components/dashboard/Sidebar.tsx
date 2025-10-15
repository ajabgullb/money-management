"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Wallet, 
  TrendingUp, 
  PieChart, 
  CreditCard, 
  Target, 
  Settings, 
  HelpCircle, 
  ChevronLeft,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { setActiveTab } from '@/store/slices/dashboardSlice';
import { Tabs } from "@/store/slices/dashboardSlice"

const cn = (...classes: (string | undefined | false | null)[]) => {
  return classes.filter(Boolean).join(' ');
};

interface SidebarProps {
  className?: string;
  isCollapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ className, isCollapsed, onToggle }) => {
  const [activeItem, setActiveItem] = useState<Tabs>('overview');
  const dispatch = useDispatch()

  const menuItemClickHandler = (tab: Tabs) => {
    setActiveItem(tab)
    dispatch(setActiveTab({activeTab: tab}))
  }

  const menuItems: { id: Tabs; label: string; icon: React.ComponentType<any> }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'envelopes', label: 'Envelopes', icon: Wallet },
    { id: 'transactions', label: 'Transactions', icon: CreditCard },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'budgets', label: 'Budgets', icon: PieChart },
    { id: 'goals', label: 'Goals', icon: Target },
  ];

  const bottomItems = [
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help', icon: HelpCircle },
    { id: 'logout', label: 'Logout', icon: LogOut },
  ];

  const sidebarVariants = {
    expanded: { width: 280 },
    collapsed: { width: 80 }
  };

  const itemVariants = {
    expanded: { opacity: 1, x: 0 },
    collapsed: { opacity: 0, x: -10 }
  };

  return (
    <motion.div
      className={cn(
        "bg-white border-r border-gray-200 h-screen flex flex-col shadow-lg relative",
        className
      )}
      variants={sidebarVariants}
      animate={isCollapsed ? 'collapsed' : 'expanded'}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {/* Header */}
      <div className={`p-6 border-b border-gray-100`}>
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-3"
            animate={{ opacity: isCollapsed ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className={`w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center ${isCollapsed ? "hidden" : ""}`}>
              <Wallet className={`w-6 h-6 text-white`} />
            </div>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <h1 className="text-xl font-bold text-gray-800">EnvoMag</h1>
                  <p className="text-sm text-gray-500">Money Manager</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggle()}
            className={`h-8 w-8 p-0 hover:bg-green-50 cursor-pointer`}
          >
            <motion.div
              animate={{ rotate: isCollapsed ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronLeft className={`w-4 h-4 text-gray-600`} />
            </motion.div>
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-4">
        <nav className="px-3 space-y-1">
          {menuItems.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 h-12 px-3 font-medium transition-all duration-200 cursor-pointer",
                  activeItem === item.id
                    ? "bg-green-50 text-green-700 border-r-2 border-green-500"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                )}
                onClick={() => menuItemClickHandler(item.id)}
              >
                <item.icon className={cn(
                  "w-5 h-5 flex-shrink-0",
                  activeItem === item.id ? "text-green-600" : "text-gray-500"
                )} />
                
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      variants={itemVariants}
                      animate="expanded"
                      exit="collapsed"
                      transition={{ duration: 0.2 }}
                      className="truncate"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          ))}
        </nav>
      </div>

      {/* User Profile Section */}
      <div className="p-4 border-t border-gray-100">
        <motion.div 
          className={cn(
            "p-3 rounded-lg bg-gray-50"
          )}
        >
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                variants={itemVariants}
                animate="expanded"
                exit="collapsed"
                transition={{ duration: 0.2 }}
                className="flex-1 min-w-0"
              >
                <p className="text-sm font-medium text-gray-800 truncate">John Doe</p>
                <p className="text-xs text-gray-500 truncate">john@example.com</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Bottom Navigation */}
      <div className="p-3 space-y-1">
        {bottomItems.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 h-10 px-3 text-gray-600 hover:bg-gray-50 hover:text-gray-800 cursor-pointer",
                item.id === 'logout' && "text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer"
              )}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    variants={itemVariants}
                    animate="expanded"
                    exit="collapsed"
                    transition={{ duration: 0.2 }}
                    className="truncate"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Sidebar;