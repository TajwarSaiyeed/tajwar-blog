import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@/context/UserContext";

const Header = () => {
  const { user, loading, logout } = useUser();

  return (
    <header className="flex z-[9999] sticky top-0 bg-slate-50 border-b-[1px] border-gray-100 text-black shadow-sm gap-4 px-2 sm:px-5 duration-300 py-3 w-full justify-between items-center">
      {/* logo */}
      <Link href={"/"} passHref className="uppercase font-bold md:text-2xl">
        My Blog
      </Link>
      <nav className="flex sm:gap-2 duration-500 sm:min-w-[220px] items-center">
        {user && user?.username ? (
          <>
            <span className="font-semibold text-lg sm:block  hidden duration-300">
              Hello {user?.username}
            </span>

            <Link
              className="font-semibold md:text-lg link link-hover uppercase border px-4 py-2 rounded-md hover:bg-slate-100 duration-300"
              href={"/create"}
            >
              Create
            </Link>
            <button
              onClick={logout}
              className="font-semibold md:text-lg link link-hover uppercase border px-4 py-2 rounded-md bg-red-500 text-[#fafafa] hover:text-white hover:bg-red-900 duration-300"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              className="font-semibold text-lg link link-hover uppercase border px-4 py-2 rounded-md hover:bg-slate-100 duration-300"
              href={"/login"}
            >
              Log In
            </Link>
            <Link
              className="font-semibold text-lg link link-hover uppercase border px-4 py-2 rounded-md bg-gray-700 text-[#fafafa] hover:text-gray-700 hover:bg-slate-100 duration-300"
              href={"/register"}
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
