import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";

function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  // console.log(offerListings)
  // console.log(rentListings)
  // console.log(saleListings)
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch(`/api/listing/getListing?offer=true&limit=4`);
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
          return;
        }
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch(`/api/listing/getListing?type=rent&limit=4`);
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
          return;
        }
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSaleListings = async () => {
      try {
        const res = await fetch(`/api/listing/getListing?type=sale&limit=4`);
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
          return;
        }
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <div>
      <div className="flex flex-col gap-6 py-28 px-10 max-w-7xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-5xl ">
          Welcome to Your Next <span className="text-slate-500">Chapter</span>
          <br />: Let's Find Your Dream Home Together{" "}
        </h1>
        <div className="text-gray-500 text-xs sm:text-sm italic">
          Discover your dream home with StayAndSellHub,
          <br />
          your ultimate destination for renting and buying properties.
          <br /> Find the perfect sanctuary that speaks to your soul, curated
          just for you
        </div>
        <Link
          className="text-xs sm:text-sm text-blue-700 font-bold hover:underline"
          to={"/search"}
        >
          Let's start now...
        </Link>
      </div>
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[480px]"
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="max-w-[1400px] mx-auto">
        {offerListings && offerListings.length > 0 && (
          <div className="flex flex-col">
            <div className="my-3">
              <h1 className="text-2xl font-semibold text-slate-600">Recent Offer</h1>
              <Link className="text-sm text-blue-600 hover:underline " to={"/search?offer=true"}>Show more offers</Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
         {rentListings && rentListings.length > 0 && (
          <div className="flex flex-col">
            <div className="my-3">
              <h1 className="text-2xl font-semibold text-slate-600">Recent Place for Rent</h1>
              <Link className="text-sm text-blue-600 hover:underline " to={"/search?type=rent"}>Show more rent</Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
         {saleListings && saleListings.length > 0 && (
          <div className="flex flex-col">
            <div className="my-3">
              <h1 className="text-2xl font-semibold text-slate-600">Recent Place for sale</h1>
              <Link className="text-sm text-blue-600 hover:underline " to={"/search?type=sale"}>Show more Sale</Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
