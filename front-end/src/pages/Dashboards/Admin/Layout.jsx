import { Icon } from '@iconify/react'
import React from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'


import styles from "./styles.module.scss"



export default function AdminLayout() {



    const isActive = ({ isActive }) => {
        return styles[isActive]
    }

    return (
        <main className={styles.dashboard}>
            <nav>
                <NavLink className={isActive} to={"dashboard"}>
                    <Icon icon="mdi:view-dashboard" />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink className={isActive} to={"users"}>
                    <Icon icon="mdi:users" />
                    <span>Users</span>
                </NavLink>


                <NavLink className={isActive} to={"doctors"}>
                    <Icon icon="fontisto:doctor" />
                    <span>Doctors</span>
                </NavLink>

                <NavLink className={isActive} to={"doctors/change-info"}>
                    <Icon icon="ph:info-fill" />
                    <span>Doctor Info</span>
                </NavLink>
            </nav>
            <Outlet />
        </main>
    )
}
