"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [oneProduct, setOneProduct] = useState({});
  const [limitProduct, setLimitProduct] = useState([]);
  const getAllProducts = async () => {
    const data = await fetch("https://fakestoreapi.com/products");
    const response = await data.json();
    return response;
  };
  const getOneProduct = async () => {
    const data = await fetch("https://fakestoreapi.com/products/13");
    const response = await data.json();
    return response;
  };
  const getLimitProduct = async () => {
    const data = await fetch("https://fakestoreapi.com/products?limit=3");
    const response = await data.json();
    return response;
  };

  useEffect(() => {
    getAllProducts().then((json) => setProducts(json));
  }, []);
  useEffect(() => {
    getOneProduct().then((json) => setOneProduct(json));
  }, []);
  useEffect(() => {
    getLimitProduct().then((json) => setLimitProduct(json));
  }, []);
  return (
    <div>
      <div className="flex gap-5">
        <div className="flex flex-col bg-white shadow-xl rounded-xl p-4 max-w-[350px]">
          <div>
            <h1 className="font-bold text-xl mb-6">Product offer</h1>
          </div>
          <Link href={`/products/${oneProduct.title}`}>
            <Image
              className="w-auto mx-auto"
              src={oneProduct.image}
              alt={oneProduct.title}
              width={220}
              height={220}
            />
            <h2 className="mt-8">{oneProduct.title}</h2>
            <h3 className="pt-2 text-xl text-gray-600 line-through">$700</h3>
            <h4 className="text-3xl pb-2">${oneProduct.price}</h4>
            <div className="flex items-center">
              {Array.from({ length: 5 }, (_, index) => (
                <span
                  key={index}
                  role="img"
                  aria-label="star"
                  style={{
                    color:
                      index + 1 <= oneProduct.rating?.rate ? "gold" : "grey",
                  }}
                >
                  &#9733;
                </span>
              ))}
            </div>
          </Link>
        </div>

        <div className="bg-white shadow-xl rounded-xl p-4">
          <div>
            <h2 className="font-bold text-xl mb-6">Most purchased products</h2>
          </div>
          <div>
            <ul className="flex gap-5">
              {limitProduct.map((product) => (
                <li key={product.id} className="w-full">
                  <Link href={`/products/${product.title}`}>
                    <div className="flex flex-col justify-between h-full">
                      <div className="w-auto h-48 flex items-center justify-center">
                        <Image
                          className="w-auto h-auto max-h-full object-contain"
                          src={product.image}
                          alt={product.title}
                          width={220}
                          height={220}
                        />
                      </div>
                      <div className="mt-8">
                        <h2>{product.title}</h2>
                        <h4 className="text-2xl py-2">${product.price}</h4>
                      </div>
                      <div className="flex items-center">
                        {Array.from({ length: 5 }, (_, index) => (
                          <span
                            key={index}
                            role="img"
                            aria-label="star"
                            style={{
                              color:
                                index + 1 <= product.rating?.rate
                                  ? "gold"
                                  : "grey",
                            }}
                          >
                            &#9733;
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold py-10">All Products</h2>
        <ul className="grid grid-cols-4 gap-5">
          {products.map((product) => (
            <Link key={product.id} href={`/products/${product.title}`}>
              <li className="shadow-xl h-full flex flex-col justify-between p-5 rounded-xl bg-white">
                <Image
                  className="w-auto h-64 object-contain"
                  src={product.image}
                  alt={product.title}
                  width={220}
                  height={220}
                />
                <div className="mt-2">
                  <h2>{product.title}</h2>
                  <h4 className="text-2xl py-2">${product.price}</h4>
                </div>
                <div className="flex items-center">
                  {Array.from({ length: 5 }, (_, index) => (
                    <span
                      key={index}
                      role="img"
                      aria-label="star"
                      style={{
                        color:
                          index + 1 <= product.rating?.rate ? "gold" : "grey",
                      }}
                    >
                      &#9733;
                    </span>
                  ))}
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
