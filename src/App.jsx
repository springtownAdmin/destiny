import React from 'react';
import './App.css'
import ProductCart from './components/product-cart';
import Middleware from './components/middleware';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {

  return (

    <>
    
      <div className='relative w-full'>

        {/* <ProductCart /> */}
        <Middleware />

        <ToastContainer />
      </div>

    </>


  );

}