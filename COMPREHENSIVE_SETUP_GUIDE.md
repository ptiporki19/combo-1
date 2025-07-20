# 🚀 PXV Pay - Comprehensive Setup Guide for New Computer

**Last Updated**: January 19, 2025  
**Application Version**: v1.0  
**Status**: Production Ready ✅

---

## 📋 Table of Contents

1. [System Overview](#system-overview)
2. [Prerequisites & Dependencies](#prerequisites--dependencies)
3. [Environment Setup](#environment-setup)
4. [Installation Steps](#installation-steps)
5. [Database Configuration](#database-configuration)
6. [Application Configuration](#application-configuration)
7. [Development Workflow](#development-workflow)
8. [Production Deployment](#production-deployment)
9. [Troubleshooting](#troubleshooting)
10. [Architecture & Features](#architecture--features)

---

## 🎯 System Overview

**PXV Pay** is a comprehensive payment management platform built with modern web technologies. It enables merchants to create customizable checkout links, process payments globally, and manage transactions with role-based access control.

### Key Capabilities
- ✅ **Global Payment Processing** - 180+ countries with local payment methods
- ✅ **Checkout Link Generation** - Simple & product-based checkout flows
- ✅ **Payment Verification** - Instant verification with proof uploads
- ✅ **Admin Dashboard** - Multi-role management system
- ✅ **Mobile Support** - Dedicated mobile pages (`/m/` routes)
- ✅ **Analytics Dashboard** - Real-time payment analytics
- ✅ **Theme Customization** - Brand customization for checkout pages
- ✅ **Blog System** - Content management capabilities
- ✅ **Support Tickets** - Customer support system

---

## 🛠️ Prerequisites & Dependencies

### System Requirements
- **Node.js**: Version 18.17.0+ (LTS recommended)
- **npm**: Version 9.0.0+ or **yarn**: Version 1.22.0+
- **Git**: Version 2.34.0+
- **Docker**: Version 20.10.0+ (for local Supabase)
- **Operating System**: macOS, Linux, or Windows 10+

### Required Accounts & Services
- **GitHub Account**: For repository access
- **Supabase Account**: For database and authentication
- **Vercel Account** (optional): For deployment
- **Domain** (optional): For custom domain setup

### Development Tools (Recommended)
- **VS Code**: With extensions for TypeScript, Tailwind CSS, ESLint
- **Postman/Insomnia**: For API testing
- **TablePlus/pgAdmin**: For database management

---

## 🌐 Environment Setup

### Step 1: Install Node.js & Package Manager

```bash
# Using Node Version Manager (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install --lts
nvm use --lts

# Verify installation
node --version  # Should be 18.17.0+
npm --version   # Should be 9.0.0+
```

### Step 2: Install Docker (for local Supabase)

```bash
# macOS (using Homebrew)
brew install --cask docker

# Ubuntu/Debian
sudo apt-get update
sudo apt-get install docker.io docker-compose

# Windows
# Download Docker Desktop from https://docker.com
```

### Step 3: Install Supabase CLI

```bash
npm install -g supabase@latest
# Verify installation
supabase --version
```

---

## 📦 Installation Steps

### Step 1: Clone Repository

```bash
# Clone the main repository
git clone https://github.com/ptiporki19/combo-1.git
cd combo-1/pxv-pay

# Verify you're in the correct directory
ls -la
# Should show: package.json, src/, supabase/, etc.
```

### Step 2: Install Dependencies

```bash
# Install all npm dependencies
npm install

# This will install:
# - Next.js 15.3.2 (React framework)
# - Supabase client libraries
# - Tailwind CSS & PostCSS
# - shadcn/ui components
# - TypeScript & ESLint
# - And 60+ other dependencies
```

### Step 3: Environment Configuration

```bash
# Copy environment template
cp environment-template.env .env.local

# Open the file and configure required variables
nano .env.local
```

**Required Environment Variables:**

```env
# Supabase Configuration (REQUIRED)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Database Connection (REQUIRED for local development)
DATABASE_URL=postgresql://postgres:your_password@localhost:54322/postgres

# Application Configuration
NODE_ENV=development
APP_ENV=local
NEXT_PORT=3000

# Optional: Email Configuration (for notifications)
SENDGRID_API_KEY=your_sendgrid_api_key
FROM_EMAIL=noreply@yourapp.com

# Optional: Analytics
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
```

---

## 🗄️ Database Configuration

### Option A: Local Development (Recommended for Development)

```bash
# Initialize Supabase locally
supabase init

# Start local Supabase stack
supabase start

# This will start:
# - PostgreSQL database (port 54322)
# - Supabase API (port 54321)
# - Supabase Studio (port 54323)
# - Email testing (port 54324)
```

**After starting, you'll see output like:**
```
API URL: http://127.0.0.1:54321
anon key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Update your `.env.local`:**
```env
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_from_output
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_from_output
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:54322/postgres
```

### Apply Database Migrations

```bash
# Apply all migrations (44+ migration files)
supabase db reset

# Or apply manually
supabase db push

# Verify database is properly set up
supabase db status
```

**Database will include:**
- ✅ **46 database migrations** - Complete schema
- ✅ **User management system** - With role-based access
- ✅ **Payment processing tables** - Transactions, methods, proofs
- ✅ **Checkout system** - Links, products, themes
- ✅ **Analytics tables** - Payment tracking and insights
- ✅ **Blog system** - Content management
- ✅ **Support system** - Ticket management
- ✅ **Storage buckets** - File uploads (8 buckets configured)

### Option B: Hosted Supabase (Production)

1. **Create Supabase Project:**
   - Go to [supabase.com](https://supabase.com)
   - Create new project
   - Note down URL and anon key

2. **Link to existing project:**
```bash
supabase link --project-ref your-project-ref
supabase db push
```

---

## ⚙️ Application Configuration

### TypeScript Configuration

The application uses TypeScript with strict type checking:

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "strict": true,
    "moduleResolution": "bundler",
    "jsx": "preserve",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Tailwind CSS Configuration

Custom theme with shadcn/ui components:

```javascript
// tailwind.config.ts includes:
// - Custom color scheme with CSS variables
// - shadcn/ui component styles
// - Dark mode support
// - Custom fonts (Poppins, Inter, Geist Mono)
```

### Next.js Configuration

```typescript
// next.config.ts includes:
// - Image optimization for Supabase storage
// - TypeScript strict mode
// - App Router configuration
```

---

## 🚀 Development Workflow

### Starting Development Server

```bash
# Start the development server
npm run dev

# Application will be available at:
# http://localhost:3000
```

### Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run ESLint

# Supabase Management
npm run supabase:start  # Start local Supabase
npm run supabase:stop   # Stop local Supabase
npm run supabase:status # Check Supabase status

# Database Management
npm run migrate         # Apply migrations
npm run backup         # Create complete backup

# Testing Scripts
npm run test:payment-methods     # Test payment methods
npm run test:user-isolation      # Test user isolation
npm run create:test-payment      # Create test payment

# Environment & Deployment
npm run env:check               # Check environment status
npm run deploy:check           # Pre-deployment checklist
npm run docs:procedures        # View deployment docs
npm run docs:environment       # View environment rules
npm run docs:git              # View Git workflow
```

### Initial Login Credentials

**Super Admin Account:**
- **Email**: `admin@pxvpay.com`
- **Password**: `admin123456`
- **Role**: `super_admin`

### Default Data Included

The seed script creates:
- ✅ **10 Countries**: US, CA, GB, NG, KE, GH, ZA, DE, FR, JP
- ✅ **9 Currencies**: USD, EUR, GBP, NGN, KES, ZAR, GHS, JPY, CAD
- ✅ **5 Payment Methods**: Bank Transfer, Mobile Money, Crypto, PayPal, Stripe

---

## 🏗️ Architecture & Features

### Frontend Architecture (Next.js 15)

```
src/
├── app/                    # Next.js App Router
│   ├── (admin)/           # Admin dashboard pages
│   ├── (auth)/            # Authentication pages
│   ├── api/               # API routes
│   ├── c/                 # Public checkout pages
│   ├── m/                 # Mobile-specific pages
│   └── features/          # Feature landing pages
├── components/            # React components
│   ├── admin/            # Admin-specific components
│   ├── analytics/        # Analytics dashboard
│   ├── checkout/         # Checkout form components
│   ├── dashboard/        # Dashboard widgets
│   ├── forms/            # Form components
│   ├── landing/          # Landing page components
│   ├── mobile/           # Mobile components
│   └── ui/               # shadcn/ui components (37 components)
├── lib/                  # Utility libraries
│   ├── actions/          # Server actions
│   ├── store/            # Zustand state management
│   ├── supabase/         # Supabase clients
│   └── utils/            # Helper functions
└── types/                # TypeScript type definitions
```

### Backend Architecture (Supabase)

**Core Tables:**
- `users` - User management with RLS
- `checkout_links` - Payment link generation
- `transactions` - Payment processing
- `payment_methods` - Payment configuration
- `countries` & `currencies` - Global data
- `products` & `product_templates` - Product management
- `themes` - Checkout customization
- `blog_posts` - Content management
- `support_tickets` - Customer support

**Storage Buckets:**
- `payment-proofs` (private) - Payment verification files
- `merchant-logos` (public) - Brand assets
- `user-avatars` (public) - Profile pictures
- `blog-images` (public) - Content media
- `product-images` (public) - Product photos
- `checkout-assets` (public) - Checkout customization
- `theme-assets` (public) - Theme resources
- `payment-method-icons` (public) - Payment method icons

### Key Features Implemented

1. **Multi-Role Dashboard System**
   - Super Admin: Full platform management
   - Merchant: Payment processing & analytics

2. **Payment Processing**
   - Global payment methods (manual & automated)
   - Proof of payment uploads
   - Real-time verification
   - Transaction analytics

3. **Checkout System**
   - Simple checkout links
   - Product-based checkout
   - Theme customization
   - Mobile-optimized pages

4. **Analytics Dashboard**
   - Real-time payment tracking
   - Geographic insights
   - Payment method analytics
   - Revenue reporting

5. **Content Management**
   - Blog system with rich editor
   - Media management
   - SEO optimization

6. **Support System**
   - Ticket management
   - Admin conversation tools
   - Status tracking

---

## 🚢 Production Deployment

### Option A: Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel

# Set environment variables in Vercel dashboard
# Configure production Supabase project
```

### Option B: Self-Hosted

```bash
# Build the application
npm run build

# Start production server
npm run start

# Configure reverse proxy (nginx/apache)
# Set up SSL certificates
# Configure domain DNS
```

### Production Environment Variables

```env
# Production Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_key

# Production Database
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:5432/postgres

# Application Settings
NODE_ENV=production
APP_ENV=production
NEXT_PUBLIC_APP_URL=https://yourdomain.com

# Email Configuration (Required for production)
SENDGRID_API_KEY=your_sendgrid_api_key
FROM_EMAIL=noreply@yourdomain.com

# Analytics (Optional)
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
```

---

## 🔧 Troubleshooting

### Common Issues & Solutions

#### 1. Database Connection Issues
```bash
# Check Supabase status
supabase status

# Reset local database
supabase db reset

# Check environment variables
cat .env.local
```

#### 2. Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check TypeScript errors
npm run lint
```

#### 3. Authentication Issues
```bash
# Verify Supabase keys in .env.local
# Check if RLS policies are properly set
# Ensure auth.users table has admin user
```

#### 4. Storage Issues
```bash
# Verify storage buckets exist
# Check bucket policies in Supabase dashboard
# Ensure proper file upload permissions
```

### Performance Optimization

```bash
# Analyze bundle size
npm run build
npx @next/bundle-analyzer

# Optimize images
# Use next/image component
# Implement proper caching headers
```

---

## 📚 Additional Resources

### Documentation Files in Repository
- `README.md` - Basic setup instructions
- `PROJECT-SUMMARY.md` - Quick start guide
- `CHECKOUT_SYSTEM_SPECIFICATION.md` - Checkout system details
- `PAYMENT_METHODS_README.md` - Payment methods implementation
- `DEPLOYMENT_SUMMARY.md` - Deployment information
- `RESTORATION_SUCCESS_SUMMARY.md` - Database restoration guide

### API Documentation
- Admin API endpoints: `/api/admin/*`
- Checkout API endpoints: `/api/checkout/*`
- Public API endpoints: `/api/public/*`

### Database Schema
- View full schema: `supabase/migrations/`
- Seed data: `supabase/seed.sql`

### Component Library
- shadcn/ui components: `src/components/ui/`
- Custom components: `src/components/`

---

## 🎯 Quick Verification Checklist

After setup, verify these work:

```bash
# ✅ Application starts
npm run dev

# ✅ Database connects
npm run supabase:status

# ✅ Admin login works
# Visit: http://localhost:3000
# Login: admin@pxvpay.com / admin123456

# ✅ Checkout works
# Visit: http://localhost:3000/c/test-checkout

# ✅ API endpoints respond
curl http://localhost:3000/api/health

# ✅ File uploads work
# Test in admin dashboard

# ✅ Email notifications work (if configured)
# Test payment submission
```

---

## 🔐 Security Considerations

### Row Level Security (RLS)
- All tables have proper RLS policies
- User data isolation enforced
- Admin access properly scoped

### Environment Security
- Never commit `.env.local` to Git
- Use strong passwords for production
- Implement proper CORS settings
- Enable SSL in production

### File Upload Security
- Storage buckets have proper policies
- File type validation implemented
- Size limits enforced

---

## 📊 Monitoring & Analytics

### Application Monitoring
- Built-in analytics dashboard
- Real-time user tracking
- Payment success rates
- Geographic insights

### Error Tracking
- Console logging in development
- Production error monitoring (add Sentry)
- Database query monitoring

---

## 🤝 Support & Maintenance

### Regular Maintenance Tasks
```bash
# Update dependencies monthly
npm update

# Backup database regularly
npm run backup

# Monitor performance
npm run deploy:check

# Update Supabase migrations
supabase db pull
```

### Getting Help
- Check troubleshooting section above
- Review documentation files
- Check Supabase dashboard for errors
- Review application logs

---

**🎉 Congratulations!** Your PXV Pay application should now be fully operational. This comprehensive setup ensures all features work correctly and the database is properly configured with all necessary data.

For any issues, refer to the troubleshooting section or check the additional documentation files in the repository. 