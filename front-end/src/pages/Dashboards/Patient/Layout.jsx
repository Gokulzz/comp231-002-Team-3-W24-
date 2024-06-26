import { Icon } from '@iconify/react'
import React from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'


import styles from "./styles.module.scss"



export default function PatientLayout() {



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

                <NavLink className={isActive} to={"appointments/requests"}>
                    <Icon icon="iconoir:git-pull-request-closed" />
                    <span>Appointments</span>
                </NavLink>

                <NavLink className={isActive} to={"appointments/requests/create"}>
                    <Icon icon="iconoir:git-pull-request-closed" />
                    <span>Book Appointment</span>
                </NavLink>
            </nav>
            <Outlet />
        </main>
    )
}
