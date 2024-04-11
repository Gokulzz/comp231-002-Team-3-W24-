import React from 'react'

import styles from "./styles.module.scss"


export default function ButtonCell({ variant, title, onClick, icon, type }) {
    return (
        <button
            type={type || "button"}
            className={`${styles.buttonCell} ${styles[variant]}`}
            onClick={onClick}>
            {icon}
            <span>
                {title}
            </span>
        </button>
    )
}
