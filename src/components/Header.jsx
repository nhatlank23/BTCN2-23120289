import { Moon } from 'lucide-react';
import Nav from './Nav';

const Header = () => {
    return (
        <header className="flex flex-col gap-2 w-full">
            {/* Dòng 1: Top Bar (Màu đỏ/nâu như đề bài) */}
            <div className="bg-[#F0DBDA] text-[#774743] px-4 py-2 flex justify-between items-center border-2 border-[#AA8F96] rounded-md">
                {/* Góc trái: MSSV */}
                <span className="text-md text-[#AA8F96] font-mono font-bold">23120289</span>

                {/* Giữa: Tên Web */}
                <h1 className="text-lg font-bold tracking-wider">Movies Info</h1>

                {/* Góc phải: Nút Dark Mode (Tạm chưa xử lý) */}
                <button className="p-1 rounded hover:bg-white/20">
                    <Moon size={20} />
                </button>
            </div>

            {/* Dòng 2: Navigation & Search */}
            <Nav />
        </header>
    );
};

export default Header;