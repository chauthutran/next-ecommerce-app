import React, { useEffect, useRef, useState } from 'react';
import { FaRegUser } from 'react-icons/fa';
import { useAuth } from '@/contexts/AuthContext';
import { MdLogout } from "react-icons/md";
import { MdOutlineShoppingCart } from "react-icons/md";
import { TfiPackage } from "react-icons/tfi";
import { useCurrentPage } from '@/contexts/MainUiContext';
import * as Constant from "@/lib/constants";


export default function UserMenus() {
	
	const { setUser } = useAuth();
	const { currentPage, setCurrentPage } = useCurrentPage();

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
        if (ok) {
            if (currentPage.name === Constant.PAGE_USER_CART
                || currentPage.name === Constant.PAGE_USER_ORDER
                || currentPage.name === Constant.PAGE_USER_PROFILE) {
                setCurrentPage(Constant.PAGE_HOME);
            }
            setUser(null);
        }
	}
	const renderUserRelatedMenus = () => {
		return (
			<>
				<li className="px-4 py-2 flex space-x-2 items-center text-color-2 cursor-pointer hover:bg-color-17 hover:text-white hover:shadow-lg" onClick={() => {setCurrentPage(Constant.PAGE_USER_PROFILE); setIsOpen(false);}} >
					<MdOutlineShoppingCart size={22} />
					<span>Profile</span>
				</li>
				<li className="px-4 py-2 flex space-x-2 items-center text-color-2 cursor-pointer hover:bg-color-17  hover:shadow-lg hover:text-white" onClick={() => {setCurrentPage(Constant.PAGE_USER_CHANGE_PASSWORD); setIsOpen(false);}} >
					<TfiPackage size={18} />
					<span>Change Password</span>
				</li>

				<li className="mx-2 my-3 border-b border-gray-300 "></li>
				
				<li className="px-4 py-2 flex space-x-2 items-center cursor-pointer text-color-17  hover:bg-red-500 hover:text-white hover:shadow-lg" onClick={() => logout()} >
					<MdLogout size={22} />
					<span>Log-out</span>
				</li>
			</>
		)
	}

	return (
		<>
			{/* For the large size */}
			<div className="relative text-left">
				<button
					onClick={toggleDropdown}
					className="text-gray-500 hover:text-gray-600"
				>
					<FaRegUser /> 
				</button>

				{/* Dropdown menu */}
				{isOpen && (
					<div ref={divRef} className="absolute right-0 mt-2 w-48 bg-white border-2 border-color-1 rounded-md shadow-2xl">
						<ul className="py-1 text-black">
							{renderUserRelatedMenus()}
						</ul>
					</div>
				)}
			</div>
		</>

	);
};