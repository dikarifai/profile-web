import { prisma } from "../src/lib/prisma";
import bcrypt from "bcryptjs";
import cuid from "cuid"

async function main() {
    console.log("🌱 Seeding database...");

    const password = await bcrypt.hash("password123", 10);
    const userId = cuid();

    await prisma.user.upsert({
        where: {
            email: "admin@example.com"
        },
        update: {},
        create: {
            name: "Admin",
            id: userId,
            email: "admin@example.com",
            emailVerified: true,
            image: null,
            accounts: {
                create: {
                    providerId: "credential",
                    accountId: "admin@example.com",
                    password: password,
                }
            }
        }
    });
    console.log("✔ User admin created");

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
