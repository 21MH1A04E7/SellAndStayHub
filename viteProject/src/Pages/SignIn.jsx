import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import {signInStart,signInFailure,signInSuccess} from '../redux/user/userSlice'

function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data=await res.json()
      console.log(data.success)
      // console.log(data)
      if(data.success===false){
        dispatch(signInFailure(data.message))
        return;
      }
      dispatch(signInFailure(data.message))
      navigate('/');
    } catch (err) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="max-w-sm mx-auto p-3">
      <h1 className="text-2xl text-center font-semibold my-7 ms:text-3xl">
        SignIn
      </h1>
      <form className="flex flex-col gap-2 bg-slate" onSubmit={handleSubmit}>
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
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <div className="flex gap-3 py-2">
        <p>Dont Have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-600">SignUp</span>
        </Link>
      </div>
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
}

export default SignIn;
