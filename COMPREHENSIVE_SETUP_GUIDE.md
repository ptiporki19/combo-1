# 🚀 PXV Pay - Comprehensive Setup Guide for New Computer

**Last Updated**: January 20, 2025  
**Application Version**: v2.0  
**Status**: Production Ready ✅  
**Repository**: https://github.com/ptiporki19/combo-1

---

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [System Overview](#system-overview)
3. [Prerequisites & Dependencies](#prerequisites--dependencies)
4. [Environment Setup](#environment-setup)
5. [Installation Steps](#installation-steps)
6. [Database Configuration](#database-configuration)
7. [Deployment Options](#deployment-options)
8. [Application Features](#application-features)
9. [Troubleshooting](#troubleshooting)
10. [Development Workflow](#development-workflow)

---

## 🚀 Quick Start

For immediate setup on a new computer:

```bash
# 1. Clone the repository
git clone https://github.com/ptiporki19/combo-1.git
cd combo-1

# 2. Install dependencies
npm install

# 3. Set up environment variables (copy from environment-template.env)
cp environment-template.env .env.local

# 4. Build and run
npm run build
npm run dev
```

**⚡ The application is now accessible at http://localhost:3000**

---

## 🎯 System Overview

**PXV Pay** is a comprehensive payment management platform with:

- **Frontend**: Next.js 15 with TypeScript and Tailwind CSS
- **Backend**: Supabase (PostgreSQL) with Row Level Security
- **Authentication**: Supabase Auth with multi-role system
- **Storage**: Supabase Storage for file uploads
- **Deployment**: Optimized for Vercel (Cloudflare, Railway alternatives available)

### Key Features:
✅ Modern checkout system with analytics  
✅ Multi-currency and global payment methods  
✅ Comprehensive admin dashboard  
✅ Real-time notifications and updates  
✅ Mobile-responsive design  
✅ Role-based access control (Super Admin, Admin, User)  
✅ Blog management system  
✅ File upload capabilities  
✅ Advanced analytics and reporting  

---

## 📦 Prerequisites & Dependencies

### System Requirements:
- **Node.js**: 18.17.0 or higher
- **npm**: 9.0.0 or higher
- **Git**: Latest version
- **Operating System**: macOS, Linux, or Windows

### Required Accounts:
- **GitHub Account**: For repository access
- **Supabase Account**: For database and authentication
- **Vercel Account**: For deployment (recommended)

### Development Tools (Recommended):
- **VS Code**: With TypeScript, Tailwind CSS extensions
- **Cursor**: AI-powered code editor
- **Postman**: For API testing

---

## 🔧 Environment Setup

### 1. Environment Variables

Create `.env.local` file in the root directory:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Application Settings
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# Optional: External Services
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
```

### 2. Package Dependencies

The application uses these key dependencies:

**Frontend Framework:**
- `next@15.1.3` - React framework
- `react@19.0.0` - UI library
- `typescript@5.7.2` - Type safety

**UI Components:**
- `@radix-ui/*` - Accessible components
- `tailwindcss@3.5.2` - CSS framework
- `lucide-react` - Icons

**Database & Auth:**
- `@supabase/supabase-js@2.48.0` - Database client
- `@supabase/ssr@0.5.2` - Server-side rendering

**Forms & Validation:**
- `react-hook-form` - Form management
- `zod` - Schema validation

**Notifications:**
- `sonner` - Toast notifications

---

## 📥 Installation Steps

### Step 1: Clone Repository
```bash
git clone https://github.com/ptiporki19/combo-1.git
cd combo-1
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Environment Configuration
```bash
# Copy environment template
cp environment-template.env .env.local

# Edit .env.local with your Supabase credentials
nano .env.local
```

### Step 4: Database Setup
```bash
# Install Supabase CLI (if not already installed)
npm install -g @supabase/cli

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref YOUR_PROJECT_REF

# Apply migrations
supabase db push
```

### Step 5: Build and Run
```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

---

## 🗄️ Database Configuration

### Supabase Setup Process:

1. **Create Supabase Project**:
   - Go to https://supabase.com
   - Create new project
   - Note down Project URL and API keys

2. **Database Schema**:
   The application includes complete migrations in `/supabase/migrations/`:
   - User management with roles
   - Payment methods and countries
   - Checkout links and transactions
   - Blog posts and content management
   - File storage configuration

3. **Row Level Security (RLS)**:
   - Policies are automatically applied
   - User isolation is enforced
   - Super admin access is configured

4. **Storage Buckets**:
   - `checkout-proofs`: Payment verification files
   - `blog-images`: Blog post images
   - `user-uploads`: General file uploads

### Essential Tables:
- `users` - User profiles and role management
- `checkout_links` - Payment links and products
- `countries` - Global country data
- `currencies` - Multi-currency support
- `payment_methods` - Available payment options
- `transactions` - Payment records
- `blog_posts` - Content management

---

## 🚀 Deployment Options

### 1. Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

**Vercel Configuration (`vercel.json` included):**
- Automatic deployment from main branch
- Environment variable management
- Optimized for Next.js applications

### 2. Cloudflare Pages

1. Connect GitHub repository
2. Build command: `npm run build`
3. Output directory: `.next`
4. Add environment variables

### 3. Railway

1. Connect GitHub repository
2. Auto-deploys from main branch
3. Built-in environment variable management

### 4. Self-Hosted

```bash
# Build for production
npm run build

# Start production server
npm start
```

---

## 🎨 Application Features

### Admin Dashboard:
- **Analytics**: Real-time transaction monitoring
- **User Management**: Role-based access control
- **Payment Methods**: Configure available options
- **Countries & Currencies**: Global configuration
- **Checkout Links**: Create payment links
- **Blog Management**: Content creation and editing
- **Transaction History**: Complete payment records

### Public Features:
- **Landing Page**: Marketing and feature overview
- **Checkout System**: Modern payment interface
- **Blog**: Public content and announcements
- **Mobile Support**: Responsive design

### Technical Features:
- **Real-time Updates**: WebSocket connections
- **File Uploads**: Secure storage integration
- **Multi-currency**: Global payment support
- **Analytics**: Comprehensive reporting
- **Security**: RLS and role-based access

---

## 🔧 Troubleshooting

### Common Issues:

**1. Environment Variables Not Loading**
```bash
# Check .env.local file exists and has correct format
ls -la .env.local
cat .env.local
```

**2. Database Connection Issues**
```bash
# Test Supabase connection
npm run test:db
```

**3. Build Failures**
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

**4. Missing Dependencies**
```bash
# Reinstall all dependencies
rm package-lock.json
npm install
```

### Database Issues:

**Reset Database Schema:**
```bash
supabase db reset
supabase db push
```

**Check Migration Status:**
```bash
supabase migration list
```

### Deployment Issues:

**Vercel Build Failures:**
- Check environment variables are set
- Verify build command in `vercel.json`
- Check build logs in Vercel dashboard

**Large File Issues:**
- Files over 100MB are automatically excluded
- Check `.gitignore` for proper exclusions

---

## 👨‍💻 Development Workflow

### Local Development:
```bash
# Start development server
npm run dev

# Run linting
npm run lint

# Format code
npm run format

# Type checking
npm run type-check
```

### Database Development:
```bash
# Create new migration
supabase migration new migration_name

# Apply migrations
supabase db push

# Reset database
supabase db reset
```

### Testing:
```bash
# Run test scripts (located in root directory)
node test-database-connection.js
node test-auth-service.js
node test-checkout-integration.js
```

### Code Structure:
```
src/
├── app/                 # Next.js app router
│   ├── (admin)/        # Admin dashboard pages
│   ├── (auth)/         # Authentication pages
│   ├── api/            # API routes
│   └── globals.css     # Global styles
├── components/         # Reusable components
│   ├── ui/            # Base UI components
│   ├── admin/         # Admin-specific components
│   └── forms/         # Form components
├── lib/               # Utility functions
│   └── supabase/      # Database clients
└── types/             # TypeScript definitions
```

---

## 📞 Support & Resources

### Documentation:
- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs

### Repository:
- **Main Repository**: https://github.com/ptiporki19/combo-1
- **Issues**: Use GitHub issues for bug reports
- **Pull Requests**: Follow standard GitHub workflow

### Key Files to Reference:
- `package.json` - Dependencies and scripts
- `vercel.json` - Deployment configuration
- `supabase/config.toml` - Supabase settings
- `environment-template.env` - Environment variables template

---

## ✅ Final Checklist

Before considering setup complete:

- [ ] Repository cloned successfully
- [ ] Dependencies installed (`npm install`)
- [ ] Environment variables configured
- [ ] Supabase project connected
- [ ] Database migrations applied
- [ ] Application builds without errors
- [ ] Local development server runs
- [ ] Database connection tested
- [ ] Authentication system working
- [ ] Admin dashboard accessible
- [ ] Checkout system functional
- [ ] File uploads working
- [ ] Ready for deployment

---

**🎉 Congratulations! Your PXV Pay installation is now complete and ready for development or production use.**

For any issues or questions, refer to the troubleshooting section or check the repository documentation. 