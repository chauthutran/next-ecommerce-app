import { useAuth } from "@/contexts/AuthContext"
import { JSONObject } from "@/lib/definations";
import { useState } from "react";
import { RiBubbleChartFill } from "react-icons/ri";

export default function ProfilePage() {

    const { user } = useAuth();

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<JSONObject>(user!);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            //   await axios.put('/api/profile', formData);
            setIsEditing(false);
            alert('Profile updated');
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className="bg-white rounded-lg p-3 m-3">
            <div className="font-semibold text-2xl mb-5 border-b border-slate-400 pb-3 flex">
                <RiBubbleChartFill className="text-firebrick mr-2" />
                {user!.name}'s Profile
            </div>

            {!isEditing ? (
                <div className="space-y-3">
                    <p>Email: {user!.email}</p>
                    <p>Address: {`${user!.address.street}, ${user!.address.city}, ${user!.address.country} - ${user!.address.zipCode}`}</p>
                    <button className="bg-color-17 p-2 rounded-sm text-white hover:bg-firebrick mr-3" onClick={() => setIsEditing(true)}>Edit Profile</button>
                    <button className="bg-color-17 p-2 rounded-sm text-white hover:bg-firebrick" onClick={() => {} }>Change Password</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} action="POST" className="space-y-3">
                    <div className="grid grid-cols-1 justify-center gap-4">
                        <div className="space-y-1">
                            <label className="block text-sm font-medium" htmlFor="email">Name</label>
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

                        <h3 className="uppercase text-color-2 font-semibold mt-3">Address</h3>
                        <div className="space-y-1">
                            <label className="block text-sm font-medium" htmlFor="address.street">Street</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="address.street"
                                    className="peer block w-full rounded-md border border-gray-300 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
                                    value={formData.address.street}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="block text-sm font-medium" htmlFor="address.city">City</label>
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

                        <div className="space-y-1">
                            <label className="block text-sm font-medium" htmlFor="address.country">Country</label>
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

                        <div className="space-y-1">
                            <label className="block text-sm font-medium" htmlFor="address.zipCode">Zip Code</label>
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

                    <div className="py-4 rounded-b-lg justify-end">
                        <button type="submit" className="w-full bg-color-17 text-white py-2 px-4 rounded hover:bg-firebrick">Submit</button>
                    </div>
                </form>
            )}
        </div>
    );
}