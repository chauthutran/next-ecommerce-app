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


	useEffect(() => {
		if (user != null) {
			alert("The user is registered successfully and logged!");
		}
	}, [user])


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
		<div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
			<div className="bg-white rounded-lg shadow-lg w-96">
				<div className="bg-color-2 text-white p-3 rounded-t-lg flex">
					<h2 className="text-xl">Register New User</h2>
					<div className="ml-auto cursor-pointer" onClick={() => onClose()}>
						<IoIosCloseCircle className="text-white size-6" />
					</div>
				</div>

				<div className="">
					<form onSubmit={handleSubmit} action="POST" >
						<div className="overflow-y-auto pb-5 my-5 ml-5 mr-2 pr-2" style={{ maxHeight: 'calc(100vh - 300px)' }}>
							<div className="grid grid-cols-1 justify-center gap-4">
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
							</div>
						</div>

						<div className="bg-color-1 p-4 rounded-b-lg justify-end">
							<button type="submit" className="w-full bg-color-13 text-white py-2 px-4 rounded hover:bg-blue-400">Submit</button>
						</div>
					</form>
				</div>
			</div >

		</div >
	);
}
