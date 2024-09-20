import { JSONObject } from "@/lib/definations";
import Image from "next/image";
import * as dbService from "@/lib/dbService";
import { useAuth } from "@/contexts/AuthContext";
import * as Constant from "@/lib/constants";
import Alert from "@/ui/basics/Alert";
import { useState } from "react";


export default function OrderItem({ data, onUpdateQuantity, onSelectItem }: { data: JSONObject, onUpdateQuantity: (cartItem: JSONObject, newQuantity: number) => void, onSelectItem: (cartItem: JSONObject, checked: boolean) => void }) {

    const { user } = useAuth();
    const [bgColor, setBgColor] = useState('white');
    const [quantity, setQuantity] = useState(data.quantity);


    return (
        <div
            className="bg-white px-4 py-2 border-b border-gray-300"
        >
            
        </div>
    )
}