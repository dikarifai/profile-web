import { fetcher } from "@/lib/fetcher"

const tempService = {
    create: async (file: File): Promise<{ url: string }> => {
        const formData = new FormData()

        formData.append("temp", file)
        const res = await fetcher<{ url: string }>("temps", {
            method: "POST",
            credentials: "include",
            body: formData
        })

        return res
    }
}

export default tempService