import { ChevronDown, ChevronUp, Filter as FilterIcon, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function Filter({ filters, setFilters }) {
    const [colorDropdownOpen, setColorDropdownOpen] = useState(false);
    const [genreDropdownOpen, setGenreDropdownOpen] = useState(false);
    const [priceDropdownOpen, setPriceDropdownOpen] = useState(false);
    const [availabilityDropdownOpen, setAvailabilityDropdownOpen] = useState(false);
    const [isFilterWindowOpen, setIsFilterWindowOpen] = useState(false);

    const colorRef = useRef();
    const genreRef = useRef();
    const priceRef = useRef();
    const availabilityRef = useRef();

    const handleFilterChange = (filterType, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [filterType]: value,
        }));
    };

    const handleResetFilters = () => {
        setFilters({
            color: null,
            genre: null,
            price: null,
            availability: null,
            sort: null,
        });
    };

    const handleClickOutside = (event) => {
        if (colorRef.current && !colorRef.current.contains(event.target)) {
            setColorDropdownOpen(false);
        }
        if (genreRef.current && !genreRef.current.contains(event.target)) {
            setGenreDropdownOpen(false);
        }
        if (priceRef.current && !priceRef.current.contains(event.target)) {
            setPriceDropdownOpen(false);
        }
        if (availabilityRef.current && !availabilityRef.current.contains(event.target)) {
            setAvailabilityDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="w-full">
            <div className="flex justify-between items-center px-7 py-4 bg-white my-8">
                <div className="hidden md:flex gap-3">
                    <span>Filter:</span>
                    <div className="relative" ref={colorRef}>
                        <p
                            className="flex justify-center items-center text-gray-500 cursor-pointer"
                            onClick={() => setColorDropdownOpen(!colorDropdownOpen)}
                        >
                            Color {colorDropdownOpen ? <ChevronUp /> : <ChevronDown />}
                        </p>
                        {colorDropdownOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg border rounded-md"
                            >
                                <p className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleFilterChange('color', 'Red')}>Red</p>
                                <p className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleFilterChange('color', 'Blue')}>Blue</p>
                                <p className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleFilterChange('color', 'Green')}>Green</p>
                                <p className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleFilterChange('color', 'Yellow')}>Yellow</p>
                            </motion.div>
                        )}
                    </div>
                    <div className="relative" ref={genreRef}>
                        <p
                            className="flex justify-center items-center text-gray-500 cursor-pointer"
                            onClick={() => setGenreDropdownOpen(!genreDropdownOpen)}
                        >
                            Genre {genreDropdownOpen ? <ChevronUp /> : <ChevronDown />}
                        </p>
                        {genreDropdownOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg border rounded-md"
                            >
                                <p className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleFilterChange('genre', 'Fiction')}>Fiction</p>
                                <p className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleFilterChange('genre', 'Non-Fiction')}>Non-Fiction</p>
                                <p className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleFilterChange('genre', 'Science Fiction')}>Science Fiction</p>
                                <p className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleFilterChange('genre', 'Fantasy')}>Fantasy</p>
                            </motion.div>
                        )}
                    </div>
                    <div className="relative" ref={priceRef}>
                        <p
                            className="flex justify-center items-center text-gray-500 cursor-pointer"
                            onClick={() => setPriceDropdownOpen(!priceDropdownOpen)}
                        >
                            Price {priceDropdownOpen ? <ChevronUp /> : <ChevronDown />}
                        </p>
                        {priceDropdownOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg border rounded-md"
                            >
                                <p className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleFilterChange('price', '0-10')}>$0 - $10</p>
                                <p className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleFilterChange('price', '10-20')}>$10 - $20</p>
                                <p className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleFilterChange('price', '20-30')}>$20 - $30</p>
                                <p className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleFilterChange('price', '30+')}>$30+</p>
                            </motion.div>
                        )}
                    </div>
                    <div className="relative" ref={availabilityRef}>
                        <p
                            className="flex justify-center items-center text-gray-500 cursor-pointer"
                            onClick={() => setAvailabilityDropdownOpen(!availabilityDropdownOpen)}
                        >
                            Availability {availabilityDropdownOpen ? <ChevronUp /> : <ChevronDown />}
                        </p>
                        {availabilityDropdownOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg border rounded-md"
                            >
                                <p className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleFilterChange('availability', 'In Stock')}>In Stock</p>
                                <p className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleFilterChange('availability', 'Out of Stock')}>Out of Stock</p>
                                <p className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleFilterChange('availability', 'Pre-Order')}>Pre-Order</p>
                            </motion.div>
                        )}
                    </div>
                </div>
                <div className="flex w-full md:hidden justify-between items-center gap-4">  
                <div className="flex items-center text-xs">
                    <span className="mr-2 text-xs">Sort:</span>
                    <select className="border rounded-md p-2" onChange={(e) => handleFilterChange('sort', e.target.value)}>
                        <option value="featured">Featured</option>
                        <option value="bestselling">Bestselling</option>
                        <option value="alphabetically">Alphabetically</option>
                        <option value="price_low_high">Price: Low to High</option>
                        <option value="price_high_low">Price: High to Low</option>
                        <option value="date">Date</option>
                    </select>
                </div>
            </div>
            <div className="md:hidden flex justify-end p-4 text-xs">
                <button onClick={() => setIsFilterWindowOpen(true)} className="flex items-center gap-2 text-gray-500">
                    <FilterIcon size={20} />
                    <span>Filter</span>
                </button>
            </div>
            </div>
            {isFilterWindowOpen && (
                <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 bg-white h-full w-full z-50 p-6 overflow-y-auto text-xs"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">Filters</h2>
                        <button onClick={() => setIsFilterWindowOpen(false)} className="text-gray-500">
                            <X size={20} />
                        </button>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="relative" ref={colorRef}>
                            <p
                                className="flex justify-between items-center text-gray-500 cursor-pointer"
                                onClick={() => setColorDropdownOpen(!colorDropdownOpen)}
                            >
                                Color {colorDropdownOpen ? <ChevronUp /> : <ChevronDown />}
                            </p>
                            {colorDropdownOpen && (
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: 'auto' }}
                                    exit={{ height: 0 }}
                                    className="overflow-hidden"
                                >
                                    <p className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleFilterChange('color', 'Red')}>Red</p>
                                    <p className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleFilterChange('color', 'Blue')}>Blue</p>
                                    <p className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleFilterChange('color', 'Green')}>Green</p>
                                    <p className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleFilterChange('color', 'Yellow')}>Yellow</p>
                                </motion.div>
                            )}
                        </div>
                        <div className="relative" ref={genreRef}>
                            <p
                                className="flex justify-between items-center text-gray-500 cursor-pointer"
                                onClick={() => setGenreDropdownOpen(!genreDropdownOpen)}
                            >
                                Genre {genreDropdownOpen ? <ChevronUp /> : <ChevronDown />}
                            </p>
                            {genreDropdownOpen && (
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: 'auto' }}
                                    exit={{ height: 0 }}
                                    className="overflow-hidden"
                                >
                                    <p className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleFilterChange('genre', 'Fiction')}>Fiction</p>
                                    <p className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleFilterChange('genre', 'Non-Fiction')}>Non-Fiction</p>
                                    <p className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleFilterChange('genre', 'Science Fiction')}>Science Fiction</p>
                                    <p className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleFilterChange('genre', 'Fantasy')}>Fantasy</p>
                                </motion.div>
                            )}
                        </div>
                        <div className="relative" ref={priceRef}>
                            <p
                                className="flex justify-between items-center text-gray-500 cursor-pointer"
                                onClick={() => setPriceDropdownOpen(!priceDropdownOpen)}
                            >
                                Price {priceDropdownOpen ? <ChevronUp /> : <ChevronDown />}
                            </p>
                            {priceDropdownOpen && (
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: 'auto' }}
                                    exit={{ height: 0 }}
                                    className="overflow-hidden"
                                >
                                    <p className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleFilterChange('price', '0-10')}>$0 - $10</p>
                                    <p className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleFilterChange('price', '10-20')}>$10 - $20</p>
                                    <p className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleFilterChange('price', '20-30')}>$20 - $30</p>
                                    <p className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleFilterChange('price', '30+')}>$30+</p>
                                </motion.div>
                            )}
                        </div>
                        <div className="relative" ref={availabilityRef}>
                            <p
                                className="flex justify-between items-center text-gray-500 cursor-pointer"
                                onClick={() => setAvailabilityDropdownOpen(!availabilityDropdownOpen)}
                            >
                                Availability {availabilityDropdownOpen ? <ChevronUp /> : <ChevronDown />}
                            </p>
                            {availabilityDropdownOpen && (
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: 'auto' }}
                                    exit={{ height: 0 }}
                                    className="overflow-hidden"
                                >
                                    <p className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleFilterChange('availability', 'In Stock')}>In Stock</p>
                                    <p className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleFilterChange('availability', 'Out of Stock')}>Out of Stock</p>
                                    <p className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleFilterChange('availability', 'Pre-Order')}>Pre-Order</p>
                                </motion.div>
                            )}
                        </div>
                        <div className="flex items-center mt-4">
                            <span className="mr-2">Sort by:</span>
                            <select className="border rounded-md p-2 w-full" onChange={(e) => handleFilterChange('sort', e.target.value)}>
                                <option value="featured">Featured</option>
                                <option value="bestselling">Bestselling</option>
                                <option value="alphabetically">Alphabetically</option>
                                <option value="price_low_high">Price: Low to High</option>
                                <option value="price_high_low">Price: High to Low</option>
                                <option value="date">Date</option>
                            </select>
                        </div>
                        <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md w-full" onClick={handleResetFilters}>Reset</button>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
