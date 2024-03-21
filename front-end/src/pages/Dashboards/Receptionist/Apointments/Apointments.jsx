import { AgGridReact } from 'ag-grid-react';
import React, { useEffect, useState } from 'react'



import styles from "./style.module.scss"
import { get, put } from '../../../../utils/request';
import { RECEPIONIST_URL } from '../../../../libs/Urls';
import StatusCell from '../../../../components/Table/Cells/StatusCell';



export default function Apointments() {

  const [rowData, setRowData] = useState([])




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
    { field: "updatedAt" },
    { field: "userId" },
    { field: "userInfo" },
    { field: "createdAt" },
    { field: "date" },
    { field: "__v" },
    { field: "_id" },
    { field: "doctorInfo" },
    { field: "status" },
    { field: "time" },
    { field: "updatedAt" },
    { field: "userInfo" },
    { field: "createdAt" },
    { field: "date" },
    { field: "__v" },
    { field: "_id" }
  ]);


  function fetchData() {
    get(RECEPIONIST_URL.APPOINTMENTS.LIST)
      .then(res => {
        setRowData(res.data)
      })
      .catch(err => {

      })
  }






  function updateData({ data }) {
    console.log(data._id)
    put(RECEPIONIST_URL.APPOINTMENTS.STATUS.replace("{id}", data._id), data.status)
      .then(res => {
        console.log(res)
        fetchData()
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
