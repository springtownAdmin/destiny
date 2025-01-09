"use client";

import React, { useState } from 'react';
import { ShopPayButton, Footer } from '../common';
import Payment from '../payment-integration/Payment';
import ReviewSection from '../reviews';

const Template01 = (props) => {

    const { header_section={}, images = null, description = '' } = props;
    const { price = '0.1' } = props;
    const { product_title = '', variantId = '', productItem = '' } = props;

    const [selectedImage, setSelectedImage] = useState(0);
    const [purchaseOption, setPurchaseOption] = useState('one-time');

    return (
        <>
            {/* Announcement Banner */}
            {header_section?.announcement !== '' && <div className="w-full bg-[#ffff99] uppercase p-2 text-center text-sm font-medium">
                {header_section?.announcement}
            </div>}

            <main className="container mx-auto px-4 py-8">

                {/* Product Header */}
                {(header_section?.tagline !== '' || header_section?.sub_title !== '') && <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2 font-serif">{header_section?.tagline}</h1>
                    <p className="text-gray-600 font-light">
                        {header_section?.sub_title}
                    </p>
                </div>}

                {/* Product Section */}
                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">

                    {/* Product Images */}
                    <div className="space-y-4">
                        <div className="bg-[#e75d8e] rounded-lg overflow-hidden scrollbar-hide">
                            <div className="relative aspect-square">
                                {images !== null && <img
                                    src={images[selectedImage]}
                                    alt="Botanical Soda Variety Pack"
                                    className="object-cover w-full h-full transition-opacity duration-300 ease-in-out"
                                />}
                            </div>
                        </div>

                        {/* Thumbnail Images */}
                        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 md:w-auto">
                            {images !== null && images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`relative w-24 h-24 flex-shrink-0 rounded-lg scrollbar-hide overflow-hidden border-2 transition-colors duration-200 
                                        ${selectedImage === index ? 'border-[#e75d8e]' : 'border-gray-200'}`}
                                    aria-label={`View product image ${index + 1}`}
                                >
                                    <img src={image} alt={`Product view ${index + 1}`} className="object-cover" />
                                </button>
                            ))}
                        </div>

                    </div>

                    {/* Product Details */}
                    <div className="space-y-6">

                        {(product_title !== '' || price !== '') && <div className="flex justify-between items-center space-x-2">
                            <h2 className="text-2xl font-serif font-bold max-w-[390px]">{product_title}</h2>
                            <div className="text-xl font-serif font-bold text-nowrap">US ${price}</div>
                        </div>}

                        <p className="font-light text-justify">{description}</p>

                        {/* Purchase Options */}
                        <div className='fixed md:static bottom-0 bg-white md:bg-transparent p-2 left-0 md:p-0 w-full'>
                            
                            <div className="space-y-4 mb-3">
                                <h3 className="text-sm font-medium text-gray-500">Purchase Option</h3>
                                <div className="space-y-3">
                                    {/* <label className={`flex items-center justify-between border rounded-lg p-4 cursor-pointer transition-colors
                                    ${purchaseOption === 'subscribe' ? 'border-[#e75d8e] bg-pink-50' : 'border-gray-200'}`}>
                                    <div className="flex items-center space-x-2">
                                        <input
                                        type="radio"
                                        name="purchase-option"
                                        value="subscribe"
                                        checked={purchaseOption === 'subscribe'}
                                        onChange={(e) => setPurchaseOption(e.target.value)}
                                        className="w-4 h-4 text-[#e75d8e] border-gray-300 focus:ring-[#e75d8e]"
                                        />
                                        <span>Subscribe - Save $6</span>
                                    </div>
                                    <span className="font-medium">$48</span>
                                    </label> */}

                                    <label className={`flex items-center justify-between border rounded-lg p-4 cursor-pointer transition-colors
                                        ${purchaseOption === 'one-time' ? 'border-[#e75d8e] bg-pink-50' : 'border-gray-200'}`}>
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="radio"
                                                name="purchase-option"
                                                value="one-time"
                                                checked={purchaseOption === 'one-time'}
                                                onChange={(e) => setPurchaseOption(e.target.value)}
                                                className="w-4 h-4 text-[#e75d8e] border-gray-300 focus:ring-[#e75d8e]"
                                            />
                                            <span className='font-serif'>One-Time Purchase</span>
                                        </div>
                                        <span className="font-medium font-serif">${price}</span>
                                    </label>
                                </div>
                            </div>

                            {/* Add to Cart Button */}
                            {/* <button onClick={handleCart} className="w-full py-3 px-4 bg-pink-500 text-white rounded-lg font-medium 
                                hover:bg-pink-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Add to cart
                            </button> */}

                            {variantId !== '' && <ShopPayButton variantId={variantId} />}

                            {(productItem !== '' && product_title !== '' && variantId !== '') &&
                                <Payment productId={productItem} product_title={product_title} amount={parseFloat(price).toFixed(2)} variant_id={variantId} />
                            }

                        </div>



                    </div>

                </div>

            </main>

            <ReviewSection />

            <Footer />
        </>
    );

}

export default Template01