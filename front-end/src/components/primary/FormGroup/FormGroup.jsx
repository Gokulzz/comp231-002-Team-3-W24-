
import styles from "./styles.module.scss"

export default function FormGroup(
    {
        icon,
        title,
        type,
        name,
        defaultValue,
        readOnly,
        required
    }
) {
    return (
        <div className={styles.formGroup}>
            <div className={styles.fieldHeader}>
                {icon}
                {title}
            </div>

            {
                type === "textarea" ?
                    <textarea
                        name={name}
                        defaultValue={defaultValue}
                        required={required}
                        readOnly={readOnly} cols="30" rows="10"></textarea>
                    :
                    <input
                        type={type}
                        name={name}
                        required={required}
                        defaultValue={defaultValue}
                        readOnly={readOnly} />
            }

        </div>
    )
}
