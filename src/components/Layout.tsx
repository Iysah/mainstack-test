import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Grid,
  Bell,
  MessageSquare,
  Settings,
  FileText,
  Share2,
  Bug,
  LogOut
} from 'lucide-react';
import { AnalyticsIcon, AppBarIcon, AppIcon, CRMIcon, HomeIcon, InvoiceIcon, LinkIcon, MainStackLogo, MenuIcon, RevenueIcon, StoreIcon } from '../assets/icons';
import { getUser, User } from '../services/api';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <aside className="fixed left-10 top-[250px] bottom-0 w-[50px] h-[200px] flex flex-col items-center py-2 gap-6 bg-white shadow-md rounded-full ">
        <nav className="flex flex-col items-center gap-2">
          <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#EFF1F6] transition-all">
            <LinkIcon />
          </a>
          <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#EFF1F6] transition-all">
            <AppBarIcon />
          </a>
          <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#EFF1F6] transition-all">
            <StoreIcon/>
          </a>
          <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#EFF1F6]  transition-all">
            <InvoiceIcon />
          </a>
        </nav>
      </aside>
      
      <header className="fixed top-10 left-[50px] right-10 bg-white shadow-md rounded-full Z-10">
        <div className="flex items-center justify-between px-8 py-4">
          <div className="text-2xl font-bold">
                <MainStackLogo />
          </div>
          <nav className="flex items-center gap-2">
            <a href="#" className="nav-link">
              <HomeIcon />
              Home
            </a>
            <a href="#" className="nav-link">
              <AnalyticsIcon />
              Analytics
            </a>
            <a href="#" className="nav-link active">
              <RevenueIcon />
              Revenue
            </a>
            <a href="#" className="nav-link">
              <CRMIcon size={20} />
              CRM
            </a>
            <a href="#" className="nav-link">
              <AppIcon size={20} />
              Apps
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <button>
                <Bell size={20} />
            </button>
            <button>
              <MessageSquare size={20} />
            </button>
            <div className="relative">
            <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-2 pr-4 bg-[#EFF1F6] rounded-full "
            >
                <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white">
                  {user ? `${user.first_name[0]}${user.last_name[0]}` : 'OJ'}
                </div>
                <MenuIcon />
            </button>
            {isProfileOpen && (
                <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-2 w-[360px] bg-white rounded-xl shadow-lg py-2"
                >
                <div className="px-4 pt-2">
                    <div className="flex items-center justify-start gap-4">
                        <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white">
                          {user ? `${user.first_name[0]}${user.last_name[0]}` : 'OJ'}
                        </div>
                        <div>
                            <div className="font-medium">{user ? `${user.first_name} ${user.last_name}` : 'Loading...'}</div>
                            <div className="text-sm text-gray-600">{user?.email || 'Loading...'}</div>
                        </div>
                    </div>
                </div>
                <div className="py-4">
                    <a href="#" className="flex items-center gap-2 px-4 py-6 hover:bg-gray-50">
                    <Settings size={16} />
                    Settings
                    </a>
                    <a href="#" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50">
                    <FileText size={16} />
                    Purchase History
                    </a>
                    <a href="#" className="flex items-center gap-2 px-4 py-6 hover:bg-gray-50">
                    <Share2 size={16} />
                    Refer and Earn
                    </a>
                    <a href="#" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50">
                    <Grid size={16} />
                    Integrations
                    </a>
                    <a href="#" className="flex items-center gap-2 px-4 py-6 hover:bg-gray-50">
                    <Bug size={16} />
                    Report Bug
                    </a>
                    <a href="#" className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50">
                    <LogOut size={16} />
                    Sign Out
                    </a>
                </div>
                </motion.div>
            )}
          </div>
          </div>
        </div>
      </header>

      <main className="pt-[200px] pl-[120px] pr-10">
        {children}
      </main>
      </div>
  );
};

export default Layout;