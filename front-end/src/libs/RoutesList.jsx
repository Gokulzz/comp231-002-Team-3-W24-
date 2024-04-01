import { Icon } from "@iconify/react";

export const routes = {

    PUBLIC: [
        {
            path: "/",
            icon: <Icon icon="fluent:home-24-filled" />,
            title: "Home"
        },

    ],
    AUTH: [
        {
            path: "/auth/login",
            icon: <Icon icon="line-md:login" />,
            title: "Login/Register"
        }
    ],
    ROLE_ACCESS: {

        DASHBOARD: {
            path: "/dashboard/{role}",
            icon: <Icon icon="ri:dashboard-fill" />,
            title: "Dashboard",
        },
    }



}