import React, { useEffect, useState } from 'react'
import StatusCell from '../../../../../../components/Table/Cells/StatusCell/StatusCell';


import styles from "../../style.module.scss"
import { Icon, _api } from '@iconify/react';
import { formToJSON } from 'axios';
import { post } from '../../../../../../utils/request';
import { PATIENT, RECEPIONIST_URL } from '../../../../../../libs/Urls';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import SelectDocotorModal from '../../../../../../modals/SelectDoctor/SelectDocotorModal';

import { useSelector } from "react-redux";

export default function PatientCreateApointment() {

    const user = useSelector(state => state.user.value)
    const [showModal, setIsShowModal] = useState(false)
    const navigate = useNavigate();
    const [selectedDoctor, setSelectedDoctor] = useState()




    const [colDefs, setColDefs] = useState([]);
    useEffect(() => {
        setColDefs([])
        setColDefs([
            {
                field: "userId",
                type: "text",
                editable: false,
                defaultValue: user.token,
                readOnly: true

            },
            {
                field: "doctorUsername",
                type: "text",
                editable: false,
                onClick: () => setIsShowModal(true),
                selectField: "doctorUsername",
                readOnly: true
            },
            {
                field: "userInfo",
                type: "text"
            },
            {
                field: "date",
                type: "date"
            },
            {
                field: "time",
                type: "time"
            },
        ])
    }, [user])






    const handleOnFormSubmit = (e) => {
        e.preventDefault()
        const data = formToJSON(e.target)
        console.log(data)
        post(PATIENT.CREATE_APPOINTMENT, data)
            .then(res => {
                if (res.status === 201) {
                    Swal.fire({
                        icon: "success",
                        title: "New Apointment Created!"
                    }).finally(e => {
                        navigate(-1)
                    })
                }

            })
            .catch(err => {
                console.log(err)
            })

    }






    return (
        <div className={styles.page}>
            <form className={styles.form} onSubmit={handleOnFormSubmit}>
                {colDefs.map((colDef, index) => (
                    <fieldset key={index} onClick={colDef.onClick}>
                        <legend>{colDef.field}</legend>
                        <input
                            type={colDef.type}
                            name={colDef.field}
                            required
                            defaultValue={colDef.defaultValue ||
                                selectedDoctor && selectedDoctor[colDef.selectField]}
                            readOnly={colDef.readOnly}
                        />
                    </fieldset>
                ))}
                <div className={styles.formButtons}>
                    <button className={styles.submit} type="submit">
                        Submit
                        <Icon icon="formkit:submit" />
                    </button>
                    <button type='button'
                        onClick={() => {
                            navigate(-1)
                        }} className={styles.cancel}>
                        Cancel
                        <Icon icon="material-symbols:cancel" />
                    </button>
                </div>
            </form>
            <SelectDocotorModal
                isOpen={showModal}
                setIsOpen={setIsShowModal}
                onSelectSubmit={(e) => {
                    setSelectedDoctor(e)
                    setIsShowModal(false)
                }}
                onClose={(e) => { console.log(e) }}
            />
        </div>
    );
}
