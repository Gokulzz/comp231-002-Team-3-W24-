import React, { useEffect, useState } from 'react'
import { get, put } from '../../../../../utils/request'
import { RECEPIONIST_URL } from '../../../../../libs/Urls'


import styles from "../style.module.scss"
import { AgGridReact } from 'ag-grid-react'
import StatusCell from '../../../../../components/Table/Cells/StatusCell'
import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'

export default function ApointmentsRequests() {

    const [rowData, setRowData] = useState([])

    function fetchData() {
        get(RECEPIONIST_URL.APPOINTMENTS.REQUESTS.LIST)
            .then(res => {
                setRowData(res.data)
            })
            .catch(err => {
            })
    }

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
        { field: "doctorId", editable: false },
        { field: "userId", editable: false },
        { field: "doctorInfo" },
        {
            field: "status",
            cellRenderer: (p) => (<StatusCell {...p} options={statusOptions} />),
            editable: false
        },
        { field: "time" },
        { field: "userId" },
        { field: "userInfo" },
        { field: "createdAt" },
        { field: "date" },
        // { field: "__v" },
        // { field: "_id" },
    ]);


    function updateData({ data }) {
        console.log(data._id)
        put(RECEPIONIST_URL.APPOINTMENTS.STATUS.replace("{id}", data._id), data.status)
            .then(res => {
                console.log(res)
                fetchData()
            })
            .catch(err => { })
    }


    const onRowDoubleClick = ({ data }) => {
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
                    updateData(e)
                }}
                onGridReady={(e) => {
                    fetchData()
                }}

            />
        </div>
    )
}
