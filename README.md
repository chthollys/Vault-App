# 🎮 Vault App

A **modern e-commerce web application** for selling digital games. Vault App combines performance, scalability, and a smooth developer experience with a robust tech stack. It delivers essential e-commerce features like **user authentication, product browsing, a shopping cart, and secure checkout**, all optimized with server-side rendering and efficient database management.

---

## 🚀 Tech Stack

Built with a combination of **modern, production-ready technologies**:

- [Next.js](https://nextjs.org/) – Server-side rendering & routing
- [React](https://reactjs.org/) – UI framework
- [TypeScript](https://www.typescriptlang.org/) – Type-safe development
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first styling
- [Prisma](https://www.prisma.io/) – Database ORM
- [Supabase](https://supabase.io/) – PostgreSQL hosting & auth
- [NextAuth.js](https://next-auth.js.org/) – Authentication
- [TanStack Query](https://tanstack.com/query/v4) – Data fetching & caching
- [AWS S3](https://aws.amazon.com/s3/) – Cloud storage for assets

---

## 🛠 Getting Started

Follow these steps to run the project locally:

### ✅ Prerequisites

Make sure you have installed:

- **Node.js** v18.18.0 or later
- **npm** v11.4.2 or later
- **Docker** (for running a local PostgreSQL instance)

### 📥 Installation

1. **Clone the repository**

   ```sh
   git clone https://github.com/chthollys/vault-app.git
   cd vault-app

   ```

2. **Install NPM packages:**

   ```sh
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root of the project and add the necessary environment variables. You can use the `.env.example` file as a template.

   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
   DIRECT_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

   NEXTAUTH_SECRET="your-nextauth-secret"
   NEXTAUTH_URL="http://localhost:3000"

   # OAuth Providers
   GITHUB_ID="your-github-id"
   GITHUB_SECRET="your-github-secret"
   GOOGLE_ID="your-google-id"
   GOOGLE_SECRET="your-google-secret"

   # Email Provider (Nodemailer)
   EMAIL_SERVER_HOST="smtp.example.com"
   EMAIL_SERVER_PORT="587"
   EMAIL_SERVER_USER="your-email-user"
   EMAIL_SERVER_PASSWORD="your-email-password"
   EMAIL_FROM="noreply@example.com"

   # AWS S3
   S3_BUCKET_NAME="your-s3-bucket-name"
   S3_REGION="your-s3-region"
   ```

4. **Set up the database:**

   Run the following commands to apply database migrations:

   ```sh
   npx prisma migrate dev
   ```

5. **Seed the database:**

   To populate the database with initial data, run the seed command:

   ```sh
   npm run seed
   ```

6. **Run the development server:**

   ```sh
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.🚀

---

## Features (In development)

- **User Authentication:** Secure user registration and login with credentials, Google, and GitHub.
- **Product Catalog:** Browse and search for games with detailed information, including descriptions, ratings, and screenshots.
- **Shopping Cart:** Add and remove games from the shopping cart.
- **Wishlist:** Save games to a wishlist for future purchase.
- **Reviews and Ratings:** Users can leave reviews and ratings for games they have purchased.
- **Featured and Recommended Games:** The homepage dynamically displays featured and recommended games.
- **Infinite Scrolling:** Seamlessly load more games as you scroll through the product list.

---

## Icon

![Vault App Icon](https://github.com/chthollys/blobImage/blob/main/vault-app/icon.png)

---

## License

Distributed under the GPL-3.0 License. See `LICENSE` for more information.
