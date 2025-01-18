"use client"
import { useState, useEffect } from "react";
import books from "../data/books";
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export default function Bookstore({ filters }) {
    const [hoveredBookIndex, setHoveredBookIndex] = useState(null);
    const [selectedBook, setSelectedBook] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState(null);

    const filteredBooks = books.filter((book) => {
        const matchesColor = !filters.color || book.colors.includes(filters.color);
        const matchesGenre = !filters.genre || book.categories.includes(filters.genre);
        const matchesPrice = !filters.price || (
            (filters.price === '0-10' && parseFloat(book.price.slice(1)) <= 10) ||
            (filters.price === '10-20' && parseFloat(book.price.slice(1)) > 10 && parseFloat(book.price.slice(1)) <= 20) ||
            (filters.price === '20-30' && parseFloat(book.price.slice(1)) > 20 && parseFloat(book.price.slice(1)) <= 30) ||
            (filters.price === '30+' && parseFloat(book.price.slice(1)) > 30)
        );
        const matchesAvailability = !filters.availability || (
            (filters.availability === 'In Stock' && book.availability === 'In Stock') ||
            (filters.availability === 'Out of Stock' && book.availability === 'Out of Stock') ||
            (filters.availability === 'Pre-Order' && book.availability === 'Pre-Order')
        );

        return matchesColor && matchesGenre && matchesPrice && matchesAvailability;
    });

    const sortedBooks = filteredBooks.sort((a, b) => {
        switch (filters.sort) {
            case 'bestselling':
                return b.sales - a.sales;
            case 'alphabetically':
                return a.title.localeCompare(b.title);
            case 'price_low_high':
                return parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1));
            case 'price_high_low':
                return parseFloat(b.price.slice(1)) - parseFloat(a.price.slice(1));
            case 'date':
                return new Date(b.date) - new Date(a.date);
            default:
                return 0;
        }
    });

    const handleBookClick = (book) => {
        setSelectedBook(book);
        setSelectedColor(book.colors[0]);
        setQuantity(1);
    };

    const handleCloseModal = () => {
        setSelectedBook(null);
    };

    const handleQuantityChange = (amount) => {
        setQuantity((prevQuantity) => Math.max(1, prevQuantity + amount));
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectedBook && !event.target.closest(".modal-content")) {
                handleCloseModal();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [selectedBook]);

    return (
        <div className="flex w-full justify-center items-center">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {sortedBooks.map((book, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center justify-between bg-[#731212] text-white border rounded-md shadow-md w-[280px]"
                        onMouseEnter={() => setHoveredBookIndex(index)}
                        onMouseLeave={() => setHoveredBookIndex(null)}
                        onClick={() => handleBookClick(book)}
                    >
                        <div className="flex flex-col items-center w-full">
                            <img
                                src={hoveredBookIndex === index ? book.images[1] : book.images[0]}
                                alt={book.title}
                                className="w-full h-72 object-cover mb-4 duration-300"
                            />
                            <h2 className="text-l">{book.title}</h2>
                            <p className="mb-2">{book.price}</p>
                        </div>
                        <div className="flex w-full justify-center items-center">
                            <button className="border-4 border-white w-full mt-4 mb-3 mx-3 py-2 rounded-xl">Add to cart</button>
                        </div>
                    </div>
                ))}
            </div>

            {selectedBook && (
                <div

                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                >
                    <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                     className="modal-content bg-white rounded-lg shadow-lg p-6 md:h-3/4 w-full max-w-6xl relative overflow-y-scroll">

                        <div className="md:flex w-full justify-center items-center">
                            <div className="flex w-full justify-center items-center">
                            <img src={selectedBook.images[0]} alt={selectedBook.title} className="md:[40%] flex justify-center items-center w-[70%] h-auto object-cover rounded-md" />
                            </div>
                            <div className="ml-6 flex flex-col w-[100%] md:px-8">
                                <div>
                                    <h2 className="text-5xl font-Cormo mb-2">{selectedBook.title}</h2>
                                    <p className="text-3xl font-Cormo mb-2">{selectedBook.price}</p>
                                    <p className="mb-2 text-sm">Colors: <br />
                                        {selectedBook.colors.map((color) => (
                                            <span
                                                key={color}
                                                className={`inline-block text-center rounded-lg p-2 px-3 mt-3 w-[70px] mr-2 border-black border-2 cursor-pointer ${selectedColor === color ? 'text-white bg-black' : ''}`}
                                                onClick={() => setSelectedColor(color)}
                                            >{color}</span>
                                        ))}
                                    </p>
                                    <p className="mb-2 text-sm"><br /> <span>{selectedBook.categories.join(", ")}</span></p>
                                    <p className="mb-2 text-sm">{selectedBook.desc}</p>
                                </div>
                                <div className="flex items-center justify-center mt-4 p-4 border rounded-md w-28">
                                    <button className="" onClick={() => handleQuantityChange(-1)}>
                                        <Minus />
                                    </button>
                                    <span className="mx-4">{quantity}</span>
                                    <button className="" onClick={() => handleQuantityChange(1)}>
                                        <Plus />
                                    </button>
                                </div>
                                <div className="flex flex-col gap-4 mt-4">
                                    <button className="bg-transparent border-4 border-[#731212] text-{#731212} px-4 py-2 rounded-md">Add to Cart</button>
                                    <button className="bg-[#731212] text-white px-4 py-2 rounded-md">Buy Now</button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}