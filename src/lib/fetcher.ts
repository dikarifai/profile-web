import { notFound, redirect } from "next/navigation";
import headerUtil from "./headers";


export async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
    const SERVER_URL = process.env.SERVER_URL
    const isServer = typeof window === "undefined"

    let urlFix = `/api/${url}`

    if (isServer) {
        urlFix = `${SERVER_URL}/${urlFix}`
    }

    const headers = (isServer && options?.credentials === "include") && await headerUtil()
    console.log("🚀 ~ fetcher ~ options?.credentials:", options?.credentials)


    const res = await fetch(urlFix, {
        ...options,
        cache: "no-store",
        headers: headers || undefined
    });


    // AUTO redirect jika 401
    if (res.status === 401) {
        redirect("/login");
    }

    if (res.status === 404) {
        notFound();
    }

    if (!res.ok) {
        let message = "Unexpected error occurred";

        try {
            const err = await res.json();
            message = err.message || err.error || message;
        } catch {

        }

        throw new Error(message);
    }

    return res.json() as Promise<T>;
}
