import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import { Icon } from '@iconify/react/dist/iconify.js';
import styles from "./styles.module.scss"
import { formToJSON } from 'axios';
import Swal from "sweetalert2"
import { PreScribeMedic } from '../../../../services/doctor.services';
import FormGroup from '../../../../components/primary/FormGroup/FormGroup';
import ButtonCell from '../../../../components/Table/Cells/ButtonCell/ButtonCell';

Modal.setAppElement('body');


export default function PreScribeMedicModal(
    {
        isOpen,
        setIsOpen,
        patientId,
    }
) {


    const handleOnSubmit = (e) => {
        e.preventDefault()
        const data = formToJSON(e.target)
        PreScribeMedic(data)
            .then(res => {
                setIsOpen(false)
                Swal.fire({
                    icon: "success",
                    title: res.message
                })
            })
            .catch(err => console.log(err))
    }

    return <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="Example Modal"
        style={{
            overlay: {
            },
            content: {
                padding: "2em",
                width: "28rem",
                height: "max-content",
                justifySelf: "center",
                alignSelf: "center",
            }
        }}
    >
        <form onSubmit={handleOnSubmit} style={{
            backgroundColor: "var(--bs-blue)",
            padding: "2em",
            borderRadius: 12
        }}>
            <FormGroup
                required={true}
                icon={<Icon icon="material-symbols:patient-list" />}
                name={"patientId"}
                title={"Patient ID"}
                type={"text"}
                readOnly={true}
                defaultValue={patientId}
            />

            <FormGroup
                required={true}
                name={"medication"}
                title={"Medication"}
                type={"text"}
                icon={<Icon icon="material-symbols:medication" />}
            />

            <FormGroup
                required={true}
                name={"dosage"}
                title={"Dosage"}
                type={"text"}
                icon={<Icon icon="ri:dossier-line" />}
            />

            <FormGroup
                required={true}
                name={"instructions"}
                title={"Instructions"}
                type={"textarea"}
                icon={<Icon icon="material-symbols:integration-instructions" />}
            />

            <div className={styles.buttons}>

                <ButtonCell
                    icon={<Icon icon="material-symbols:cancel" />}
                    onClick={() => { }}
                    title={"Cancel"}
                    variant={"danger"} />

                <ButtonCell
                    icon={<Icon icon="formkit:submit" />}
                    type={"submit"}
                    title={"Submit"}
                    variant={"success"} />

            </div>
        </form>
    </Modal>
}
