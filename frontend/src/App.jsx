import { useState } from 'react'
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

function App() {

  const [locale, setLocale] = useState("TR");
  const messages = translations[locale]

  return (
    <IntlProvider locale={locale} messages={messages}>
      <BrowserRouter>
        <Navbar langSelector={setLocale} />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<LoginForm/>}/>
          <Route path='/register' element={<RegisterForm locale={locale}/>}/>
          <Route path='/products' element={<Products/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/corporate' element={<Corporate/>}>
            <Route path=':about' element={<Corporate/>}/>
            <Route path=':privacy' element={<Corporate/>}/>
            <Route path=':contract' element={<Corporate/>}/>
            <Route path=':refund' element={<Corporate/>}/>
          </Route>
          <Route path='/product' element={<ProductPage/>}>
            <Route path=':productId' element={<ProductPage/>}/>
          </Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </IntlProvider>
  )
}

export default App
