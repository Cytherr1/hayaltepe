// import required modules
import { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { IntlProvider } from "react-intl";

// import translations
import translations from "./Translations";

// import components
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// import pages
import Home from "./pages/Home";
import ProductManagement from "./pages/ProductManagement";
import UserManagement from "./pages/UserManagement";

export const Language = createContext();

function App() {
  const [locale, setLocale] = useState("TR");
  const [index, setIndex] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false); // State to track login status
  const messages = translations[locale];

  // Function to handle login
  const handleLogin = () => {
    // Implement your login logic here, and set loggedIn to true upon successful login
    setLoggedIn(true);
  };

  return (
    <IntlProvider locale={locale} messages={messages}>
      <Language.Provider value={locale}>
        <BrowserRouter>
          {loggedIn ? (
            <>
              <Navbar langSelector={setLocale} tabSetter={setIndex} />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/productmanagement"
                  element={<ProductManagement />}
                />
                <Route path="/usermanagement" element={<UserManagement />} />
              </Routes>
              <Footer tabSetter={setIndex} />
            </>
          ) : (
            <LoginForm onLogin={handleLogin} />
          )}
        </BrowserRouter>
      </Language.Provider>
    </IntlProvider>
  );
}

export default App;
