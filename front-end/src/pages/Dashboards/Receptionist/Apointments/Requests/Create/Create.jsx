import React, { useState } from 'react'
import StatusCell from '../../../../../../components/Table/Cells/StatusCell';


import styles from "../../style.module.scss"
import { Icon } from '@iconify/react';
import { formToJSON } from 'axios';
import { post } from '../../../../../../utils/request';
import { RECEPIONIST_URL } from '../../../../../../libs/Urls';

export default function Create() {

    const statusOptions = [
        { label: "Pending", value: "pending" },
        { label: "Reschedule", value: "reschedule" },
        { label: "Reject", value: "reject" },
        { label: "Confirm", value: "confirm" },
        { label: "Cancel", value: "cancel" },
        { label: "Visit", value: "visit" },
        { label: "All", value: "all" },
    ];

    const [colDefs, setColDefs] = useState([
        { field: "userId", type: "text", editable: false },
        { field: "doctorId", type: "text", editable: false },
        { field: "doctorInfo", type: "text" },
        { field: "userInfo", type: "text" },
        { field: "date", type: "date" },
        { field: "time", type: "time" },
    ]);


    const handleOnFormSubmit = (e) => {
        e.preventDefault()
        const data = formToJSON(e.target)
        console.log(data)
        post(RECEPIONIST_URL.APPOINTMENTS.CREATE, data)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className={styles.page}>
            <form className={styles.form} onSubmit={handleOnFormSubmit}>
                {colDefs.map((colDef, index) => (
                    <fieldset key={index}>
                        <legend>{colDef.field}</legend>
                        <input
                            type={colDef.type}
                            name={colDef.field}
                        // You can add more props or handle onChange event as needed
                        />
                    </fieldset>
                ))}
                <div className={styles.formButtons}>
                    <button className={styles.submit} type="submit">
                        Submit
                        <Icon icon="formkit:submit" />
                    </button>
                    <button type='button' className={styles.cancel}>
                        Cancel
                        <Icon icon="material-symbols:cancel" />
                    </button>
                </div>
            </form>
        </div>
    );
}
