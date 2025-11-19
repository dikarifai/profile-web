import Navbar from "@/components/Fragments/Navbar";
import Footer from "@/components/Fragments/Footer";


export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar />
            <main className="min-h-screen md:mx-20 lg:mx-40 xl:mx-52">
                {children}
            </main>
            <Footer />
        </>

    );
}
