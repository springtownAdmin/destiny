import React from 'react'
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";

export default function Footer() {

  return (
    <footer className="bg-black text-white py-8 px-4 md:px-8" style={{ boxShadow: '0 -10px 10px black' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="space-y-4">
            <h2 className="text-4xl font-bold">moment<sup className='font-sans font-light'>®</sup></h2>
            <div className="flex space-x-4">
              <FaFacebookF size={24} />
              <FaInstagram size={24} />
              <FaTwitter size={24} />
              <FaYoutube size={24} />
              {/* Add TikTok icon here */}
            </div>
            <div className="text-sm space-x-4">
              <a href="#" className="hover:underline">Terms</a>
              <a href="#" className="hover:underline">Privacy</a>
              <a href="#" className="hover:underline">Returns</a>
            </div>
            <p className="text-sm">© Moment 2024 · Site by Marcd</p>
            {/* <img src="/placeholder.svg?height=50&width=100&text=NMSDC" alt="NMSDC Certification" className="h-12" /> */}
          </div>

          {/* Center Column */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-2">shop</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Shop All</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">info</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:underline">About Us</a></li>
                <li><a href="#" className="hover:underline">Research</a></li>
                <li><a href="#" className="hover:underline">1% Pledge</a></li>
                <li><a href="#" className="hover:underline">Contact</a></li>
                <li><a href="#" className="hover:underline">FAQs</a></li>
                <li><a href="#" className="hover:underline">Reviews</a></li>
                <li><a href="#" className="hover:underline">Moment X Lululemon</a></li>
                <li><a href="#" className="hover:underline">Become an Ambassador</a></li>
                <li><a href="#" className="hover:underline">Join our team</a></li>
                <li><a href="#" className="hover:underline">Give 15%, Get $15</a></li>
                <li><a href="#" className="hover:underline">Find your Moment Quiz</a></li>
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">have a moment to chat?</h3>
            <p>text ONEMOMENT to</p>
            <p className="text-3xl font-bold">1-833-511-1163</p>
            <p className="text-sm">or email hi@drinkmoment.com for questions, comments, or just to say hello!</p>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-8 text-center text-sm">
          ©2023 Moment of Calm Inc. All rights reserved. Moment® is a registered trademark
        </div>
      </div>
    </footer>
  );

}