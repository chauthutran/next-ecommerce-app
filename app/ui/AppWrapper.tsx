"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useMainUi } from "@/contexts/MainUiContext";
import * as Constant from "@/lib/constants";
import HomePage from "./HomePage";
import LoginForm from "./auth/LoginForm";
import RegisterForm from "./auth/RegisterForm";


export default function AppWrapper() {

	const { mainPage, setMainPage } = useMainUi();
	const { user } = useAuth();
console.log(mainPage);
	return (
		<main className={`flex-1 overflow-auto bg-alice-blue`}>
			{mainPage === Constant.PAGE_HOME && <HomePage />}

			<LoginForm />
			{mainPage === Constant.PAGE_LOGIN && <LoginForm />}
			{mainPage === Constant.PAGE_USER_REGISTRATION && <RegisterForm />}
		</main>
	)
}