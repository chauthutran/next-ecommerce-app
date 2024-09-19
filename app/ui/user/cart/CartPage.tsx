'use client';

import { useAuth } from '@/contexts/AuthContext';
import { JSONObject } from '@/lib/definations';
import { useEffect, useState } from 'react';
import * as dbService from "@/lib/dbService";
import Image from 'next/image';


export default function CartPage() {

    const { user } = useAuth();

    const [cartItems, setCartItems] = useState<JSONObject[]>([]);
    const [errMessage, setErrMessage] = useState("");

    const fetchUserCart = async () => {
        const response: JSONObject = await dbService.fetchUserCart(user!._id);

        console.log(response);
        if (response.status != "success") {
            setErrMessage(response.message);
        }
        else {
            setCartItems(response.data);
        }
    }

    useEffect(() => {
        fetchUserCart();
    }, []);


    return (
        <div className="p-5 mx-auto bg-white h-full">
            <h1 className="text-2xl font-semibold mb-6">
                <div>Your Cart</div>
            </h1>

            {cartItems.length === 0 ? (
                <p className="text-gray-600">Your cart is empty</p>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {cartItems.map((item) => (
                        <div
                            key={item.product._id}
                            className="bg-white shadow-md p-4 rounded-lg border border-gray-200"
                        >
                            {/* Product Selection and Title */}
                            <label className="cursor-pointer space-x-3 text-lg font-semibold flex items-center mb-2">
                                <input type="checkbox" />
                                <span>{item.product.name}</span>
                            </label>

                            {/* Product Image and Details */}
                            <div className="grid grid-cols-1 md:grid-cols-[100px_auto_auto] gap-5">
                                {/* Product Image */}
                                <div className="w-24 h-24">
                                    <Image
                                        src={item.product.images[0]}
                                        alt={item.product.name}
                                        width={96}
                                        height={96}
                                        className="object-cover rounded-lg"
                                    />
                                </div>

                                {/* Product Details */}
                                <div>
                                    <p>{item.product.description}</p>
                                    <p className="text-lg text-red-500 font-bold mt-2">${item.product.price}</p>

                                    {/* Quantity and Total Price */}
                                    <label className="grid grid-cols-[80px_100px] items-center gap-2">
                                        <span className="text-gray-700">Quantity:</span>
                                        <input
                                            className="border border-gray-300 rounded-md px-3"
                                            type="number"
                                            value={item.quantity}
                                        />
                                    </label>
                                </div>

                                {/* Total */}
                                <div className="flex h-full items-start justify-start space-x-3 lg:justify-end">
                                    <div className="text-gray-800 font-semibold">Total:</div>
                                    <div className="bg-red-500 text-white px-3 whitespace-nowrap rounded-lg">
                                        ${(item.quantity * item.product.price).toFixed(2)}
                                    </div>
                                </div>
                                
                            </div>
                        </div>

                    ))}
                </div>
            )}
        </div>
    );
}
