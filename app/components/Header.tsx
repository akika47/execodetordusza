"use client";

import '../Styles/Header.css'

import Link from "next/link";


const Header = () => {

  return (
    <nav>
      <ul className="menu">
        <li><Link href="/">Home</Link> </li>
        <li><Link href="/News">News</Link> </li>
        <li><Link href="/About">About</Link></li>


        <li className='rightMenu'><Link href="/Login">Login</Link> </li>
        <li className='rightMenu'><Link href="/Register">Register</Link></li>
      </ul>
    </nav>
  );
};

export default Header;
