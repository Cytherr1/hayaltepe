import { createContext, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { IntlProvider } from 'react-intl'
import translations from './Translations'
import Home from './pages/Home';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Products from './pages/Products';
import Contact from './pages/Contact';
import Corporate from './pages/Corporate';
import ProductPage from './pages/ProductPage';

export const Language = createContext();

function App() {

  const [locale, setLocale] = useState("TR");
  const [index, setIndex] = useState(0);
  const messages = translations[locale];

  return (
    <IntlProvider locale={locale} messages={messages}>
      <Language.Provider value={locale}>
        <BrowserRouter>
          <Navbar langSelector={setLocale} tabSetter={setIndex}/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<LoginForm/>}/>
            <Route path='/register' element={<RegisterForm locale={locale}/>}/>
            <Route path='/products' element={<Products/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/corporate' element={<Corporate index={index} tabSetter={setIndex}/>}>
              <Route path='about' element={<Corporate index={index} tabSetter={setIndex}/>}/>
              <Route path='privacy' element={<Corporate index={index} tabSetter={setIndex}/>}/>
              <Route path='contract' element={<Corporate index={index} tabSetter={setIndex}/>}/>
              <Route path='refund' element={<Corporate index={index} tabSetter={setIndex}/>}/>
            </Route>
            <Route path='/product' element={<ProductPage/>}>
              <Route path=':productId' element={<ProductPage/>}/>
            </Route>
          </Routes>
          <Footer tabSetter={setIndex}/>
        </BrowserRouter>
      </Language.Provider>
    </IntlProvider>
  )
}

export default App
