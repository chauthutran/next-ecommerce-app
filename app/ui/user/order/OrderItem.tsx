import { JSONObject } from "@/lib/definations";
import Image from "next/image";
import * as dbService from "@/lib/dbService";
import { useAuth } from "@/contexts/AuthContext";
import * as Constant from "@/lib/constants";
import Alert from "@/ui/basics/Alert";
import { useState } from "react";
import OrderStatusSteps from "./OrderStatusSteps";
import * as Utils from "@/lib/utils";


export default function OrderItem({ data }: { data: JSONObject }) {

    const { user } = useAuth();


    const calculateTotal = (order: JSONObject): number => {
        let total = 0;

        const products = order.products;
        for (var j = 0; j < products.length; j++) {
            const product = products[j];
            var productPrice = product.product.price;
            var quantity = product.quantity;
            total += (productPrice * quantity);
        }

        return total;
    }

    return (
        <div className="border border-gray-300 bg-white rounded-lg p-4 shadow-sm">
            <h2 className="text-xl font-semibold grid grid-cols-1 md:grid-cols-2">
                <div>{Utils.formatDateTime(data.createdAt)}</div>
                {/* <div className="font-bold text-lg flex">
                    <div>Total:</div>
                    <div className="px-3 bg-firebrick rounded ml-3 text-white">${calculateTotal(data).toFixed(2)}</div>
                </div> */}
            </h2>

            <div className="mb-5">
                <OrderStatusSteps orderStatus={data.status} />
            </div>


            <hr className="my-2" />

            <div className="mb-2">
                {data.products.map((product: JSONObject, productIndex: number) => (
                    <div key={productIndex} className="grid grid-cols-1 gap-x-5 lg:grid-cols-[50px_auto] md:grid-cols-[50px_auto] m-3">
                        <Image
                            src={product.product.images[0]}
                            alt={product.product.name}
                            width={60}
                            height={60}
                            className="object-cover mb-4 rounded mt-2"
                        />

                        <div>
                            <p className="font-semibold">{product.product.name}</p>
                            <p className="text-sm text-gray-500">{product.product.description}</p>
                            <p className="font-medium">Quantity: {product.quantity}</p>
                            <p className="font-medium">Price: <span className="text-red-500 font-semibold">${product.price}</span></p>
                        </div>
                    </div>
                ))}

                <hr className="my-2" />

                <div className="font-bold text-lg flex mt-4">
                    <div>Total:</div>
                    <div className="px-3 bg-firebrick rounded ml-3 text-white">${calculateTotal(data).toFixed(2)}</div>
                </div>

                <p className="text-sm text-gray-600 font-semibold mt-2">
                    Shipping Address: {data.shippingAddress.street}, {data.shippingAddress.city}, {data.shippingAddress.country} - {data.shippingAddress.zipCode}
                </p>

            </div>
        </div>
    )
}