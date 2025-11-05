# Complete Setup Guide for Sri Lankan Muslim Wedding Website

This guide will walk you through setting up the wedding website from scratch.

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works)
- Basic understanding of terminal/command line

## Step 1: Install Dependencies

Open your terminal in the project directory and run:

```bash
npm install
```

This will install all required packages including React, TypeScript, Tailwind CSS, Supabase, and other dependencies.

## Step 2: Set Up Supabase Database

### 2.1 Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in the details:
   - **Name:** "Muslim Wedding Website" (or any name you prefer)
   - **Database Password:** Create a strong password (save this!)
   - **Region:** Choose the closest region to Sri Lanka (e.g., Singapore)
5. Click "Create new project" and wait for it to initialize (takes 1-2 minutes)

### 2.2 Run Database Migrations

Once your project is ready:

1. Go to the **SQL Editor** in the left sidebar
2. Click **New query**
3. Copy the contents of `supabase/migrations/20250205000001_initial_schema.sql`
4. Paste it into the SQL Editor and click **Run**
5. Repeat for `20250205000002_storage_bucket.sql`
6. Repeat for `20250205000003_storage_config.sql`

You should see "Success. No rows returned" for each migration.

### 2.3 Verify Tables Were Created

1. Go to **Table Editor** in the left sidebar
2. You should see 4 tables:
   - `rsvps`
   - `wishes`
   - `photos`
   - `cant_make_it`

3. Go to **Storage** in the left sidebar
4. You should see a bucket named `photos`

### 2.4 Get Your API Keys

1. Go to **Project Settings** (gear icon in the left sidebar)
2. Click **API** in the settings menu
3. You'll see:
   - **Project URL** - Copy this
   - **anon public** key - Copy this
   - **service_role** key - Copy this (⚠️ Keep this secret!)

### 2.5 Update Your Code

Open `src/lib/supabase.ts` and replace the placeholder values:

```typescript
const supabaseUrl = 'YOUR_ACTUAL_PROJECT_URL'; // e.g., https://xxxxx.supabase.co
const supabaseAnonKey = 'YOUR_ACTUAL_ANON_KEY'; // Long string starting with eyJ...
const supabaseServiceKey = 'YOUR_ACTUAL_SERVICE_KEY'; // Long string starting with eyJ...
```

**Important:** Never commit the service_role key to a public repository!

## Step 3: Customize the Website

### 3.1 Update Couple Information

Edit these files to personalize the website:

**src/components/WelcomeSection.tsx** (Lines 31-37):
```typescript
<h2 className="text-3xl md:text-5xl font-english text-islamic-burgundy mb-2">
  Your Names Here  {/* Change this */}
</h2>
```

**src/components/WelcomeSection.tsx** (Lines 68-69):
```typescript
<p className="text-lg font-english font-semibold text-islamic-navy">
  Your Wedding Date  {/* Change this */}
</p>
```

**src/components/EventsSection.tsx**: Update all event details (dates, times, venues)

**index.html** (Line 8): Update the page title

### 3.2 Update Admin Credentials

⚠️ **Important:** Change the default admin credentials!

Edit `src/components/AdminLogin.tsx` (Line 18):
```typescript
if (username === 'admin' && password === 'YOUR_NEW_PASSWORD') {
  // ... rest of the code
```

Choose a strong password and keep it secure.

### 3.3 Customize Colors (Optional)

Edit `tailwind.config.js` to change the color scheme:
```javascript
colors: {
  islamic: {
    gold: '#D4AF37',      // Change these hex values
    emerald: '#50C878',
    navy: '#1B4D89',
    cream: '#FFF8DC',
    burgundy: '#800020',
    teal: '#008B8B',
  },
}
```

## Step 4: Test Locally

### 4.1 Start Development Server

```bash
npm run dev
```

The website will open at `http://localhost:5173`

### 4.2 Test All Features

1. **Public Features:**
   - Fill out the RSVP form
   - Upload a test photo
   - Submit a wedding wish
   - Try the "Can't Make It" form

2. **Admin Features:**
   - Click "Admin Access" in the footer
   - Login with your credentials
   - Check that all data appears in the dashboard
   - Try approving wishes and photos
   - Try deleting a test entry
   - Export the RSVP report to PDF

### 4.3 Verify Database

Go back to Supabase and check:
- **Table Editor** → `rsvps` - Your test RSVP should appear
- **Table Editor** → `wishes` - Your test wish should appear
- **Storage** → `photos` - Your test photo should appear

## Step 5: Deploy to Production

### Option A: Deploy to Vercel (Recommended)

1. Push your code to GitHub (create a new repository)
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Vite settings
6. Click "Deploy"
7. Your site will be live in ~2 minutes!

### Option B: Deploy to Netlify

1. Build the project:
   ```bash
   npm run build
   ```
2. Go to [netlify.com](https://netlify.com)
3. Drag and drop the `dist` folder to Netlify
4. Your site is live!

### Option C: Deploy Anywhere

The `dist` folder (created by `npm run build`) contains static files that can be hosted on any web server or static hosting service.

## Step 6: Share with Guests

1. Get your deployment URL (e.g., `https://yoursite.vercel.app`)
2. Share it via:
   - Wedding invitations (as a QR code)
   - WhatsApp/email
   - Social media

## Database CRUD Operations Overview

### For Guests (Public):

**CREATE Operations:**
- Submit RSVP → Inserts into `rsvps` table
- Upload photos → Uploads to `photos` storage bucket + inserts metadata
- Share wishes → Inserts into `wishes` table (pending approval)
- Send "can't attend" message → Inserts into `cant_make_it` table

**READ Operations:**
- View approved photos from gallery
- View approved wishes

### For Admin:

**CREATE:** Same as guests (but can also manually insert via SQL Editor)

**READ Operations:**
- View all RSVPs (attending/not attending)
- View all wishes (approved + pending)
- View all photos (approved + pending)
- View all "can't attend" messages
- Generate statistics

**UPDATE Operations:**
- Approve wishes → Sets `approved = true`
- Approve photos → Sets `approved = true`

**DELETE Operations:**
- Delete any RSVP
- Delete any wish
- Delete any photo
- Delete any "can't attend" message

## Security Features

1. **Row Level Security (RLS):** Enabled on all tables
2. **Public users:** Can only INSERT and SELECT approved content
3. **Admin access:** Uses service_role key for full permissions
4. **Session management:** Admin sessions expire after 24 hours
5. **File size limits:** Photos limited to 5MB
6. **File type validation:** Only image files allowed

## Troubleshooting

### Issue: "Failed to fetch" errors

**Solution:** Check that your Supabase URL and keys are correct in `src/lib/supabase.ts`

### Issue: Photos not uploading

**Solution:**
1. Verify the storage bucket exists in Supabase → Storage
2. Check the bucket is named exactly "photos"
3. Verify storage policies are set correctly

### Issue: Can't login as admin

**Solution:** Check the credentials in `src/components/AdminLogin.tsx` line 18

### Issue: RLS policy errors

**Solution:** Re-run the migration SQL files to ensure all policies are created

### Issue: Build fails

**Solution:**
1. Delete `node_modules` folder
2. Delete `package-lock.json`
3. Run `npm install` again
4. Run `npm run build`

## Performance Tips

1. **Optimize images:** Compress photos before uploading
2. **Limit photo display:** Currently shows all photos; consider pagination for 100+ photos
3. **Cache static assets:** Most hosting platforms do this automatically
4. **Enable CDN:** Supabase includes CDN for storage by default

## Maintenance

### Adding New Guests

Guests can self-register via RSVP, but you can also add them manually:
1. Go to Supabase → Table Editor → `rsvps`
2. Click "Insert" → "Insert row"
3. Fill in the fields
4. Click "Save"

### Backing Up Data

1. Go to Supabase → Table Editor
2. Select a table
3. Click the three dots → "Download as CSV"
4. Repeat for all tables

### Viewing Analytics

Use the admin dashboard to see:
- Total RSVPs
- Number of attending guests
- Meal preference breakdown
- Photo and wish counts

## Getting Help

- **Supabase Docs:** [https://supabase.com/docs](https://supabase.com/docs)
- **React Docs:** [https://react.dev](https://react.dev)
- **Tailwind CSS:** [https://tailwindcss.com/docs](https://tailwindcss.com/docs)
- **Vite Docs:** [https://vitejs.dev](https://vitejs.dev)

## Next Steps After Setup

1. ✅ Test all features thoroughly
2. ✅ Customize content and images
3. ✅ Change admin password
4. ✅ Share with a few friends first for beta testing
5. ✅ Deploy to production
6. ✅ Share with all guests
7. ✅ Monitor the admin dashboard regularly

---

**Congratulations!** Your wedding website is now ready. May your special day be blessed!

*Barak Allahu lakuma wa baraka 'alaykuma wa jama'a baynakuma fi khayr* ❤️
