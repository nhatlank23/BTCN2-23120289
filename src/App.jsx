import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';

// Lazy load components
const Home = lazy(() => import('./pages/Home/Home.jsx'));
const Search = lazy(() => import('./pages/Search/Search.jsx'));
const MovieDetail = lazy(() => import('./pages/MovieDetail/MovieDetail.jsx'));
const PersonDetail = lazy(() => import('./pages/PersonDetail/PersonDetail.jsx'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="text-center space-y-4">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 dark:border-blue-400 mx-auto"></div>
      <p className="text-xl text-gray-600 dark:text-gray-400 font-medium">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Route cha sử dụng Layout */}
        <Route path="/" element={<AppLayout />}>
          
          {/* Route con: Trang chủ */}
          <Route index element={<Home />} />
          
          {/* Route tìm kiếm */}
          <Route path="/search" element={<Search />} />
          
          {/* Route chi tiết phim */}
          <Route path="/movie/:id" element={<MovieDetail />} />
          
          {/* Route chi tiết người */}
          <Route path="/person/:id" element={<PersonDetail />} />

          {/* Các route khác sẽ thêm sau: /login */}
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;