"use client";
import Link from "next/link";
import { useState } from "react";
import arrowDown from "../../public/down.png";
import search from "../../public/search.png";
import Image from "next/image";
import { useUser } from "./UserContext";
import carro from "../../public/carro.png";

const links = [
  { name: "Sell", path: "sell" },
  { name: "Help", path: "help" },
];
const categoryLinks = [
  { name: "Electronics", path: "electronics" },
  { name: "Jewelery", path: "jewelery" },
  { name: "Men's clothing", path: "men-clothing" },
  { name: "Women's clothing", path: "women-clothing" },
];

export default function Header() {
  const { user } = useUser();

  const [isHidden, setIsHidden] = useState(true);
  let timeoutId;

  const handleMouseEnter = () => {
    clearTimeout(timeoutId);
    setIsHidden(false);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setIsHidden(true);
    }, 300);
  };

  const handleCategoryMouseEnter = () => {
    clearTimeout(timeoutId);
  };

  const handleCategoryMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setIsHidden(true);
    }, 300);
  };

  return (
    <header className="shadow py-3 fixed w-full top-0 z-50 bg-white">
      <div className="w-[1100px] mx-auto flex items-center justify-between relative">
        <div className="flex flex-grow basis-0 items-center gap-8">
          <Link className="text-xl font-medium" href="/">
            Dilet
          </Link>
          <nav>
            <ul className="flex gap-5 items-center">
              <div>
                <li className="relative">
                  <button
                    className="flex items-center gap-1"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    Categorys
                    <Image
                      src={arrowDown}
                      alt="Arrow Down"
                      width={15}
                      height={15}
                    />
                  </button>
                  <ul
                    className={`absolute bg-neutral-700 mt-1 flex flex-col gap-2 shadow-xl p-5 rounded-xl ${
                      isHidden ? "hidden" : ""
                    }`}
                    style={{ top: "100%", left: 0 }}
                    onMouseEnter={handleCategoryMouseEnter}
                    onMouseLeave={handleCategoryMouseLeave}
                  >
                    {categoryLinks.map((category) => (
                      <li key={category.path}>
                        <Link href={category.path}>
                          <p className="text-lg text-white">{category.name}</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              </div>
              <div className="flex gap-5 items-center">
                {links.map((link) => (
                  <li key={link.path}>
                    <Link href={link.path}>
                      <p>{link.name}</p>
                    </Link>
                  </li>
                ))}
              </div>
            </ul>
          </nav>
        </div>
        <div>
          <form action="">
            <div className="flex items-center gap-1 border rounded border-gray-400 py-1 px-2">
              <Image src={search} alt="Search" width={20} height={20} />
              <input
                className="outline-0 bg-transparent"
                type="text"
                name="search"
                placeholder="Search..."
              />
            </div>
          </form>
        </div>
        <div className="flex gap-5 flex-grow basis-0 flex-row-reverse">
          <button className="cursor-pointer">
            <Image src={carro} alt="Store" width={25} height={25} />
          </button>
          {user ? (
            <div>
              <p>Welcome, Jhon</p>
            </div>
          ) : (
            <div>
              <Link
                className="border border-gray-400 rounded py-1 px-5 hover:bg-neutral-700 hover:text-white duration-300"
                href="signin"
              >
                Sign in
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
