import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";

const handler= NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          // Call your Express API for login
          const res = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password
            }),
          });

          const user = await res.json();

          if (res.ok && user) {
            return user; // <- NextAuth stores this in the session
          }
          return null;
        } catch (err) {
          console.error("Auth error:", err);
          return null;
        }
      }
    })
  ],
  session: { strategy: "jwt" }, // you said you removed manual JWT, but NextAuth uses its own session/jwt internally
  pages: {
    signIn: "/auth/signin",
  },
});
export { handler as GET, handler as POST };
