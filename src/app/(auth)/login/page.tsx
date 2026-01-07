import LoginLayout from "@/components/Layouts/LoginLayout";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


export default async function LoginPage() {
    const session = await auth.api.getSession({
        headers: await headers(), // you need to pass the headers object.
    });

    if (session?.user) {
        redirect("/admin");
    }


    return <LoginLayout />
}
