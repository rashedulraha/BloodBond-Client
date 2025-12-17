# 🩸 BloodBond | Blood Donation & Management System

**BloodBond** is a robust and user-friendly MERN stack application designed to streamline blood donation activities. It bridges the gap between donors and recipients while providing administrative tools for managing users, requests, and community funding.

## 🚀 Live Links

- **Client Live URL:** [bloodbond-red.vercel.app]
- **Server API URL:** []

---

## 🛠️ Key Features

### 👤 Role-Based Access Control (RBAC)

- **Donor:** Can create donation requests, manage their profile, and track their donation history.
- **Volunteer:** Can manage all donation requests and update statuses, but cannot delete users or manage funding.
- **Admin:** Full control over the system, including user status management (Block/Unblock), role assignments, and content moderation.

### 📊 Advanced Dashboard

- **Interactive Stats:** Visualized data using **Recharts** for donation trends.
- **Dynamic Filtering:** Filter donation requests by status (Pending, In-Progress, Done, Canceled).
- **Profile Management:** Fully editable profile with district and upazila selection.

### 🩸 Donation Features

- **Public Search:** Search for donors by blood group, district, and upazila.
- **Real-time Status:** Donation process workflow from `Pending` -> `In-Progress` -> `Done/Canceled`.
- **Location Specific:** Integrated Bangladesh Geocode for precise district/upazila selection.

### 💳 Additional Modules

- **Stripe Funding:** Secure payment integration for organizational support.
- **Animations:** Smooth UI transitions using **Framer Motion** and **AOS**.
- **Responsive UI:** Crafted with **Tailwind CSS v4** and **Shadcn UI** for all device sizes.

---

## 💻 Tech Stack

**Frontend:**

- React 19 (Vite), TypeScript, Tailwind CSS v4, Shadcn UI, Framer Motion, TanStack Query.

**Backend:**

- Node.js, Express.js, MongoDB, JWT (JSON Web Token).

**Authentication & Storage:**

- Firebase Auth, ImgBB API (Avatar Upload).

---

## 📦 Major Packages Used

| Package                        | Purpose                                    |
| :----------------------------- | :----------------------------------------- |
| `@tanstack/react-table`        | For advanced tabular data and pagination   |
| `react-hook-form` & `zod`      | Efficient form handling and validation     |
| `recharts`                     | Data visualization on Admin Dashboard      |
| `framer-motion` & `aos`        | Sleek UI animations                        |
| `axios`                        | Secure API communication                   |
| `lucide-react` & `react-icons` | Premium iconography                        |
| `sweetalert2` & `sonner`       | Interactive modals and toast notifications |

---

## ⚙️ Environment Variables Setup

Create a `.env` file in the root and add:

```env
# Firebase
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain

# APIs
VITE_IMGBB_API_KEY=your_key
VITE_STRIPE_PUBLIC_KEY=your_key

# Database & JWT (Server Side)
DB_USER=your_db_user
DB_PASS=your_db_password
JWT_ACCESS_TOKEN=your_secret_token

```
