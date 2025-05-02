import NextAuth from "next-auth"
import authConfig from "./auth.config";


export const {
    auth,
    handlers: { GET, POST },
    signIn,
    signOut,
} = NextAuth({
    pages: {
        signIn: "/auth/exon-login",
        error: "/auth/error"
    },
    callbacks: {
        async signIn({ account }) {
            if (account?.provider !== "credentials") return true;
            return true;
        },
        async session({ token, session }: any) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token) {
                session.user.id = token.id || token.sub
                session.user.email = token.email
                session.user.access_token = token.access_token
                session.user.role_permissions = token.role_permissions
                session.user.role_id = token.role_id
                session.user.role = token.role
            }

            return session
        },
        async jwt({ token, user, trigger, session }: any) {
            if (!token.sub) return token;

            if (trigger === 'update' && session) {
                token = { ...user, ...session }
                return token
            }

            if (user) {
                token.id = user.id
                token.email = user.email
                token.access_token = user.access_token
                token.role_permissions = user.role_permissions
                token.role_id = user.role_id
                token.role = user.role
            }

            return token;
        }
    },
    session: { strategy: "jwt" },
    ...authConfig
})