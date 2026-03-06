# SmileCare Dental Clinic (Demo) – Full-Stack MERN Website Template
## Professional Dental Care Demo Website

---

## 🚀 Quick Start

### Start Backend
```powershell
cd server
npm run dev
# Server: http://localhost:5000
```

### Start Frontend 
```powershell
cd client
npm run dev
# Frontend: http://localhost:5173
```

### Admin Dashboard (Demo)
- URL: `http://localhost:5173/admin`
- Username: `admin`
- Password: `admin123`
- **Note:** This is a demo template. Admin credentials can be configured in `.env`.

---

## 📁 Project Structure

```
Dental/
├── server/                     # Node.js + Express Backend
│   ├── models/
│   │   ├── Appointment.js      # Appointment schema
│   │   ├── Contact.js          # Contact message schema
│   │   └── Blog.js             # Blog post schema
│   ├── routes/
│   │   ├── appointments.js     # POST/GET/DELETE /api/appointments
│   │   ├── contact.js          # POST/GET/DELETE /api/contact
│   │   ├── blog.js             # Blog CRUD APIs
│   │   └── admin.js            # Admin login/auth (JWT)
│   ├── index.js                # Express app entry point
│   ├── .env                    # Environment variables
│   └── package.json
│
└── client/                     # React.js + Tailwind Frontend
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx       # Sticky navbar with mobile menu
    │   │   ├── Footer.jsx       # Full footer with links
    │   │   ├── WhatsAppFloat.jsx # WhatsApp floating button
    │   │   ├── EmergencyCall.jsx # Emergency call button
    │   │   ├── ScrollToTop.jsx  # Auto scroll on route change
    │   │   └── SectionHeader.jsx # Reusable section headers
    │   ├── pages/
    │   │   ├── Home.jsx         # Hero, Services, Doctors, Testimonials
    │   │   ├── About.jsx        # Clinic story, Mission/Vision, Doctor profile
    │   │   ├── Services.jsx     # All 8 services + FAQ accordion
    │   │   ├── Doctors.jsx      # Doctor profile cards
    │   │   ├── Appointment.jsx  # Booking form with validation
    │   │   ├── Contact.jsx      # Contact form + Google Maps
    │   │   ├── Blog.jsx         # Blog posts with category filter
    │   │   └── admin/
    │   │       ├── AdminLogin.jsx      # Dark glassmorphism login
    │   │       └── AdminDashboard.jsx  # Full admin panel
    │   ├── services/
    │   │   └── api.js           # Axios API service layer
    │   ├── App.jsx              # Router + page transitions
    │   ├── main.jsx             # React entry point
    │   └── index.css            # Global styles + design system
    ├── index.html               # SEO meta tags + Schema.org
    └── vite.config.js           # Vite + Tailwind + proxy config
```

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/appointments` | Book appointment |
| `GET` | `/api/appointments` | Get all appointments (admin) |
| `PATCH` | `/api/appointments/:id/status` | Update appointment status |
| `DELETE` | `/api/appointments/:id` | Delete appointment (admin) |
| `POST` | `/api/contact` | Submit contact message |
| `GET` | `/api/contact` | Get all messages (admin) |
| `DELETE` | `/api/contact/:id` | Delete message |
| `GET` | `/api/blog` | Get all blog posts |
| `POST` | `/api/blog` | Create blog post (admin) |
| `DELETE` | `/api/blog/:id` | Delete blog post |
| `POST` | `/api/admin/login` | Admin JWT login |
| `GET` | `/api/admin/verify` | Verify admin token |

---

## 🗄️ Database

**MongoDB Atlas (Production/Atlas):**
```
mongodb+srv://brevanth50_db_user:revanth05@cluster0.eod5r4t.mongodb.net/dental-clinic?appName=Cluster0
```

**To switch back to Local MongoDB:**
Change `.env` in the server folder:
```env
MONGO_URI=mongodb://127.0.0.1:27017/dental-clinic
```

---

## 📝 Recent Updates

### [2026-03-08] - Contact Section Redesign (Get Instant Call Back)
- **Visual Overhaul:** Redesigned the Contact page's form section to match a premium "Get Instant Call Back" layout.
- **New Assets:** Generated and integrated a 3D cartoon tooth character and a modern dental clinic image.
- **Styling:** Applied a warm peach background (`#FFE4D6`) and a vibrant orange theme for the form and button.
- **Layout:** Switched to a modern split-screen grid layout (Form on left, Gallery image on right) with floating animated elements.

### [2026-03-08] - Realistic 3D Icon Branding & Smart Transparency
- **Icon Upgrade:** Replaced the line-art SVG dental checkup icon with a high-quality, realistic **3D Tooth Icon** across the entire website and admin panel.
- **Smart Transparency:** Implemented a real-time **Canvas-based background removal** system to strip out the black background from the 3D source image, ensuring a perfectly clean look on all theme colors.

### [2026-03-08] - Modern Teal Medical Theme & Admin Improvements
- **Login Fix:** Successfully seeded the admin user in the database to resolve "Invalid credentials" issues.
  - **Credentials:** Username: `admin` | Password: `admin123`
- **Show Password Icon:** Added a toggle visibility icon (👁️) to the Admin Login password field for better UX.
- **Global Theme:** Converted the entire website and admin panel to the **Modern Teal Medical Theme**.
- **Centralized Colors:** Implemented a CSS variable-based design system in `client/src/index.css`.
  - Primary: `#14B8A6` (var(`--primary`))
  - Secondary: `#2DD4BF` (var(`--secondary`))
  - Background: `#F0FDFA` (var(`--bg-light`))
- **Consistency:** Applied the new theme across all pages: Home, About, Services, Doctors, Blog, Appointment, Contact, and Admin Dashboard.
- **UI Refresh:** Updated icons, buttons, cards, and animations to align with professional medical aesthetics.

### [2026-03-07] - Demo Template Conversion
- **Rebranding:** Converted the clinic identity from "Lotus Dental Clinic" to "**SmileCare Dental Clinic (Demo)**".
- **Demo Information:** Replaced all real contact details (Address, Phone, Email) with demo/placeholder information.
- **Content Updates:**
  - **Homepage:** Updated Hero section, Services grid, and Testimonials with generic dental content.
  - **About Page:** Updated the clinic story and doctor profiles (Dr. Rahul Sharma).
  - **Services:** Included 7 core dental services with generic demo descriptions.
  - **Contact Page:** Updated with placeholder address and phone number + generic map title.
  - **Appointment Form:** Added a visible "Demo Note" to inform users about the template nature.
- **Admin Panel:** Updated branding in Admin Login and Dashboard to match the demo identity.
- **SEO/Meta:** Updated `index.html` meta tags and Schema.org for the demo brand.

---

## ✨ Features Implemented

### Frontend
- [x] Animated hero section with floating cards
- [x] Stats counter section
- [x] Services grid with hover animations
- [x] Doctor profile cards
- [x] Testimonials slider (react-slick)
- [x] Image gallery section
- [x] Google Maps embedded
- [x] Animated CTA sections
- [x] Page transition animations (Framer Motion)
- [x] Responsive design (mobile/tablet/desktop)
- [x] Sticky navbar with scroll effect
- [x] Mobile hamburger menu
- [x] WhatsApp floating chat button
- [x] Emergency call floating button
- [x] SEO meta tags + Schema.org JSON-LD
- [x] FAQ accordion (Services page)
- [x] Blog with category filter
- [x] Newsletter subscription section

### Backend
- [x] Express.js REST API
- [x] MongoDB with Mongoose
- [x] JWT admin authentication
- [x] Form validation
- [x] CORS configured
- [x] Environment variables

### Admin Dashboard
- [x] Admin login with JWT
- [x] View all appointments
- [x] Update appointment status (Pending/Confirmed/Cancelled/Completed)
- [x] Delete appointments
- [x] View contact messages
- [x] Delete messages
- [x] Overview stats panel

---

## 🎨 Design System (Modern Teal Medical Theme)

**Colors:**
- Primary: `#14B8A6` (var(`--primary`))
- Primary Hover: `#0D9488` (var(`--primary-hover`))
- Secondary: `#2DD4BF` (var(`--secondary`))
- Light Background: `#F0FDFA` (var(`--bg-light`))
- Card Background: `#FFFFFF` (var(`--white`))
- Border Color: `#CCFBF1` (var(`--border-color`))
- Main Text: `#0F172A` (var(`--text-main`))
- Secondary Text: `#334155` (var(`--text-secondary`))
- Muted Text: `#64748B` (var(`--text-muted`))
- Gold Rating Stars: `#FACC15` (var(`--gold-stars`))

**Fonts:**
- Headings: `Playfair Display` or `Outfit`
- Body: `Inter` (Google Fonts)

**Shadows:**
- Soft: `0 10px 30px rgba(20, 184, 166, 0.1)`
- XL: `0 20px 40px rgba(0, 0, 0, 0.1)`
- Inset: `inset 0 2px 4px rgba(0, 0, 0, 0.05)`

---

## 📱 Pages

1. **/** – Home (Hero, Stats, Services, Doctors, Testimonials, Gallery, Map, CTA)
2. **/about** – About (Story, Mission/Vision, Achievements, Lead Doctor)
3. **/services** – Services (8 services + FAQ)
4. **/doctors** – Doctors (4 specialist profiles)
5. **/appointment** – Booking Form (validated, API-connected)
6. **/contact** – Contact Form + Map
7. **/blog** – Blog Posts (filtered by category)
8. **/admin** – Admin Login
9. **/admin/dashboard** – Admin Panel

---

## 🔒 Admin Credentials

| Field | Value |
|-------|-------|
| Username | `admin` |
| Password | `admin123` |

> ⚠️ Change these in `server/.env` before production deployment!
