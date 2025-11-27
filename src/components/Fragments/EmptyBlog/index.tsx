export default function EmptyBlog() {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center col-span-3">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center shadow-sm">
                <span className="text-3xl">📝</span>
            </div>

            <h3 className="mt-6 text-xl font-semibold text-gray-700">
                Belum Ada Blog
            </h3>

            <p className="mt-2 text-gray-500 max-w-sm">
                Saat ini belum ada blog yang tersedia. Silakan kembali lagi nanti.
            </p>
        </div>
    );
}