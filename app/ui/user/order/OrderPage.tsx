'use client';

import { useAuth } from '@/contexts/AuthContext';
import { JSONObject } from '@/lib/definations';
import { useEffect, useState } from 'react';
import * as dbService from "@/lib/dbService";
import Image from 'next/image';
import OrderItem from './OrderItem';
import { RiBubbleChartFill } from 'react-icons/ri';
import OrderStatusSteps from './OrderStatusSteps';

export default function OrderPage() {

    const { user } = useAuth();

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


    return (
        <div className="mx-auto p-4">

            <h2 className="text-2xl font-semibold mb-3 flex">
                <RiBubbleChartFill className="text-firebrick mr-2" />
                Your Orders
            </h2>

            <div className="space-y-6">
                {orders.map((order, index) => (
                    <OrderItem key={`order_${order._id}`} data={order} />
                ))}
            </div>
        </div>
    );
}
