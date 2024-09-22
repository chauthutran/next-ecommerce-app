import { FaTruckFast } from "react-icons/fa6";
import { FcShipped } from "react-icons/fc";
import { FiTruck } from "react-icons/fi";
import { LuPackageCheck } from "react-icons/lu";
import { PiPackageFill } from "react-icons/pi";

export default function OrderStatusSteps ({orderStatus}: {orderStatus: string}) {
    return (
        <div className="flex justify-between items-center mt-4">
            {/* Step 1: Pending */}
            <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${orderStatus === 'pending' || orderStatus === 'shipped' || orderStatus === 'delivered' ? 'bg-yellow-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                   <PiPackageFill size={22} />
                </div>
                <div className="mt-2 text-xs font-semibold text-center">Pending</div>
            </div>

            {/* Line between steps */}
            <div className={`flex-auto border-t-4 mx-4 ${(orderStatus === 'shipped' || orderStatus === 'delivered') ? "border-blue-500 " : "border-gray-300 "}`}></div>

            {/* Step 2: Shipped */}
            <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${orderStatus === 'shipped' || orderStatus === 'delivered' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                    <FaTruckFast size={22} className="text-green-"/>
                </div>
                <div className="mt-2 text-xs font-semibold text-center">Shipped</div>
            </div>

            {/* Line between steps */}
            <div className={`flex-auto border-t-4 border-gray-300 mx-4 ${(orderStatus === 'delivered') ? "border-green-500 " : "border-gray-300 "}`}></div>

            {/* Step 3: Delivered */}
            <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${orderStatus === 'delivered' ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                    <LuPackageCheck size={22} />
                </div>
                <div className="mt-2 text-xs font-semibold text-center">Delivered</div>
            </div>
        </div>
    )
}