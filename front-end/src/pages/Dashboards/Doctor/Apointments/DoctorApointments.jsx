import { AgGridReact } from 'ag-grid-react';
import React, { useEffect, useState } from 'react'
import styles from "./style.module.scss"
import StatusCell from '../../../../components/Table/Cells/StatusCell/StatusCell';
import { useNavigate } from 'react-router-dom';
import { GetAllApointments, UpdateApointmantStatus } from '../../../../services/recptionist.services';
import { GetAllDoctorAppointments } from '../../../../services/doctor.services';
import CellContainer from '../../../../components/Table/Cells/CellContainer/CellContainer';
import ButtonCell from '../../../../components/Table/Cells/ButtonCell/ButtonCell';
import { Icon } from '@iconify/react/dist/iconify.js';
import PreScribeMedicModal from '../../../../modals/Doctor/Prescribe/PreScribeMedic/PreScribeMedicModal';
import PrescribesHistory from '../../../../modals/Doctor/Prescribe/History/PrescribesHistory';
import CreateMedialReportModal from '../../../../modals/Doctor/MedicalReports/Create/CreateMedialReportModal';
import MedicalReportsHistoryModal from '../../../../modals/Doctor/MedicalReports/History/MedicalReportsHistoryModal';


export default function DoctorApointments() {

  const [rowData, setRowData] = useState([])
  const navigator = useNavigate()

  const [patientId, setPatientId] = useState(undefined)


  // modals State
  const [createPrescribe, setCreatePreScribe] = useState(false)
  const [prescribeHistory, setPrevScribeHistory] = useState(false)
  const [createMedialReport, setCreateMedialReport] = useState(false)
  const [patientMedialReport, setPatientMedialReport] = useState(false)



  const statusOptions = [
    { label: "Pending", value: "pending" },
    { label: "Reschedule", value: "reschedule" },
    { label: "Rejected", value: "rejected" },
    { label: "Accepted", value: "accepted" },
    { label: "Cancel", value: "cancel" },
    { label: "Visit", value: "visit" },
    { label: "All", value: "all" },
  ];

  const prescribeMedic = (data) => {
    setPatientId(data.userId)
    setCreatePreScribe(true)
  }


  const openPreScribesHistory = (data) => {
    setPatientId(data.userId)
    setPrevScribeHistory(true)
  }


  const createMedicalReport = (data) => {
    setPatientId(data.userId)
    setCreateMedialReport(true)
  }




  const openPatientMedicalHistory = (data) => {
    setPatientId(data.userId)
    setPatientMedialReport(true)
  }

  const [colDefs, setColDefs] = useState([
    { field: "doctorId", editable: false },
    { field: "userId", editable: false },
    { field: "doctorInfo", editable: false },
    {
      field: "status",
      cellRenderer: (p) => (<StatusCell readOnly={true} {...p} options={statusOptions} />),
      editable: false
    },
    { field: "time", editable: false },
    { field: "userId", editable: false },
    { field: "userInfo", editable: false, width: 400 },
    { field: "createdAt", editable: false },
    { field: "date", editable: false },
    {
      field: "Prescribe",
      editable: false,
      editable: false,
      filter: false,
      width: 200,
      floatingFilter: false,
      cellRenderer: ({ data }) => <CellContainer>
        <ButtonCell
          icon={<Icon icon="ic:round-medication" />}
          onClick={() => prescribeMedic(data)}
          title={"New"}
          variant={"success"} />

        <ButtonCell
          icon={<Icon icon="material-symbols:work-history" />}
          onClick={() => openPreScribesHistory(data)}
          title={"History"}
          variant={"warning"} />
      </CellContainer>
    },
    {
      field: "Medical Report",
      editable: false,
      editable: false,
      filter: false,
      width: 300,
      floatingFilter: false,
      cellRenderer: ({ data }) => <CellContainer>
        <ButtonCell
          icon={<Icon icon="ic:round-medication" />}
          onClick={() => createMedicalReport(data)}
          title={"New Report"}
          variant={"success"} />

        <ButtonCell
          icon={<Icon icon="material-symbols:work-history" />}
          onClick={() => openPatientMedicalHistory(data)}
          title={"History"}
          variant={"warning"} />
      </CellContainer>
    },
  ]);


  function fetchData() {
    GetAllDoctorAppointments().then(res => {
      setRowData(res)
    })
  }

  function updateData({ data }) {
    UpdateApointmantStatus(data._id, data.status)
      .then(res => fetchData())
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

      <PreScribeMedicModal
        isOpen={createPrescribe}
        setIsOpen={setCreatePreScribe}
        patientId={patientId} />

      <PrescribesHistory
        isOpen={prescribeHistory}
        setIsOpen={setPrevScribeHistory}
        patientId={patientId} />

      <CreateMedialReportModal
        patientId={patientId}
        isOpen={createMedialReport}
        setIsOpen={setCreateMedialReport}
      />


      <MedicalReportsHistoryModal
        isOpen={patientMedialReport}
        setIsOpen={setPatientMedialReport}
        patientId={patientId}
      />

    </div>
  )
}
