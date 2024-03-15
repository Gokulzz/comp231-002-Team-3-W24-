import { Icon } from "@iconify/react";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/Auth/LoginPage/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage/RegisterPage";

export const routes = [
    {
        path: "/",
        element: <HomePage />,
        icon: <Icon icon="fluent:home-24-filled" />,
        title: "Home"
    },
    {
        path: "/login",
        element: <LoginPage />,
        icon: <Icon icon="line-md:login" />,
        title: "Login"
    },
    {
        path: "/register",
        element: <RegisterPage />,
        icon: <Icon icon="mdi:register" />,
        title: "Register"
    },

]