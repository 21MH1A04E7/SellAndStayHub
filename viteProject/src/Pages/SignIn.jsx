import React, { useState } from "react";
import OAuth from "../components/OAuth";
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
      dispatch(signInSuccess(data))
      navigate('/');
    } catch (err) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <section className="p-1 sm:p-4">
  <div className="grid grid-cols-1 lg:grid-cols-2">
    <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
      <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
          Sign in
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Don&#x27;t have an account?
          <Link
           to='/sign-up'
            className="font-semibold text-blue-500 transition-all duration-200 hover:underline"
          >
            Create a free account
          </Link>
        </p>
        <form onSubmit={handleSubmit} className="mt-8">
          <div className="space-y-5">
            <div>
              <label htmlFor="email" className="text-base font-medium text-gray-900">
                
                Email address
              </label>
              <div className="mt-2">
                <input
                 onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="email"
                  placeholder="Email"
                  id='email'
                />
              </div>
            </div>
            <div>
              <div className="mt-2">
                <input
                 onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="password"
                  placeholder="Password"
                  id='password'
                />
              </div>
            </div>
            <div>
              <button
                disabled={loading}
                className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
              >
                {loading?'Loading..':'Get started'}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="ml-2"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </form>
        <div className="mt-3 space-y-3">
           <OAuth />
          <button
            type="button"
            className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
          >
            <span className="mr-2 inline-block">
              <svg
                className="h-6 w-6 text-[#2563EB]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
              </svg>
            </span>
            Sign in with Facebook
          </button>
        </div>
        {error && <p className="text-red-600">{error}</p>}
      </div>
    </div>
    <div className="h-full w-full">
      <img
        className="mx-auto h-full w-full rounded-md object-cover"
        src="https://as2.ftcdn.net/v2/jpg/02/10/26/49/1000_F_210264905_EPmAxtyggW0YnlA4Js4hJQ9tMQX5xjg1.jpg"
        alt=""
      />
    </div>
  </div>
</section>

  );
}

export default SignIn;
