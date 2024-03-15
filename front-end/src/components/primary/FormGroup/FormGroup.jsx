
import styles from "./styles.module.scss"

export default function FormGroup(
    { title, type, name }
) {
    return (
        <div className={styles.formGroup}>
            <p>{title}</p>
            <input type={type} name={name} />
        </div>
    )
}
