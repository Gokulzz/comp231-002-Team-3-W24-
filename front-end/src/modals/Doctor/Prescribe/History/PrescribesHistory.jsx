import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { AgGridReact } from "ag-grid-react"
import { GetPatientPreScribeHistory } from '../../../../services/doctor.services';



import styles from "./styles.module.scss"

export default function PrescribesHistory(
    {
        patientId,
        isOpen,
        setIsOpen,
    }

) {

    const [rowData, setRowData] = useState([])


    const [colDefs, setColDefs] = useState([
        { field: "doctorId", editable: false },
        { field: "dosage", editable: false },
        { field: "instructions", editable: false, width: 300 },
        { field: "medication", editable: false },
        { field: "updatedAt", editable: false, width: 400 },
        { field: "_id", editable: false }
    ]);


    function fetchData() {
        GetPatientPreScribeHistory(patientId)
            .then(res => {
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
