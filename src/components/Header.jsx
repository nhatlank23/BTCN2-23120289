import Nav from './Nav';
import { useTheme } from '../context/ThemeContext';
import UsersTab from './UsersTab';

const Header = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <header className="flex flex-col gap-2 w-full">
            {/* Dòng 1: Top Bar (Màu đỏ/nâu như đề bài) */}
            <div className="bg-[#F0DBDA] dark:bg-[#3d2b2a] text-[#774743] dark:text-[#e0c5c3] px-4 py-2 flex justify-between items-center border-2 border-[#AA8F96] dark:border-[#6b5855] rounded-md transition-colors">
                {/* Góc trái: MSSV */}
                <span className="text-md text-[#AA8F96] dark:text-[#c5a8a5] font-mono font-bold">23120289</span>

                {/* Giữa: Tên Web */}
                <h1 className="text-3xl font-bold tracking-wider">Movies Info</h1>

                {/* Góc phải: Toggle Dark Mode với Icon Settings/Moon */}

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={toggleTheme}
                            className={`cursor-pointer w-12 h-6 rounded-full relative transition-colors ${isDarkMode ? 'bg-blue-600' : 'bg-gray-300'
                                }`}
                        >
                            <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform shadow-md ${isDarkMode ? 'translate-x-6' : 'translate-x-0.5'
                                }`}></div>
                        </button>
                        {isDarkMode ? (
                            // Icon mặt trăng khi dark mode
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                            </svg>
                        ) : (
                            // Icon settings khi light mode
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        )}
                    </div>
                    {/* Bên phải: User menu */}
                    <UsersTab />
                </div>
               
            </div>

            {/* Dòng 2: Navigation & Search */}
            <Nav />
        </header>
    );
};

export default Header;