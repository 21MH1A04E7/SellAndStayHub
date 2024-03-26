import React,{useState,useEffect} from "react";
import { FaSearch } from "react-icons/fa";
import { Link, NavLink ,useNavigate} from "react-router-dom";
import {useSelector} from 'react-redux';

function Header() {
  const navigate=useNavigate();
  const {currentUser}=useSelector(state=>state.user)
  const [searchTerm,setSearchTerm]=useState('')
  const handleSubmit=(e)=>{
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
    // console.log(searchTerm)
  }
useEffect(()=>{
  const urlParams = new URLSearchParams(location.search);
  const searchTermFromUrl = urlParams.get('searchTerm');
  if (searchTermFromUrl) {
    setSearchTerm(searchTermFromUrl);
  }
}, [location.search]);
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
          <form onSubmit={handleSubmit} className="bg-slate-100 flex items-center rounded-lg px-2">
            <input
              type="text"
              value={searchTerm}
              placeholder="search..."
              className="rounded-lg bg-transparent focus:outline-none w-28 sm:w-40 py-1 "
              onChange={(e)=>setSearchTerm(e.target.value)}
            />
            <button>
              <FaSearch className="searchIcon text-slate-500" />
            </button>
          </form>
          <ul className="flex gap-3 font-mono uppercase items-center">
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
            <Link to='/profile'>
            {currentUser ? (
              <img className='rounded-full h- w-9 object-cover' src={currentUser.avatar} alt='profile' />
            ) : (
              <li className=' sm:inline hover:underline text-slate-900 '> Sign in</li>
            )}
            </Link>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
