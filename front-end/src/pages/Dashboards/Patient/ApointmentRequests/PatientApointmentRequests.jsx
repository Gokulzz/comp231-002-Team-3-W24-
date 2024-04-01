import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Icon } from '@iconify/react'
import { AgGridReact } from 'ag-grid-react'
import styles from "./styles.module.scss"
import { GetAllPatientApointments } from '../../../../services/pateint.services'

export default function PatientApointmentRequests() {
  const navigator = useNavigate()

  const [rowData, setRowData] = useState([])

  function fetchData() {
    GetAllPatientApointments(res => console.log(res))
      .catch(err => console.log(err))
  }

  const takeAction = (id, action) => {
    Swal.fire({
      icon: "question",
      title: "Are You Sur for continue?",
      showConfirmButton: true,
      showCancelButton: true,
    }).then(res => {
      if (res.isConfirmed) {

      }
    })

  }



  const [colDefs, setColDefs] = useState([
    { field: "doctorId", editable: false },
    { field: "userId", editable: false },
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
    navigator("/receptionist/appointments/" + data._id)
  }

  return (
    <div
      className={`${styles.page} ag-theme-quartz`}
    >

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
