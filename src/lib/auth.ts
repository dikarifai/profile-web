
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

export const auth = betterAuth({
    origin: [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost",
    ],
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    trustedOrigins: [
        "http://localhost:3000",
        "http://localhost:5173",
    ],
    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
        password: {
            hash: async (password) => {
                return await bcrypt.hash(password, 10);
            },
            verify: async ({ password, hash }) => {
                return await bcrypt.compare(password, hash);
            },
        },
    },
});