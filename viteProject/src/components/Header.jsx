import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="bg-[#6a89cc] shadow-lg shadow-blue-500/30 ">
      <div className="flex justify-between items-center  mx-auto p-3 sm:px-10">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-2xl flex-wrap">
            <span className="text-slate-500">Stay</span>
            <span className="text-slate-700">AndSell</span>
            <span className="text-slate-900">Hub</span>
          </h1>
        </Link>
        <div className="flex gap-3 items-center">
          <form className="bg-slate-100 flex items-center rounded-lg px-2">
            <input
              type="text"
              placeholder="search..."
              className="rounded-lg bg-transparent focus:outline-none w-28 sm:w-40 py-1 "
            />
            <FaSearch className="searchIcon text-slate-500" />
          </form>
          <ul className="flex gap-3 font-mono uppercase">
            <NavLink to="/" >
              <li className="hidden sm:inline hover:underline text-slate-900">
                Home
              </li>
            </NavLink>
            <NavLink to="about">
              <li className="hidden sm:inline hover:underline text-slate-900 ">
                About
              </li>
            </NavLink>
            <NavLink to="sign-in">
              <li>SignIn</li>
            </NavLink>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
