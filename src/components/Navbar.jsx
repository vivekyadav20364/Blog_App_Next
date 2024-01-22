// import Link from 'next/link';
// import React from 'react'
// import { FaBars } from "react-icons/fa6";

// const Navbar = () => {
//   const dummyArray =[
//     {name:"Home",link:"/"},
//     {name:"About",link:""},
//     {name:"Contact",link:""},
//     {name:"Company",link:""},
//   ]
  
//   return (
    
// <nav className="bg-gray-900 border-gray-200 ">
//   <div className="max-w-screen-xl w-full flex flex-wrap items-center justify-between mx-auto p-4">
//     <Link href={dummyArray[0].link}><div className='flex justify-center items-center'>
//         <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">BlogApp</span>
//         </div>
//         </Link>    
//     <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm  rounded-lg md:hidden  focus:outline-none focus:ring-2  text-gray-400 hover:bg-gray-700 focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
//         <span className="sr-only">Open main menu</span>
//         <FaBars className='text-xl text-white' />
//     </button>
//     <div className="hidden w-full md:block md:w-auto" id="navbar-default">
//       <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 bg-gray-800 md:bg-gray-900 dark:border-gray-700">
//         {dummyArray.map((items)=>(
//         <li key={items.name}>
//         <Link href={items.link} className="block py-2 px-3 rounded  md:border-0  md:p-0 text-white md:hover:text-orange-400 hover:bg-gray-700 hover:text-white md:hover:bg-transparent">{items.name}</Link>
//        </li>
//         ))}
//         <Link href={'/blog'} className='block py-[0.4rem] px-3 rounded  md:border-0 bg-orange-400 md:hover:bg-orange-400 hover:bg-gray-700 text-white cursor-pointer'>Create</Link>
//       </ul>
//     </div>
//   </div>
// </nav>

//   )
// }

// export default Navbar
"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa6';

const Navbar = () => {
  const dummyArray = [
    { name: 'Home', link: '/' },
    { name: 'About', link: '' },
    { name: 'Contact', link: '' },
    { name: 'Company', link: '' },
  ];

  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-900 border-gray-200 relative z-10">
      <div className="max-w-screen-xl w-full flex flex-wrap items-center justify-between mx-auto p-4 relative">
        <Link href={dummyArray[0].link}>
          <div className="flex justify-center items-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">BlogApp</span>
          </div>
        </Link>
        <button
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen}
          onClick={toggleMenu}
        >
          <span className="sr-only">Open main menu</span>
          <FaBars className="text-xl text-white" />
        </button>
        <div
          className={`${
            isMenuOpen ? 'absolute' : 'hidden md:block'
          } w-full   md:w-auto top-full left-0 md:relative md:flex md:flex-col md:items-center`}
          id="navbar-default"
        >
          <ul className="font-medium mx-2 flex flex-col p-4 md:p-0 mt-2 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 bg-gray-800 md:bg-gray-900 dark:border-gray-700">
            {dummyArray.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.link}
                  className="block py-2 px-3 rounded md:border-0 md:p-0 text-white md:hover:text-orange-400 hover:bg-gray-700 hover:text-white md:hover:bg-transparent"
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <Link
              href={'/blog'}
              className="block py-[0.4rem] px-3 rounded md:border-0 bg-orange-400 md:hover:bg-orange-400 hover:bg-gray-700 text-white cursor-pointer"
            >
              Create Blog
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

