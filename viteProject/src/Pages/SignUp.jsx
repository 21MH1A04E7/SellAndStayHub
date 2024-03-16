import React from "react";
import {Link} from 'react-router-dom'
function SignUp() {
  return (
    <div className="max-w-sm mx-auto p-3">
      <h1 className="text-2xl text-center font-semibold my-7 ms:text-3xl">
        SignUp
      </h1>
      <form className="flex flex-col gap-2 bg-slate">
        <input
          type="text"
          placeholder="User Name"
          id='userName'
          className="rounded-lg bg-slate-200 p-2 px-8 focus:outline-none"
        />
        <input
          type="email"
          placeholder="User Email"
          id='email'
          className="rounded-lg bg-slate-200 p-2 px-8 focus:outline-none"
        />
        <input
          type="password"
          placeholder="password"
          id='password'
          className="rounded-lg bg-slate-200 p-2 px-8 focus:outline-none"
        />
        <button className="uppercase bg-[#30336b] rounded-lg p-2 hover:opacity-90 disabled:opacity-80">SignUp</button>
      </form>
      <div className="flex gap-3 py-2">
        <p>Have an account?</p>
        <Link to='/sign-in'>
          <span className="text-blue-600">SignIn</span>
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
