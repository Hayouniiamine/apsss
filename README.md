# 🎓 Sirine School - نظام إدارة المدرسة

A modern, comprehensive school management system built for **Sirine Private School** (مدرسة سيرين الخاصة). This is a Next.js 15 application with React Server Components, featuring a bilingual interface (Arabic/French), RTL support, and role-based dashboards.

![Sirine School Logo](/mnt/kimi/upload/logo.jpg)

## ✨ Features

### 🌍 **Bilingual & RTL Support**
- **Primary Language**: Arabic (العربية) with full RTL support
- **Secondary Language**: French (Français) with LTR support
- Seamless language switching with persistent preferences

### 👥 **Role-Based Access Control**
1. **Admin** - Full school management
   - Manage teachers, students, parents
   - Create classes and assign teachers
   - School-wide statistics and overview

2. **Teacher** - Classroom management
   - View assigned classes
   - Add/edit student grades
   - Post classroom activities
   - Track attendance

3. **Parent** - Child monitoring ⭐ **PRIORITY**
   - View child's grades by subject
   - Monitor attendance
   - Activity feed (social-like experience)
   - Real-time updates

4. **Student** - Learning portal
   - View courses and materials
   - Check grades
   - Access learning resources

### 📱 **Modern UI/UX**
- Mobile-first responsive design
- Clean, premium interface (not childish)
- Soft color palette (Blue #1b6eb0, Gold #e0c572)
- Smooth animations and transitions
- Card-based layouts
- Glass morphism effects

### 🚀 **Tech Stack**
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (CSS-first configuration)
- **Components**: Custom UI components + Radix UI primitives
- **Icons**: Lucide React
- **State**: React hooks + localStorage (demo)
- **i18n**: next-intl for internationalization

## 🛠️ Project Structure

```
sirine-school/
├── app/
│   ├── [locale]/                 # Locale-specific routes
│   │   ├── (auth)/
│   │   │   └── login/           # Login page
│   │   ├── (dashboard)/
│   │   │   ├── dashboard/       # Main dashboard (role-based)
│   │   │   ├── admin/           # Admin pages
│   │   │   ├── teacher/         # Teacher pages
│   │   │   ├── parent/          # Parent pages
│   │   │   └── student/         # Student pages
│   │   └── page.tsx             # Landing page with carousel
│   ├── globals.css              # Global styles + Tailwind v4
│   └── layout.tsx               # Root layout
├── components/
│   ├── ui/                      # Reusable UI components
│   │   ├── carousel.tsx         # Photo carousel
│   │   └── language-switcher.tsx
│   ├── layout/                  # Layout components
│   └── dashboard/               # Dashboard-specific components
├── lib/
│   ├── utils.ts                 # Utility functions
│   └── mock-data.ts             # Mock data for demo
├── types/
│   └── index.ts                 # TypeScript types
├── i18n/
│   ├── messages/
│   │   ├── ar.json             # Arabic translations
│   │   └── fr.json             # French translations
│   └── routing.ts              # i18n routing config
├── public/
│   └── images/                 # School photos
└── middleware.ts               # Next.js middleware
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
cd sirine-school
```

2. **Install dependencies**
```bash
npm install
```

3. **Run development server**
```bash
npm run dev
```

4. **Open in browser**
Navigate to `http://localhost:3000/ar` (Arabic) or `http://localhost:3000/fr` (French)

## 🔑 Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@sirine.edu | admin123 |
| Teacher | teacher@sirine.edu | teacher123 |
| Parent | parent@email.com | parent123 |
| Student | student@sirine.edu | student123 |

## 📸 Photo Carousel

The landing page features a beautiful photo carousel showcasing authentic school moments:
- **Robotics Workshop**: Students learning programming and assembly
- **Classroom**: Modern, interactive learning environment  
- **Activities**: Direct teacher-student interaction

## 🎨 Design System

### Colors (Extracted from Logo)
- **Primary Blue**: `#1b6eb0` (RGB 27, 110, 176)
- **Accent Gold**: `#e0c572` (RGB 224, 197, 114)
- **Success**: `#10b981`
- **Warning**: `#f59e0b`
- **Error**: `#ef4444`

### Typography
- **Arabic**: Noto Sans Arabic
- **French**: Inter
- **Scale**: Modern, readable sizes

### Components
- **Cards**: Rounded corners, subtle shadows, hover effects
- **Buttons**: Primary (filled), Secondary (outlined)
- **Forms**: Clean inputs with focus states
- **Tables**: Striped rows, hover states

## 🔧 Key Features Implementation

### Parent Dashboard (Top Priority)
```typescript
// Features:
- Child selection (if multiple children)
- Grade visualization with progress bars
- Attendance tracking with color coding
- Activity feed (social media-like)
- Real-time notifications
```

### Teacher Dashboard
```typescript
// Features:
- Quick grade entry
- Class overview
- Student progress tracking
- Activity posting with image upload
- Attendance marking
```

### Admin Dashboard
```typescript
// Features:
- School statistics overview
- User management
- Class creation and assignment
- System-wide announcements
- Data export capabilities
```

## 📱 Mobile-First Design

The application is optimized for mobile devices:
- Collapsible sidebar
- Touch-friendly buttons
- Responsive tables (horizontal scroll)
- Bottom navigation for key actions
- Optimized font sizes

## 🔒 Security (Demo Notes)

**Current Implementation** (for demo purposes):
- LocalStorage-based authentication
- Client-side role checking
- Mock data

**Production Recommendations**:
- JWT tokens with httpOnly cookies
- Server-side session management
- Role-based API middleware
- Data encryption
- CSRF protection

## 🌐 Internationalization

The app uses `next-intl` for i18n:
- Translation files in `i18n/messages/`
- Locale-based routing (`/ar/...`, `/fr/...`)
- RTL layout support for Arabic
- Date/number formatting per locale

## 🚀 Deployment

### Build for production
```bash
npm run build
```

### Recommended Platforms
- **Vercel** (optimal for Next.js)
- **Netlify**
- **AWS Amplify**

### Environment Variables
```env
# Add these for production
NEXT_PUBLIC_API_URL=
JWT_SECRET=
DATABASE_URL=
```

## 📝 Future Enhancements

### Phase 2 (Recommended)
- [ ] Real backend API integration
- [ ] Database (PostgreSQL/MongoDB)
- [ ] WhatsApp/email notifications
- [ ] File upload for activities
- [ ] AI-powered grade predictions
- [ ] Parent-teacher messaging
- [ ] Digital report cards
- [ ] Payment integration

### Phase 3 (Advanced)
- [ ] Mobile app (React Native)
- [ ] Offline support
- [ ] Video conferencing
- [ ] AI homework assistant
- [ ] Advanced analytics dashboard

## 🤝 Contributing

This is a custom solution for **Sirine School**. For modifications:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

Private - For Sirine School use only.

## 🙏 Credits

- **Design & Development**: Custom built for Sirine School
- **Framework**: Next.js by Vercel
- **Styling**: Tailwind CSS
- **Icons**: Lucide
- **Photos**: Authentic Sirine School moments

---

<div align="center">
  <h3>مدرسة سيرين - نحو تعليم متميز</h3>
  <p>Sirine School - Towards Excellence in Education</p>
  <p>© 2025 Sirine School. All rights reserved.</p>
</div>
"# apsss" 
