
import { PrismaClient } from "../generated/prisma";
import bcrypt from "bcrypt";



const prisma = new PrismaClient()

async function main() {
    // hash password default
    const hashedPassword = await bcrypt.hash("admin123", 10)

    // buat user pertama kalau belum ada
    const user = await prisma.user.upsert({
        where: { email: "admin@example.com" },
        update: {}, // kalau ada, tidak update apa-apa
        create: {
            name: "Admin",
            email: "admin@example.com",
            password: hashedPassword,
        },
    })

    console.log("First user:", user)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })