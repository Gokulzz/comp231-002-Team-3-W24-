import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useState } from "react";

import styles from "./styles.module.scss"
import { GetAllDoctorsList } from "../../../../services/pateint.services";
import CellContainer from "../../../../components/Table/Cells/CellContainer/CellContainer";
import ButtonCell from "../../../../components/Table/Cells/ButtonCell/ButtonCell";
import { Icon } from "@iconify/react/dist/iconify.js";




export default function DoctorsTable({ onRowDoubleClick, onSelectRow }) {

  const [rowData, setRowData] = useState([])

  const [colDefs, setColDefs] = useState([
    { field: "doctorId._id", editable: false, headerName: "Doctor ID", flex: 1 },
    { field: "doctorId.username", editable: false, headerName: "UserName" },
    { field: "speciality", editable: false, headerName: "Speciality" },
    { field: "experience", editable: false, headerName: "Experience" },
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
          icon={<Icon icon="ep:select" />}
          onClick={() => {
            const { username, _id, __t } = data.doctorId
            const newData = {
              ...data,
              username,
              _id,
              __t
            }
            onSelectRow(newData)

          }}
          title={"Select"}
          variant={"success"} />

      </CellContainer>
    },
  ]);





  function fetchData() {
    GetAllDoctorsList()
      .then(res => setRowData(res))
      .catch(err => console.log(err))
  }


  return (
    <div className={`${styles.page} ag-theme-quartz`}>
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
          console.log(e);
        }}
        onGridReady={(e) => {
          fetchData();
        }}
      />
    </div>
  );
}
