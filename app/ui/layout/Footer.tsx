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
            <footer className="bg-color-2 text-white shadow-md p-1 pt-2">
                <div className="flex flex-col justify-between items-center space-y-1">
                    <p className="flex-1 justify-center text-sm">© 2024 E-Commerce. All rights reserved.</p>
                    {user === null && (
                        <div className="flex space-x-4">
                            <div className="hover:text-color-7 cursor-pointer" onClick={() => setShowLoginForm(true)}>Login</div>
                            <div> | </div>
                            <div className="hover:text-color-7 cursor-pointer" onClick={() => setShowRegistrationForm(true)}>Register</div>
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