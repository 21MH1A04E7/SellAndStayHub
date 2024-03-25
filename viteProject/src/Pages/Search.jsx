import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Search() {
  const navigate=useNavigate();
  const [loading,setLoading]=useState(false);
  const [listing,setListing]=useState([]);
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    sort: "createdAt",
    order: "desc",
    offer: false,
  });
  const handleChange = (e) => {
    if(e.target.id=='all'||e.target.id=='rent'||e.target.id=='sale'){
      setSidebarData({...sidebarData,type:e.target.id})
    };
    if(e.target.id=='searchTerm'){
      setSidebarData({...sidebarData,searchTerm:e.target.value})
    };
    if(e.target.id=='parking'||e.target.id=='furnished'||e.target.id=='offer'){
      setSidebarData({...sidebarData,[e.target.id]:e.target.checked||e.target.checked=='true'?true:false})
    }
    if(e.target.id=='sort_order'){
      const sort=e.target.value.split('_')[0]||'createdAt';
      const order=e.target.value.split('_')[1]||'desc';
      setSidebarData({...sidebarData,sort,order})
    }
  };
  // console.log(sidebarData)
  const handleSubmit=(e)=>{
    e.preventDefault()
    const urlParams=new URLSearchParams()
    urlParams.set('searchTerm',sidebarData.searchTerm)
    urlParams.set('type',sidebarData.type)
    urlParams.set('parking',sidebarData.parking)
    urlParams.set('furnished',sidebarData.furnished)
    urlParams.set('sort',sidebarData.sort)
    urlParams.set('order',sidebarData.order)
    urlParams.set('offer',sidebarData.offer)
    const searchQuery=urlParams.toString()
    navigate(`/search?${searchQuery}`)
  }
  useEffect(()=>{
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
      setSidebarData({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        parking: parkingFromUrl === 'true' ? true : false,
        furnished: furnishedFromUrl === 'true' ? true : false,
        offer: offerFromUrl === 'true' ? true : false,
        sort: sortFromUrl || 'createdAt',
        order: orderFromUrl || 'desc',
      });
    }
    console.log(listing)
    const fetchData=async ()=>{
      try{
        // http://localhost:8080/api/listing/getListing
        setLoading(true);
        const serachQuery=urlParams.toString();
        const res=await fetch(`/api/listing/getListing?${serachQuery}`);
        const data=await res.json();
        setListing(data)
        setLoading(false)
      }catch(error){
        console.log(error)
      }
    }
    fetchData()
  },[location.search])
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
              value={sidebarData.searchTerm}
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
                checked={sidebarData.type === "all"}
                onChange={handleChange}
              />
              <span className="text-gray-700">Rent & Sale</span>
            </div>
            <div className="flex gap-1 items-center">
              <input
                type="checkbox"
                id="rent"
                className="w-5 h-5"
                checked={sidebarData.type === "rent"}
                onChange={handleChange}
              />
              <span className="text-gray-700">Rent</span>
            </div>
            <div className="flex gap-1 items-center">
              <input
                type="checkbox"
                id="sale"
                className="w-5 h-5"
                checked={sidebarData.type === "sale"}
                onChange={handleChange}
              />
              <span className="text-gray-700">Sale</span>
            </div>
            <div className="flex gap-1 items-center">
              <input
                type="checkbox"
                id="offer"
                className="w-5 h-5"
                checked={sidebarData.offer}
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
                checked={sidebarData.parking}
                onChange={handleChange}
              />
              <span className="text-gray-700">Parking</span>
            </div>
            <div className="flex gap-1 items-center">
              <input
                type="checkbox"
                id="furnished"
                className="w-5 h-5"
                checked={sidebarData.furnished}
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
      <div className="p-2">
        <h1 className="text-3xl font-semibold border-b p-3 ">
          Listing results:
        </h1>
      </div>
    </div>
  );
}

export default Search;
