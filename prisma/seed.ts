import { prisma } from "../src/lib/prisma";
import bcrypt from "bcryptjs";


async function main() {
    console.log("🌱 Seeding database...");

    const password = await bcrypt.hash("password123", 10);

    // Cek apakah user sudah ada
    const existing = await prisma.user.findUnique({
        where: { email: "admin@example.com" },
    });

    if (!existing) {
        await prisma.user.create({
            data: {
                name: "Admin",
                email: "admin@example.com",
                password,
                emailVerified: true,
                image: null,
            },
        });
        console.log("✔ User admin created");
    } else {
        console.log("✔ Admin user already exists, skipping.");
    }

    console.log("🌱 Seeding finished!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
