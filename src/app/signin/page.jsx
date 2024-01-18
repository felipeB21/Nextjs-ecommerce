"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../../components/UserContext";

export default function SignIn() {
  const [user, setUser] = useUser();
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const userSignin = async () => {
      const data = await fetch("https://fakestoreapi.com/users/1");
      const res = await data.json();
      setUser(res);
    };

    userSignin();
  }, [setUser]);

  const handleSignin = (evnt) => {
    evnt.preventDefault();
    const email = evnt.target.email.value;
    const password = evnt.target.password.value;

    const enteredPasswordHash = password;

    if (email === user.email && enteredPasswordHash === user.password) {
      router.replace("/");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="mt-24 w-[500px] mx-auto">
      <div className="bg-neutral-100 p-10 rounded-xl shadow-2xl">
        <p className="text-2xl font-bold">Sign in</p>
        {error && <p className="text-red-500">{error}</p>}
        <form action="/signin" className="mt-10" onSubmit={handleSignin}>
          <label className="flex flex-col" htmlFor="email">
            <h4 className="text-2xl font-medium">Email</h4>
            <input
              className="mb-2 py-1 px-3 rounded-lg bg-neutral-200 mt-2 outline-0 border-2 border-neutral-300"
              type="email"
              name="email"
              placeholder="Your email"
            />
          </label>
          <label className="flex flex-col" htmlFor="password">
            <h4 className="text-2xl font-medium">Password</h4>
            <input
              className="mb-2 py-1 px-3 rounded-lg bg-neutral-200 mt-2 outline-0 border-2 border-neutral-300"
              type="password"
              name="password"
              placeholder="Your password"
            />
          </label>
          <button className="bg-sky-600 text-white py-2 px-5 rounded-lg mt-3 w-full hover:bg-sky-700">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
