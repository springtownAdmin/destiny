import React, { useState } from 'react';
import img1 from '/images/prod-1.webp';
import img2 from '/images/prod-2.webp';
import img3 from '/images/prod-3.webp';
import { IoLogOutOutline } from "react-icons/io5";
import { RiCloseLine } from "react-icons/ri";
import { TbExternalLink } from "react-icons/tb";
import Payment from './payment-integration/Payment';

const BackDrop = ({ isOpen, setIsOpen }) => {

    return (
        <>
            {isOpen && (
                <div
                className="fixed inset-0 bg-black/30 z-40"
                onClick={() => setIsOpen(false)}
                />
            )}
        </>
    )

}

const SideBarRight = (props) => {

    const { isOpen, setIsOpen, images, selectedImage2, setSelectedImage2, activeTab } = props;
    const { setActiveTab, purchaseOption2, setPurchaseOption2 } = props;
    const { product_title, price } = props;

    return (
        <div className={`fixed right-0 top-0 h-full w-full md:w-[480px] bg-white z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-white border-b">

                <div className="flex items-center gap-2">
                    <span className="font-medium">Shop All Products</span>
                </div>

                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <RiCloseLine className="w-5 h-5" />
                </button>

            </div>

            {/* Content */}
            <div className="p-4 space-y-6">
                
                {/* Main Image */}
                <div className="bg-[#e75d8e] rounded-lg overflow-hidden">
                    <div className="relative aspect-square">
                        <img
                            src={images[selectedImage2]}
                            alt="Product"
                            className="object-cover transition-opacity duration-300"
                        />
                    </div>
                </div>

                {/* Thumbnails */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedImage2(index)}
                        className={`relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors
                        ${selectedImage2 === index ? 'border-[#e75d8e]' : 'border-gray-200'}`}
                    >
                        <img  src={image} alt={`Product view ${index + 1}`} className="object-cover" />
                    </button>
                    ))}
                </div>

                {/* Product Title and Price */}
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-serif font-bold">{product_title}</h2>
                        <a href="https://shop.drinkmoment.com/" className="font-light text-gray-600 hover:text-gray-900 inline-flex items-center gap-1">
                            View on site <TbExternalLink className="w-4 h-4" />
                        </a>
                    </div>
                    <div className="text-xl font-bold font-serif">US ${price}</div>
                </div>

                {/* Free Shipping Banner */}
                <div className="bg-[#ffff99] p-2 text-center text-sm font-light rounded-lg">
                    Free Shipping on all Orders !
                </div>

                {/* Purchase Options */}
                <div className="space-y-4">

                    <h3 className="text-sm font-medium text-gray-500">Purchase Option</h3>

                    <div className="space-y-3">
                        {/* <label className={`flex items-center justify-between border rounded-lg p-4 cursor-pointer transition-colors
                            ${purchaseOption === 'subscribe' ? 'border-[#e75d8e] bg-pink-50' : 'border-gray-200'}`}>
                            <div className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="purchase-option"
                                value="subscribe"
                                checked={purchaseOption === 'subscribe'}
                                onChange={(e) => setPurchaseOption(e.target.value)}
                                className="w-4 h-4 text-[#e75d8e]"
                            />
                            <span>Subscribe + Save $6</span>
                            </div>
                            <span className="font-medium">$48</span>
                        </label> */}

                        <label className={`flex items-center justify-between border rounded-lg p-4 cursor-pointer transition-colors
                            ${purchaseOption2 === 'one-time' ? 'border-[#e75d8e] bg-pink-50' : 'border-gray-200'}`}>
                            <div className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="purchase-option2"
                                    value="one-time"
                                    checked={true}
                                    onChange={(e) => setPurchaseOption2(e.target.value)}
                                    className="w-4 h-4 text-[#e75d8e]"
                                />
                                <span className='font-serif'>One-Time Purchase</span>
                            </div>
                            <span className="font-medium font-serif">${price}</span>
                        </label>

                    </div>

                </div>

                {/* Tabs */}
                <div className="border-b">
                    <div className="flex gap-4">
                        <button
                            onClick={() => setActiveTab('description')}
                            className={`pb-2 text-sm font-medium transition-colors relative
                            ${activeTab === 'description' ? 'text-black' : 'text-gray-500'}`}
                        >
                            Description
                            {activeTab === 'description' && (
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black" />
                            )}
                        </button>
                        <button
                            onClick={() => setActiveTab('ingredients')}
                            className={`pb-2 text-sm font-medium transition-colors relative
                            ${activeTab === 'ingredients' ? 'text-black' : 'text-gray-500'}`}
                        >
                            Ingredients
                            {activeTab === 'ingredients' && (
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="space-y-4">
                    {activeTab === 'description' ? (
                    <>
                        <p className="text-gray-600 font-light">Meet our three new sparkling flavors in one variety pack:</p>
                        <ul className="space-y-4">
                        <li className='font-light'>
                            <strong>Strawberry rose:</strong> sweet juicy strawberry kissed with fragrant rose petals - delicate,
                            yet bursting with flavor.
                        </li>
                        <li className='font-light'>
                            <strong>Blackberry lavender:</strong> sweet ripe blackberries with a calming touch of lavender,
                            making every sip feel like a sweet escape.
                        </li>
                        <li className='font-light'>
                            <strong>Mango chili:</strong> tropical mangos with a subtle fiery kick of chili peppers to spice up
                            your day.
                        </li>
                        </ul>
                    </>
                    ) : (
                    <p className="text-gray-600 font-light">Ingredients information coming soon...</p>
                    )}
                </div>

                {/* Add to Cart Button */}
                <button className="w-full py-3 px-4 bg-pink-500 text-white rounded-lg font-medium 
                    hover:bg-pink-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Add to bag
                </button>

                <Payment />


            </div>

        </div>
    )
}

const Footer = () => {

    return (
        <footer className="w-full max-w-6xl mx-auto px-4 py-8 space-y-6">
    
            {/* View More Link */}
            <div className="flex justify-center">
                <a href="https://shop.drinkmoment.com/" className="inline-flex items-center gap-2 px-6 py-3 bg-[#fff5eb] rounded-lg text-sm font-light hover:bg-[#fff0e0] transition-colors duration-200">
                    View more on <span className='font-medium flex items-center gap-2'>Moment
                    <IoLogOutOutline className="w-5 h-5" /></span>
                </a>
            </div>

        </footer>
    );

}

const ProductCart = (props) => {

    const { tagline = 'The best drink for fall' } = props;
    const { announcement = 'FREE SHIPPING FOR HALLOWEEN' } = props;
    const { product_title = 'botanical soda variety (18 pack)' } = props;
    const { sub_title = 'Halloween, Thanksgiving, and Fall will never be the same.' } = props;
    const { price = '20' } = props;
    const { images = [ img1, img2, img3 ] } = props;

    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedImage2, setSelectedImage2] = useState(0);
    const [activeTab, setActiveTab] = useState('description')
    const [purchaseOption, setPurchaseOption] = useState('one-time');
    const [purchaseOption2, setPurchaseOption2] = useState('one-time');
    const [isOpen, setIsOpen] = useState(false)
  
    return (
        <div className="min-h-screen bg-white">

            <BackDrop isOpen={isOpen} setIsOpen={setIsOpen} />

            <SideBarRight product_title={product_title} price={price} isOpen={isOpen} setIsOpen={setIsOpen} images={images} selectedImage2={selectedImage2} setSelectedImage2={setSelectedImage2} activeTab={activeTab} setActiveTab={setActiveTab} purchaseOption2={purchaseOption2} setPurchaseOption2={setPurchaseOption2} />

            {/* Announcement Banner */}
            <div className="w-full bg-[#ffff99] p-2 text-center text-sm font-medium">
                {announcement}
            </div>

            <main className="container mx-auto px-4 py-8">

                {/* Product Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2 font-serif">{tagline}</h1>
                    <p className="text-gray-600 font-light">
                        {sub_title}
                    </p>
                </div>

                {/* Product Section */}
                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">

                    {/* Product Images */}
                    <div className="space-y-4">
                        <div className="bg-[#e75d8e] rounded-lg overflow-hidden">
                            <div className="relative aspect-square" onClick={() => setIsOpen(true)}>
                                <img
                                    src={images[selectedImage]}
                                    alt="Botanical Soda Variety Pack"
                                    className="object-cover transition-opacity duration-300 ease-in-out"
                                />
                            </div>
                        </div>

                        {/* Thumbnail Images */}
                        <div className="flex gap-2 overflow-x-auto pb-2">
                            {images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors duration-200 
                                        ${selectedImage === index ? 'border-[#e75d8e]' : 'border-gray-200'}`}
                                    aria-label={`View product image ${index + 1}`}
                                >
                                    <img
                                        src={image}
                                        alt={`Product view ${index + 1}`}
                                        className="object-cover"
                                    />
                                </button>
                            ))}
                        </div>

                    </div>

                    {/* Product Details */}
                    <div className="space-y-6">
                        <div className="flex justify-between items-start">
                            <h2 className="text-2xl font-serif font-bold">{product_title}</h2>
                            <div className="text-xl font-serif font-bold">US ${price}</div>
                        </div>

                        {/* Purchase Options */}
                        <div className="space-y-4">
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
                        <button
                        
                        className="w-full py-3 px-4 bg-pink-500 text-white rounded-lg font-medium 
                            hover:bg-pink-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                        Add to bag
                        </button>

                        <Payment />

                        
                        

                    </div>

                </div>

            </main>

            <Footer />

        </div>
    );

}

export default ProductCart