import React from "react";
import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
function SignUp() {
  const [formData, setformData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()
  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      const res = await fetch("api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      navigate('/sign-in')
      console.log(data);
      setError(null)
    } catch (err) {
      setLoading(false);
    }
  };
  console.log(formData);
  return (
    <div className="max-w-sm mx-auto p-3">
      <h1 className="text-2xl text-center font-semibold my-7 ms:text-3xl">
        SignUp
      </h1>
      <form className="flex flex-col gap-2 bg-slate" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="User Name"
          id="userName"
          className="rounded-lg bg-slate-200 p-2 px-8 focus:outline-none"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="User Email"
          id="email"
          className="rounded-lg bg-slate-200 p-2 px-8 focus:outline-none"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="rounded-lg bg-slate-200 p-2 px-8 focus:outline-none"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="uppercase bg-[#30336b] rounded-lg p-2 hover:opacity-90 disabled:opacity-80 text-white"
        >
          {loading ? "Loading..." : "SignUp"}
        </button>
      </form>
      <div className="flex gap-3 py-2">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-600">SignIn</span>
        </Link>
      </div>
      {error&&<p className="text-red-600">something is wrong</p>}
    </div>
  );
}

export default SignUp;
