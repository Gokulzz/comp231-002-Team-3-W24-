import React from 'react'
import FormGroup from '../../../../components/primary/FormGroup/FormGroup'
import { Icon } from '@iconify/react/dist/iconify.js'



import styles from "./styles.module.scss"
import { formToJSON } from 'axios'
import { UpdateeDoctor } from '../../../../services/adminstrator.services'
import Swal from 'sweetalert2'

export default function DoctorsInfo() {


    const handleOnSubmit = (e) => {
        e.preventDefault();
        const data = formToJSON(e.target)

        UpdateeDoctor(data.username, {
            ...data
        }).then(res => {
            Swal.fire({
                icon: "success",
                title: "Doctor Updated."
            })
        }).catch(err => {
            if (err?.response?.data) {
                Swal.fire({
                    icon: "error",
                    title: err?.response?.data?.message
                })
            }
        })
    }

    return <form className={styles.page} onSubmit={handleOnSubmit}>

        <FormGroup
            icon={<Icon icon="majesticons:user" />}
            name="username"
            required={true}
            title="Doctor UserName"
            type={"text"} />

        <FormGroup
            icon={<Icon icon="material-symbols:special-character" />}
            name="speciality"
            required={true}
            title="speciality"
            type={"textarea"} />

        <FormGroup
            icon={<Icon icon="material-symbols:explicit" />}
            name="experience"
            required={true}
            title="experience"
            type={"textarea"} />

        <div></div>

        <button className={styles.submit}>
            Submit
        </button>
    </form>
}
