import React from 'react'

import styles from "./styles.module.scss"

export default function CellContainer({ children }) {
    return (
        <div className={styles.container}>
            {children}
        </div>
    )
}
