import React, { useEffect, useState } from 'react'
import { get, put } from '../../../../../utils/request'
import { RECEPIONIST_URL } from '../../../../../libs/Urls'


import styles from "../style.module.scss"
import { AgGridReact } from 'ag-grid-react'
import StatusCell from '../../../../../components/Table/Cells/StatusCell'
import { Icon } from '@iconify/react'
import { Link, useNavigate } from 'react-router-dom'
import { GetAllApointments, GetAllRequestedApointments, TakeActionForApointment } from '../../../../../services/recptionist.services'
import Swal from 'sweetalert2'

export default function ApointmentsRequests() {

    const navigator = useNavigate()

    const [rowData, setRowData] = useState([])

    function fetchData() {
        GetAllRequestedApointments()
            .then(res => setRowData(res))
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
        { field: "doctorId", editable: false },
        { field: "userId", editable: false },
        { field: "doctorInfo" },
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
        { field: "userId" },
        { field: "userInfo" },
        { field: "createdAt" },
        { field: "date" },
    ]);


    const onRowDoubleClick = ({ data }) => {
        navigator("/receptionist/appointments/" + data._id)
    }

    return (
        <div
            className={`${styles.page} ag-theme-quartz`}
        >
            <h1>
                <span>All Requests</span>

                <Link className={styles.create} to={"create"}>
                    <button>
                        <Icon icon="ph:plus-fill" />
                        Create New
                    </button>
                </Link>
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
