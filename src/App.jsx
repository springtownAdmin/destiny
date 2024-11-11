import React from 'react';
import { HeroProduct, Header, Ingridients, ProductAd } from './components/common';
import { TopReviews, RewardsBenefits, Footer } from './components/common';
import './App.css'
import ProductCart from './components/product-cart';
import Middleware from './components/middleware';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createStorefrontClient } from '@shopify/hydrogen-react';

// export const client = createStorefrontClient({
//   // load environment variables according to your framework and runtime
//   storeDomain: process.env.VITE_DOMAIN,
//   publicStorefrontToken: process.env.VITE_ACCESS_TOKEN,
// });

const Extra = () => {

  return (
    <>
        <Header />

        <div className='pt-[80px] container mx-auto px-4'>

          <HeroProduct />

          <Ingridients />

          <ProductAd />

          <TopReviews />

          <RewardsBenefits />
          
        </div>

        <Footer />
    </>
  )
}

export default function App() {

  return (

    <>
    
      <div className='relative w-full'>

        <ProductCart />
        {/* <Middleware /> */}

        <ToastContainer />
      </div>

    </>


  );

}