/** The login page for user authentication. Contains the LoginForm component. */

"use client";

import { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { IoKeyOutline } from "react-icons/io5";
import * as Constant from '@/lib/constants';
import { useCurrentPage } from "@/contexts/MainUiContext";
import { useAuth } from "@/contexts/AuthContext";
import { GiThreeLeaves } from 'react-icons/gi';
import { JSONObject } from '@/lib/definations';
import { IoIosCloseCircle } from 'react-icons/io';

export default function RegisterForm({ onClose }: { onClose: () => void }) {

	const { setCurrentPage } = useCurrentPage();
	const { loading, error, user, register } = useAuth();

	// Set initial form state based on schema
	const [formData, setFormData] = useState<JSONObject>({
		name: '',
		email: '',
		password: '',
		role: 'customer',
		address: {
			street: '',
			city: '',
			country: '',
			zipCode: ''
		},
		orders: [], // Assuming orders are selected/added through another process
	});

	// Handle form input change
	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		if (name.includes("address")) {
			const [field, key] = name.split(".");
			setFormData({
				...formData,
				[field]: {
					...formData[field],
					[key]: value
				}
			});
		} else {
			setFormData({
				...formData,
				[name]: value,
			});
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		register(formData);
	};

	return (
		<div className="bg-white rounded-lg max-w-[600px] md:w-3/4">
			<h2 className="py-3 px-5 text-xl flex bg-blue-navy text-black rounded-t-lg items-center justify-between font-semibold border-b-2 border-gray-300">
				<div>Register New User</div>
				<div className="flex cursor-pointer" onClick={() => onClose()}>
					<IoIosCloseCircle className="size-6" />
				</div>
			</h2>

			<div className="px-5 py-2 rounded-md bg-ghost-white overflow-y-auto" style={{ height: 'calc(100vh - 180px)' }}>
				<form onSubmit={handleSubmit} action="POST" className="grid grid-cols-1 justify-center gap-4 m-1" >
					<div>
						<label className="block text-xs font-medium" htmlFor="email">Name</label>
						<div className="relative">
							<input
								type="text"
								name="name"
								className="peer block w-full rounded-md border border-gray-300 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
								value={formData.name}
								onChange={handleChange}
								required
							/>
						</div>
					</div>

					<div>
						<label className="block text-xs font-medium" htmlFor="email">Email</label>
						<div className="relative">
							<input
								type="email"
								name="email"
								className="peer block w-full rounded-md border border-gray-300 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
								value={formData.email}
								onChange={handleChange}
								required
							/>
						</div>
					</div>

					<div>
						<label className="block text-xs font-medium" htmlFor="password" >Password</label>
						<div className="relative">
							<input
								type="password"
								name="password"
								className="peer block w-full rounded-md border border-gray-300 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
								value={formData.password}
								onChange={handleChange}
								required
							/>
						</div>
					</div>

					<div>
						<label className="block text-xs font-medium" htmlFor="role">Role</label>
						<div className="relative">
							<select name="role" value={formData.role} onChange={handleChange}
								className="peer block w-full rounded-md border border-gray-300 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500">
								<option value="customer">Customer</option>
								<option value="admin">Admin</option>
							</select>
						</div>
					</div>

					<h3>Address</h3>
					<div>
						<label className="block text-xs font-medium" htmlFor="address.street">Street</label>
						<div className="relative">
							<input
								type="text"
								name="address.street"
								className="peer block w-full rounded-md border border-gray-300 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
								value={formData.address.street}
								onChange={handleChange}
							/>
						</div>
						<div>
							<label className="block text-xs font-medium" htmlFor="address.city">City</label>
							<div className="relative">
								<input
									type="text"
									name="address.city"
									className="peer block w-full rounded-md border border-gray-300 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
									value={formData.address.city}
									onChange={handleChange}
								/>
							</div>
						</div>

						<div>
							<label className="block text-xs font-medium" htmlFor="address.country">Country</label>
							<div className="relative">
								<input
									type="text"
									name="address.country"
									className="peer block w-full rounded-md border border-gray-300 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
									value={formData.address.country}
									onChange={handleChange}
								/>
							</div>
						</div>

						<div>
							<label className="block text-xs font-medium" htmlFor="address.zipCode">Zip Code</label>
							<div className="relative">
								<input
									type="text"
									name="address.zipCode"
									className="peer block w-full rounded-md border border-gray-300 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
									value={formData.address.zipCode}
									onChange={handleChange}
								/>
							</div>
						</div>
					</div>

					<button type="submit" className="bg-mustard-yellow p-1 rounded-lg">Submit</button>
				</form>
			</div>
			
			<div className="flex h-8 items-end space-x-1 text-red-500 m-5 italic">
				{error != null && <p>{error}</p>}
			</div>
		</div>
	);
}
