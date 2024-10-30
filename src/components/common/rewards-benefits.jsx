import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa6";


const benefitSections = [
    {
      title: "WELLNESS BENEFITS",
      content: (
        <ul className="list-disc pl-5 text-base leading-7">
          <li>Improved sleep quality</li>
          <li>Reduced stress and anxiety</li>
          <li>Enhanced mental clarity</li>
          <li>Boosted immune system</li>
        </ul>
      )
    },
    {
      title: "SECRET REWARDS",
      content: (
        <div className="flex justify-around">
          <div>
            <h4 className="font-serif font-bold mb-2">at 30 days</h4>
            <ul className="list-disc pl-5 text-base leading-7">
              <li>Moment postcard for a friend</li>
              <li>VIP access to new flavors</li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif font-bold mb-2">after 30 days</h4>
            <ul className="list-disc pl-5 text-base leading-7">
              <li>8 deliveries = free sleep mask</li>
              <li>12 deliveries = scented candle</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "MEMBERSHIP REWARDS",
      content: (
        <ul className="list-disc pl-5 text-base leading-7">
          <li>Exclusive access to limited edition flavors</li>
          <li>Monthly member-only challenges</li>
          <li>Personalized wellness coaching sessions</li>
          <li>Discounts on partner products and services</li>
        </ul>
      )
    }
]
  

const RewardsBenefits = () => {

    const [expandedIndex, setExpandedIndex] = useState(null)

    const toggleSection = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index)
    }

    return (

        <div className="max-w-4xl mx-auto p-8">
            <h2 className="text-4xl font-bold text-center mb-8 font-serif">start off with the<br />30-day challenge</h2>
            {benefitSections.map((section, index) => (
                <div key={index} className="mb-4">
                <button
                    className="w-full text-left focus:outline-black bg-white rounded-lg shadow-md shadow-gray-100 p-4 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={() => toggleSection(index)}
                >
                    <span className="text-lg">{section.title}</span>
                    <FaPlus
                    className={`transform transition-transform duration-300 ${
                        expandedIndex === index ? 'rotate-45' : ''
                    }`}
                    />
                </button>
                <div
                    className={`bg-white rounded-b-lg overflow-hidden transition-all mt-2 duration-300 ease-in-out ${
                    expandedIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                    <div className="p-4 border-t">{section.content}</div>
                </div>
                </div>
            ))}
        </div>

    );

}

export default RewardsBenefits