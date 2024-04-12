import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { AgGridReact } from "ag-grid-react"
import { GetPatientMedicalReports, GetPatientPreScribeHistory } from '../../../../services/doctor.services';



import styles from "./styles.module.scss"

export default function MedicalReportsHistoryModal(
    {
        patientId,
        isOpen,
        setIsOpen,
    }

) {

    const [rowData, setRowData] = useState([])


    const [colDefs, setColDefs] = useState([
        { field: "patientId", editable: false },
        { field: "report", editable: false, width: 300 },
        { field: "createdAt", editable: false },
        { field: "updatedAt", editable: false, width: 400 },
    ]);


    function fetchData() {
        GetPatientMedicalReports(patientId)
            .then(res => {
                console.log(res)
                setRowData(res)
            })
            .catch(err => console.log(err))
    }


    useEffect(() => {
        isOpen &&
            fetchData()
    }, [patientId])


    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(false)}

            style={{
                overlay: {
                },
                content: {
                    padding: "2em",
                    width: "60dvw",
                    height: "max-content",
                    justifySelf: "center",
                    alignSelf: "center",
                    backgroundColor: "red"
                }
            }}
        >

            <div
                className={` ag-theme-quartz`}
            >
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                    className={styles.table}
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

        </Modal>
    )
}
