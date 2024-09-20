import { JSONObject } from "@/lib/definations";
import Image from "next/image";
import * as dbService from "@/lib/dbService";
import { useAuth } from "@/contexts/AuthContext";
import * as Constant from "@/lib/constants";
import Alert from "@/ui/basics/Alert";
import { useState } from "react";


export default function CartItem({ data, onUpdateQuantity, onSelectItem }: { data: JSONObject, onUpdateQuantity: (cartItem: JSONObject, newQuantity: number) => void, onSelectItem: (cartItem: JSONObject, checked: boolean) => void }) {

    const { user } = useAuth();
    const [bgColor, setBgColor] = useState('white');
    const [quantity, setQuantity] = useState(data.quantity);
    const [alertData, setAlertData] = useState<JSONObject | null>(null);


    const updateQuantity = async (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        // Ensure the value is only positive
        if (parseInt(value) < 0 || isNaN(parseInt(value))) {
          value = "0"; // Set the value to 0 if it's negative or not a number
        }

        const response = await dbService.addProductToCart(user!._id, data.product._id, parseInt(value));
        if (response.status === "success") {
            setQuantity(value);
            setBgColor("#bef7be");
            onUpdateQuantity(data, parseInt(value));
            setAlertData({ type: Constant.STATUS_TYPE_SUCCESS, message: "Product is added to the cart." });
        }
        else {
            setAlertData({ type: Constant.STATUS_TYPE_ERROR, message: response.message });
        }

    }

    return (
        <>
            {alertData !== null && <Alert type={alertData.type} message={alertData.message} />}

            <div
                className="bg-white px-4 py-2 border-b border-gray-300"
            >
                {/* Product Selection and Title */}
                <label className="cursor-pointe space-x-3 text-lg font-semibold flex items-center mb-3">
                    <input type="checkbox" min="0" className="w-6 h-6 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500" onChange={(e) => onSelectItem(data, e.target.checked)}/>
                    <span>{data.product.name}</span>
                </label>

                {/* Product Image and Details */}
                <div className="grid grid-cols-1 md:grid-cols-[100px_auto_auto] gap-5">
                    {/* Product Image */}
                    <div className="w-24 h-24">
                        <Image
                            src={data.product.images[0]}
                            alt={data.product.name}
                            width={96}
                            height={96}
                            className="object-cover rounded-sm"
                        />
                    </div>

                    {/* Product Details */}
                    <div>
                        <p>{data.product.description}</p>
                        <p className="text-lg text-red-500 font-bold mt-2">${data.product.price}</p>

                        {/* Quantity and Total Price */}
                        <label className="grid grid-cols-[80px_100px] items-center gap-2">
                            <span className="text-gray-700">Quantity:</span>
                            <input
                                className="border rounded-md px-3 border-gray-300"
                                type="number"
                                value={quantity}
                                onChange={(e) => updateQuantity(e)}
                                style={{ backgroundColor: bgColor }} // Dynamic background color
                            />
                        </label>
                    </div>

                    {/* Total */}
                    <div className="flex h-full items-start justify-start space-x-3 md:justify-end">
                        <div className="text-gray-800 font-semibold">Total:</div>
                        <div className="bg-red-500 text-white px-3 whitespace-nowrap rounded-sm font-semibold">
                            ${(quantity * data.product.price).toFixed(2)}
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}