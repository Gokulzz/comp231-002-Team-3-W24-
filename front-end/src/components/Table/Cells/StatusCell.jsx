

import styles from "./style.module.scss"


export default function StatusCell(props) {

    const value = props.value
    const options = props.options


    const handleChange = (e) => {
        props.api.stopEditing();
        props.node.setDataValue('status', e.target.value);
    };


    return (
        <div className={`${styles.cell} ${styles[value]}`}>
            <select value={value} onChange={handleChange}>
                {
                    options.map((opt, index) => {
                        return <option key={index} value={opt.value}>{opt.label}</option>

                    })
                }
            </select>
            {/* {value} */}
        </div>
    )
}
