import { notFound, redirect } from "next/navigation";

export async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
    const res = await fetch(url, {
        ...options,
        cache: "no-store",
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
        } catch { }

        throw new Error(message);
    }

    return res.json();
}
