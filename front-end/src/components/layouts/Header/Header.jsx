import { NavLink } from "react-router-dom";


import styles from "./styles.module.scss"

import { routes } from "../../../libs/RoutesList"
import { useSelector } from "react-redux";


export default function Header() {



  const user = useSelector(state => state.user.value)

  return <header className={styles.header}>


    <div className={styles.left}>
      <img
        className={styles.logo}
        src="/images/logo.jpg" />
      <h1>Doctor Appointment</h1>
    </div>


    <nav className={styles.nav}>

      {
        user &&
        <NavLink
          className={styles.link}
          key={routes.ROLE_ACCESS.DASHBOARD.title}
          to={routes.ROLE_ACCESS.DASHBOARD.path.replace("{role}", user?.role)} >
          {routes.ROLE_ACCESS.DASHBOARD.icon}
          {routes.ROLE_ACCESS.DASHBOARD.title}
        </NavLink>
      }


      {
        routes.AUTH.map(route => {
          return <NavLink
            className={styles.link}
            key={route.title}
            to={route.path} >
            {route.icon}
            {route.title}
          </NavLink>
        })
      }

      {
        routes.PUBLIC.map(route => {
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
