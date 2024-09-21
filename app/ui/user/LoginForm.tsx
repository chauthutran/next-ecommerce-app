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


export default function LoginForm({ onClose, onSuccess }: { onClose: () => void, onSuccess?: () => void }) {

	const { user, login, loading, error } = useAuth();

	const [email, setEmail] = useState("test1@example.com");
	const [password, setPassword] = useState("1234");


	useEffect(() => {
		if (user != null) {
			if (onSuccess) onSuccess();
			onClose();
		}
	}, [user])

	const handleLoginBtn = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		await login(email, password);
	};


	return (
		<div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
			<div className="bg-white rounded-lg shadow-lg w-96">
				<div className="bg-color-2 text-white p-3 rounded-t-lg flex">
					<h2 className="text-xl">Login</h2>
					<div className="ml-auto cursor-pointer" onClick={() => onClose()}>
						<IoIosCloseCircle className="text-white size-6" />
					</div>
				</div>

				<div className="px-6 py-3">
					<form>
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
					</form>
				</div>

				<div className="bg-color-1 p-4 rounded-b-lg flex justify-end space-x-2">
					<button className="flex w-full bg-color-13 text-white py-2 px-4 rounded hover:bg-blue-400" onClick={(e) => handleLoginBtn(e)} >
						<span className="flex-1">Log in</span>
						{loading && <FaSpinner className="ml-auto h-5" size={16} />}
					</button>
				</div>
				<div className="flex items-end space-x-1 text-red-500 italic text-sm">
					{error != null && <p>{error}</p>}
				</div>
			</div>

		</div>
	);
}
