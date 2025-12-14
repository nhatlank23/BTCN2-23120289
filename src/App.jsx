import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';

function App() {
  return ( 
      <div className="w-[1280px] min-h-screen bg-blue-500 text-foreground mx-auto">

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        
      </Routes>

    </div>
  );
}

export default App;