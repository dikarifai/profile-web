"use server"

import { headers as headersNext } from "next/headers"

const headers = async () => {

    return await headersNext()
}

export default headers