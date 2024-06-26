import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem";
function Search() {
  const navigate=useNavigate();
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore,setShowMore] = useState(false);
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'created_at',
    order: 'desc',
  });
  // console.log(sidebardata)
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const parkingFromUrl = urlParams.get('parking');
    const furnishedFromUrl = urlParams.get('furnished');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        parking: parkingFromUrl === 'true' ? true : false,
        furnished: furnishedFromUrl === 'true' ? true : false,
        offer: offerFromUrl === 'true' ? true : false,
        sort: sortFromUrl || 'createdAt',
        order: orderFromUrl || 'desc',
      });
    }

    const fetchListings = async () => {
      setShowMore(false)
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/getListing?${searchQuery}`);
      const data = await res.json();
      if(data.length>8){
        setShowMore(true)
      }else{
        setShowMore(false)
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);
  // console.log(listings)
  const handleChange = (e) => {
    if (
      e.target.id === 'all' ||
      e.target.id === 'rent' ||
      e.target.id === 'sale'
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === 'searchTerm') {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === 'true' ? true : false,
      });
    }

    if (e.target.id === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'created_at';

      const order = e.target.value.split('_')[1] || 'desc';

      setSidebardata({ ...sidebardata, sort, order });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebardata.searchTerm);
    urlParams.set('type', sidebardata.type);
    urlParams.set('parking', sidebardata.parking);
    urlParams.set('furnished', sidebardata.furnished);
    urlParams.set('offer', sidebardata.offer);
    urlParams.set('sort', sidebardata.sort);
    urlParams.set('order', sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  const onshowMoreClick=async ()=>{
    const numberofListing=listings.length;
    const startIndex = numberofListing;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/getListing?${searchQuery}`);
    const data = await res.json();
    if(data.length<9){
      setShowMore(false)
    }
    setListings([...listings,...data])
  }
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-6 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 bg-gray-100 p-6 rounded-lg shadow-md">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap">Search Term:</label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search....."
              className="border rounded-lg w-full p-3 bg-white focus:outline-none focus:ring focus:border-blue-300"
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-2 items-center flex-wrap">
            <label className="font-semibold">Type:</label>
            <div className="flex gap-1 items-center">
              <input
                type="checkbox"
                id="all"
                className="w-5 h-5"
                checked={sidebardata.type ==="all"}
                onChange={handleChange}
              />
              <span className="text-gray-700">Rent & Sale</span>
            </div>
            <div className="flex gap-1 items-center">
              <input
                type="checkbox"
                id="rent"
                className="w-5 h-5"
                checked={sidebardata.type === "rent"}
                onChange={handleChange}
              />
              <span className="text-gray-700">Rent</span>
            </div>
            <div className="flex gap-1 items-center">
              <input
                type="checkbox"
                id="sale"
                className="w-5 h-5"
                checked={sidebardata.type === "sale"}
                onChange={handleChange}
              />
              <span className="text-gray-700">Sale</span>
            </div>
            <div className="flex gap-1 items-center">
              <input
                type="checkbox"
                id="offer"
                className="w-5 h-5"
                checked={sidebardata.offer}
                onChange={handleChange}
              />
              <span className="text-gray-700">Offer</span>
            </div>
          </div>
          <div className="flex gap-2 items-center flex-wrap">
            <label className="font-semibold">Amenities:</label>
            <div className="flex gap-1 items-center">
              <input
                type="checkbox"
                id="parking"
                className="w-5 h-5"
                checked={sidebardata.parking}
                onChange={handleChange}
              />
              <span className="text-gray-700">Parking</span>
            </div>
            <div className="flex gap-1 items-center">
              <input
                type="checkbox"
                id="furnished"
                className="w-5 h-5"
                checked={sidebardata.furnished}
                onChange={handleChange}
              />
              <span className="text-gray-700">Furnished</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <select
              id="sort_order"
              className="border rounded-lg p-2 bg-white focus:outline-none focus:ring focus:border-blue-300"
              defaultValue={'createdAt_desc'}
              onChange={handleChange}
            >
              <option value="regularPrice_desc">Price High to Low</option>
              <option value="regularPrice_asc">Price Low to High</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="bg-[#40407a] p-2 rounded-lg uppercase text-white font-semibold hover:opacity-90">
            Search
          </button>
        </form>
      </div>
      <div className="p-2 flex-1">
        <h1 className="text-3xl font-semibold border-b p-3 ">
          Listing results:
        </h1>
        <div className="p-5 flex flex-wrap gap-2">
          {!loading && listings.length===0 && (
            <p className="text-lg text-yellow-300 text-center ">No page found!</p>
          )}
          {loading && (
            <p className="text-lg text-green-400 text-center w-full">Loading...</p>
          )}
          {
            !loading && listings && listings.map((listing)=>(
              <ListingItem key={listing._id} listing={listing}/>
            ))
          }
          {showMore && (
            <button onClick={onshowMoreClick} className="text-green-700 hover:underline p-7 text-center w-full">
              ShowMore
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
