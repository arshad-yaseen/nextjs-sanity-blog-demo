import Image from "next/image";
import Link from "next/link";
import React from "react";
import MediumLogo from "../public/assets/images/medium.png";

function Header() {
  return (
    <header className="flex z-50 h-20 bg-white items-center sticky top-0">
      <div className="pl-6 flex items-center md:w-[60%] w-[50%]">
        <Link href="/">
          <Image
            src={MediumLogo}
            alt="medium logo"
            priority={true}
            className="h-7 w-fit mr-2"
          />
        </Link>
        <ul className=" items-center md:flex hidden text-slate-600 text-sm">
          <li className="pl-4 mr-1 cursor-pointer hover:text-black">About</li>
          <li className="pl-4 mr-4 cursor-pointer hover:text-black">Contact</li>
          <li className=" cursor-pointer hover:text-black bg-green-600 text-white rounded-full px-6 py-1 flex items-center justify-center">Follow</li>
        </ul>
      </div>

      <div className="pr-6 flex items-center justify-end md:w-[40%] w-[50%]" >

      <ul className="flex items-center text-sm  ">
          <li className="pl-4 mr-4 cursor-pointer sm:flex hidden  text-green-600">Sign in</li>
          <li className=" cursor-pointer text-green-600 border border-slate-400 rounded-full px-6 py-1 flex items-center justify-center">Get Started</li>
        </ul>

      </div>
    </header>
  );
}

export default Header;
