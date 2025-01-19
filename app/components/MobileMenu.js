"use client"
import { motion } from "framer-motion";
import Link from 'next/link';
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function MobileMenu({ isOpen, toggleMenu }) {
    const [isAccessoriesDropdownOpen, setIsAccessoriesDropdownOpen] = useState(false);

    const toggleAccessoriesDropdown = () => {
        setIsAccessoriesDropdownOpen(!isAccessoriesDropdownOpen);
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);

    return (
        <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: isOpen ? 0 : '-100%' }}
            transition={{ duration: 0.3 }}
            className={`fixed inset-0 bg-white h-full w-full z-50 p-6 overflow-y-hidden ${isOpen ? 'block' : 'hidden'}`}
        >
            <div className="flex justify-between items-center mb-6">
                <img src="/assets/logo.webp" className="w-14 h-14" alt="" />
                <button onClick={toggleMenu} className="text-gray-500">
                    <X size={20} />
                </button>
            </div>
            <div className="flex flex-col gap-4">
                <Link href="/" className="hover:underline cursor-pointer" onClick={toggleMenu}>Home</Link>
                <p className="flex gap-2 hover:underline cursor-pointer">Shop Books <ChevronDown /></p>
                <div className="relative">
                    <p className="flex gap-2 hover:underline cursor-pointer" onClick={toggleAccessoriesDropdown}>
                        Accessories 
                        {isAccessoriesDropdownOpen ? <ChevronUp /> : <ChevronDown />}
                    </p>
                    {isAccessoriesDropdownOpen && (
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            className="overflow-hidden"
                        >
                            <p className="p-2 hover:bg-gray-100 cursor-pointer">Reading Accessories</p>
                            <p className="p-2 hover:bg-gray-100 cursor-pointer">Journals & Planning</p>
                            <p className="p-2 hover:bg-gray-100 cursor-pointer">Bookmarks</p>
                            <p className="p-2 hover:bg-gray-100 cursor-pointer">Stationaries</p>
                        </motion.div>
                    )}
                </div>
                <Link href="/best-sellers" className="hover:underline cursor-pointer" onClick={toggleMenu}>Best Sellers</Link>
                <p className="hover:underline cursor-pointer">About</p>
                <p className="hover:underline cursor-pointer">Contact Us</p>
            </div>
        </motion.div>
    );
}