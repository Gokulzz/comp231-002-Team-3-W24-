import { AgGridReact } from 'ag-grid-react';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import DoctorsTable from './components/DoctorsTable/DoctorsTable';




import Modal from 'react-modal';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};


Modal.setAppElement('body');


export default function SelectDocotorModal({ isOpen, setIsOpen, onSelectSubmit, onClose }) {

    return <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="Example Modal"
        style={{
            overlay: {

            },
            content: {
                padding: 0,
                width: "50dvw",
                height: "50dvh",
                justifySelf: "center",
                alignSelf: "center"
            }
        }}
    >
        <DoctorsTable
            onSelectRow={onSelectSubmit} />
    </Modal>
}
