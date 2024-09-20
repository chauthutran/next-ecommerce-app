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

        if( checked ) {
            newSelectedItems.push(cartItem._id);
        }
        else {
            newSelectedItems = selectedItems.filter((item) => item != cartItem._id); // remove unchecked item
        }

        setSelectedItems( newSelectedItems );
    }

    const handleUpdateItemQuantity = (cartItem: JSONObject, newQuantity: number) => {
        const newList = Utils.cloneJSONObject(cartItems);
        const foundCartItem = Utils.findItemFromList(newList, cartItem._id, "_id");
        if( foundCartItem !== null ) {
            foundCartItem.quantity = newQuantity;
        }

        setCartItems(newList);
    }

    const calculateTotal = (): number => {
        let total = 0;

        for( var i=0; i<selectedItems.length; i++ ) {
            const foundCartItem = Utils.findItemFromList(cartItems, selectedItems[i], "_id");
            if( foundCartItem !== null ) {
                var productPrice = foundCartItem.product.price;
                var quantity = foundCartItem.quantity;
                total += (productPrice * quantity);
            }
        }

        return total;
    }

    return (
        <div className="m-3 bg-white p-3 rounded-lg">
            <h1 className="grid grid-cols-1 md:grid-cols-2 text-2xl font-semibold mb-2 w-full">
                <div>Your Cart</div>
                <div className="justify-start flex md:justify-end mt-3 sm:mt-0">
                    Total: <span className="mx-3 px-3 bg-red-500 text-white whitespace-nowrap rounded-lg">${calculateTotal().toFixed(2)}</span>
                </div>
            </h1>

            <hr className="mb-3" />

            {cartItems.length === 0 ? (
                <p className="text-gray-600">Your cart is empty</p>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {cartItems.map((item) => (
                      <CartItem data={item} key={`cart_${item._id}`} 
                        onUpdateQuantity={(cartItem: JSONObject, newQuantity: number) => handleUpdateItemQuantity(cartItem, newQuantity) } 
                        onSelectItem={(cartItem, checked) => handleSelectItem(cartItem, checked)} />
                    ))}
                </div>
            )}

            
        </div>
    );
}
