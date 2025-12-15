import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
    DropdownMenu, 
    DropdownMenuTrigger, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuSeparator 
} from './ui/dropdown-menu';

const UsersTab = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!isAuthenticated) {
        return (
            <Link
                to="/login"
                className="text-sm font-medium text-gray-700 dark:text-gray-200  hover:text-[#774743] dark:hover:text-blue-400 underline decoration-1 underline-offset-2 transition-colors"
            >
                Đăng nhập
            </Link>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
                <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-700 rounded-full pl-1 pr-4 py-1 border hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors cursor-pointer">
                    <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-gray-500 text-white text-md font-bold flex items-center justify-center w-full h-full">
                            {user?.username ? user.username.slice(0, 2).toUpperCase() : "U"}
                        </AvatarFallback>
                    </Avatar>
                    {/* <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{user?.username}</span> */}
                </div>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                    <div className="font-extrabold text-base">{user?.username}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 font-normal">{user?.email || "....."}</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                <Link to="/profile">
                    <DropdownMenuItem className="cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                        Profile
                    </DropdownMenuItem>
                </Link>
                
                <Link to="/favourite">
                    <DropdownMenuItem className="cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                        Favourite movies
                    </DropdownMenuItem>
                </Link>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuItem onClick={handleLogout} className="text-red-600 dark:text-red-400 cursor-pointer focus:text-red-600 dark:focus:text-red-400 focus:bg-red-50 dark:focus:bg-red-900/20">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UsersTab;
