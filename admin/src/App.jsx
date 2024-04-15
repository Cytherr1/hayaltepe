// import required modules
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import components
import LoginForm from "./pages/LoginForm";
import Navbar from "./components/Navbar";

// import pages
import Home from "./pages/Home";
import ProductManagement from "./pages/ProductManagement";
import UserManagement from "./pages/UserManagement";

function App() {

  return (
    <BrowserRouter>
      { !localStorage.getItem('auth-token') && <Navigate to='/loginform'/> }
      { localStorage.getItem('auth-token') && <Navbar/>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loginform" element={<LoginForm/>} />
        <Route path="/productmanagement" element={<ProductManagement />} />
        <Route path="/usermanagement" element={<UserManagement />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
