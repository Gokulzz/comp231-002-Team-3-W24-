import { AgGridReact } from 'ag-grid-react';
import React, { useEffect, useState } from 'react'



import styles from "./style.module.scss"
import { get, put } from '../../../../utils/request';
import { RECEPIONIST_URL } from '../../../../libs/Urls';
import StatusCell from '../../../../components/Table/Cells/StatusCell/StatusCell';
import { useNavigate } from 'react-router-dom';
import { GetAllApointments, UpdateApointmantStatus } from '../../../../services/recptionist.services';



export default function Apointments() {

  const [rowData, setRowData] = useState([])
  const navigator = useNavigate()


  const statusOptions = [
    { label: "Pending", value: "pending" },
    { label: "Reschedule", value: "reschedule" },
    { label: "Rejected", value: "rejected" },
    { label: "Accepted", value: "accepted" },
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
  ]);


  function fetchData() {
    GetAllApointments()
      .then(data => setRowData(data))
  }

  function updateData({ data }) {
    UpdateApointmantStatus(data._id, data.status)
      .then(res => fetchData())
  }


  const onRowDoubleClick = ({ data }) => {
    navigator(`${data._id}`)
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
