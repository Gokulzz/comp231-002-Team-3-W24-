import { AgGridReact } from 'ag-grid-react';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

export default function SelectDocotorModal({ isOpen, onSelectSubmit, onClose }) {

    const [selectedDoctor, setSelectedDoctor] = useState([])
    const [rowData, setRowData] = useState([])



    const [colDefs, setColDefs] = useState([
        { field: "userId", type: "text", editable: false },
        { field: "doctorId", type: "text", editable: false },
        { field: "doctorInfo", type: "text" },
        { field: "userInfo", type: "text" },
        { field: "date", type: "date" },
        { field: "time", type: "time" },
    ]);



    useEffect(() => {
        if (isOpen)
            withReactContent(Swal)
                .fire({
                    title: <h3>Select Doctor : </h3>,
                    didClose: (e) => onClose()
                })
    }, [isOpen])

    // return <div
    //     className={`ag-theme-quartz`}
    // >
    //     <AgGridReact
    //         rowData={rowData}
    //         columnDefs={colDefs}
    //         defaultColDef={{
    //             floatingFilter: true,
    //             filter: true,
    //             sort: true,
    //             editable: true,
    //         }}
    //         onCellValueChanged={(e) => {
    //             console.log(e)
    //         }}
    //         onGridReady={(e) => {
    //             // fetchData()
    //         }}

    //     />
    // </div>

    return <></>
}
