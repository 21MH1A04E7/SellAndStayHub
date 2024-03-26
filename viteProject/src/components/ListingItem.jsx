import React from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
function ListingItem({ listing }) {
  return (
    <div className="bg-slate-100 flex flex-col hover:shadow-lg transition-shadow shadow-md overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0]}
          alt="image1"
          className="h-[330px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
      </Link>
      <div className="p-4 flex flex-col gap-2 w-full">
        <p className="text-lg font-semibold text-slate-700 truncate">
          {listing.name}
        </p>
        <div className="flex items-center gap-1">
          <FaMapMarkerAlt className="text-green-600" />
          <p className="text-sm text-gray-600 truncate w-full">
            {listing.address}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600 line-clamp-3">
            {listing.description}
          </p>
          <p className="text-slate-500 mt-2 font-semibold flex items-center">
            {listing.offer
              ? listing.discountPrices.toLocaleString("en-US")
              : listing.regularPrice.toLocaleString("en-US")}
            {listing.type === "rent" && "/ month"}
          </p>
        </div>
        <div className="text-slate-600 flex gap-5">
          <div className="font-bold text-sm">
            {listing.bedroom > 1
              ? `${listing.bedroom} beds`
              : `${listing.bedroom} bed`}
          </div>
          <div className="font-bold text-sm">
            {listing.bathroom > 1
              ? `${listing.bathroom} baths`
              : `${listing.bathroom} bath`}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingItem;
// 6601d1719a4e482067818f1f
