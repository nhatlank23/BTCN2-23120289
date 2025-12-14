import { Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import Home from './pages/Home/Home.jsx';

function App() {
  return (
    <Routes>
      {/* Route cha sử dụng Layout */}
      <Route path="/" element={<AppLayout />}>
        
        {/* Route con: Trang chủ */}
        <Route index element={<Home />} />
        
        {/* Các route khác sẽ thêm sau: /login, /movie/:id */}
      </Route>
    </Routes>
  );
}

export default App;