"use client";

import { CiUser } from "react-icons/ci";
import { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { IoKeyOutline } from "react-icons/io5";
import * as Constant from '@/lib/constants';
import * as Utils from "@/lib/utils";
import { useCurrentPage } from "@/contexts/MainUiContext";
import { useAuth } from "@/contexts/AuthContext";
import { IoIosCloseCircle } from "react-icons/io";


export default function LoginForm({ onClose, onSuccess }: { onClose: () => void, onSuccess?: () => void}) {

	const { user, login, loading, error } = useAuth();

	const [email, setEmail] = useState("test1@example.com");
	const [password, setPassword] = useState("1234");


	useEffect(() => {
		if (user != null) {
			if( onSuccess) onSuccess();
			onClose();
		}
	}, [user])

	const handleLoginBtn = async(e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		await login(email, password);
	};


	return (
		<div className="bg-ghost-white rounded-lg min-w-[600px] md:w-3/4">
			<h2 className="py-3 px-5 text-xl flex bg-blue-navy text-black rounded-t-lg items-center justify-between font-semibold border-b-2 border-gray-300">
				<div>Login</div>
				<div className="flex cursor-pointer" onClick={() => onClose()}>
					<IoIosCloseCircle className="size-6" />
				</div>
			</h2>

			<div className="flex flex-col px-5 py-5 justify-center bg-white">
				<div className="mb-4">
					<label
						className="block text-xs font-medium"
						htmlFor="email"
					>
						Email
					</label>
					<div className="relative">
						<input
							className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 "
							id="email"
							type="email"
							name="email"
							value={email}
							placeholder="Enter your email"
							required
							onChange={(e) => { setEmail(e.target.value) }}
						/>
						<CiUser className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"></CiUser>
					</div>
				</div>
				<div className="mb-4">
					<label
						className="block text-xs font-medium"
						htmlFor="password"
					>
						Password
					</label>
					<div className="relative">
						<input
							className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
							id="password"
							type="password"
							name="password"
							placeholder="Enter password"
							value={password}
							required
							minLength={4}
							onChange={(e) => { setPassword(e.target.value) }}
						/>
						<IoKeyOutline className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
					</div>
				</div>

				<div className="mb-4">
					<button className="flex w-full flex-row bg-blue-navy px-4 py-2 rounded bg-mustard-yellow hover:bg-bright-yellow text-black cursor-pointer" onClick={(e) => handleLoginBtn(e)} >
						<span className="flex-1">Log in</span>
						{loading && <FaSpinner className="ml-auto h-5" size={20} />}
					</button>
				</div>

				<div className="flex items-end space-x-1 text-red-500 italic text-sm">
					{error != null && <p>{error}</p>}
				</div>
			</div>
		</div>
	);
}
