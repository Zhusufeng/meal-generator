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
  // https://next-auth.js.org/configuration/callbacks
  callbacks: {
    async signIn(data) {
      try {
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
      } catch (error) {
        // TODO add to logs
        console.log(error);
        return false;
      }
    },
    async jwt({ token }) {
      try {
        const result = await User.find({ email: token.email }, ["_id"]);
        if (result.length) {
          const [user] = result;
          token.userId = user._id.toString();
        }
        return token;
      } catch (error) {
        // TODO add to logs
        console.log(error);
        token.userId = null;
        return token;
      }
    },
    async session({ session, token }) {
      // Expose user id to client
      session.user.id = token.userId;
      return session;
    },
  },
};
export default NextAuth(authOptions);
