"use client"
import { useState } from "react";
import Bookstore from "./components/Bookstore";
import Filter from "./components/Filter";

export default function Home() {
  const [filters, setFilters] = useState({
    color: null,
    genre: null,
    price: null,
    availability: null,
    sort: null,
  });

  return (
    <div className="flex w-[80%] justify-center items-center flex-col">
      <Filter filters={filters} setFilters={setFilters} />
      <Bookstore filters={filters} />
    </div>
  );
}