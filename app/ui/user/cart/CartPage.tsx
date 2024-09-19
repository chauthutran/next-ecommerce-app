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


    const totalPrice = (product: JSONObject, quantity: number) => {
        return quantity * product.price;
    }


    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-2xl font-semibold mb-6">Shopping Cart</h1>

            {cartItems.length === 0 ? (
                <p className="text-gray-600">Your cart is empty</p>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {cartItems.map((item) => (
                        <div
                            key={item.product._id}
                            className="flex flex-col md:flex-row items-center justify-between bg-white shadow-md p-4 rounded-lg border border-gray-200"
                        >
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
                            <div className="flex flex-col flex-1 ml-4">
                                <h2 className="text-lg font-semibold">{item.product.name}</h2>
                                <p className="text-gray-600">{item.product.description}</p>
                                <p className="text-lg text-red-500 font-bold mt-2">${item.product.price}</p>
                            </div>

                            {/* Quantity and Total Price */}
                            <div className="flex flex-col items-center mt-4 md:mt-0 md:ml-6">
                                <span className="text-gray-700">Quantity: {item.quantity}</span>
                                <span className="text-lg text-gray-800 font-semibold mt-2">
                                    Total: ${(item.quantity * item.product.price).toFixed(2)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
