'use client';

import { JSONObject } from "@/lib/definations";
import Image from "next/image";
import { useState } from "react";
import * as AppStore from "@/lib/appStore";
import DOMPurify from "dompurify";
import ProductRating from "./ProductRating";
import { useAuth } from "@/contexts/AuthContext";
import Modal from "../basics/Modal";
import LoginForm from "../user/LoginForm";
import Alert from "../basics/Alert";
import * as Constant from "@/lib/constants";


export default function ProductDetailsInfo({ data }: { data: JSONObject }) {

    const { user, addProductToCart } = useAuth();
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [alertData, setAlertData] = useState<JSONObject | null>(null);


    const renderConfigData = () => {
        const template = AppStore.getConfigData().productDetails.join("");
        const sanitizedHTML = template.replace(/\$\{data\.(\w+)\}/g, (match: string, key: string) => {
            return key in data ? data[key] : match;
        });

        return DOMPurify.sanitize(sanitizedHTML);
    }

    const handleAddProductToCart = async() => {
        await addProductToCart(data);
        // await dbService.handleAddProductToCart( user!._id, data._id);
        setAlertData({type: Constant.STATUS_TYPE_SUCCESS, message: "Product is added to the cart."});
    }

    const detailsInfoTag = renderConfigData();

    const handleShowAddToCartForm = () => {
        if( user === null ) {
            setShowLoginForm(true);
        }
        else {
            handleAddProductToCart();
        }
    }

    return (
        <>
            {alertData !== null && <Alert type={alertData.type} message={alertData.message} />}

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 md:grid-cols-2 mx-3">
                {/* Image Section */}
                {data.images.length > 0 && (
                    <div className="flex lg:justify-end lg:items-end">
                        {data.images.map((img: string, idx: number) => (
                            <Image
                                key={idx}
                                src={img}
                                alt={data.name}
                                width={300}
                                height={300}
                                className="object-cover w-72 h-72 rounded-lg"
                            />
                        ))}
                    </div>
                )}

                {/* Product Info - If there is configuration for 'productDetails' */}
                {detailsInfoTag != null && <div>
                    <div
                        className="pt-4 px-4"
                        dangerouslySetInnerHTML={{ __html: detailsInfoTag }}

                    />
                    <div className="mx-4 mt-2"><ProductRating rating={data.rating} numReviews={data.numReviews} /></div>

                    {user !== null && <button className="mx-4 mt-3 bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-400" onClick={() => handleShowAddToCartForm()}>Add To Cart</button>}
                </div>}

                {/* Product Info - Default infor without the configuration 'productDetails' */}
                {detailsInfoTag === null && <div className="p-4">
                    <h2 className="text-xl font-bold text-gray-800">{data.name}</h2>
                    <ProductRating rating={data.rating} numReviews={data.numReviews} />
                    <p className="text-gray-600 mt-2">{data.description}</p>
                    <p className="text-lg font-semibold text-red-600 mt-2">Price: ${data.price}</p>
                    <p className="text-sm text-gray-500 mt-1">Brand: {data.brand}</p>
                    <p className="text-sm text-gray-500">Stock: {data.stock}</p>
                </div>}

            </div>

            {showLoginForm && <Modal>
                {user === null && <div className="w-[400px]">
                    <LoginForm onClose={()=> setShowLoginForm(false) } onSuccess={() => handleAddProductToCart()} />
                </div>}
            </Modal>}
        </>
    )
}