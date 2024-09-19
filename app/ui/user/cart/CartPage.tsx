'use client';

import { useAuth } from '@/contexts/AuthContext';
import { JSONObject } from '@/lib/definations';
import { useEffect, useState } from 'react';
import * as dbService from "@/lib/dbService";
import Image from 'next/image';
import CartItem from './CartItem';


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
            <h1 className="grid grid-cols-1 md:grid-cols-2 text-2xl font-semibold mb-6 w-full">
                <div>Your Cart</div>
                <div className="justify-start flex mt-0 md:justify-end md:mt-3">Total: <span className="mx-3 px-3 bg-red-500 text-white px-3 whitespace-nowrap rounded-lg">$xxx</span></div>
            </h1>

            {cartItems.length === 0 ? (
                <p className="text-gray-600">Your cart is empty</p>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {cartItems.map((item) => (
                      <CartItem data={item} key={`cart_${item._id}`} />
                    ))}
                </div>
            )}
        </div>
    );
}
