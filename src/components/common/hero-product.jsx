import React, { useState } from 'react'
import { FaStar } from "react-icons/fa6";
import { FiChevronLeft } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";
import prodImg1 from '/images/product-juice-1.webp';
import prodImg2 from '/images/product-juice-2.webp';
import prodImg3 from '/images/product-juice-3.webp';
import prodImg4 from '/images/product-juice-4.webp';

const productImages = [
    prodImg1,
    prodImg2,
    prodImg3,
    prodImg4
]


export default function HeroProduct() {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [paymentRequest, setPaymentRequest] = useState(null);
  const [paymentRequestAvailable, setPaymentRequestAvailable] = useState(false);

  const [count, setCount] = useState(1);
  const price = 40;

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % productImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + productImages.length) % productImages.length)
  }

  const increment = () => setCount(prev => prev + 1)
  const decrement = () => setCount(prev => Math.max(1, prev - 1))

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center lg:flex-row gap-8">
        <div className="w-full lg:w-1/2">
          <div className="relative overflow-hidden rounded-full aspect-square">
            <div className="p-0" >
              <div className="relative w-full h-full overflow-hidden">
                <div
                    className="flex transition-transform duration-500 ease-in-out h-full"
                    style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                    >
                    {productImages.map((src, index) => (
                        <img
                        key={index}
                        src={src}
                        alt={`Product image ${index + 1}`}
                        className="w-full h-full object-cover flex-shrink-0"
                        />
                    ))}
                    </div>
                <button
                  variant="outline"
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2"
                  onClick={prevImage}
                >
                  <FiChevronLeft className="h-8 w-8" />
                </button>
                <button
                  variant="outline"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  onClick={nextImage}
                >
                  <FiChevronRight className="h-8 w-8" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <h1 className="text-[3rem] work-sans-500 mb-4 font-serif font-bold">still & sprakling variety (18 pack)</h1>
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="w-5 h-5 fill-current text-yellow-500" />
            ))}
            <span className="ml-2 text-gray-600">1122 Reviews</span>
          </div>
          <p className="mb-4">
            Find your favorite flavor of calm with our bestselling still and sparkling flavors.
            Refreshing fruits like juicy plums, Meyer lemon, delicious blueberries, floral lychees, refreshing
            blood orange, and bright black cherries
          </p>
          <p className="mb-4">
            Natural botanicals such as ginger, hibiscus, rhubarbm and jasmine
          </p>

          <div className=" lg:max-w-sm font-sans">
            <p className="text-sm text-gray-600 mb-4">
                Most effective if consumed daily. Pause or cancel at any time.
            </p>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                <button
                    onClick={decrement}
                    className="w-8 h-8 rounded-full bg-pink-200 text-pink-500 flex items-center justify-center text-xl font-bold"
                >
                    -
                </button>
                <span className="mx-4 w-8 text-center text-xl">{count}</span>
                <button
                    onClick={increment}
                    className="w-8 h-8 rounded-full bg-pink-200 text-pink-500 flex items-center justify-center text-xl font-bold"
                >
                    +
                </button>
                </div>
                <span className="text-xl font-bold">${price * count}</span>
            </div>
            
              <button className="w-full bg-pink-400 text-white py-3 rounded-full text-lg font-bold mb-2">
                  ADD TO CART
              </button>
            {/* </Elements> */}
            <p className="text-sm text-gray-600 text-center">
                free shipping on all orders!
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
  
}