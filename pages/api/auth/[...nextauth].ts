import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/user.model";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn(data) {
      // TRY CATCH
      const { profile } = data;
      const { given_name, family_name, email } = profile;
      await dbConnect();
      const result = await User.find({ email }, ["_id"]);
      // If no user is found, add them to the database
      if (!result.length) {
        await User.create({
          firstName: given_name,
          lastName: family_name,
          email: email,
        });
      }
      return true;
    },
    async jwt({ token }) {
      // TRY CATCH
      const result = await User.find({ email: token.email }, ["_id"]);
      if (result.length) {
        const [user] = result;
        token.userId = user._id.toString();
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.userId;
      return session;
    },
  },
};
export default NextAuth(authOptions);
