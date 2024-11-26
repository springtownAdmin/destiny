// ShopPayButton.jsx
import React from 'react';

const ShopPayButton = ({ payment = false }) => {

    return (

        <button disabled className={`w-1/2 md:w-full py-3 px-4 bg-pink-500 text-white rounded-lg font-medium 
            opacity-50 cursor-not-allowed disabled:opacity-50 disabled:cursor-not-allowed`}
        >
            Buy Now
        </button>
    );

};

export default ShopPayButton;
