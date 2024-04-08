import React, { useState } from 'react'
import { AgGridReact } from 'ag-grid-react';


import styles from "./styles.module.scss"
import { DeleteUser, GetAllDoctors, GetAllUsers, UpdateeDoctor } from '../../../../services/adminstrator.services';
import CellContainer from '../../../../components/Table/Cells/CellContainer/CellContainer';
import ButtonCell from '../../../../components/Table/Cells/ButtonCell/ButtonCell';
import { Icon } from '@iconify/react/dist/iconify.js';
import Swal from "sweetalert2"

export default function DoctorsPage() {




    const [colDefs, setColDefs] = useState([
        { field: "doctorId._id", editable: false, headerName: "Doctor ID", flex: 1 },
        { field: "doctorId.username", editable: false, headerName: "UserName", flex: 1 },
        { field: "speciality", editable: true, headerName: "Speciality", flex: 1 },
        { field: "experience", editable: true, headerName: "Experience", flex: 1 },
        // { field: "createdAt", editable: false, headerName: "Created At", flex: 1 },
        // { field: "updatedAt", editable: false, headerName: "Updated At", flex: 1 },
        {
            field: "controlls",
            editable: false,
            headerName: "Controls",
            width: 100,
            editable: false,
            filter: false,
            floatingFilter: false,
            cellRenderer: ({ data }) => <CellContainer >
                <ButtonCell
                    icon={<Icon icon="mingcute:delete-fill" />}
                    onClick={() => handleDelete(data)}
                    title={"Delete"}
                    variant={"danger"} />

            </CellContainer>
        },
    ]);

    const [rowData, setRowData] = useState([])


    const fetchData = () => {
        GetAllDoctors()
            .then(res => {
                console.log(res)
                setRowData(res)
            })
            .catch(err => { })
    }


    const handleDelete = (data) => {
        Swal.fire({
            icon: "question",
            title: "Are You Sur to Delete User ?",
            confirmButtonColor: "red",
            confirmButtonText: "Yes Delete It!.",
            denyButtonText: "Cancel",
            denyButtonColor: "var(--bs-info)",
            showDenyButton: true
        }).then(result => {
            if (result.isConfirmed) {
                DeleteUser(data.doctorId._id)
                    .then(res => fetchData())
            }
        })
    }

    const handleUpdate = ({ data }) => {
        UpdateeDoctor(data.doctorId._id, data)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }




    return (
        <div
            className={`${styles.page} ag-theme-quartz`}
        >
            <h1>All Doctors</h1>
            <AgGridReact
                className={styles.table}
                rowData={rowData}
                columnDefs={colDefs}
                defaultColDef={{
                    floatingFilter: true,
                    filter: true,
                    sort: true,
                    editable: true,
                }}
                onGridReady={(e) => {
                    fetchData()
                }}
                onCellValueChanged={handleUpdate}

            />
        </div>
    )
}
