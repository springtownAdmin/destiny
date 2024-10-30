import React, { useState } from 'react';
import { FiMenu } from "react-icons/fi";
import { PiShoppingCart } from "react-icons/pi";
import { IoChevronDownOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md";

const Header = ({ template = 1 }) => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);


    if (template === 1) {

        return (

            <header className="fixed top-0 left-0 right-0 z-50 bg-white" style={{ boxShadow: '0px 8px 10px white' }}>
                <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <button onClick={toggleMenu} className="text-black md:hidden">
                    <FiMenu size={24} />
                    </button>
                    <div className="text-2xl font-bold">moment</div>
                    <nav className="hidden md:flex items-center space-x-4 ">
                        <a href="#" className="text-black hover:text-gray-600 ">SHOP+</a>
                        <a href="#" className="text-black hover:text-gray-600">LEARN+</a>
                        <a href="#" className="text-black hover:text-gray-600">BECOME AN AMBASSADOR</a>
                    </nav>
                    <div className="flex items-center space-x-4">
                    <a href="#" className="hidden md:inline-block text-black hover:text-gray-600">LOGIN</a>
                    <a href="#" className="text-black hover:text-gray-600 flex gap-1">
                        <PiShoppingCart size={24} /> 
                        <span className="ml-1">0</span>
                    </a>
                    </div>
                </div>
                </div>
        
                {/* Mobile Menu */}
                {isMenuOpen && (
                <div className="fixed inset-0 bg-pink-200 bg-opacity-50 backdrop-blur-md z-50 transition-all duration-100">
                    <div className="container mx-auto px-4 py-5">
                    <div className="flex justify-between items-center mb-8">
                        <button onClick={toggleMenu} className="text-black">
                        <MdClose size={24} />
                        </button>
                        <div className="text-2xl font-bold">moment</div>
                        <a href="#" className="text-black hover:text-gray-600 flex gap-1">
                        <PiShoppingCart size={24} />
                        <span className="ml-1">0</span>
                        </a>
                    </div>
                    <nav className="flex flex-col space-y-4">
                        <a href="#" className="text-black text-2xl font-bold flex items-center justify-between">
                        shop <IoChevronDownOutline size={24} />
                        </a>
                        <a href="#" className="text-black text-2xl font-bold flex items-center justify-between">
                        learn <IoChevronDownOutline size={24} />
                        </a>
                        <a href="#" className="text-black text-2xl font-bold">become an ambassador</a>
                        <a href="#" className="text-black text-2xl font-bold">account</a>
                    </nav>
                    </div>
                </div>
                )}
            </header>

        )

    }

    return null;

}

export default Header