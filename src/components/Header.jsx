import Nav from './Nav';
import { useTheme } from '../context/ThemeContext';
import UsersTab from './UsersTab';
import ThemeToggle from './ThemeToggle';

const Header = () => {
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
                    <ThemeToggle />
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