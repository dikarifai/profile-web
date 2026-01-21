"use client"

import { experienceAdminColumns } from "@/constants/dataTable/experience"
import { AdminTableLayout } from "../AdminTableLayout"
import { useEffect, useState } from "react"
import { ExperienceResponse } from "@/dtos/experience.dto"
import { experienceService } from "@/services/experienceService"

const ExperienceAdminLayout: React.FC = () => {
    const [data, setData] = useState<ExperienceResponse[]>([])

    const getData = async () => {
        try {
            const res = await experienceService.get()
            setData(res.data)
        } catch (error) {
            console.log("🚀 ~ getData ~ error:", error)
        }
    }

    useEffect(() => {
        getData()
    }, [])


    return <AdminTableLayout columns={experienceAdminColumns({ onDelete: () => { } })} createHref="/admin/experience/create" data={data} />
}

export default ExperienceAdminLayout