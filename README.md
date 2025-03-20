
# Better Auth Testing 

A simple project to explore **Better Auth** authentication with **email/password** and **Google OAuth**.

## ✨ What It Does
This repo tests Better Auth’s authentication features:
- **Email & Password**: Sign up and sign in with ease.
- **Google OAuth**: Seamless social login with Google.

After login, users are redirected to a dashboard.

## 🛠️ Tech Stack
- **Frontend**: React .
- **Backend**: Express.
- **Database**: PostgreSQL -Prisma ORM.
- **Authentication**: Better Auth .


### Prerequisites
- PostgreSQL installed and running
- Google Cloud Console account (for OAuth credentials)


 ###Environment Variables
   - **Backend** (create `.env` in `/backend`):
     ```
     GOOGLE_CLIENT_SECRET=your-google-client-secret
     GOOGLE_CLIENT_ID=your-google-client-id
     PORT=3000
     DATABASE_URL=postgresql://user:password@localhost:5432/dbname
     BETTER_AUTH_SECRET=your-secret-key
     ```
   - **Frontend** (create `.env` in `/frontend`):
     ```
     BETTER_AUTH_SECRET=your-secret-key
     ```


## 📝 Notes
- Google OAuth redirect URI: Set to `http://localhost:3000/api/auth/callback/google` in Google Cloud Console.
- Ensure `http://localhost:5173` is in `trustedOrigins` in your `auth.js` for frontend redirects.

