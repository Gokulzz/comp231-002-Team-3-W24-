
import styles from "./styles.module.scss"


export default function SelectGroup(
    { title, name, options }
) {
    return (
        <div className={styles.selectGroup}>
            <p>{title}</p>
            <select name={name} >
                {
                    options.map(opt => {
                        return <option value={opt.value}>
                            {opt.title}
                        </option>
                    })
                }
            </select>
        </div>
    )
}
