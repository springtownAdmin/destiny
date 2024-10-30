import React from 'react';
import prodImg from '/images/main-product.webp'

const ProductAd = () => {

  return (
    <div>
        <div className='md:flex items-center md:gap-3 my-[6rem] relative'>

            <div className='absolute w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] bg-yellow-400 rounded-full left-[6%] md:bottom-[-50px] bottom-[10%] blur-3xl z-[-1]'></div>
            
            <div>
                <img src={prodImg} width={900} alt='main-product' />
            </div>
            <div className='flex flex-col w-full items-center'>
                <div>
                    <div className='font-serif text-[2rem] md:text-[3rem]'>all of the good</div>
                    <div className='font-serif text-[2rem] md:text-[3rem] ml-[7rem]'>none of the bad</div>
                </div>
                <div className='my-[6rem]'>
                    <ul className='text-[2rem] work-sans-300'>
                        <li className='work-sans-300'>No <del><span className='work-sans-600'>sugar</span></del></li>
                        <li className='work-sans-300'>No <del><span className='work-sans-600'>caffeine</span></del></li>
                        <li className='work-sans-300'>No <del><span className='work-sans-600'>artificial flavours</span></del></li>
                    </ul>
                </div>
            </div>


        </div>
    </div>
  )

}

export default ProductAd