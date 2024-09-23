import { RiHeart3Line } from "react-icons/ri";

export default function FavoriteIcon() {

    return (
        <>
         <div className="relative inline-block">
            {/* Icon */}
            <RiHeart3Line className="text-gray-500 hover:text-gray-600 text-xl" />

            {/* Badge */}
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full transform translate-x-1/2 -translate-y-1/2">
                0
            </span>
        </div>
        </>
    )
}