import React from "react";

function Search() {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-6 border-b-2 md:border-r-2 md:min-h-screen">
        <form className="flex flex-col gap-5 bg-gray-100 p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap">Search Term:</label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search....."
              className="border rounded-lg w-full p-3 bg-white focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="flex gap-2 items-center flex-wrap">
            <label className="font-semibold">Type:</label>
            <div className="flex gap-1 items-center">
              <input type="checkbox" id="all" className="w-5 h-5" />
              <span className="text-gray-700">Rent & Sale</span>
            </div>
            <div className="flex gap-1 items-center">
              <input type="checkbox" id="rent" className="w-5 h-5" />
              <span className="text-gray-700">Rent</span>
            </div>
            <div className="flex gap-1 items-center">
              <input type="checkbox" id="sale" className="w-5 h-5" />
              <span className="text-gray-700">Sale</span>
            </div>
            <div className="flex gap-1 items-center">
              <input type="checkbox" id="offer" className="w-5 h-5" />
              <span className="text-gray-700">Offer</span>
            </div>
          </div>
          <div className="flex gap-2 items-center flex-wrap">
            <label className="font-semibold">Amenities:</label>
            <div className="flex gap-1 items-center">
              <input type="checkbox" id="parking" className="w-5 h-5" />
              <span className="text-gray-700">Parking</span>
            </div>
            <div className="flex gap-1 items-center">
              <input type="checkbox" id="furnished" className="w-5 h-5" />
              <span className="text-gray-700">Furnished</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <select
              id="sort_order"
              className="border rounded-lg p-2 bg-white focus:outline-none focus:ring focus:border-blue-300"
            >
              <option>Price High to Low</option>
              <option>Price Low to High</option>
              <option>Latest</option>
              <option>Oldest</option>
            </select>
          </div>
          <button className="bg-[#40407a] p-2 rounded-lg uppercase text-white font-semibold hover:opacity-90">
            Search
          </button>
        </form>
      </div>
      <div className="">
        <h1 className="text-3xl font-semibold border-b p-3 ">
          Listing results:
        </h1>
      </div>
    </div>
  );
}

export default Search;
