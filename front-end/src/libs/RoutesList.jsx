import { Icon } from "@iconify/react";
import LoginPage from "../pages/Auth/LoginPage/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage/RegisterPage";
import HomePage from "../pages/Home/HomePage";
import ReceptionistLayout from "../pages/Dashboards/Receptionist/ReceptionistLayout";
import Apointments from "../pages/Dashboards/Receptionist/Apointments/Apointments";

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
    {
        path: "/receptionist/dashboard",
        element: <ReceptionistLayout />,
        icon: <Icon icon="ri:dashboard-fill" />,
        title: "Dashboard",
        nested: {
            path: "/appointments",
            element: <Apointments />,
            icon: <Icon icon="mingcute:time-fill" />,
            title: "Appointments",
        }
    },


]