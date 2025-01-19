"use client"
import { useState } from "react";
import Filter from "./Filter";
import Bookstore from "./Bookstore";

export default function Landing() {
    const [filters, setFilters] = useState({
        color: null,
        genre: null,
        price: null,
        availability: null,
        sort: null,
      });
    return (
        <div className="flex flex-col w-full px-2 md:px-0 md:w-[80%] justify-center items-center">
            <Filter filters={filters} setFilters={setFilters} />
            <Bookstore filters={filters} />
        </div>
    );
}