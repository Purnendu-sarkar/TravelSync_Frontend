# TravelSync – Frontend (Travel Buddy & Meetup Platform)

**Frontend Repository:** https://github.com/Purnendu-sarkar/TravelSync_Frontend  
**Live Website:** https://travel-sync-frontend-sandy.vercel.app  
**Backend Repository:** https://github.com/Purnendu-sarkar/TravelSync_Server  
**Backend API Base URL:** https://travelsync-server.onrender.com/api/v1  
**Video Demonstration:**

---

### 🚀 Project Overview

**TravelSync** is a modern, responsive **travel companion matching platform** built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Shadcn/ui**. It allows travelers to create detailed travel plans, discover compatible buddies using advanced filters, send join requests, manage profiles, leave reviews, and unlock premium features through Stripe subscriptions.

This frontend seamlessly integrates with a robust Node.js + Express + Prisma backend to deliver a smooth and engaging user experience.

---

### ✨ Core Frontend Features

| Feature                          | Status | Description                                             |
| -------------------------------- | ------ | ------------------------------------------------------- |
| Responsive Design                | ✅     | Fully mobile-friendly with Tailwind CSS                 |
| Role-Based UI (Traveler & Admin) | ✅     | Dynamic navigation & dashboards                         |
| Authentication Flows             | ✅     | Login, Register, Forgot/Reset Password, Change Password |
| Advanced Matching & Filters      | ✅     | Destination, dates, budget, travel type, interests      |
| Travel Plan Management           | ✅     | Create, view, edit, soft-delete plans                   |
| Buddy Request System             | ✅     | Send & track requests                                   |
| Profile Pages                    | ✅     | Public & private profiles with stats                    |
| Review System                    | ✅     | View received reviews                                   |
| Subscription & Payment           | ✅     | Stripe checkout + success/cancel pages                  |
| Dashboard Analytics              | ✅     | Traveler & Admin dashboards with charts                 |
| Toast Notifications              | ✅     | Success/error feedback via Sonner                       |
| Revalidation & Caching           | ✅     | Next.js revalidateTag for real-time updates             |

---

### 🏠 Home Page – 7 Distinct Sections

1. **Hero Section** – Engaging banner with CTA
2. **How It Works** – 3-step animated guide
3. **Popular Destinations** – Dynamic showcase
4. **Why Choose Us** – Feature highlights
5. **Top Travelers** – Public showcase of verified users
6. **Testimonials** – User success stories
7. **Subscription Preview** – Premium benefits teaser

> **Fully satisfies the mandatory requirement of 6+ distinct sections**

---

### 🛠 Technology Stack

| Category         | Technologies                           |
| ---------------- | -------------------------------------- |
| Framework        | Next.js 14 (App Router)                |
| Language         | TypeScript                             |
| Styling          | Tailwind CSS + Shadcn/ui               |
| State Management | React Server Components + Client Hooks |
| Forms            | React Hook Form + Zod validation       |
| Notifications    | Sonner                                 |
| Icons            | Lucide React                           |
| Animations       | Framer Motion                          |
| Deployment       | Vercel                                 |
| Other            | date-fns, next/cache, revalidateTag    |

---

### 📂 Project Structure

```text
src/
├── app/
│   ├── (commonLayout)/         # Public pages (Home, Explore, Contact, etc.)
│   │   ├── page.tsx            # Home page (7 sections)
│   │   ├── explore/            # Matching page
│   │   ├── travelers/          # Public travelers list & details
│   │   ├── travel-plans/[id]/  # Single plan details
│   │   ├── my-profile/         # Authenticated profile
│   │   ├── subscription/       # Plans & checkout
│   │   ├── payment/            # Success / Cancel
│   │   └── contact/            # Contact form + map
│   ├── (auth)/                 # Auth pages (Login, Register, etc.)
│   ├── (dashboardLayout)/      # Protected dashboards
│   │   ├── (travelerDashboardLayout)/
│   │   └── admin/
│   └── layout.tsx              # Root layout + Toaster
├── components/
│   ├── modules/                # Feature-specific components
│   ├── shared/                 # Reusable UI (buttons, tables, etc.)
│   └── ui/                     # Shadcn components
├── services/                   # API calls using server actions
├── lib/                        # Utilities (formatters, auth, etc.)
├── hooks/                      # Custom hooks (useDebounce)
└── types/                      # TypeScript interfaces
```

---

### 🌐 Key Pages & Routes

| Route                 | Description                          |
| --------------------- | ------------------------------------ |
| `/`                   | Home page (7 sections)               |
| `/login`, `/register` | Authentication                       |
| `/explore`            | Advanced travel matching             |
| `/travelers`          | Browse all travelers                 |
| `/travelers/[id]`     | Public traveler profile              |
| `/travel-plans/[id]`  | Single travel plan + request to join |
| `/my-profile`         | Authenticated user profile           |
| `/subscription`       | Premium plans & Stripe checkout      |
| `/dashboard`          | Traveler dashboard                   |
| `/admin/dashboard`    | Admin dashboard & management         |
| `/contact`            | Contact form with Resend email       |

---

### 🧑‍💻 Admin Credentials (Required for Evaluation)

> **Important: Use these to test admin features**

**Admin Email:** `admin@travelbuddy.com`  
**Password:** `SuperSecure123`

(The admin is seeded automatically by the backend)

---

### 🚀 Setup & Run Locally

```bash
# Clone repository
git clone https://github.com/Purnendu-sarkar/TravelSync_Frontend
cd travel-sync-frontend

# Install dependencies
npm install

# Create .env.local
cp .env.example .env.local

# Set required environment variables
NEXT_PUBLIC_BASE_API_URL=http://localhost:5000/api/v1
# (Backend must be running)

# Run development server
npm run dev
```

**Open**: ` http://localhost:5000`

> **Ensure the backend server is running and accessible.**

---

### 🌍 Deployment

Platform: Vercel (optimized for Next.js)
Environment Variables:`NEXT_PUBLIC_BASE_API_URL` must point to live backend

---

### 🚀 Future Enhancements (Roadmap)

Here are exciting features planned to scale TravelSync into a complete travel social ecosystem:

| Feature                  | Description                                                | Priority |
| ------------------------ | ---------------------------------------------------------- | -------- |
| Real-Time Chat           | Private messaging & group chats for accepted buddies       | High     |
| Push Notifications       | Browser/email alerts for requests, messages, matches       | High     |
| Google Maps Integration  | Visualize destinations & routes on interactive maps        | High     |
| Trip Photo Albums        | Share photos after completed trips                         | Medium   |
| Group Travel Mode        | Support multiple accepted buddies per plan                 | Medium   |
| Advanced Profile Filters | Filter by age, language, dietary preferences, etc.         | Medium   |
| Mobile Apps              | React Native iOS & Android apps                            | Medium   |
| Stories & Feed           | Instagram-style temporary stories and public activity feed | Low      |
| AI Match Recommendations | Machine learning powered smarter suggestions               | Low      |
| Multi-Language Support   | i18n for global accessibility                              | Low      |
| Expense Splitting Tool   | Simple shared expense tracker for groups                   | Low      |

### Contributions and feedback are welcome! 🌟

---

## 👨‍💻 Developed By

**Purnendu Sarkar**  
Full-Stack Developer | Travel Enthusiast ✈️  
GitHub: https://github.com/Purnendu-sarkar  
LinkedIn: https://www.linkedin.com/in/purnendusarkar
