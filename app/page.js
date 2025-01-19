"use client"
import Landing from "./components/Home";

export default function Home() {


  return (
    <div className="flex flex-col justify-center items-center w-full">
      <img src="/assets/BannersAfrican_authors.webp" className="w-full" alt="" />
      <Landing />
      <img src="/assets/BannersChildrens.webp" className="w-full mt-12" alt="" />
      </div>
  );
}