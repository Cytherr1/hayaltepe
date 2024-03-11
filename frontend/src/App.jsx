import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { IntlProvider } from 'react-intl'
import translations from './Translations'
import Home from './pages/Home';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

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
        </Routes>
        <Footer/>
      </BrowserRouter>
    </IntlProvider>
  )
}

export default App
