import fs, { unlink } from "fs/promises";
import path from "path";

export async function saveImage(file: File, dir: string, id: string | number) {
    // Validasi ekstensi
    const allowedTypes = ["image/png", "image/jpeg"];
    if (!allowedTypes.includes(file.type)) {
        throw new Error("Format gambar harus PNG atau JPG");
    }

    // Convert File → Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Folder: public/uploads/{id}/image
    const baseDir = path.join(process.cwd(), "public/uploads", dir, String(id), "cover");
    let imageDir = baseDir

    // Hapus folder image lama + isinya (kalau ada)
    try {
        await fs.rm(imageDir, { recursive: true, force: true });
    } catch (err) {
        // ignore error
    }

    // Buat folder image baru
    await fs.mkdir(imageDir, { recursive: true });

    // Generate nama file unik
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(imageDir, fileName);

    // Simpan file
    await fs.writeFile(filePath, buffer);

    // URL public
    return `/uploads/${dir}/${id}/cover/${fileName}`;
}

export async function removeFile(dir: string) {
    try {
        const baseDir = path.join(process.cwd(), "public", dir);
        await unlink(baseDir);

        return true;
    } catch (error: any) {
        // File tidak ada → tidak perlu error fatal
        if (error.code === "ENOENT") {
            return false;
        }
        throw error;
    }
}