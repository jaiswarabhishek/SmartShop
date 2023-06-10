import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-[#24292e]   ">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <Link className="text-white text-lg font-semibold mb-4 cursor-pointer">About Us</Link>
            <p className="text-gray-400 cursor-pointer">Welcome to 

 our e-commerce store, we aim to bring together a curated collection of high-quality products from various categories, including fashion, electronics, home decor, and more. Our team handpicks each item, ensuring that it meets our strict standards of quality, style, and functionality.</p>
          </div>
          <div>
            <h2 className="text-white text-lg font-semibold mb-4 cursor-pointer">Categories</h2>
            <ul className="text-gray-400 cursor-pointer">
              <li>Men's Clothing</li>
              <li>Women's Clothing</li>
              <li>Electronics</li>
              <li>Home &amp; Furniture</li>
            </ul>
          </div>
          <div>
            <h2 className="text-white text-lg font-semibold mb-4 cursor-pointer">Customer Service</h2>
            <ul className="text-gray-400 cursor-pointer">
              <li>Shipping &amp; Returns</li>
              <li>Contact Us</li>
              <li>FAQs</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div>
            <h2 className="text-white text-lg font-semibold mb-4 cursor-pointer">Stay Connected</h2>
            <p className="text-gray-400 cursor-pointer">Subscribe to our newsletter for updates and promotions.</p>
            <div className="mt-4">
              <input type="email" placeholder="Enter your email" className="bg-gray-800 rounded-md px-4 py-2 w-full" />
              <button className="bg-indigo-600 text-white rounded-md px-4 py-2 mt-2 w-full">Subscribe</button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-800 py-4">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-400">© 2023 SmartShop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
