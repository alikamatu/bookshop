"use client"
import { ChevronDown, ChevronUp, Search, ShoppingBag, User, Menu } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from 'next/link';
import MobileMenu from './MobileMenu';

export default function Navbar() {
    const [isAccessoriesDropdownOpen, setIsAccessoriesDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleAccessoriesDropdown = () => {
        setIsAccessoriesDropdownOpen(!isAccessoriesDropdownOpen);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsAccessoriesDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="flex w-full justify-between items-center p-6 bg-white sticky top-0 z-50">
            <div className="flex gap-5 justify-center items-center">
                <img src="/assets/logo.webp" className="w-14 h-14" alt="" />
                <div className="hidden md:flex gap-3">
                    <Link href="/" className="hover:underline cursor-pointer">Home</Link>
                    <p className="flex gap-2 hover:underline cursor-pointer">Shop Books <ChevronDown /></p>
                    <div className="relative" ref={dropdownRef}>
                        <p className="flex gap-2 hover:underline cursor-pointer" onClick={toggleAccessoriesDropdown}>
                            Accessories 
                            {isAccessoriesDropdownOpen ? <ChevronUp /> : <ChevronDown />}
                        </p>
                        {isAccessoriesDropdownOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute top-full left-0 mt-2 w-[300px] bg-white shadow-lg border rounded-md z-50"
                            >
                                <p className="p-2 hover:bg-gray-100 cursor-pointer">Reading Accessories</p>
                                <p className="p-2 hover:bg-gray-100 cursor-pointer">Journals & Planning</p>
                                <p className="p-2 hover:bg-gray-100 cursor-pointer">Bookmarks</p>
                                <p className="p-2 hover:bg-gray-100 cursor-pointer">Stationaries</p>
                            </motion.div>
                        )}
                    </div>
                    <Link href="/best-sellers" className="hover:underline cursor-pointer">Best Sellers</Link>
                    <p className="hover:underline cursor-pointer">About</p>
                    <p className="hover:underline cursor-pointer">Contact Us</p>
                </div>
            </div>
            <div className="flex gap-4">
                <Search className="hidden md:block" />
                <User className="hidden md:block" />
                <ShoppingBag className="hidden md:block" />
                <Menu className="md:hidden cursor-pointer" onClick={toggleMobileMenu} />
            </div>
            <MobileMenu isOpen={isMobileMenuOpen} toggleMenu={toggleMobileMenu} />
        </div>
    );
}