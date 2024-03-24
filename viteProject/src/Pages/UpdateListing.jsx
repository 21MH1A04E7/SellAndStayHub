import React, { useEffect, useState } from "react";
import { app } from "../firebase.js";
import {useSelector} from 'react-redux'
import {useNavigate,useParams} from 'react-router-dom'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

function UpdateListing() {
  const {currentUser}=useSelector(state=>state.user)
  const navigate=useNavigate()
  const params=useParams()
  const [files, setFiles] = useState([]);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [error,setError]=useState(false);
  const [loading,setLoading]=useState(false);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    regularPrice: 20,
    discountPrices: 0,
    bathroom: 1,
    bedroom: 1,
    furnished: false,
    parking: false,
    type: "rent",
    offer: false,
  });
  // console.log(formData);
  //fetching the listing
  useEffect(()=>{
    const fetchListing=async ()=>{
      const listingId=params.listingId;
      const res=await fetch(`/api/listing/getListing/${listingId}`)
      const data=await res.json();
      if(data.success===false){
        console.log(data.message);
        return ;
      }
      console.log(data)
      setFormData(data)
    }
    fetchListing()
  },[])
  const handleSubmitFile = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setImageLoading(true);
      setImageUploadError(false);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setImageLoading(false);
        })
        .catch((err) => {
          setImageUploadError("image upload fail (max 2mb)");
          setImageLoading(false);
        });
    } else {
      setImageUploadError("we can only upload 6 images for room");
      setImageLoading(false);
    }
  };
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };
  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };
  const handleChange = (e) => {
    if(e.target.id==='sale'||e.target.id==='rent'){
      setFormData({
        ...formData,
         type: e.target.id,
      })
    }
    if(e.target.id==='parking'||e.target.id==='furnished'||e.target.id==='offer'){
      setFormData({
        ...formData,
        [e.target.id]:e.target.checked?true:false
      })
    }
    if(e.target.type==='number'||e.target.type==='text'||e.target.type==='textarea'){
      setFormData({
      ...formData,
         [e.target.id]:e.target.value,
      })
    }
  };
  const handleSubmit=async (e)=>{
    e.preventDefault()
    try{
      if(formData.imageUrls.length<1) return setError('Please select at least one image!');
      if(+formData.regularPrice<+formData.discountPrices) return setError('A discount price smaller than the regular price!');
      setLoading(true);
      setError(false);
      const res=await fetch(`/api/listing/update/${params.listingId}`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          ...formData,
          userData:currentUser._id
        })
      })
      const data=await res.json()
      setLoading(false)
      if(data.success===false){
        setError(data.message)
      }
      navigate(`/listing/${data._id}`)
    }catch(error){
      setError(error.message);
      setLoading(false);
    }
  }
  return (
    <>
      <main className="p-3 max-w-4xl mx-auto">
        <h1 className="text-xl font-semibold text-center my-6 sm:text-3xl">
          Update Rooms
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-6">
          <div className="flex flex-col gap-3 flex-1">
            <input
              type="text"
              placeholder="Name"
              id="name"
              className="rounded-lg bg-slate-200 p-2 sm:p-3 focus:outline-none"
              maxLength={60}
              minLength={7}
              required
              value={formData.name}
              onChange={handleChange}
            />
            <textarea
              placeholder="Description"
              id="description"
              className="rounded-lg bg-slate-200 p-2 sm:p-3 focus:outline-none"
              required
              value={formData.description}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Address"
              id="address"
              className="rounded-lg bg-slate-200 p-2 sm:p-3 focus:outline-none"
              required
              value={formData.address}
              onChange={handleChange}
            />
            <div className="flex gap-6 flex-wrap">
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="sale"
                  className="w-5"
                  onChange={handleChange}
                  checked={formData.type === "sale"}
                />
                <label htmlFor="sale">Sell</label>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="rent"
                  className="w-5"
                  onChange={handleChange}
                  checked={formData.type === "rent"}
                />
                <label htmlFor="rent">Rent</label>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="parking"
                  className="w-5"
                  onChange={handleChange}
                  checked={formData.parking}
                />
                <label htmlFor="parking">Parking Spot</label>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="furnished"
                  className="w-5"
                  onChange={handleChange}
                  checked={formData.furnished}
                />
                <label htmlFor="furnished">Furnished</label>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="offer"
                  className="w-5"
                  onChange={handleChange}
                  checked={formData.offer}
                />
                <label htmlFor="offer">Offer</label>
              </div>
            </div>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder=""
                  id="bedroom"
                  min="1"
                  max="20"
                  required
                  className="bg-gray-200 p-2 rounded-lg border-red-400"
                  onChange={handleChange}
                  value={formData.bedroom}
                />
                <label htmlFor="bedroom">Beds</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="bathroom"
                  min="1"
                  max="6"
                  required
                  className="bg-gray-200 p-2 rounded-lg border-red-400"
                  onChange={handleChange}
                  value={formData.bathroom}
                />
                <label htmlFor="bathroom">Baths</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="regularPrice"
                  min="20"
                  max="500000"
                  required
                  className="bg-gray-200 p-2 rounded-lg border-red-400"
                  onChange={handleChange}
                  value={formData.regularPrice}
                />
                <div className="flex flex-col items-center ">
                  <p>Regular Price</p>
                  <span className="text-xs">($ / months)</span>
                </div>
              </div>
              {formData.offer&&(
                <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder=""
                  id="discountPrices"
                  min="0"
                  max="5000000"
                  required
                  className="bg-gray-200 p-2 rounded-lg border-red-400"
                  onChange={handleChange}
                  value={formData.discountPrices}
                />
                <div className="flex flex-col items-center ">
                  <p>Discounted Price</p>
                  <span className="text-xs">($ / months)</span>
                </div>
              </div>
              )}
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
                onChange={(e) => setFiles(e.target.files)}
                type="file"
                className="p-3 rounded w-full outline:none"
                id="images"
                accept="image/*"
                multiple
              />
              <button
                onClick={handleSubmitFile}
                disabled={imageLoading}
                type="button"
                className="px-3 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-600 hover:text-white transition duration-300 ease-in-out focus:bg-[#0652DD]"
              >
                {imageLoading ? "Uploading..." : "Upload"}
              </button>
            </div>
            <p className="text-red-600 text-sm pb-2">
              {imageUploadError && imageUploadError}
            </p>
            {formData.imageUrls.length > 0 &&
              formData.imageUrls.map((url, index) => (
                <div
                  key={url}
                  className="flex justify-between p-2 items-center border my-1 shadow-lg bg-white rounded-xl "
                >
                  <img
                    src={url}
                    alt={`image${index}`}
                    className="w-[6rem]  object-contain rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="text-red-600 uppercase border border-red-500 px-2 py-1 font-semibold hover:bg-[#e74c3c] hover:text-white rounded-lg hover:border-green-500 transition duration-300 ease-in-out focus:opacity-80"
                  >
                    Delete
                  </button>
                </div>
              ))}
            <button disabled={loading||imageLoading} className="p-2 bg-[#833471] text-white border border-green rounded-lg ml-3 transition hover:opacity-90 duration-300 ease-in-out focus:bg-[#cf6a87] disabled:opacity-80">
              {loading?'Updating....':'Update Room'}
            </button>
            {error&&<p className="text-red-500">{error} </p>}
          </div>
        </form>
      </main>
    </>
  );
}

export default UpdateListing;
