"use client";
import Best from "../components/Best";

export default function BestSellers() {

    return (
        <div className="flex flex-col justify-center items-center w-full">
            <img src="/assets/BannersAfrican_authors.webp" className="w-full" alt="" />
            <Best />
            <img src="/assets/BannersChildrens.webp" className="w-full mt-20" alt="" />
        </div>
    );
}
