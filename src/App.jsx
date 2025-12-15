import { Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import Home from './pages/Home/Home.jsx';
import Search from './pages/Search/Search.jsx';
import MovieDetail from './pages/MovieDetail/MovieDetail.jsx';
import PersonDetail from './pages/PersonDetail/PersonDetail.jsx';

function App() {
  return (
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
  );
}

export default App;