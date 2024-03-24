import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//npm i swiper
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
function Listing() {
  SwiperCore.use([Navigation]);
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(listing);
  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/getListing/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);
  return (
    <main>
      {loading && (
        <p className="text-green-600 text-center text-lg font-semibold my-5">
          Loading....
        </p>
      )}
      {error && (
        <p className="text-red-500 text-center text-lg font-semibold my-5">
          Someting is wrong....
        </p>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[580px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className="text-2xl font-semibold">
              {listing.name} - ${" "}
              {listing.offer
                ? listing.discountPrices.toLocaleString("en-US")
                : listing.regularPrice.toLocaleString("en-US")}
              {listing.type === "rent" && " / month"}
            </p>
            <p className="flex items-center mt-6 gap-2 text-slate-600  text-sm">
              <FaMapMarkerAlt className="text-green-700" />
              {listing.address}
            </p>
            <div className="flex gap-4">
              <p className="bg-[#B33771] w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listing.offer && (
                <p className="bg-[#006266] w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  ${+listing.regularPrice-+listing.discountPrices} OFF
                </p>
              )}
            </div>
            <p className="text-slate-700">
              <span className="text-black font-semibold ">Description - </span>{listing.description}
            </p>
            <ul className="font-semibold text-md sm:text-lg flex items-center gap-4 sm:gap-6 flex-wrap">
              <li className="flex items-center gap-1 whitespace-nowrap text-[#a448b2]">
                <FaBed className="text-lg"/>
                {listing.bedroom>1?`${listing.bedroom} Beds`:
                `${listing.bedroom} Bed`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap text-[#00a8ff]">
                <FaBath className="text-lg"/>
                {listing.bathroom>1?`${listing.bathroom} Baths`:
                `${listing.bathroom} Bath`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap text-[#686de0]">
                <FaParking className="text-lg"/>
                {listing.parking?`Parking Spot`:
                `No Parking`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap text-[#a55eea]">
                <FaChair className="text-lg"/>
                {listing.furnished?`Furnished`:
                `No Furnished`}
              </li>
            </ul>
          </div>
         
        </div>
      )}
      {/* <p>{listing.name}</p> */}
    </main>
  );
}

export default Listing;
