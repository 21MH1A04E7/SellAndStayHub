import React from "react";

function CreateListing() {
  return (
    <>
      <main className="p-3 max-w-4xl mx-auto">
        <h1 className="text-xl font-semibold text-center my-6 sm:text-3xl">
          Create Rooms
        </h1>
        <form className="flex flex-col sm:flex-row gap-6">
          <div className="flex flex-col gap-3 flex-1">
            <input
              type="text"
              placeholder="Name"
              id="Name"
              className="rounded-lg bg-slate-200 p-2 sm:p-3 focus:outline-none"
              maxLength={60}
              minLength={7}
              required
            />
            <textarea
              placeholder="Description"
              id="Description"
              className="rounded-lg bg-slate-200 p-2 sm:p-3 focus:outline-none"
              required
            />
            <input
              type="text"
              placeholder="Address"
              id="Address"
              className="rounded-lg bg-slate-200 p-2 sm:p-3 focus:outline-none"
              required
            />
            <div className="flex gap-6 flex-wrap">
              <div className="flex gap-2">
                <input type="checkbox" id="sale" className="w-5" />
                <label htmlFor="sale">Sell</label>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" id="rent" className="w-5" />
                <label htmlFor="rent">Rent</label>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" id="parking-spot" className="w-5" />
                <label htmlFor="parking-spot">Parking Spot</label>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" id="furnished" className="w-5" />
                <label htmlFor="furnished">Furnished</label>
              </div>
              <div className="flex gap-2">
                <input type="checkbox" id="other" className="w-5" />
                <label htmlFor="other">Other</label>
              </div>
            </div>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder=""
                  id="bedrooms"
                  min="1"
                  max="20"
                  required
                  className="bg-gray-200 p-2 rounded-lg border-red-400"
                />
                <label htmlFor="bedrooms">Beds</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="bathroom"
                  min="1"
                  max="6"
                  required
                  className="bg-gray-200 p-2 rounded-lg border-red-400"
                />
                <label htmlFor="bathroom">Baths</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="regular-price"
                  min="1"
                  max="20"
                  required
                  className="bg-gray-200 p-2 rounded-lg border-red-400"
                />
                <div className="flex flex-col items-center ">
                  <p>Regular Price</p>
                  <span className="text-xs">($ / months)</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder=""
                  id="discount-price"
                  min="1"
                  max="20"
                  required
                  className="bg-gray-200 p-2 rounded-lg border-red-400"
                />
                <div className="flex flex-col items-center ">
                  <p>Discounted Price</p>
                  <span className="text-xs">($ / months)</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-1 flex-col ">
            <p className="font-semibold px-3">
              Images:
              <span className="font-normal italic  text-[#EA2027] ml-2">
                The first image will be the cover (max 6)
              </span>
            </p>
            <div className="flex gap-5 items-center">
              <input
                type="file"
                className="p-3 rounded w-full outline:none"
                id="images"
                accept="image/*"
                multiple
              />
              <button className="px-3 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-600 hover:text-white transition duration-300 ease-in-out focus:bg-[#0652DD]">
                Upload
              </button>
            </div>
            <button className="p-2 bg-[#833471] text-white border border-green rounded-lg ml-3 transition hover:opacity-90 duration-300 ease-in-out focus:bg-[#cf6a87]">Create Room</button>
          </div>
        </form>
      </main>
    </>
  );
}

export default CreateListing;
