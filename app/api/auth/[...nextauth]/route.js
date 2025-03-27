// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET; // Your custom JWT secret key

// const handler = NextAuth({
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         }),
//     ],
//     secret: process.env.NEXTAUTH_SECRET, // NextAuth.js secret
//     session: {
//         strategy: "jwt", // Use JWT for session management
//     },
//     callbacks: {
//         // Customize the JWT token
//         async jwt({ token, user }) {
//             console.log("JWT token:", user);
//             if (user) {
//                 // Add user data to the token
//                 token.id = user.id; // Add user ID to the token
//                 token.name = user.name; // Add user name to the token
//                 token.email = user.email; // Add user email to the token
//                 token.image = user.image; // Add user image to the token

//                 // Sign the token with your custom JWT secret key
//                 const customToken = jwt.sign(
//                     {
//                         userId: user.id,
//                         email: user.email,
//                         name: user.name,
//                         image: user.image,
//                     },
//                     JWT_SECRET,
//                     { expiresIn: "1h" } // Set token expiration
//                 );

//                 // Add the custom token to the NextAuth.js token
//                 token.customToken = customToken;
//             }
//             return token;
//         },
//         // Customize the session object
//         async session({ session, token }) {
//             // Add user data to the session
//             session.user.id = token.id; // Add user ID to the session
//             session.user.name = token.name; // Add user name to the session
//             session.user.email = token.email; // Add user email to the session
//             session.user.image = token.image; // Add user image to the session
//             session.customToken = token.customToken; // Add the custom token to the session
//             return session;
//         },
//     },
// });

// export { handler as GET, handler as POST };

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import User from "@/models/User"; // Import the User model
import connectDB from "@/lib/mongodb";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET; // Your custom JWT secret key

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        AppleProvider({
            clientId: process.env.APPLE_CLIENT_ID,
            clientSecret: process.env.APPLE_CLIENT_SECRET,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async signIn({ user, account }) {
            await connectDB();

            // Check if the user already exists
            const existingUser = await User.findOne({ email: user.email });
            user.userId = existingUser._id;

            if (!existingUser) {
                // Create a new user for OAuth
                const newUser = new User({
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    provider: account.provider, // Set provider to "google" or "apple"
                    [account.provider === "google" ? "googleId" : "appleId"]: user.id, // Store Google ID or Apple ID
                });

                await newUser.save();
                user.userId = newUser._id;
            } else if (existingUser.provider !== account.provider) {
                // If the user exists but signed in with a different provider
                return false; // Prevent sign-in
            }

            return true; // Allow sign-in
        },
        async jwt({ token, user }) {
            console.log("JWT token:", user);
            if (user) {
                // Add user data to the token
                token.userId = user.userId;
                token.name = user.name;
                token.email = user.email;
                token.image = user.image;

                // Sign the token with your custom JWT secret key
                const customToken = jwt.sign(
                    {
                        userId: user.userId,
                        email: user.email,
                        name: user.name,
                        image: user.image,
                    },
                    JWT_SECRET,
                    { expiresIn: "1h" } // Set token expiration
                );

                // Add the custom token to the NextAuth.js token
                token.customToken = customToken;
            }
            return token;
        },
        async session({ session, token }) {
            // Add user data to the session
            session.user.id = token.userId || token.id;
            session.user.name = token.name;
            session.user.email = token.email;
            session.user.image = token.image;
            session.customToken = token.customToken; // Add the custom token to the session
            return session;
        },
    },
});

export { handler as GET, handler as POST };
