# 🚀 Pratik Thete — Premium Portfolio

A modern, fully responsive personal portfolio built with **React + Vite**, **pure CSS** (no Tailwind), **Framer Motion**, a **JSON-based CMS**, and a **protected Admin Dashboard** with login authentication.

---

## ✨ Features

### 🎨 UI & Design
- Glassmorphism + Gradient UI (Apple/Vercel/Linear inspired)
- Dark / Light Theme (persisted to localStorage)
- Mobile-First Responsive Design
- Smooth Scroll + active section tracking in navbar
- Loading Screen + Scroll-to-Top button
- Framer Motion animations (fade-up, stagger, slide, shake)

### 🧩 All Sections (Fully Dynamic via JSON)
| Section | Features |
|--------|---------|
| Hero | Typing animation, floating avatar, social links, animated orb background |
| About | Sticky profile image, bio, objective, interests tags, education timeline |
| Skills | Categorized cards with animated progress bars |
| Projects | Filter + Search, hover overlay, featured badge, view counter |
| Project Modal | 4-image gallery, lightbox zoom, features / challenges / learnings |
| Experience | Animated vertical timeline with tech badges |
| Research | Paper cards with Published / Under Review status |
| Achievements | Icon cards with certificate links |
| Certifications | Grid view + click-to-preview modal + credential URL |
| GitHub Stats | Animated counters + top language bar chart |
| Testimonials | Paginated slider with author info |
| Blog | Post cards with read time, date, tags |
| Contact | Validated form + success animation, social links sidebar |

### 🔐 Admin Dashboard (/admin) — Password Protected
- **Login Gate** — Shows a login form before granting dashboard access
- **Session-based auth** — Login persists for the browser session (closes on tab close)
- **Logout button** — Available in topbar and sidebar
- **Full CRUD** for: Hero, Projects, Skills, Experience, Certifications, Testimonials, Blog, SEO Settings

---

## 📁 Project Structure

```
portfolio/
├── public/
│   └── assets/                   ← Place your images here
│       ├── profile.jpg
│       ├── resume.pdf
│       ├── projects/
│       ├── certs/
│       └── blog/
│
├── src/
│   ├── components/
│   │   ├── admin/
│   │   │   ├── AdminLogin.jsx    ← 🔐 Login form (NEW)
│   │   │   └── AdminDashboard.jsx
│   │   ├── common/
│   │   │   ├── Animations.jsx
│   │   │   ├── LoadingScreen.jsx
│   │   │   └── ScrollToTop.jsx
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   └── sections/
│   │       ├── Hero.jsx
│   │       ├── About.jsx
│   │       ├── Skills.jsx
│   │       ├── Projects.jsx
│   │       ├── ProjectModal.jsx
│   │       ├── Experience.jsx
│   │       ├── Research.jsx
│   │       ├── Achievements.jsx
│   │       ├── Certifications.jsx
│   │       ├── GitHub.jsx
│   │       ├── Testimonials.jsx
│   │       ├── Blog.jsx
│   │       └── Contact.jsx
│   │
│   ├── context/
│   │   ├── AuthContext.jsx       ← 🔐 Auth state + credentials (NEW)
│   │   ├── ThemeContext.jsx
│   │   └── DataContext.jsx
│   │
│   ├── data/
│   │   └── portfolio.json        ← ⭐ ALL CONTENT LIVES HERE
│   │
│   ├── pages/
│   │   ├── Portfolio.jsx
│   │   └── NotFound.jsx
│   │
│   ├── styles/
│   │   ├── globals.css
│   │   ├── navbar.css
│   │   ├── sections.css
│   │   └── admin.css
│   │
│   ├── App.jsx                   ← Updated with protected route
│   └── main.jsx
│
├── index.html
├── package.json
└── README.md
```

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
# → Portfolio:       http://localhost:5173
# → Admin Login:     http://localhost:5173/admin

# 3. Build for production
npm run build
```

---

## 🔐 Admin Login

When you visit `/admin`, a login form appears before the dashboard.

### Default Credentials
| Field | Value |
|-------|-------|
| Admin ID | `pratik` |
| Password | `admin@123` |

### How to Change Credentials

Open `src/context/AuthContext.jsx` and update lines 5–6:

```js
// ── Change these credentials to your own ──
const ADMIN_ID = 'your-username';
const ADMIN_PASSWORD = 'your-secure-password';
```

Save the file. That's it — no other changes needed.

### How Authentication Works
- Credentials are checked **client-side** in `AuthContext.jsx`
- On successful login, `sessionStorage` stores the auth flag (`adminAuth = 'true'`)
- The session **clears when the browser tab is closed** — you must log in again on next visit
- Clicking **Logout** (topbar or sidebar) clears the session immediately and returns to the login form

### Security Note
This is **frontend-only authentication** suitable for a personal portfolio where the dashboard manages localStorage data. For production backends with sensitive data, implement server-side JWT authentication and replace the `login()` function in `AuthContext.jsx` with an API call:

```js
const login = async (id, password) => {
  const res = await fetch('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, password })
  });
  if (res.ok) {
    const { token } = await res.json();
    sessionStorage.setItem('adminToken', token);
    setIsAuthenticated(true);
    return true;
  }
  setError('Invalid credentials.');
  return false;
};
```

---

## 🎯 How to Customize Portfolio Content

### Method 1 — Edit JSON directly (best for initial setup)
Open `src/data/portfolio.json` and update any section. All components read from this file.

### Method 2 — Admin Dashboard (no code needed)
1. Go to `http://localhost:5173/admin`
2. Log in with your credentials
3. Use the sidebar to navigate sections
4. Edit fields and save — changes persist to localStorage instantly

---

## 🖼️ Adding Images

Place images in `public/assets/` and reference them in `portfolio.json`:

```
public/assets/
├── profile.jpg              (400×400 square recommended)
├── resume.pdf
├── projects/
│   ├── project-thumb.jpg    (16:9, e.g. 800×450)
│   ├── project-1.jpg        (Home page screenshot)
│   ├── project-2.jpg        (Main feature screenshot)
│   ├── project-3.jpg        (Dashboard screenshot)
│   └── project-4.jpg        (Mobile view screenshot)
└── certs/
    └── my-cert.jpg
```

In `portfolio.json`:
```json
"profileImage": "/assets/profile.jpg",
"thumbnail": "/assets/projects/project-thumb.jpg"
```

---

## 🎨 Changing Colors / Theme

All colors are CSS variables in `src/styles/globals.css`:

```css
:root[data-theme="dark"] {
  --accent:       #7c5af4;   /* Main purple — change this */
  --accent-2:     #a78bfa;
  --accent-3:     #c084fc;
  --accent-glow:  rgba(124, 90, 244, 0.35);
  --bg-primary:   #050508;
}
```

---

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# Drag the dist/ folder to netlify.com/drop
```

### Nginx (Self-hosted)
```bash
npm run build
# Copy dist/ to your web root
```

SPA routing config for Nginx:
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

---

## 🔌 Connect a Real Backend (MongoDB / Firebase)

Replace localStorage logic in `src/context/DataContext.jsx`:

```jsx
useEffect(() => {
  fetch('https://your-api.com/api/portfolio')
    .then(r => r.json())
    .then(setData);
}, []);

const updateData = async (section, value) => {
  await fetch(`https://your-api.com/api/portfolio/${section}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(value)
  });
  setData(prev => ({ ...prev, [section]: value }));
};
```

---

## 📦 Dependencies

| Package | Purpose |
|---------|---------|
| `react` + `react-dom` | UI framework |
| `react-router-dom` | Routing + protected routes |
| `framer-motion` | Animations (fade, shake, slide) |
| `react-helmet-async` | SEO / meta tags |
| `react-icons` | Icon library |
| `vite` | Build tool |

---

## 🐛 Common Issues

**Forgot admin password?**
Open `src/context/AuthContext.jsx` and update `ADMIN_ID` and `ADMIN_PASSWORD`.

**Still logged in after refresh?**
Auth uses `sessionStorage` — it clears when the tab/window is closed. To force logout, click the Logout button in the dashboard.

**Images not showing?**
Put files in `public/assets/` and reference as `/assets/filename.jpg` (must start with `/`).

**404 on `/admin` after deploy?**
Configure your host to redirect all routes to `index.html` (SPA routing).

---

## 📄 License

MIT — Free for personal and commercial use.

---

**Built with ❤️ — React + Vite + Framer Motion + Pure CSS**
