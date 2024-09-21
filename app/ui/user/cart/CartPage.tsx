'use client';

import { useAuth } from '@/contexts/AuthContext';
import { JSONObject } from '@/lib/definations';
import { useEffect, useState } from 'react';
import * as dbService from "@/lib/dbService";
import Image from 'next/image';
import CartItem from './CartItem';
import * as Utils from "@/lib/utils";
import { RiBubbleChartFill } from 'react-icons/ri';
import Alert from '@/ui/basics/Alert';
import * as Constant from "@/lib/constants";


export default function CartPage() {

    const { user } = useAuth();

    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [cartItems, setCartItems] = useState<JSONObject[]>([]);
    const [errMessage, setErrMessage] = useState("");
    const [alertData, setAlertData] = useState<JSONObject | null>(null);

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


    const handleSelectItem = (cartItem: JSONObject, checked: boolean) => {
        let newSelectedItems: string[] = [...selectedItems];

        if (checked) {
            newSelectedItems.push(cartItem._id);
        }
        else {
            // remove unchecked item
            newSelectedItems = selectedItems.filter((item) => item != cartItem._id); 
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

    const addToOrder = async () => {
        const ok = confirm("Are you sure you want to order these products ?");

        if( ok ) {
            let products: JSONObject[] = [];
            for (var i = 0; i < selectedItems.length; i++) {
                const foundCartItem = Utils.findItemFromList(cartItems, selectedItems[i], "_id");
                if (foundCartItem !== null) {
                    products.push({
                        product: foundCartItem.product._id,
                        quantity: foundCartItem.quantity,
                        price: foundCartItem.product.price
                    });
                }
            }
            const payload = {
                user: user!._id,
                products: products,
                shippingAddress: user!.address
            };

            const response = await dbService.addProductToOrder(payload);
            if (response.status === "success") {
                setAlertData({ type: Constant.STATUS_TYPE_SUCCESS, message: "You ordered successfully!" });
            }
            else {
                setAlertData({ type: Constant.STATUS_TYPE_ERROR, message: response.message });
            }
        }
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
            {alertData !== null && <Alert type={alertData.type} message={alertData.message} />}

            <div className="m-3 bg-white p-3 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-3 flex">
                    <RiBubbleChartFill className="text-firebrick mr-2" />
                    Your Cart
                </h2>

                <hr className="mb-3 bg-black" />

                <div className="grid grid-cols-1 md:grid-cols-2 font-semibold mb-2 w-full">
                    <div className="mx-3 text-xl">
                        Total: <span className="mx-3 px-3 bg-red-500 text-white whitespace-nowrap rounded-sm">${calculateTotal().toFixed(2)}</span></div>
                    <div className="justify-start flex md:justify-end mt-3 sm:mt-0">
                        <button className="px-3 py-1 rounded-sm bg-yellow-500 text-white hover:bg-yellow-400" onClick={() => addToOrder()}>Checkout</button>
                    </div>
                </div>


                {cartItems.length === 0 ? (
                    <p className="text-gray-600">Your cart is empty</p>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {cartItems.map((item) => (
                            <CartItem data={item} key={`cart_${item._id}`}
                                onUpdateQuantity={(cartItem: JSONObject, newQuantity: number) => handleUpdateItemQuantity(cartItem, newQuantity)}
                                onSelectItem={(cartItem, checked) => handleSelectItem(cartItem, checked)} />
                        ))}
                    </div>
                )}


            </div>
        </>
    );
}
