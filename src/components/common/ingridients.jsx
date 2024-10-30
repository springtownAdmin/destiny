import React, { useState, useRef, useEffect } from 'react'
import { FiChevronLeft } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";
import ing1 from '/images/ing-1.webp';
import ing2 from '/images/ing-2.webp';
import ing3 from '/images/ing-3.webp';
import ing4 from '/images/ing-4.webp';
import ing5 from '/images/ing-5.webp';
import ing6 from '/images/ing-6.webp';

const flavors = [

    {
        name: "ashwagandha",
        image: ing1,
        description: "Relieves stress, balances cortisol levels, and enhances the immune system"
    },

    {
        name: "apple cider vinegar",
        image: ing2,
        description: "Supports gut health and boosts the mood"
    },
    
    {
        name: "l-theanine",
        image: ing3,
        description: "Increases alpha brainwaves and improves mental clarity"
    },

    {
        name: "black cherry",
        image: ing4,
        description: "Calms the mind and promotes quality sleep"
    },

    {
        name: "dragon fruit",
        image: ing5,
        description: "Helps the body relax and regulates sleep patterns"
    },

    {
        name: "hibiscus",
        image: ing6,
        description: "Boosts immunity and has anxiety-reducing effects"
    }

]

const Ingridients = () => {

    const [scrollPosition, setScrollPosition] = useState(0)
    const sliderRef = useRef(null)

    const scroll = (direction) => {
        if (sliderRef.current) {
        const scrollAmount = direction === 'left' ? -300 : 300
        sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
        }
    }

    useEffect(() => {
        const handleScroll = () => {
        if (sliderRef.current) {
            setScrollPosition(sliderRef.current.scrollLeft)
        }
        }

        sliderRef.current?.addEventListener('scroll', handleScroll)
        return () => sliderRef.current?.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className=" px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-8 font-serif">celebrate flavor</h1>
            <div className="relative">
                <div
                    ref={sliderRef}
                    className="flex overflow-x-auto scrollbar-hide scroll-smooth"
                    style={{ scrollSnapType: 'x mandatory' }}
                >
                {flavors.map((flavor, index) => (
                    <div key={index} className="flex-none w-64 mx-4 scroll-snap-align-start">
                        <div className="flex flex-col items-center">

                            <div className="relative w-48 h-48 mb-4">
                                <div className="absolute inset-0 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full"></div>
                                <img
                                    src={flavor.image}
                                    alt={flavor.name}
                                    className="absolute inset-0 w-full h-full object-contain p-8"
                                />
                            </div>

                            <h2 className="text-xl font-semibold mb-2">{flavor.name}</h2>
                            <p className="text-center text-sm text-gray-600 max-w-xs">{flavor.description}</p>

                        </div>
                    </div>
                ))}
                </div>
                {scrollPosition !== 0 && <button
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    disabled={scrollPosition === 0}
                >
                    <FiChevronLeft className="w-6 h-6 text-gray-800" />
                </button>}
                
                {!(sliderRef.current && scrollPosition >= sliderRef.current.scrollWidth - sliderRef.current.clientWidth)
                        && <button
                            onClick={() => scroll('right')}
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                            disabled={sliderRef.current && scrollPosition >= sliderRef.current.scrollWidth - sliderRef.current.clientWidth}
                        >
                        <FiChevronRight className="w-6 h-6 text-gray-800" />
                    </button>
                }
                
            </div>
        </div>
    )
}

export default Ingridients