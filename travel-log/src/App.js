import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Authentication from './pages/Authentication';
import Admin from './pages/Admin';
import Placeview from './components/Placeview';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Authentication/>} />
        <Route path="/register" element={<Authentication register={"register"}/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/placeview" element={<Placeview/>}/>
      </Routes>
    </>
  );
}

export default App;
