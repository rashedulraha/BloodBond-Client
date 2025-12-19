# 🩸 BloodBond | Blood Donation & Management System

**BloodBond** is a high-performance MERN stack application designed to bridge the gap between blood donors and those in need. Built with **React 19**, **TypeScript**, and **Tailwind CSS v4**, it offers a seamless, secure, and mission-driven experience for the community.

## 🚀 Live Links

- **Client Live URL:** [https://bloodbond-red.vercel.app](https://bloodbond-red.vercel.app)
- **Server API URL:** [https://blood-bond-server-rho.vercel.app](https://blood-bond-server-rho.vercel.app)

<!-- Access  -->

## Admin email and password

--Email: <rashedulweb@gmail.com>
--Password : 123456

## Volunteer email and password

--Email: <rashedulweb@gmail.com>
--Password : 123456

---

## 🛠️ Key Features

### 👤 Role-Based Access Control (RBAC)

- **Donor:** Can create donation requests, manage personal profiles, and track contribution history.
- **Volunteer:** Can review and manage all blood donation requests and update statuses.
- **Admin:** Full control over the system, user moderation (Block/Unblock), and funding management.

### 📊 Advanced Management

- **Interactive Dashboard:** Real-time data visualization using **Recharts**.
- **Location Mapping:** Precise donor search based on districts and upazilas.
- **Dynamic Tables:** Advanced data filtering and pagination using **TanStack Table**.

### 💳 Funding & Support

- **Stripe Integration:** Secure payment gateway for community funding.
- **Wall of Honor:** A dedicated section celebrating the top financial contributors.
- **Success Celebrations:** Interactive UI feedback with `canvas-confetti` after successful donations.

---

## 💻 Tech Stack

**Frontend:**

- **Core:** React 19 (Vite), TypeScript, React Router 7.
- **Styling:** Tailwind CSS v4 (OKLCH Color Space), Shadcn UI, DaisyUI v5.
- **State Management:** **Zustand** (Global) & **TanStack Query v5** (Server State).
- **Animations:** Framer Motion, AOS, and Three.js.

**Backend:**

- **Runtime:** Node.js, Express.js.
- **Database:** MongoDB.
- **Security:** Firebase Auth, JWT (JSON Web Token).

---

## 📦 Major Packages Used

| Package                   | Purpose                                |
| :------------------------ | :------------------------------------- |
| `@tanstack/react-query`   | Efficient data fetching and caching    |
| `react-hook-form` & `zod` | Type-safe form handling and validation |
| `recharts`                | Data-driven charts and analytics       |
| `stripe`                  | Secure payment processing              |
| `framer-motion`           | Smooth UI transitions and animations   |
| `lucide-react`            | Modern and consistent iconography      |
| `date-fns`                | Specialized date formatting            |

---

## ⚙️ Environment Variables Setup

Create a `.env` file in the root directory and add the following keys:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id

# Stripe & APIs
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
VITE_IMGBB_API_KEY=your_imgbb_api_key

# Backend Configuration (Server Side)
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password
JWT_ACCESS_TOKEN=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret
```
