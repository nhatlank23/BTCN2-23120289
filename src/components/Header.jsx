// src/components/Header.jsx
import { Link } from 'react-router-dom';
import { Search, Moon, Sun } from 'lucide-react'; // Icon từ shadcn/lucide

const Header = () => {

  return (
    <header className="flex flex-col shadow-md">
      {/* Tầng 1: Thông tin sinh viên & Dark mode */}
      <div className="bg-red-900 text-white px-4 py-2 flex justify-between items-center">
        <span className="text-sm font-mono">[MSSV CỦA BẠN]</span>
        <h1 className="text-lg font-bold uppercase">Movies Info</h1>
        
        {/* Nút đổi màu */}
        <button 
          className="p-1 rounded hover:bg-white/20"
        >
        </button>
      </div>

      {/* Tầng 2: Nav & Search */}
      <div className="bg-background border-b px-4 py-3 flex gap-4 items-center">
        <Link to="/" className="p-2 bg-gray-200 dark:bg-gray-800 rounded">
          <span className="font-bold">🏠 Home</span>
        </Link>
        
        <div className="flex-1 flex gap-2">
          <input 
            type="text" 
            placeholder="Search movie..." 
            className="flex-1 border px-3 py-2 rounded-md dark:bg-gray-900"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
            <Search size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;