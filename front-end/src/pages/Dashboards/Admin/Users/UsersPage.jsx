import React, { useState } from 'react'
import { AgGridReact } from 'ag-grid-react';


import styles from "./styles.module.scss"
import { DeleteUser, GetAllUsers } from '../../../../services/adminstrator.services';
import CellContainer from '../../../../components/Table/Cells/CellContainer/CellContainer';
import ButtonCell from '../../../../components/Table/Cells/ButtonCell/ButtonCell';
import { Icon } from '@iconify/react/dist/iconify.js';
import Swal from "sweetalert2"

export default function UsersPage() {


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
                DeleteUser(data._id)
                    .then(res => fetchData())
            }
        })
    }


    const [colDefs, setColDefs] = useState([
        { field: "_id", editable: false, headerName: "User ID", flex: 1 },
        { field: "username", editable: false, headerName: "Username", flex: 1 },
        { field: "email", editable: false, headerName: "Email", flex: 1 },
        { field: "role", editable: false, headerName: "Role", flex: 1 },
        { field: "__t", editable: false, headerName: "User Type", flex: 1 },
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
        GetAllUsers()
            .then(res => {
                console.log(res)
                setRowData(res)
            })
            .catch(err => { })
    }

    return (
        <div
            className={`${styles.page} ag-theme-quartz`}
        >
            <h1>All Apointments</h1>
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

            />
        </div>
    )
}
