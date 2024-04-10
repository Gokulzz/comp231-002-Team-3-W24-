import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { get } from '../../../../../utils/request'
import { RECEPIONIST_URL, SERVER_BASE_URL } from '../../../../../libs/Urls'


import styles from "./styles.module.scss"
import { GetApontmentById } from '../../../../../services/recptionist.services'

export default function ApointmentDetailPage() {
    const { id } = useParams()

    const [data, setData] = useState(undefined)

    useEffect(() => {
        if (!id) return
        GetApontmentById(id)
            .then(res => setData(res))
    }, [id])


    const [colDefs, setColDefs] = useState([
        { field: "doctorId" },
        { field: "userId" },
        { field: "doctorInfo" },
        { field: "userInfo" },
        {
            field: "status"
        },
        { field: "time" },
        { field: "updatedAt" },
        { field: "userId" },
        { field: "createdAt" },
        { field: "date" },
        { field: "status" },
        { field: "time" },

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
