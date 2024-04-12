import React, { useEffect, useState } from 'react'


import styles from "../style.module.scss"
import { AgGridReact } from 'ag-grid-react'
import { Icon } from '@iconify/react'
import { Link, useNavigate } from 'react-router-dom'
import { GetAllRequestedApointments, TakeActionForApointment } from '../../../../../services/recptionist.services'
import Swal from 'sweetalert2'

export default function ApointmentsRequests() {

    const navigator = useNavigate()

    const [rowData, setRowData] = useState([])

    function fetchData() {
        GetAllRequestedApointments()
            .then(res => {
                console.log(res)
                setRowData(res)
            })
    }

    const takeAction = (id, action) => {
        Swal.fire({
            icon: "question",
            title: "Are You Sur for continue?",
            showConfirmButton: true,
            showCancelButton: true,
        }).then(res => {
            if (res.isConfirmed) {
                TakeActionForApointment(id, action)
                    .then(res => fetchData())
            }
        })

    }



    const [colDefs, setColDefs] = useState([
        { field: "doctorId", editable: false, flex: 1 },
        { field: "userId", editable: false, flex: 1 },
        { field: "doctorInfo" },
        { field: "userInfo" },
        {
            field: "action",
            cellRenderer: ({ data }) => (
                <div className={styles.buttons}>
                    <button className={styles.accept} onClick={() => takeAction(data._id, "accept")}>
                        Accept
                    </button>
                    <button className={styles.reject}
                        onClick={() => takeAction(data._id, "reject")}>
                        Reject
                    </button>
                </div>),
            editable: false
        },
        { field: "time" },
        { field: "createdAt" },
        { field: "date" },
    ]);


    const onRowDoubleClick = ({ data }) => {
        navigator("/dashboard/receptionist/appointments/" + data._id)
    }

    return (
        <div
            className={`${styles.page} ag-theme-quartz`}
        >
            <h1>
                <span>All Requests</span>
            </h1>
            <AgGridReact
                className={styles.table}
                rowData={rowData}
                columnDefs={colDefs}
                onRowDoubleClicked={onRowDoubleClick}
                defaultColDef={{
                    floatingFilter: true,
                    filter: true,
                    sort: true,
                    editable: true,
                }}
                onCellValueChanged={(e) => {
                    console.log(e)
                }}
                onGridReady={(e) => {
                    fetchData()
                }}

            />
        </div>
    )
}
