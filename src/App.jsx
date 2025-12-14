import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        
      </Routes>

    </div>
  );
}

export default App;