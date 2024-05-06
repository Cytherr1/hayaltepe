import { createContext, useState, useEffect} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { IntlProvider } from 'react-intl'
import { useMediaQuery } from '@chakra-ui/react';
import translations from './Translations'
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Products from './pages/Products';
import Contact from './pages/Contact';
import Corporate from './pages/Corporate';
import NavbarMobile from './components/NavbarMobile';
import FooterMobile from './components/FooterMobile';

export const Language = createContext();

function App() {

  const [locale, setLocale] = useState(window.localStorage.getItem('locale') ? window.localStorage.getItem('locale') : "TR");
  const langChange = (lan) => {
    window.localStorage.setItem('locale', lan);
    setLocale(window.localStorage.getItem('locale'));
  }

  const [index, setIndex] = useState(0);
  const messages = translations[locale];
  const [isMobile] = useMediaQuery("(max-width: 768px)")

  return (
    <IntlProvider locale={locale} messages={messages}>
      <Language.Provider value={locale}>
        <BrowserRouter>
          {isMobile ? <NavbarMobile langSelector={langChange} tabSetter={setIndex}/> : <Navbar langSelector={langChange} tabSetter={setIndex}/>}
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/register' element={<RegisterPage locale={locale}/>}/>
            <Route path='/products' element={<Products/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/corporate' element={<Corporate index={index} tabSetter={setIndex}/>}>
              <Route path='about' element={<Corporate index={index} tabSetter={setIndex}/>}/>
              <Route path='privacy' element={<Corporate index={index} tabSetter={setIndex}/>}/>
            </Route>
          </Routes>
          {isMobile ? <FooterMobile tabSetter={setIndex}/> :<Footer tabSetter={setIndex}/>}
        </BrowserRouter>
      </Language.Provider>
    </IntlProvider>
  )
}

export default App
