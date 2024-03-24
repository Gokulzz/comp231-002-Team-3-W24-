import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { get } from '../../../../../utils/request'
import { RECEPIONIST_URL, SERVER_BASE_URL } from '../../../../../libs/Urls'


import styles from "./styles.module.scss"

export default function ApointmentDetailPage() {
    const { id } = useParams()

    const [data, setData] = useState(undefined)

    useEffect(() => {
        if (!id) return
        get(RECEPIONIST_URL.APPOINTMENTS.GET_BY_ID.replace("{id}", id))
            .then(res => {
                const data = res.data
                setData(data)
            })
    }, [id])






    const [colDefs, setColDefs] = useState([
        { field: "doctorId", editable: false },
        { field: "userId", editable: false },
        { field: "doctorInfo" },
        {
            field: "status",
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




    return (
        <main className={styles.page}>
            <div className={styles.detail}>
                {data && colDefs?.map((item, index) => {
                    return <div key={index} className={styles.column}>
                        <div className="header">{item?.field}</div>
                        <h2 className="body">
                            {data[item?.field]}
                        </h2>
                    </div>
                })}
            </div>
        </main>
    )
}
