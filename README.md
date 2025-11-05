# Sri Lankan Muslim Wedding Website

A beautiful, full-featured wedding website for a Sri Lankan Muslim couple built with React, TypeScript, Tailwind CSS, and Supabase.

## Features

### Public Features
- 🎉 **Welcome Section** - Beautiful landing page with Islamic theme and Quranic verses
- 💑 **Our Story** - Couple's journey told in an elegant timeline
- 📅 **Events Section** - Detailed information about Nikah & Walima ceremonies
- ✉️ **RSVP Form** - Guests can confirm attendance with meal preferences (CREATE operation)
- 🙏 **Can't Make It** - Alternative form for guests who cannot attend (CREATE operation)
- 📸 **Photo Gallery** - Upload and view wedding photos (CREATE & READ operations)
- 💬 **Wedding Wishes** - Share blessings and well-wishes (CREATE & READ operations)
- 📱 **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- 🎨 **Islamic Design** - Gold, emerald, navy, and burgundy color scheme

### Admin Features
- 🔐 **Secure Login** - Password-protected admin access (Credentials: admin / muslim2025)
- 📊 **Dashboard** - Real-time statistics and data visualization
- 👥 **RSVP Management** - View, filter, and delete RSVPs (READ & DELETE operations)
- 💭 **Wish Moderation** - Approve or delete wishes (UPDATE & DELETE operations)
- 🖼️ **Photo Moderation** - Approve or delete photos (UPDATE & DELETE operations)
- 📧 **Can't Attend Messages** - View and manage messages from non-attendees
- 📄 **PDF Export** - Generate comprehensive RSVP reports
- 🔄 **Auto-refresh** - Real-time data updates

## Technology Stack

- **Frontend Framework:** React 18.3.1
- **Language:** TypeScript 5.5.3
- **Build Tool:** Vite 5.4.2
- **Styling:** Tailwind CSS 3.4.1
- **Database:** Supabase (PostgreSQL)
- **Icons:** Lucide React
- **Date Utilities:** date-fns
- **PDF Export:** jsPDF
- **Screenshot:** html2canvas

## Database Schema

### Tables

1. **rsvps** - Guest RSVP responses
   - id, name, email, phone, guest_count, meal_preference (halal/vegetarian/kids/special), will_attend, created_at

2. **wishes** - Wedding wishes from guests
   - id, name, message, approved, created_at

3. **photos** - Uploaded wedding photos
   - id, filename, url, uploaded_by, approved, created_at

4. **cant_make_it** - Messages from guests who cannot attend
   - id, name, email, message, created_at

### Storage
- **photos bucket** - Stores uploaded image files (5MB max per file)

## CRUD Operations

### CREATE (Insert)
- ✅ RSVP submissions ([RSVPSection.tsx:45](src/components/RSVPSection.tsx#L45))
- ✅ Wedding wish submissions ([WishesSection.tsx:43](src/components/WishesSection.tsx#L43))
- ✅ Photo uploads to storage + metadata ([GallerySection.tsx:59](src/components/GallerySection.tsx#L59))
- ✅ Can't make it messages ([CantMakeItSection.tsx:22](src/components/CantMakeItSection.tsx#L22))

### READ (Select)
- ✅ Fetch all RSVPs ([AdminDashboard.tsx:22](src/components/AdminDashboard.tsx#L22))
- ✅ Fetch approved wishes ([WishesSection.tsx:18](src/components/WishesSection.tsx#L18))
- ✅ Fetch all photos ([GallerySection.tsx:20](src/components/GallerySection.tsx#L20))
- ✅ Fetch can't attend messages ([AdminDashboard.tsx:22](src/components/AdminDashboard.tsx#L22))

### UPDATE (Modify)
- ✅ Approve wishes ([AdminDashboard.tsx:45](src/components/AdminDashboard.tsx#L45))
- ✅ Approve photos ([AdminDashboard.tsx:62](src/components/AdminDashboard.tsx#L62))

### DELETE (Remove)
- ✅ Delete RSVPs ([AdminDashboard.tsx:79](src/components/AdminDashboard.tsx#L79))
- ✅ Delete wishes ([AdminDashboard.tsx:79](src/components/AdminDashboard.tsx#L79))
- ✅ Delete photos ([AdminDashboard.tsx:79](src/components/AdminDashboard.tsx#L79))
- ✅ Delete can't attend messages ([AdminDashboard.tsx:79](src/components/AdminDashboard.tsx#L79))

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the migration files in order:
   - [supabase/migrations/20250205000001_initial_schema.sql](supabase/migrations/20250205000001_initial_schema.sql)
   - [supabase/migrations/20250205000002_storage_bucket.sql](supabase/migrations/20250205000002_storage_bucket.sql)
   - [supabase/migrations/20250205000003_storage_config.sql](supabase/migrations/20250205000003_storage_config.sql)

3. Get your Supabase credentials:
   - Go to **Project Settings** → **API**
   - Copy the **Project URL**
   - Copy the **anon/public key**
   - Copy the **service_role key** (keep this secret!)

4. Update [src/lib/supabase.ts](src/lib/supabase.ts):
```typescript
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';
const supabaseServiceKey = 'YOUR_SUPABASE_SERVICE_KEY';
```

### 3. Run Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 4. Build for Production
```bash
npm run build
```

The production build will be in the `dist` folder.

## Admin Access

To access the admin dashboard:
1. Click "Admin Access" in the footer, or
2. Navigate to `#admin-login` in the URL

**Default Credentials:**
- Username: `admin`
- Password: `muslim2025`

**Note:** Change these credentials in [src/components/AdminLogin.tsx](src/components/AdminLogin.tsx#L18) for production use.

## Customization

### Change Couple Names & Date
Edit the following files:
- [src/components/WelcomeSection.tsx](src/components/WelcomeSection.tsx) - Change "Ahmed & Zainab" and date
- [src/components/EventsSection.tsx](src/components/EventsSection.tsx) - Update event dates and venues
- [index.html](index.html) - Update page title

### Change Colors
Edit [tailwind.config.js](tailwind.config.js) to customize the Islamic color palette:
```javascript
colors: {
  islamic: {
    gold: '#D4AF37',
    emerald: '#50C878',
    navy: '#1B4D89',
    // ... add more colors
  },
}
```

### Add More Features
The codebase is modular and easy to extend. Each section is a separate component in `src/components/`.

## Row Level Security (RLS)

The database uses Supabase RLS for security:
- **Public users** can INSERT and SELECT (with approval filters)
- **Service role** (admin) has full access to all operations
- All sensitive operations use the admin client

## Session Management

Admin sessions are valid for 24 hours and stored in localStorage. After 24 hours, admins must log in again.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## License

This project is open source and available for anyone to use for their wedding website.

## Support

For questions or issues, please refer to the code comments or Supabase documentation.

---

**Made with ❤️ for Ahmed & Zainab's special day**

*Barak Allahu lakuma wa baraka 'alaykuma wa jama'a baynakuma fi khayr*
(May Allah bless you both and unite you in goodness)
