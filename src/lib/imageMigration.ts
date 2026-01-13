
import fs from "fs/promises"
import path from "path"


function extractImages(html: string, path?: string): string[] {
    const regex = /<img[^>]+src="([^">]+)"/g
    const results: string[] = []

    let match
    while ((match = regex.exec(html)) !== null) {
        if (match[1].includes(`/uploads${path}`)) {
            results.push(match[1])
        }
    }

    return results
}



async function moveTempImage(
    srcUrl: string,
    dir: string,
    id: string
): Promise<string> {
    const fileName = path.basename(srcUrl)

    const oldPath = path.join(
        process.cwd(),
        "public",
        srcUrl
    )

    const newDir = path.join(
        process.cwd(),
        "public/uploads",
        dir,
        id,
        "content"
    )

    await fs.mkdir(newDir, { recursive: true })

    const newPath = path.join(newDir, fileName)

    await fs.rename(oldPath, newPath)

    return `/uploads/${dir}/${id}/content/${fileName}`
}


export async function getStoredImages(location: string, id: string): Promise<string[]> {
    const dir = path.join(
        process.cwd(),
        "public/uploads/",
        location,
        id,
        "content"
    )

    try {
        const files = await fs.readdir(dir)
        return files.map(
            file => `/uploads/blogs/${id}/content/${file}`
        )
    } catch {
        return []
    }
}

export async function cleanupUnusedImages(
    contentHtml: string,
    dir: string,
    id: string
) {
    const usedImages = extractImages(contentHtml, `/${dir}/${id}/content`)
    const storedImages = await getStoredImages(dir, id)

    const unusedImages = storedImages.filter(
        img => !usedImages.includes(img)
    )

    for (const img of unusedImages) {
        const filePath = path.join(
            process.cwd(),
            "public",
            img
        )
        try {
            await fs.unlink(filePath)
        } catch (error) {

        }
    }
}

export async function removeImages(pathString: string) {
    const dir = path.join(
        process.cwd(),
        "public/uploads",
        pathString
    )

    try {
        await fs.rm(dir, { recursive: true, force: true })
    } catch (err) {
    }
}


export async function migrateImages(
    html: string,
    dir: string,
    id: string
): Promise<string> {
    const tempImages = extractImages(html, "/temp/")
    let updatedHtml = html

    for (const src of tempImages) {
        const newSrc = await moveTempImage(src, dir, id)
        updatedHtml = updatedHtml.replaceAll(src, newSrc)
    }

    await cleanupUnusedImages(updatedHtml, dir, id)


    return updatedHtml
}
