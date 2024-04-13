import React, { useState } from 'react'
import { Link, json, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Icon } from '@iconify/react'
import { AgGridReact } from 'ag-grid-react'
import styles from "./styles.module.scss"
import { GetAllPatientApointments } from '../../../../services/pateint.services'
import StatusCell from '../../../../components/Table/Cells/StatusCell/StatusCell'
export default function PatientApointmentRequests() {
  const navigator = useNavigate()

  const [rowData, setRowData] = useState([])

  const statusOptions = [
    { label: "Pending", value: "pending" },
    { label: "Reschedule", value: "reschedule" },
    { label: "Rejected", value: "rejected" },
    { label: "Accepted", value: "accepted" },
    { label: "Cancel", value: "cancel" },
    { label: "Visit", value: "visit" },
    { label: "All", value: "all" },
  ];


  function fetchData() {
    GetAllPatientApointments()
      .then(res => setRowData(res))
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
    {
      headerName: "Doctor - Info",
      flex: 1,
      editable: false,
      children: [
        {
          field: "speciality",
          flex: 1,
          editable: false,
          valueFormatter: ({ data }) => {
            console.log(data)
            const doctorInfo = data.doctorInfo
            return JSON.parse(doctorInfo).speciality
          }
        },
        {
          field: "experience",
          flex: 1,
          editable: false,
          valueFormatter: ({ data }) => {
            console.log(data)
            const doctorInfo = data.doctorInfo
            return JSON.parse(doctorInfo).experience
          }
        },
      ]
    },
    {
      field: "userInfo",
      flex: 1,
      editable: false
    },
    {
      field: "status",
      cellRenderer: (p) => (<StatusCell
        {...p}
        options={statusOptions}
        readOnly={true} />),
      editable: false
    },
    { field: "time", editable: false },
    { field: "date", editable: false },
  ]);




  console.log(JSON.parse("{\"speciality\":\"Heart surgeon\",\"experience\":\"10 years\"}"))

  return (
    <div
      className={`${styles.page} ag-theme-quartz`}
    >

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
