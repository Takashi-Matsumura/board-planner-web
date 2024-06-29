import NextAuth, { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const config: NextAuthConfig = {
    theme: {
        logo: "https://next-auth.js.org/img/logo/logo-sm.png",
    },
    providers: [
        GitHub({clientId: process.env.AUTH_GITHUB_ID, clientSecret: process.env.AUTH_GITHUB_SECRET}),
        Google({clientId: process.env.AUTH_GOOGLE_ID, clientSecret: process.env.AUTH_GOOGLE_SECRET}),
    ],
    basePath: "/api/auth",
    callbacks: {
        authorized({request, auth}) {
            try {
                const { pathname } = request.nextUrl;
                if (pathname === "/protected") return !!auth;
                return true;
            } catch (error) {
                console.log(error);
            }
        },
        jwt({token, trigger, session}) {
            if (trigger === "update") token.name = session.user.name;
            return token;
        },
    }
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);