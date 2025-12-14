import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 max-w-[1280px] mx-auto transition-colors">
      {/* 1. Header luôn nằm trên cùng */}
      <Header />
      {/* 2. Main Content: Phần thay đổi giữa các trang */}
      <main className="flex-1 px-4 py-8">
        <Outlet />
      </main>

      {/* 3. Footer luôn nằm dưới cùng */}
      <Footer />
    </div>
  );
};

export default AppLayout;