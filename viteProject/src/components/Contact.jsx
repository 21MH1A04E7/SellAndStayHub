import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
function Contact({ listingData }) {
  // console.log(listingData)

  const [owner, setOwner] = useState(null);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const fetchOwner = async () => {
      try {
        const res = await fetch(`/api/user/${listingData.userData}`);
        const data = await res.json();
        // console.log(data);
        setOwner(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOwner();
  },[listingData.userData]);
 const handleChange = (e) => {
    setMessage(e.target.value);
  };
  return (
    <>
      {owner && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-bold">{owner.userName}</span> for{" "}
            <span className="font-semibold">
              {listingData.name.toLowerCase()}
            </span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="3"
            value={message}
            onChange={handleChange}
            placeholder="Enter your message"
            className="w-full border border-gray-300 p-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          ></textarea>
          <Link to={`mailto:${owner.email}?subject=Regarding ${listingData.name}&body=${message}`}
          className="bg-slate-700 text-white p-2 rounded-lg hover:opacity-90 text-center uppercase">
            send message
          </Link>
        </div>
      )}
    </>
  );
}

export default Contact;
