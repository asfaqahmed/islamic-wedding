# Project Structure

Complete file structure of the Sri Lankan Muslim Wedding Website project.

```
muslims-wedding/
│
├── public/                          # Static assets (add images here)
│
├── src/                             # Source code
│   ├── components/                  # React components
│   │   ├── Header.tsx              # Navigation header with admin toggle
│   │   ├── WelcomeSection.tsx      # Hero section with couple names & date
│   │   ├── StorySection.tsx        # Couple's love story timeline
│   │   ├── EventsSection.tsx       # Nikah & Walima event details
│   │   ├── RSVPSection.tsx         # RSVP form (CREATE operation)
│   │   ├── CantMakeItSection.tsx   # Can't attend form (CREATE operation)
│   │   ├── GallerySection.tsx      # Photo gallery (CREATE & READ operations)
│   │   ├── WishesSection.tsx       # Wedding wishes (CREATE & READ operations)
│   │   ├── AdminLogin.tsx          # Admin authentication
│   │   └── AdminDashboard.tsx      # Admin panel (all CRUD operations)
│   │
│   ├── lib/                         # Utilities and configurations
│   │   └── supabase.ts             # Supabase client & TypeScript interfaces
│   │
│   ├── App.tsx                      # Main application component
│   ├── main.tsx                     # React entry point
│   └── index.css                    # Global styles & Tailwind imports
│
├── supabase/                        # Database migrations
│   └── migrations/
│       ├── 20250205000001_initial_schema.sql      # Creates tables & RLS policies
│       ├── 20250205000002_storage_bucket.sql      # Creates photos storage bucket
│       └── 20250205000003_storage_config.sql      # Configures bucket settings
│
├── index.html                       # HTML entry point
├── package.json                     # Dependencies and scripts
├── package-lock.json               # Locked dependency versions (auto-generated)
│
├── vite.config.ts                  # Vite build configuration
├── tsconfig.json                   # TypeScript configuration
├── tsconfig.node.json              # TypeScript config for build tools
├── tailwind.config.js              # Tailwind CSS configuration
├── postcss.config.js               # PostCSS configuration
├── eslint.config.js                # ESLint configuration
│
├── .gitignore                      # Git ignore rules
├── README.md                        # Project documentation
├── SETUP_GUIDE.md                  # Detailed setup instructions
└── PROJECT_STRUCTURE.md            # This file
```

## File Descriptions

### Root Configuration Files

| File | Purpose | When to Edit |
|------|---------|--------------|
| `package.json` | Lists all dependencies and scripts | When adding new libraries |
| `vite.config.ts` | Vite build tool settings | Rarely needed |
| `tsconfig.json` | TypeScript compiler options | Rarely needed |
| `tailwind.config.js` | Tailwind CSS theme customization | To change colors/fonts |
| `postcss.config.js` | CSS processing configuration | Never |
| `eslint.config.js` | Code quality rules | Never |
| `.gitignore` | Files to exclude from Git | When deploying |

### Source Files

#### Components (src/components/)

| Component | Lines | Purpose | CRUD Operations |
|-----------|-------|---------|-----------------|
| `Header.tsx` | 130 | Navigation with smooth scrolling | None |
| `WelcomeSection.tsx` | 85 | Hero section with Islamic theme | None |
| `StorySection.tsx` | 110 | Couple's story in timeline | None |
| `EventsSection.tsx` | 160 | Nikah & Walima details | None |
| `RSVPSection.tsx` | 180 | Guest RSVP form | **CREATE** |
| `CantMakeItSection.tsx` | 115 | Alternative form for non-attendees | **CREATE** |
| `GallerySection.tsx` | 270 | Photo upload & display | **CREATE, READ** |
| `WishesSection.tsx` | 230 | Wedding wishes submission & display | **CREATE, READ** |
| `AdminLogin.tsx` | 90 | Admin authentication | None |
| `AdminDashboard.tsx` | 550 | Complete admin panel | **READ, UPDATE, DELETE** |

#### Core Files (src/)

| File | Lines | Purpose |
|------|-------|---------|
| `App.tsx` | 80 | Main app component with routing |
| `main.tsx` | 10 | React DOM entry point |
| `index.css` | 35 | Global styles & fonts |
| `lib/supabase.ts` | 50 | Database client & types |

### Database Files (supabase/migrations/)

| Migration | Purpose | Tables/Buckets Created |
|-----------|---------|------------------------|
| `20250205000001_initial_schema.sql` | Creates all tables with RLS | rsvps, wishes, photos, cant_make_it |
| `20250205000002_storage_bucket.sql` | Creates storage for photos | photos bucket |
| `20250205000003_storage_config.sql` | Sets file size & type limits | - |

## Component Dependencies

```
App.tsx
├── Header
├── WelcomeSection
├── StorySection
├── EventsSection
├── RSVPSection ────> supabase.ts (CREATE operation)
├── CantMakeItSection ────> supabase.ts (CREATE operation)
├── GallerySection ────> supabase.ts (CREATE, READ operations)
├── WishesSection ────> supabase.ts (CREATE, READ operations)
├── AdminLogin
└── AdminDashboard ────> supabase.ts (READ, UPDATE, DELETE operations)
```

## Data Flow

### Guest Journey
```
1. User visits website
2. Views Welcome, Story, Events sections
3. Submits RSVP → [CREATE] data saved to rsvps table
4. Uploads photos → [CREATE] files to storage + metadata to photos table
5. Shares wish → [CREATE] data saved to wishes table (pending approval)
6. Views approved wishes → [READ] from wishes table where approved=true
```

### Admin Journey
```
1. Admin clicks "Admin Access" in footer
2. Logs in with credentials → localStorage session (24h)
3. Views dashboard → [READ] all data from all tables
4. Approves wishes/photos → [UPDATE] sets approved=true
5. Deletes unwanted entries → [DELETE] removes from database
6. Exports report → [READ] data compiled into PDF
```

## File Sizes (Approximate)

| Category | Size |
|----------|------|
| Total source code | ~50 KB |
| node_modules (after install) | ~400 MB |
| Production build | ~500 KB |
| Database migrations | ~5 KB |

## Key Technologies per File

| File | Technologies Used |
|------|-------------------|
| `*.tsx` files | React 18, TypeScript, Tailwind CSS |
| `supabase.ts` | Supabase JS SDK, TypeScript |
| `AdminDashboard.tsx` | jsPDF, date-fns, html2canvas |
| `*.sql` files | PostgreSQL, Supabase RLS |
| `tailwind.config.js` | Tailwind CSS, Custom animations |

## Customization Priority

If you need to customize the website, edit files in this order:

### High Priority (Must Edit)
1. ✅ `src/lib/supabase.ts` - Add your Supabase credentials
2. ✅ `src/components/AdminLogin.tsx` - Change admin password
3. ✅ `src/components/WelcomeSection.tsx` - Update couple names & date
4. ✅ `src/components/EventsSection.tsx` - Update event details

### Medium Priority (Should Edit)
5. `index.html` - Update page title and meta description
6. `src/components/StorySection.tsx` - Personalize the story
7. `tailwind.config.js` - Adjust color scheme if desired

### Low Priority (Optional)
8. `src/components/Header.tsx` - Add/remove nav items
9. Other components - Fine-tune text and styling

## Adding New Features

To add a new section/feature:

1. Create new component in `src/components/`
2. Import and add to `App.tsx`
3. Add navigation link in `Header.tsx`
4. If it needs database:
   - Add table to a new migration SQL file
   - Add TypeScript interface to `supabase.ts`
   - Implement CRUD operations in the component

## Scripts Reference

```bash
npm run dev      # Start development server (localhost:5173)
npm run build    # Build for production (outputs to dist/)
npm run preview  # Preview production build locally
npm run lint     # Check code quality with ESLint
```

## Environment

This project runs in:
- **Development:** Node.js + Vite dev server
- **Production:** Static files (HTML, CSS, JS) served by any web server
- **Database:** Supabase cloud (PostgreSQL + Storage)

## Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

**Total Files:** 30+
**Total Lines of Code:** ~2,500+
**Component Count:** 10 major components
**Database Tables:** 4
**Storage Buckets:** 1
