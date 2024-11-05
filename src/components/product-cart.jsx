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
                className="absolute inset-0 bg-black/30 z-40"
                onClick={() => setIsOpen(false)}
                />
            )}
        </>
    )

}

const SideBarRight = (props) => {

    const { isOpen, setIsOpen, images, selectedImage2, setSelectedImage2, activeTab } = props;
    const { setActiveTab, purchaseOption2, setPurchaseOption2 } = props;
    const { product_title, price, description } = props;

    return (
        <>
            <div className={`absolute right-0 top-0 h-full w-full md:w-[480px] bg-white z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    
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
                                className="object-cover w-full h-full transition-opacity duration-300"
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
                    <div className="flex justify-between items-center">
                        <div className="space-y-1">
                            <h2 className="text-2xl font-serif font-bold">{product_title}</h2>
                            <a href="https://shop.drinkmoment.com/" target='_blank' className="font-light text-gray-600 hover:text-gray-900 inline-flex items-center gap-1">
                                View on site <TbExternalLink className="w-4 h-4" />
                            </a>
                        </div>
                        <div className="text-xl font-bold font-serif text-nowrap">US ${price}</div>
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
                            <p className="text-gray-600 font-light">{description}</p>
                        ) : (
                            <p className="text-gray-600 font-light">Ingredients information coming soon...</p>
                        )}
                    </div>

                    {/* Add to Cart Button */}
                    <button className="w-full py-3 px-4 bg-pink-500 text-white rounded-lg font-medium 
                        hover:bg-pink-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Add to cart
                    </button>

                    <Payment />


                </div>

            </div>
        </>
    )
}

const AddToCart = (props) => {

    const { setIsOpen2, isOpen2, product_title, price } = props;
    const [count, setCount] = useState(2)

    const increment = () => setCount(prev => prev + 1)
    const decrement = () => setCount(prev => Math.max(1, prev - 1))
    

    return (
        <div className={`absolute right-0 top-0 h-full w-full md:w-[400px] bg-white z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${isOpen2 ? 'translate-x-0' : 'translate-x-full'}`}>
                    
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-white border-b">

                <div className="flex items-center gap-2">
                    <span className="font-medium">Your Cart</span>
                </div>

                <button onClick={() => setIsOpen2(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <RiCloseLine className="w-5 h-5" />
                </button>

            </div>

            <div className="p-4 space-y-6 w-full">

                <div className='flex justify-between w-full'>

                    {/* <div><img src='/images/prod-1.webp' alt='product-1' className='h-10 w-10' /></div>
                    <div>
                        <div>{product_title}</div>
                        <div>${price}</div>
                    </div> */}

                    <div className="p-4 font-sans">

                        <div><img src='/images/prod-1.webp' alt='product-1' className='h-[21rem] rounded-md w-full' /></div>

                        <p className="text-md text-gray-800 font-semibold mb-4">
                            {product_title}
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
                            <span className="text-xl font-bold">${parseFloat(price) * count}</span>
                        </div>

                        <>
                            {/* <button className="w-full bg-pink-400 text-white py-3 rounded-full text-lg font-bold mb-2">
                                ADD TO CART
                            </button> */}

                            <div className='bg-gray-200 p-3 flex justify-center'>Shop Pay button will come here</div>

                            <p className="text-sm text-gray-600 text-center">
                                free shipping on all orders!
                            </p>
                        </>
                    </div>

                </div>

            </div>
            
        </div>
    )

}

const Footer = () => {

    return (
        <footer className="w-full max-w-6xl mx-auto px-4 py-8 space-y-6">
    
            {/* View More Link */}
            <div className="flex justify-center">
                <a href="https://shop.drinkmoment.com/" target='_blank' className="inline-flex items-center gap-2 px-6 py-3 bg-[#fff5eb] rounded-lg text-sm font-light hover:bg-[#fff0e0] transition-colors duration-200">
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
    const { price = '20', description = 'Description will come soon.' } = props;
    const { images = [ img1, img2, img3 ] } = props;

    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedImage2, setSelectedImage2] = useState(0);
    const [activeTab, setActiveTab] = useState('description');
    const [purchaseOption, setPurchaseOption] = useState('one-time');
    const [purchaseOption2, setPurchaseOption2] = useState('one-time');
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);

    const handleCart = () => {

        setIsOpen2(true);

    }
  
    return (
        <div className="min-h-screen bg-white relative overflow-x-hidden">

            <BackDrop isOpen={isOpen} setIsOpen={setIsOpen} />

            <BackDrop isOpen={isOpen2} setIsOpen={setIsOpen2} />

            <SideBarRight product_title={product_title} description={description} price={price} isOpen={isOpen} setIsOpen={setIsOpen} images={images} selectedImage2={selectedImage2} setSelectedImage2={setSelectedImage2} activeTab={activeTab} setActiveTab={setActiveTab} purchaseOption2={purchaseOption2} setPurchaseOption2={setPurchaseOption2} />

            <AddToCart isOpen2={isOpen2} setIsOpen2={setIsOpen2} product_title={product_title} price={price} />

            {/* Announcement Banner */}
            {announcement !== '' && <div className="w-full bg-[#ffff99] uppercase p-2 text-center text-sm font-medium">
                {announcement}
            </div>}

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
                                    className="object-cover w-full h-full transition-opacity duration-300 ease-in-out"
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
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-serif font-bold">{product_title}</h2>
                            <div className="text-xl font-serif font-bold text-nowrap">US ${price}</div>
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
                        <button onClick={handleCart} className="w-full py-3 px-4 bg-pink-500 text-white rounded-lg font-medium 
                            hover:bg-pink-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Add to cart
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