"use client"
import { useCurrentPage } from "@/contexts/MainUiContext";
import * as Constant from "@/lib/constants";
import Modal from "../basics/Modal";
import RegisterForm from "../user/RegisterForm";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function Footer() {

    const { currentPage, setCurrentPage } = useCurrentPage();
    const { user, setUser } = useAuth();
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);

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

    return (
        <>
            <footer className="bg-color-2 text-white shadow-md p-1 pt-2 text-sm">
                <div className="flex flex-col justify-between items-center space-y-1">
                    <p className="flex-1 justify-center">© 2024 E-Commerce. All rights reserved.</p>
                    <div className="flex space-x-3">
                        {user === null && (
                            <div className="hover:text-color-7 cursor-pointer" onClick={() => setShowRegistrationForm(true)}>Register</div>
                        )}

                        {user !== null && <div className="hover:text-color-7 cursor-pointer" onClick={() => logout()}>Logout</div>}

                        <div> | </div>
                        <div className="hover:text-color-7 cursor-pointer">About Us</div>
                    </div>
                </div>
            </footer>


            {showRegistrationForm && <Modal>
                <div className="">
                    <RegisterForm onClose={() => setShowRegistrationForm(false)} />
                </div>
            </Modal>}
        </>
    )
}