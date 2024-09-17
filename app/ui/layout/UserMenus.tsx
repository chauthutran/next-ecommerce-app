import { JSONObject } from '@/lib/definations';
import React, { useEffect, useRef, useState } from 'react';
import { RiUserSettingsFill } from "react-icons/ri";
import { BiSolidPurchaseTag } from "react-icons/bi";
import * as Constant from "@/lib/constants";
import { GiTakeMyMoney } from "react-icons/gi";
import { MdNotificationAdd } from "react-icons/md";
import { IoLogOutSharp } from "react-icons/io5";
import { RiStockFill } from "react-icons/ri";
import { IoMdHome } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import { FaRegUser } from 'react-icons/fa';
import { useAuth } from '@/contexts/AuthContext';


export default function UserMenus({ handleItemClick }: { handleItemClick: (pageName: string) => void }) {
	
	const { setUser } = useAuth();
	const [isOpen, setIsOpen] = useState(false);
	const divRef = useRef<HTMLDivElement>(null);

	// Toggle the dropdown visibility
	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (divRef.current && !divRef.current.contains(event.target as Node)) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const logout = () => {
		const ok = confirm("Are you sure you want to log out ?");
		if(ok) {
			setUser(null);
		}
	}
	const renderUserRelatedMenus = () => {
		return (
			<>
				{/* <li className="my-3 border-b border-gray-600 "></li> */}
				<li className="py-2 flex space-x-2 items-center cursor-pointer" onClick={() => logout()} >
					<IoLogOutSharp size={22} />
					<span>Log-out</span>
				</li>
			</>
		)
	}

	return (
		<>
			{/* For the large size */}
			<div className="relative text-left hidden md:flex">
				<button
					onClick={toggleDropdown}
					className="p-2 bg-gold text-black rounded-full bg-yellow-100  border-2 border-yellow-300 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
				>
					<FaRegUser /> 
				</button>

				{/* Dropdown menu */}
				{isOpen && (
					<div ref={divRef} className="absolute right-0 mt-2 w-48 bg-white border-2 border-gray-300 rounded-md shadow-lg">
						<ul className="py-1 text-navy-blue px-4">
							{renderUserRelatedMenus()}
						</ul>
					</div>
				)}
			</div>
		</>

	);
};