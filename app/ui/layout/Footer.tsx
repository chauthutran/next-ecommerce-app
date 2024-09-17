"use client"
import { useCurrentPage } from "@/contexts/MainUiContext";
import * as Constant from "@/lib/constants";
import Modal from "../basics/Modal";
import RegisterForm from "../auth/RegisterForm";
import { useState } from "react";
import LoginForm from "../auth/LoginForm";
import { useAuth } from "@/contexts/AuthContext";

export default function Footer() {

    const { setCurrentPage } = useCurrentPage();
	const { user } = useAuth();
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);

    return (
        <>
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

            <footer className="h-30 py-3 w-screen text-center text-xs z-10 flex item-center bg-gray-200 border-t border-gray-300">
                <div className="flex flex-1 justify-center items-center">
                    © 2024 E-Commerce. All rights reserved.
                </div>

                <div className="rounded-md justify-end mr-5 flex space-x-3" >
                    {user !== null && <>
                        <div className="cursor-pointer" onClick={() => setShowLoginForm(true)}>Login</div>
                        <div className="cursor-pointer text-gray-400">|</div>
                        <div className="cursor-pointer"  onClick={() => setShowRegistrationForm(true)}>Register</div>
                    </>}
                </div>
            </footer>
        </>
    )
}