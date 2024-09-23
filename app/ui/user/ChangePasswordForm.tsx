import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import * as dbService from "@/lib/dbService";

export default function ChangePasswordForm() {

    const { user, changePassword, error } = useAuth();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");
        setMessage("");

        if (newPassword !== confirmPassword) {
            setErrorMsg('New passwords do not match.');
            return;
        }

        await changePassword(currentPassword, newPassword);
    }

    useEffect(() => {
        setErrorMsg("");
        setMessage("New password is changed !");
    }, [user])

    return (
        <>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md m-6">
                <h2 className="text-xl font-semibold mb-4">Change Password</h2>

                {/* Current Password */}
                <div className="mb-4">
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Current Password
                    </label>
                    <input
                        type="password"
                        id="currentPassword"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>

                {/* New Password */}
                <div className="mb-4">
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                    </label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>

                {/* Confirm New Password */}
                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm New Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-colors"
                >
                    Change Password
                </button>

                <div className="mt-4">
                    {errorMsg && <p className="text-red-500 italic">{errorMsg}</p>}
                    {error && <p className="text-red-500 italic">{error}</p>}
                    {message && <p className="text-green-600 italic">{message}</p>}
                </div>
            </form>

        </>
    );
}