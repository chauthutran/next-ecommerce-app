'use client';

import { useAuth } from '@/contexts/AuthContext';
import { JSONObject } from '@/lib/definations';
import { useEffect, useState } from 'react';
import * as dbService from "@/lib/dbService";
import Image from 'next/image';
import CartItem from './CartItem';
import * as Utils from "@/lib/utils";

export default function CartPage() {

    const { user } = useAuth();

    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [cartItems, setCartItems] = useState<JSONObject[]>([]);
    const [errMessage, setErrMessage] = useState("");
    // const [total, setTotal] = useState(0); // New state for total price

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


    // // Recalculate total when cartItems or selectedItems change
    // useEffect(() => {
    //     setTotal(calculateTotal());
    // }, [cartItems, selectedItems]);


    const handleSelectItem = (cartItem: JSONObject, checked: boolean) => {
        let newSelectedItems: string[] = [...selectedItems];

        if (checked) {
            newSelectedItems.push(cartItem._id);
        }
        else {
            newSelectedItems = selectedItems.filter((item) => item != cartItem._id); // remove unchecked item
        }

        setSelectedItems(newSelectedItems);
    }

    const handleUpdateItemQuantity = (cartItem: JSONObject, newQuantity: number) => {
        const newList = Utils.cloneJSONObject(cartItems);
        const foundCartItem = Utils.findItemFromList(newList, cartItem._id, "_id");
        if (foundCartItem !== null) {
            foundCartItem.quantity = newQuantity;
        }

        setCartItems(newList);
    }

    const calculateTotal = (): number => {
        let total = 0;

        for (var i = 0; i < selectedItems.length; i++) {
            const foundCartItem = Utils.findItemFromList(cartItems, selectedItems[i], "_id");
            if (foundCartItem !== null) {
                var productPrice = foundCartItem.product.price;
                var quantity = foundCartItem.quantity;
                total += (productPrice * quantity);
            }
        }

        return total;
    }

    return ( 
        
        <>
       

            <div className="mx-auto bg-white p-5 pb-[70px]">
                <div className="font-semibold text-2xl mb-2">Your Cart</div>

                <hr className="mb-3" />

                {cartItems.length === 0 ? (
                    <p className="text-gray-600">Your cart is empty</p>
                ) : (
                    <div className="grid grid-cols-1 gap-6 overflow-y-auto" >
                        {cartItems.map((item) => (
                            <CartItem data={item} key={`cart_${item._id}`}
                                onUpdateQuantity={(cartItem: JSONObject, newQuantity: number) => handleUpdateItemQuantity(cartItem, newQuantity)}
                                onSelectItem={(cartItem, checked) => handleSelectItem(cartItem, checked)} />
                        ))}
                        </div>
                )}
        

        </div>
                {/* Fixed Footer */}
                <div className="fixed bottom-10 left-0 w-full bg-gray-800 text-white p-2 px-4">
                    <div className="flex justify-between items-center">
                        <span>Total: ${calculateTotal()}</span>
                        <button className="bg-red-500 px-4 py-2 rounded-lg">Checkout</button>
                    </div>
                </div>
                </>
    );
}
