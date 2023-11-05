'use client';
import { Rating } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/utils/store';
import { Product } from '@/types/type';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

type Props = {
    products: Product[];
    productHots: Product[];
    active: boolean;
};

const SingleSellShoe = ({ products, productHots, active }: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const pathname = usePathname();
    const router = useRouter();
    // const [hoveredItems, setHoveredItems] = useState(Array(products.length).fill(false));
    // const handleMouseEnter = (index: number) => {
    //     setHoveredItems((prevHoveredItems) => {
    //         const newHoveredItems = [...prevHoveredItems];
    //         newHoveredItems[index] = true;
    //         return newHoveredItems;
    //     });
    // };

    // const handleMouseLeave = (index: number) => {
    //     setHoveredItems((prevHoveredItems) => {
    //         const newHoveredItems = [...prevHoveredItems];
    //         newHoveredItems[index] = false;
    //         return newHoveredItems;
    //     });
    // };
    const handleDetail = (id: string) => {
        router.push(`/shoes/${id}`);
    };
    if (pathname !== '/') {
        return (
            <div className="flex gap-[10px]">
                {productHots &&
                    productHots.map((product: Product, index: number) => (
                        <div key={product._id} className="flex gap-2" onClick={() => handleDetail(product._id)}>
                            <div className="border-2 border-gray2 w-max rounded-md p-1">
                                {/* Single Product */}
                                <div className="bg-bg_sell rounded-md">
                                    <Image src="/nike.png" alt="Nike" width={292} height={236} />
                                </div>
                                <div className="px-5 py-1 flex flex-col items-center gap-2">
                                    <div className="flex items-center justify-between mt-3 mb-3 w-full">
                                        <span className="text-gray text-lg font-bold">{product.brand}</span>
                                        {/* {hoveredItems[index] ? (
                                          <FavoriteRoundedIcon
                                              className="w-5 h-5 text-orange"
                                              onMouseLeave={() => handleMouseLeave(index)}
                                          />
                                      ) : (
                                          <FavoriteBorderRoundedIcon
                                              className="w-5 h-5 text-orange"
                                              onMouseEnter={() => handleMouseEnter(index)}
                                          />
                                      )} */}
                                    </div>
                                    <h1 className="font-bold text-lg">{product.name}</h1>
                                    <Rating name="read-only" value={product.rating} readOnly />
                                    <span className="font-bold text-money">${product.price}</span>
                                    <div className="w-full flex items-center justify-between text-gray font-bold">
                                        <span>Sold</span>
                                        <span>{product.sold}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        );
    }
    return (
        <div className="flex justify-center gap-[10px]">
            {active
                ? products &&
                  products.map((product: Product, index: number) => (
                      <div key={product._id} className="flex gap-2">
                          <div className="border-2 border-gray2 w-max rounded-md p-1">
                              {/* Single Product */}
                              <div className="bg-bg_sell rounded-md">
                                  <Image src="/nike.png" alt="Nike" width={292} height={236} />
                              </div>
                              <div className="px-5 py-1 flex flex-col items-center gap-2">
                                  <div className="flex items-center justify-between mt-3 mb-3 w-full">
                                      <span className="text-gray text-lg font-bold">{product.brand}</span>
                                      {/* {hoveredItems[index] ? (
                                          <FavoriteRoundedIcon
                                              className="w-5 h-5 text-orange"
                                              onMouseLeave={() => handleMouseLeave(index)}
                                          />
                                      ) : (
                                          <FavoriteBorderRoundedIcon
                                              className="w-5 h-5 text-orange"
                                              onMouseEnter={() => handleMouseEnter(index)}
                                          />
                                      )} */}
                                  </div>
                                  <h1 className="font-bold text-lg">{product.name}</h1>
                                  <Rating name="read-only" value={product.rating} readOnly />
                                  <span className="font-bold text-money">${product.price}</span>
                                  <div className="w-full flex items-center justify-between text-gray font-bold">
                                      <span>Sold</span>
                                      <span>{product.sold}</span>
                                  </div>
                              </div>
                          </div>
                      </div>
                  ))
                : productHots &&
                  productHots.map((product: Product, index: number) => (
                      <div key={product._id} className="flex gap-2">
                          <div className="border-2 border-gray2 w-max rounded-md p-1">
                              {/* Single Product */}
                              <div className="bg-bg_sell rounded-md">
                                  <Image src="/nike.png" alt="Nike" width={292} height={236} />
                              </div>
                              <div className="px-5 py-1 flex flex-col items-center gap-2">
                                  <div className="flex items-center justify-between mt-3 mb-3 w-full">
                                      <span className="text-gray text-lg font-bold">{product.brand}</span>
                                      {/* {hoveredItems[index] ? (
                                          <FavoriteRoundedIcon
                                              className="w-5 h-5 text-orange"
                                              onMouseLeave={() => handleMouseLeave(index)}
                                          />
                                      ) : (
                                          <FavoriteBorderRoundedIcon
                                              className="w-5 h-5 text-orange"
                                              onMouseEnter={() => handleMouseEnter(index)}
                                          />
                                      )} */}
                                  </div>
                                  <h1 className="font-bold text-lg">{product.name}</h1>
                                  <Rating name="read-only" value={product.rating} readOnly />
                                  <span className="font-bold text-money">${product.price}</span>
                                  <div className="w-full flex items-center justify-between text-gray font-bold">
                                      <span>Sold</span>
                                      <span>{product.sold}</span>
                                  </div>
                              </div>
                          </div>
                      </div>
                  ))}
        </div>
    );
};

export default SingleSellShoe;
