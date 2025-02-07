import React from 'react';
import Navbar from './Componants/Navbar';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Componants/HomePage';
import Footer from './Componants/Footer';
import KycPage from './Componants/KycPage';
import NotFound from './Componants/NotFound';


function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/kyc' element={<KycPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App;
