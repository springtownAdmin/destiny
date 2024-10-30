import React, { useState } from 'react';
import img1 from '/images/prod-1.webp';
import img2 from '/images/prod-2.webp';
import img3 from '/images/prod-3.webp';
import { IoLogOutOutline } from "react-icons/io5";
import { RiCloseLine } from "react-icons/ri";
import { TbExternalLink } from "react-icons/tb";

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
                        <a href="#" className="font-light text-gray-600 hover:text-gray-900 inline-flex items-center gap-1">
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
                <button
                    className="w-full py-3 px-4 bg-pink-500 text-white rounded-lg font-medium 
                    hover:bg-pink-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Pay now
                </button>

                {/* Footer */}
                <div className="flex w-full justify-center items-center pt-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="104" height="19" fill="none">
                        <g fill="#000" clip-path="url(#a)">
                            <path d="M.64 13.611V6.54h.624v.658c.259-.391.927-.738 1.596-.738 1.471 0 2.256 1.156 2.256 2.598 0 1.44-.785 2.597-2.256 2.597-.544 0-1.221-.311-1.596-.791v2.748H.64Zm2.184-6.574c-1.07 0-1.622.881-1.622 2.02 0 1.138.552 2.02 1.622 2.02s1.632-.9 1.632-2.02c0-1.121-.562-2.02-1.632-2.02ZM8.512 6.459c1.472 0 2.363 1.281 2.363 2.598 0 1.316-.891 2.597-2.363 2.597-1.47 0-2.362-1.28-2.362-2.597s.891-2.598 2.362-2.598Zm0 4.617c1.133 0 1.712-1.005 1.712-2.02 0-1.014-.58-2.019-1.712-2.019-1.132 0-1.711 1.005-1.711 2.02 0 1.014.58 2.02 1.711 2.02ZM17.972 6.539l-1.515 5.035h-.642l-1.052-4.119-1.052 4.119h-.642l-1.516-5.035h.65l1.187 4.154 1.06-4.154h.625l1.06 4.154 1.186-4.154h.651ZM23.268 9.057h-3.807c0 1.183.58 2.02 1.596 2.02.767 0 1.186-.33 1.551-1.077l.553.267c-.517 1.032-1.168 1.387-2.104 1.387-1.337 0-2.247-1.103-2.247-2.597 0-1.495.9-2.598 2.247-2.598 1.346 0 2.211.925 2.211 2.322v.276Zm-3.762-.579h3.12c-.116-.871-.66-1.44-1.57-1.44-.837 0-1.381.622-1.55 1.44ZM27.387 7.215a1.513 1.513 0 0 0-.713-.178c-.767 0-1.391.872-1.391 2.589v1.948h-.624V6.54h.624v.899c.303-.623.802-.979 1.48-.979.294 0 .508.071.758.169l-.143.587h.01ZM32.603 9.057h-3.807c0 1.183.58 2.02 1.596 2.02.766 0 1.185-.33 1.551-1.077l.553.267c-.517 1.032-1.168 1.387-2.104 1.387-1.338 0-2.247-1.103-2.247-2.597 0-1.495.9-2.598 2.247-2.598 1.346 0 2.21.925 2.21 2.322v.276Zm-3.763-.579h3.12c-.115-.871-.659-1.44-1.568-1.44-.838 0-1.382.622-1.552 1.44ZM38.202 4.502v7.072h-.624v-.658c-.259.391-.927.738-1.596.738-1.471 0-2.256-1.156-2.256-2.597 0-1.442.785-2.598 2.256-2.598.544 0 1.221.311 1.596.792V4.5h.624Zm-2.184 6.574c1.07 0 1.622-.88 1.622-2.02 0-1.138-.553-2.019-1.623-2.019-1.07 0-1.631.899-1.631 2.02 0 1.12.562 2.019 1.631 2.019ZM43.266 4.502V7.25c.375-.48 1.052-.792 1.596-.792 1.471 0 2.256 1.156 2.256 2.598 0 1.44-.785 2.597-2.256 2.597-.66 0-1.328-.347-1.596-.738v.658h-.624V4.502h.624Zm1.56 2.535c-1.07 0-1.622.899-1.622 2.02 0 1.12.553 2.019 1.622 2.019 1.07 0 1.632-.88 1.632-2.02 0-1.138-.562-2.019-1.632-2.019ZM51.96 6.539l-2.506 7.072h-.624l.73-2.064-1.81-5.008h.652l1.498 4.074 1.4-4.074h.66ZM88.564 1.792h-2.488l-2.336 13.38h-.024l-2.28-13.38H78.78v.362h.652c.403 0 .443.072.443 1.84v8.888c0 3.929-.233 4.853-.789 4.853h-.459v.37h3.181v-.37h-.564c-.78 0-.877-.9-.877-4.853V4.669h.024l2.432 13.428h.79l2.431-13.428h.049v11.234c0 1.583.032 1.832-.274 1.832h-.83v.37h3.785v-.37h-.805c-.314 0-.274-.249-.274-1.832V3.994c0-1.76.065-1.84.42-1.84h.66v-.362h-.218.008ZM69.84 13.452s-.032 4.195-2.118 4.195h-1.788V9.764h.58c1.457 0 1.337 2.869 1.337 2.869h.346V6.79h-.346s.145 2.508-1.337 2.508h-.58v-7.04h1.184c2.086 0 2.118 4.187 2.118 4.187h.322l-.17-4.645h-6.144v.362h.685c.426 0 .394.072.394 1.84v11.909c0 1.583.065 1.832-.29 1.832h-.789v.37h6.749l.169-4.653h-.322v-.008ZM77.901 17.711a.696.696 0 0 1-.185-.048.339.339 0 0 1-.113-.073c-.016-.016-.032-.032-.04-.048-.161-.209-.17-.49-.17-.747v-.755c0-.386.009-.772.009-1.158v-.257c0-3.431-.274-4.532-2.271-5.038v-.024c1.538-.53 2.674-1.808 2.674-3.938 0-3.166-1.957-3.84-3.625-3.84h-3.825v.36h.741c.443 0 .395.073.395 1.841v11.909c0 1.583.088 1.832-.29 1.832h-.79v.37h3.745v-.37h-.805c-.33 0-.274-.249-.274-1.832V9.788h1.031c1.925 0 1.74 2.025 1.74 5.07v.635c0 .105 0 .201.008.306.008.104.008.192.016.297l.024.281c.008.097.024.177.04.265l.048.25c.017.08.04.152.065.232.024.073.048.145.08.21.033.064.065.128.097.184a.762.762 0 0 0 .12.16c.05.05.09.097.146.137.056.04.105.08.16.113.057.032.122.064.194.088.073.025.145.04.218.057.112.016.225.024.338.024h.87v-.37s-.347-.016-.387-.016h.016Zm-3.592-8.39h-1.224V2.259h1.08c1.223 0 1.932.579 1.932 3.48 0 2.611-.54 3.6-1.788 3.6v-.016ZM57.172 1.792h-.685v.362h.685c.427 0 .394.072.394 1.84v11.909c0 1.583.065 1.832-.29 1.832h-.789v.37h3.987v-.37H59.45c-.338 0-.274-.249-.274-1.832v-5.65h.588c1.458 0 1.337 2.87 1.337 2.87h.346V7.28h-.346s.145 2.507-1.337 2.507h-.588v-7.53h1.127c1.249 0 2.078 1.374 2.078 4.01v.177h.37V1.8h-5.58v-.008ZM90.199 0h1.353l.91 2.154L90.199 0Z"></path>
                            <path d="M103.423 1.792h-7.417v4.645h.378s.032-4.187 2.07-4.187h.564v13.645c0 1.583.056 1.832-.29 1.832H98.003c-.483 0-.58-.554-1.53-2.853L90.9 1.784h-.709v13.717c0 1.551.032 2.218-.475 2.218h-.612v.37h3.624v-.37h-1.691a.331.331 0 0 1-.33-.33v-5.528h2.786s1.836 4.886 1.973 5.287c.145.41.145.58-.242.58h-.668v.369h7.304v-.37h-.958c-.346 0-.274-.249-.274-1.832V2.242h.564c2.037 0 2.07 4.187 2.07 4.187h.378V1.784h-.217v.008Zm-12.717 9.611V4.806h.025l2.569 6.597h-2.594Z"></path></g><defs><clipPath id="a"><path fill="#fff" d="M.64 0h103v18.113H.64z"></path>
                            </clipPath></defs>
                    </svg>
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
                <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-[#fff5eb] rounded-lg text-sm font-light hover:bg-[#fff0e0] transition-colors duration-200">
                    View more on <span className='font-medium flex items-center gap-2'>Moment
                    <IoLogOutOutline className="w-5 h-5" /></span>
                </a>
            </div>

            {/* Powered By */}
            <div className="flex w-full justify-center items-center my-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="104" height="19" fill="none">
                    <g fill="#000" clip-path="url(#a)">
                        <path d="M.64 13.611V6.54h.624v.658c.259-.391.927-.738 1.596-.738 1.471 0 2.256 1.156 2.256 2.598 0 1.44-.785 2.597-2.256 2.597-.544 0-1.221-.311-1.596-.791v2.748H.64Zm2.184-6.574c-1.07 0-1.622.881-1.622 2.02 0 1.138.552 2.02 1.622 2.02s1.632-.9 1.632-2.02c0-1.121-.562-2.02-1.632-2.02ZM8.512 6.459c1.472 0 2.363 1.281 2.363 2.598 0 1.316-.891 2.597-2.363 2.597-1.47 0-2.362-1.28-2.362-2.597s.891-2.598 2.362-2.598Zm0 4.617c1.133 0 1.712-1.005 1.712-2.02 0-1.014-.58-2.019-1.712-2.019-1.132 0-1.711 1.005-1.711 2.02 0 1.014.58 2.02 1.711 2.02ZM17.972 6.539l-1.515 5.035h-.642l-1.052-4.119-1.052 4.119h-.642l-1.516-5.035h.65l1.187 4.154 1.06-4.154h.625l1.06 4.154 1.186-4.154h.651ZM23.268 9.057h-3.807c0 1.183.58 2.02 1.596 2.02.767 0 1.186-.33 1.551-1.077l.553.267c-.517 1.032-1.168 1.387-2.104 1.387-1.337 0-2.247-1.103-2.247-2.597 0-1.495.9-2.598 2.247-2.598 1.346 0 2.211.925 2.211 2.322v.276Zm-3.762-.579h3.12c-.116-.871-.66-1.44-1.57-1.44-.837 0-1.381.622-1.55 1.44ZM27.387 7.215a1.513 1.513 0 0 0-.713-.178c-.767 0-1.391.872-1.391 2.589v1.948h-.624V6.54h.624v.899c.303-.623.802-.979 1.48-.979.294 0 .508.071.758.169l-.143.587h.01ZM32.603 9.057h-3.807c0 1.183.58 2.02 1.596 2.02.766 0 1.185-.33 1.551-1.077l.553.267c-.517 1.032-1.168 1.387-2.104 1.387-1.338 0-2.247-1.103-2.247-2.597 0-1.495.9-2.598 2.247-2.598 1.346 0 2.21.925 2.21 2.322v.276Zm-3.763-.579h3.12c-.115-.871-.659-1.44-1.568-1.44-.838 0-1.382.622-1.552 1.44ZM38.202 4.502v7.072h-.624v-.658c-.259.391-.927.738-1.596.738-1.471 0-2.256-1.156-2.256-2.597 0-1.442.785-2.598 2.256-2.598.544 0 1.221.311 1.596.792V4.5h.624Zm-2.184 6.574c1.07 0 1.622-.88 1.622-2.02 0-1.138-.553-2.019-1.623-2.019-1.07 0-1.631.899-1.631 2.02 0 1.12.562 2.019 1.631 2.019ZM43.266 4.502V7.25c.375-.48 1.052-.792 1.596-.792 1.471 0 2.256 1.156 2.256 2.598 0 1.44-.785 2.597-2.256 2.597-.66 0-1.328-.347-1.596-.738v.658h-.624V4.502h.624Zm1.56 2.535c-1.07 0-1.622.899-1.622 2.02 0 1.12.553 2.019 1.622 2.019 1.07 0 1.632-.88 1.632-2.02 0-1.138-.562-2.019-1.632-2.019ZM51.96 6.539l-2.506 7.072h-.624l.73-2.064-1.81-5.008h.652l1.498 4.074 1.4-4.074h.66ZM88.564 1.792h-2.488l-2.336 13.38h-.024l-2.28-13.38H78.78v.362h.652c.403 0 .443.072.443 1.84v8.888c0 3.929-.233 4.853-.789 4.853h-.459v.37h3.181v-.37h-.564c-.78 0-.877-.9-.877-4.853V4.669h.024l2.432 13.428h.79l2.431-13.428h.049v11.234c0 1.583.032 1.832-.274 1.832h-.83v.37h3.785v-.37h-.805c-.314 0-.274-.249-.274-1.832V3.994c0-1.76.065-1.84.42-1.84h.66v-.362h-.218.008ZM69.84 13.452s-.032 4.195-2.118 4.195h-1.788V9.764h.58c1.457 0 1.337 2.869 1.337 2.869h.346V6.79h-.346s.145 2.508-1.337 2.508h-.58v-7.04h1.184c2.086 0 2.118 4.187 2.118 4.187h.322l-.17-4.645h-6.144v.362h.685c.426 0 .394.072.394 1.84v11.909c0 1.583.065 1.832-.29 1.832h-.789v.37h6.749l.169-4.653h-.322v-.008ZM77.901 17.711a.696.696 0 0 1-.185-.048.339.339 0 0 1-.113-.073c-.016-.016-.032-.032-.04-.048-.161-.209-.17-.49-.17-.747v-.755c0-.386.009-.772.009-1.158v-.257c0-3.431-.274-4.532-2.271-5.038v-.024c1.538-.53 2.674-1.808 2.674-3.938 0-3.166-1.957-3.84-3.625-3.84h-3.825v.36h.741c.443 0 .395.073.395 1.841v11.909c0 1.583.088 1.832-.29 1.832h-.79v.37h3.745v-.37h-.805c-.33 0-.274-.249-.274-1.832V9.788h1.031c1.925 0 1.74 2.025 1.74 5.07v.635c0 .105 0 .201.008.306.008.104.008.192.016.297l.024.281c.008.097.024.177.04.265l.048.25c.017.08.04.152.065.232.024.073.048.145.08.21.033.064.065.128.097.184a.762.762 0 0 0 .12.16c.05.05.09.097.146.137.056.04.105.08.16.113.057.032.122.064.194.088.073.025.145.04.218.057.112.016.225.024.338.024h.87v-.37s-.347-.016-.387-.016h.016Zm-3.592-8.39h-1.224V2.259h1.08c1.223 0 1.932.579 1.932 3.48 0 2.611-.54 3.6-1.788 3.6v-.016ZM57.172 1.792h-.685v.362h.685c.427 0 .394.072.394 1.84v11.909c0 1.583.065 1.832-.29 1.832h-.789v.37h3.987v-.37H59.45c-.338 0-.274-.249-.274-1.832v-5.65h.588c1.458 0 1.337 2.87 1.337 2.87h.346V7.28h-.346s.145 2.507-1.337 2.507h-.588v-7.53h1.127c1.249 0 2.078 1.374 2.078 4.01v.177h.37V1.8h-5.58v-.008ZM90.199 0h1.353l.91 2.154L90.199 0Z"></path>
                        <path d="M103.423 1.792h-7.417v4.645h.378s.032-4.187 2.07-4.187h.564v13.645c0 1.583.056 1.832-.29 1.832H98.003c-.483 0-.58-.554-1.53-2.853L90.9 1.784h-.709v13.717c0 1.551.032 2.218-.475 2.218h-.612v.37h3.624v-.37h-1.691a.331.331 0 0 1-.33-.33v-5.528h2.786s1.836 4.886 1.973 5.287c.145.41.145.58-.242.58h-.668v.369h7.304v-.37h-.958c-.346 0-.274-.249-.274-1.832V2.242h.564c2.037 0 2.07 4.187 2.07 4.187h.378V1.784h-.217v.008Zm-12.717 9.611V4.806h.025l2.569 6.597h-2.594Z"></path></g><defs><clipPath id="a"><path fill="#fff" d="M.64 0h103v18.113H.64z"></path>
                        </clipPath></defs>
                </svg>
            </div>

        </footer>
    );

}

const ProductCart = (props) => {

    const { tagline = 'The best drink for fall' } = props;
    const { announcement = 'FREE SHIPPING FOR HALLOWEEN' } = props;
    const { product_title = 'botanical soda variety (18 pack)' } = props;
    const { sub_title = 'Halloween, Thanksgiving, and Fall will never be the same.' } = props;
    const { price = '54' } = props;
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
                        Pay now
                        </button>

                        
                        

                    </div>

                </div>

            </main>

            <Footer />

        </div>
    );

}

export default ProductCart