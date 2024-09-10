import { FaSearch } from "react-icons/fa";
import { GiShoppingBag } from "react-icons/gi";

export default function Header() {

    return (
        <header className="grid grid-cols-3 p-4 bg-alice-blue border-b-2 border-pale-robin-egg-blue">
            <div className="text-4xl flex space-x-3">
                <div className=""><GiShoppingBag /></div>
                <div className="" style={{letterSpacing: "8px"}}>E-Commerce</div>
            </div>
            <div className="flex-1 relative">
                <input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 "
                    type="text"
                    name="search"
                    placeholder="Search ..."
                    // onChange={(e) => { setEmail(e.target.value) }}
                />
                <FaSearch className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"></FaSearch>
            </div>
        </header>
    )
}