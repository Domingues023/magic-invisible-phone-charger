import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter an email and password');
        }

        // Here you would typically fetch the user from your database
        // For now, we'll use a mock user
        const mockUser = {
          id: "1",
          email: "test@example.com",
          name: "Test User",
          password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/fGPX.Ae" // hash for 'test123'
        };

        const isValid = await compare(credentials.password, mockUser.password);

        if (!isValid) {
          throw new Error('Invalid password');
        }

        return {
          id: mockUser.id,
          email: mockUser.email,
          name: mockUser.name
        };
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub!;
      }
      return session;
    }
  }
});

export { handler as GET, handler as POST }; 