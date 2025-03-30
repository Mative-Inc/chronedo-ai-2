import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";
import { 
    HomeIcon,
    ClipboardDocumentListIcon,
    Cog6ToothIcon,
    ArrowLeftOnRectangleIcon,
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
    Bars3Icon
} from "@heroicons/react/24/outline";
import { useUser } from "@/context/UserContext";
import { toast } from "react-toastify";


const menuItems = [
    { name: 'Home', icon: HomeIcon, href: '/dashboard', color: 'hover:bg-[#0066FF]' },
    { name: 'My Credits', icon: ClipboardDocumentListIcon, href: '/dashboard/subscriptions', color: 'hover:bg-[#0066FF]' },
    { name: 'Settings', icon: Cog6ToothIcon, href: '/dashboard/settings', color: 'hover:bg-[#0066FF]' },
    { name: 'Contact', icon: ClipboardDocumentListIcon, href: '/dashboard/contact', color: 'hover:bg-[#0066FF]' },
];

const Sidebar = () => {
    const { isOpen, toggleSidebar } = useSidebar();
    const pathname = usePathname();
    const { user, logout } = useUser();

    const handleLogout = () => {
        toast.info('Logging out...', { duration: 1000 });
        
        logout();
        // toast.success('Logged out successfully!', { duration: 2000 });
    }

    

    return (<>
        <aside 
        className={`fixed w-0 hidden md:block left-0 top-0 h-screen bg-[#217DFE0F] border-r border-[#0093E87D] transition-all duration-300 ease-in-out z-50 ${
            isOpen ? "w-64" : "w-16"
        }`}
        >
            <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-end p-4">
                    
                    <button 
                        onClick={toggleSidebar}
                        className="p-1.5 rounded-lg hover:bg-[#0066FF]/10 transition-colors"
                        aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
                    >
                        {isOpen ? (
                            <ChevronDoubleLeftIcon className="w-5 h-5 text-gray-400" />
                        ) : (
                            <ChevronDoubleRightIcon className="w-5 h-5 text-gray-400" />
                        )}
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 py-4 space-y-1">
                    <img src="/Chronedo_AI.png" alt="Logo" width={220} height={120} className={`mx-auto -mt-4 mb-4 ${isOpen ? "block" : "hidden"}`}/>

                    {/* Menu Items */}
                    <div className="space-y-1">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 
                                        ${isActive ? 'bg-gradient-to-r from-[#21ABFD] to-[#0055DE]' : item.color} group relative
                                        ${!isOpen && 'justify-center'}
                                    `}
                                >
                                    <item.icon className={`w-5 h-5 transition-transform ${
                                        !isOpen && 'group-hover:scale-110'
                                    } ${isActive ? 'text-white' : 'text-gray-400'}`} />
                                    <span className={`whitespace-nowrap transition-all duration-300 ${
                                        !isOpen ? 'w-0 opacity-0 hidden' : 'w-auto opacity-100'
                                    } ${isActive ? 'text-white' : 'text-gray-400'}`}>
                                        {item.name}
                                    </span>
                                    
                                    {/* Tooltip for collapsed state */}
                                    {!isOpen && (
                                        <div className="absolute left-full ml-2 px-2 py-1 bg-blue-500 text-white text-sm 
                                            rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap
                                            border border-gray-800 z-50">
                                            {item.name}
                                        </div>
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Divider */}
                    <div className="my-2 w-full h-[1px] bg-gray-800"></div>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 
                            hover:bg-red-500/10 group relative
                            ${!isOpen && 'justify-center'}
                        `}
                    >
                        <ArrowLeftOnRectangleIcon className="w-5 h-5 text-gray-400 group-hover:text-red-500" />
                        <span className={`whitespace-nowrap transition-all duration-300 text-gray-400 group-hover:text-red-500 ${
                            !isOpen ? 'w-0 opacity-0 hidden' : 'w-auto opacity-100'
                        }`}>
                            Logout
                        </span>
                        
                        {!isOpen && (
                            <div className="absolute left-full ml-2 px-2 py-1 bg-[#0A0A0A] text-white text-sm 
                                rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap
                                border border-gray-800 z-50">
                                Logout
                            </div>
                        )}
                    </button>
                </nav>
            </div>
        </aside>

        

        </>
    );
};

export default Sidebar;
