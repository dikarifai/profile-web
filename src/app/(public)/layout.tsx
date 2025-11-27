import Navbar from "@/components/Fragments/Navbar";
import Footer from "@/components/Fragments/Footer";


export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen flex flex-col justify-between">
            <div>
                <Navbar />
                <main className="md:mx-20 lg:mx-40 xl:mx-52">
                    {children}
                </main>
            </div>
            <Footer />
        </div>

    );
}
