"use client"
import { useCurrentPage } from "@/contexts/MainUiContext";
import * as Constant from "@/lib/constants";
import Modal from "../basics/Modal";
import RegisterForm from "../user/RegisterForm";
import { useState } from "react";
import LoginForm from "../user/LoginForm";
import { useAuth } from "@/contexts/AuthContext";

export default function Footer() {

    const { setCurrentPage } = useCurrentPage();
    const { user } = useAuth();
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);

    return (
        <>
            <footer className="bg-yellow-500 text-white shadow-md p-3 text-sm border-t border-yellow-600">
                <div className="flex justify-between items-center mx-5">
                    <p className="flex-1 justify-center m-auto flex">© 2024 E-Commerce. All rights reserved.</p>
                    {user === null && (
                        <div className="flex space-x-4 ml-auto">
                            <div className="hover:text-gray-800 cursor-pointer" onClick={() => setShowLoginForm(true)}>Login</div>
                            <div className="hover:text-gray-800 cursor-pointer" onClick={() => setShowRegistrationForm(true)}>Register</div>
                        </div>
                    )}
                </div>
            </footer>


            {showRegistrationForm && <Modal>
                <div className="">
                    <RegisterForm onClose={() => setShowRegistrationForm(false)} />
                </div>
            </Modal>}

            {showLoginForm && <Modal>
                <div className="">
                    <LoginForm onClose={() => setShowLoginForm(false)} />
                </div>
            </Modal>}
        </>
    )
}