import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Nav = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <div className="bg-[#D3E1FC] dark:bg-[#1e3a5f] border-b px-4 py-1 flex gap-4 items-center justify-between border-2 border-[#C3CFE8] dark:border-[#2d4a6b] rounded-md transition-colors">
            {/* Bên trái: Nút Home */}
            <div className="flex items-center gap-4">
                <Link to="/" className="p-1.5 rounded transition ">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                    >
                        <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                        <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                    </svg>
                </Link>
            </div>

            {/* Bên phải: Thanh tìm kiếm */}
            <form onSubmit={handleSearch} className="flex justify-end gap-2 w-full max-w-md">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search"
                    className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 px-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 placeholder-gray-400 dark:placeholder-gray-500"
                />
                <button 
                    type="submit"
                    className="text-gray-700 dark:text-gray-200 px-4 py-1 rounded-md hover:bg-gray-600 hover:text-white dark:hover:bg-gray-600 font-medium border-2 border-gray-500 dark:border-gray-600 transition-colors"
                >
                    Search
                </button>
            </form>
        </div>
    );
};

export default Nav;
