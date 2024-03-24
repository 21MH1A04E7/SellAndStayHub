import React, { useState, useEffect } from "react";
import { app } from "../firebase.js";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  logoutUserStart,
  logoutUserSuccess,
  logoutUserFailure,
} from "../redux/user/userSlice.js";
function ProfilePage() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updated, setUpdated] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();
  // console.log(file)
  // console.log(formData)
  // console.log(filePercentage);
  //   console.log(fileUploadError)

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime + file.name; //for unique file name
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercentage(progress.toFixed(2));
      },

      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };
  const resetTimeOut = () => {
    setTimeout(() => {
      setUpdated(false);
    }, 2000);
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdated(true);
      resetTimeOut();
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = res.json();
      if (data.success == false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess());
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  const handleLogout = async () => {
    try {
      dispatch(logoutUserStart());
      const res = await fetch("/api/auth/logout");
      const data = await res.json();
      if (data.success == false) {
        dispatch(logoutUserFailure(data.message));
        return;
      }
      dispatch(logoutUserSuccess());
    } catch (error) {
      dispatch(logoutUserFailure(error.message));
    }
  };
  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success == false) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };
  const handleListingDelete=async (listingId)=>{
    try{
      const res=await fetch(`/api/listing/delete/${listingId}`,{
        method:'DELETE',
      });
      const data=await res.json()
      if(data.success == false) {
        console.log(data.message);
        return 
      }
      setUserListings((prev)=>prev.filter((listing)=>listing._id!=listingId))
    }catch(error){
      console.log(error)
    }
  }
  return (
    <div className="p-2 max-w-sm mx-auto">
      <h2 className="text-3xl text-center font-bold my-5 italic hover:not-italic">
        profile
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image./*"
        />
        <img
          src={formData.avatar || currentUser.avatar}
          onClick={() => fileRef.current.click()}
          alt="profile"
          className="rounded-xl object-cover cursor-pointer w-24 self-center transition-transform hover:scale-110 ease-in-out shadow-md"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700 italic">
              Error while uploading the file
            </span>
          ) : filePercentage > 0 && filePercentage < 100 ? (
            <span className="text-slate-700">{`Uploading.. ${filePercentage}%`}</span>
          ) : filePercentage == 100.0 ? (
            <span className="text-green-600 italic">
              successfully uploaded!
            </span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="userName"
          id="username"
          defaultValue={currentUser.userName}
          onChange={handleChange}
          className="border  p-2 rounded-lg mt-2 bg-slate-100"
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
          className="border p-2 rounded-lg mt-2 bg-slate-100"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="border p-2 rounded-lg mt-2 bg-slate-100"
        />
        <button
          className="bg-[#5352ed] rounded-lg p-2 uppercase hover:opacity-90 disabled:opacity-80 text-white"
          disabled={loading}
        >
          {loading ? "loding..." : "update"}
        </button>
        <Link
          to="/create-listing"
          className="uppercase bg-[#30336b] p-2 rounded-lg text-[#ecf0f1] text-center font-semibold hover:opacity-90"
        >
          Add Rooms
        </Link>
      </form>
      <div className="flex justify-between mt-2">
        <span
          className="text-red-600 cursor-pointer"
          onClick={handleDeleteUser}
        >
          delete account
        </span>
        <span className="text-red-600 cursor-pointer" onClick={handleLogout}>
          Logout
        </span>
      </div>
      <p>
        {error ? (
          <span className="text-red-500 italic">
            {error}
            <FaExclamationTriangle className="text-yellow-400 inline ml-1" />
          </span>
        ) : (
          ""
        )}
      </p>
      <p>
        {updated ? (
          <spna className="text-green-500">updated successfuly...</spna>
        ) : null}
      </p>
      <button onClick={handleShowListings} className="text-green-600 w-full">
        Show Listing
      </button>
      <p className="text-red-600 mt-4">
        {showListingsError ? "Error showListings" : ""}
      </p>
      {userListings && userListings.length > 0 && (
  <div className="flex flex-col gap-3">
    <h1 className="text-center text-2xl font-semibold">Your Rooms</h1>
    {userListings.map((listing) => (
      <div className="border rounded-lg p-2 flex justify-between items-center gap-3 shadow-md hover:shadow-lg transition duration-300" key={listing._id}>
        <Link to={`/listing/${listing._id}`}>
          <img
            src={listing.imageUrls[0]}
            alt="listing image"
            className="w-16 h-16 object-contain rounded-md transition duration-300 transform hover:scale-110"
          />
        </Link>
        <Link className="flex-1 text-slate-600 font-semibold hover:underline truncate" to={`/listing/${listing._id}`}>
          <p>{listing.name}</p>
        </Link>
        <div className="flex flex-col items-center">
          <button onClick={()=>handleListingDelete(listing._id)} className="text-red-700 uppercase hover:text-red-900">Delete</button>
          <button className="text-green-700 uppercase hover:text-green-900">Edit</button>
        </div>
      </div>
    ))}
  </div>
)}
    </div>
  );
}

export default ProfilePage;

// allow read;
//       allow write: if
//       request.resource.size < 2 * 1021 * 1024 &&
//       request.resource.contentType.matches('image/.*')
