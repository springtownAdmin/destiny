import React, { useState, useRef, useEffect }  from 'react';
import { FaStar } from "react-icons/fa6";
import { FiChevronLeft } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";
import { BsFillPatchCheckFill } from "react-icons/bs";

const testimonials = [
    {
      quote: "It's like the feeling you have after a gentle yoga class - blissful. Love that it's still too.",
      author: "Kristen",
      rating: 5
    },
    {
      quote: "This product has completely changed my daily routine. I feel more energized and focused.",
      author: "Michael",
      rating: 5
    },
    {
      quote: "I was skeptical at first, but now I can't imagine my life without it. Truly amazing!",
      author: "Sarah",
      rating: 5
    }
]

const TopReviews = () => {

    const [currentIndex, setCurrentIndex] = useState(0)
    const sliderRef = useRef(null)

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
    }

    useEffect(() => {
        if (sliderRef.current) {
        sliderRef.current.style.transform = `translateX(-${currentIndex * 100}%)`
        }
    }, [currentIndex]);

    return (
        <div className="max-w-3xl mx-auto px-4 py-[8rem]">

            <div className="relative overflow-hidden">
                <div
                ref={sliderRef}
                className="flex transition-transform duration-300 ease-in-out w-full"
                style={{ transform: `translateX(-${testimonials.length * 100}%)` }}
                >
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="w-full px-4 flex-shrink-0">
                    <div className="flex flex-col items-center text-center">
                        <div className="flex mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                            <FaStar key={i} className="w-6 h-6 fill-current text-yellow-500" />
                        ))}
                        </div>
                        <p className="text-2xl mb-4 font-serif text-gray-500 italic">"{testimonial.quote}"</p>
                        <p className="text-xl font-bold mb-2">{testimonial.author}</p>
                        <div className="flex items-center text-green-600">
                            <BsFillPatchCheckFill className="w-4 h-4 mr-1" />
                            <span className="text-sm">Verified Buyer</span>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
                <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-none focus:ring-white"
                >
                <FiChevronLeft className="w-6 h-6 text-gray-800" />
                </button>
                <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-none focus:ring-white"
                >
                <FiChevronRight className="w-6 h-6 text-gray-800" />
                </button>
            </div>

            <div className="flex justify-center mt-4">
                {testimonials.map((_, index) => (
                <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 mx-1 rounded-full ${
                    index === currentIndex ? 'bg-gray-800' : 'bg-gray-300'
                    }`}
                />
                ))}
            </div>

        </div>
    );

}

export default TopReviews