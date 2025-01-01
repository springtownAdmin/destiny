"use client";

import React from 'react'
import { IoLogOutOutline } from 'react-icons/io5';

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

export default Footer;