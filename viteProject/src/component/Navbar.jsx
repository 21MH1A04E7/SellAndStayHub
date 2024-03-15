import React from "react";
import {FaSearch} from 'react-icons/fa'
import { Link} from "react-router-dom";
import "./Nav.css";
const Navbar=()=>{
    return(
        <nav>
            <div className="flex justify-between w-full bg-[#7f8fa6] px-5 py-3">
                <Link to='/'>
                <h1 className="text-xl pl-2 font-bold drop-shadow-xl">StayAndSell</h1>
                </Link>
                
                <div className="flex gap-3">
                    <form className=" flex items-center gap-1">
                        <input  type='text' placeholder="search" className="rounded"></input>
                        <FaSearch className="searchIcon "/>
                    </form>
                    <ul className="menulist flex gap-4 text-[1.3rem]">
                        <Link to='/'>
                            <li className="">home</li>
                        </Link>
                        <Link to='/about'>
                            <li className="">about</li>
                        </Link>
                        <Link to='/singin'>
                        <li className="item">singin</li>
                        </Link>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
export default Navbar;