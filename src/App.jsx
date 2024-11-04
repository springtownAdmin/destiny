import React from 'react';
import { HeroProduct, Header, Ingridients, ProductAd } from './components/common';
import { TopReviews, RewardsBenefits, Footer } from './components/common';
import './App.css'
import ProductCart from './components/product-cart';
import Middleware from './components/middleware';

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

        {/* <ProductCart /> */}
        <Middleware />

      </div>

    </>


  );

}