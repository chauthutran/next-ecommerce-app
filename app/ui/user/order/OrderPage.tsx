'use client';

import { useAuth } from '@/contexts/AuthContext';
import { JSONObject } from '@/lib/definations';
import { useEffect, useState } from 'react';
import * as dbService from "@/lib/dbService";
import Image from 'next/image';
import OrderItem from './OrderItem';
import * as Utils from "@/lib/utils";

export default function OrderPage() {

    const { user } = useAuth();

    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [orders, setOrders] = useState<JSONObject[]>([]);
    const [errMessage, setErrMessage] = useState("");

    const fetchUserOrders = async () => {
        const response: JSONObject = await dbService.fetchUserOrders(user!._id);
console.log(response);
        if (response.status != "success") {
            setErrMessage(response.message);
        }
        else {
            setOrders(response.data);
        }
    }

    useEffect(() => {
        fetchUserOrders();
    }, []);

    
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
        const newList = Utils.cloneJSONObject(orders);
        const foundCartItem = Utils.findItemFromList(newList, cartItem._id, "_id");
        if( foundCartItem !== null ) {
            foundCartItem.quantity = newQuantity;
        }

        setOrders(newList);
    }

    return (
        <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order List</h1>
      <div className="space-y-6">
        {orders.map((order, index) => (
          <div key={index} className="border border-gray-300 rounded-lg p-4 shadow-sm">
            <h2 className="text-xl font-semibold">Order #{index + 1}</h2>
            <p className="text-sm text-gray-600">Placed on: {order.createdAt}</p>
            <hr className="my-2" />

            <div className="mb-2">
              <h3 className="font-medium text-lg mb-1">Products</h3>
              {order.products.map((product: JSONObject, productIndex: number) => (
                <div key={productIndex} className="flex justify-between">
                  <div>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.description}</p>
                  </div>
                  <p className="font-medium">Quantity: {product.quantity}</p>
                </div>
              ))}
            </div>

            <div className="mb-2">
              <h3 className="font-medium text-lg">Shipping Address</h3>
              <p>{order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.country} - {order.shippingAddress.zipCode}</p>
            </div>

            <div className="flex justify-between items-center mt-4">
              <p className="font-bold text-lg">Total: ${order.totalPrice}</p>
              <span className={`px-2 py-1 rounded-md text-sm font-semibold ${order.status === 'pending' ? 'bg-yellow-300 text-yellow-800' : order.status === 'shipped' ? 'bg-blue-300 text-blue-800' : 'bg-green-300 text-green-800'}`}>
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
    );
}
