import { NavLink } from "react-router-dom";


import styles from "./styles.module.scss"

import { routes } from "../../../libs/RoutesList"


export default function Header() {
  return <header className={styles.header}>

    <div className={styles.left}>
      <img
        className={styles.logo}
        src="/images/logo.jpg" />
      <h1>Doctor Appointment</h1>
    </div>

    <nav className={styles.nav}>

      {
        routes.map(route => {
          return <NavLink
            className={styles.link}
            key={route.title}
            to={route.path} >
            {route.icon}
            {route.title}
          </NavLink>
        })
      }
    </nav>



  </header>;
}
