import {AuthOptions} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import userLogIn from '@/libs/userLogIn';

export const authOptions:AuthOptions = {
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
              email: { label: "Email", type: "email", placeholder: "email" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {

              if(!credentials) return null;
              
              const user = await userLogIn(credentials.email, credentials.password);

              if (user) {
                // Map the returned user object to match the expected User type
                return user;
              } else {
                return null
              }
            }
          })
    ],
    // pages: {
    //   signIn: '/login',
    // },
    session: { strategy: "jwt" },
    callbacks: {
      async jwt({token, user}) {
        return {...token, ...user};
      },
      async session({session, token, user}) {
          session.user = token as any;
          return session;
      }
    }
    // callbacks: {
    //   async jwt({token, user}) {
    //     // Only merge user data when it exists (on sign in)
    //     if (user) {
    //       token.id = user.id;
    //       token.name = user.name;
    //       token.email = user.email;
    //     }
    //     return token;
    //   },
    //   async session({session, token}) {
    //     // Explicitly structure the session user object
    //     session.user = {
    //       _id: token.id as string,
    //       name: token.name as string,
    //       email: token.email as string,
    //     };
    //     return session;
    //   }
    // }
}