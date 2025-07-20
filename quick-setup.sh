#!/bin/bash

# 🚀 PXV Pay - Quick Setup Script
# This script automates the setup process for running PXV Pay on a new computer

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "\n${BLUE}============================================${NC}"
    echo -e "${BLUE} $1 ${NC}"
    echo -e "${BLUE}============================================${NC}\n"
}

# Check if running in the correct directory
check_directory() {
    if [[ ! -f "package.json" ]]; then
        print_error "package.json not found. Please run this script from the pxv-pay directory."
        exit 1
    fi
    
    if [[ ! -d "supabase" ]]; then
        print_error "supabase directory not found. Please ensure you're in the correct project directory."
        exit 1
    fi
    
    print_success "Directory check passed"
}

# Check system requirements
check_requirements() {
    print_header "Checking System Requirements"
    
    # Check Node.js
    if command -v node &> /dev/null; then
        node_version=$(node --version)
        print_success "Node.js is installed: $node_version"
    else
        print_error "Node.js is not installed. Please install Node.js 18.17.0+ and try again."
        exit 1
    fi
    
    # Check npm
    if command -v npm &> /dev/null; then
        npm_version=$(npm --version)
        print_success "npm is installed: $npm_version"
    else
        print_error "npm is not installed. Please install npm and try again."
        exit 1
    fi
    
    # Check Docker
    if command -v docker &> /dev/null; then
        print_success "Docker is installed"
    else
        print_warning "Docker is not installed. You'll need Docker for local Supabase development."
        read -p "Continue anyway? (y/n): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi
    
    # Check Supabase CLI
    if command -v supabase &> /dev/null; then
        supabase_version=$(supabase --version)
        print_success "Supabase CLI is installed: $supabase_version"
    else
        print_warning "Supabase CLI is not installed."
        read -p "Install Supabase CLI now? (y/n): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            npm install -g supabase@latest
            print_success "Supabase CLI installed"
        else
            print_error "Supabase CLI is required. Please install it manually: npm install -g supabase@latest"
            exit 1
        fi
    fi
}

# Install dependencies
install_dependencies() {
    print_header "Installing Dependencies"
    
    print_status "Installing npm dependencies..."
    npm install
    print_success "Dependencies installed successfully"
}

# Setup environment file
setup_environment() {
    print_header "Setting Up Environment"
    
    if [[ -f ".env.local" ]]; then
        print_warning ".env.local already exists"
        read -p "Overwrite existing .env.local? (y/n): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            print_status "Skipping environment setup"
            return
        fi
    fi
    
    if [[ -f "environment-template.env" ]]; then
        cp environment-template.env .env.local
        print_success "Created .env.local from template"
        print_warning "Please edit .env.local and add your Supabase credentials"
    else
        # Create basic .env.local if template doesn't exist
        cat > .env.local << EOF
# PXV Pay Environment Configuration
# Add your actual values below

# Supabase Configuration (REQUIRED)
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Database Connection (for local development)
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:54322/postgres

# Application Configuration
NODE_ENV=development
APP_ENV=local
NEXT_PORT=3000

# Optional: Email Configuration
SENDGRID_API_KEY=your_sendgrid_api_key
FROM_EMAIL=noreply@yourapp.com
EOF
        print_success "Created basic .env.local file"
        print_warning "Please edit .env.local and add your Supabase credentials"
    fi
}

# Setup local Supabase
setup_supabase() {
    print_header "Setting Up Local Supabase"
    
    print_status "Initializing Supabase..."
    
    # Check if supabase is already initialized
    if [[ -f "supabase/config.toml" ]]; then
        print_success "Supabase already initialized"
    else
        supabase init
        print_success "Supabase initialized"
    fi
    
    print_status "Starting Supabase services..."
    supabase start
    
    if [[ $? -eq 0 ]]; then
        print_success "Supabase services started successfully"
        print_status "Getting Supabase credentials..."
        
        # Get the status and extract URLs and keys
        supabase status
        
        print_warning "Please copy the API URL and anon key from above to your .env.local file"
        print_warning "Update these lines in .env.local:"
        echo "NEXT_PUBLIC_SUPABASE_URL=<API URL from above>"
        echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key from above>"
        echo "SUPABASE_SERVICE_ROLE_KEY=<service_role key from above>"
    else
        print_error "Failed to start Supabase services"
        exit 1
    fi
}

# Apply database migrations
apply_migrations() {
    print_header "Applying Database Migrations"
    
    print_status "Resetting database with migrations..."
    supabase db reset
    
    if [[ $? -eq 0 ]]; then
        print_success "Database migrations applied successfully"
        print_success "Database includes:"
        echo "  ✅ User management system"
        echo "  ✅ Payment processing tables"
        echo "  ✅ Checkout system"
        echo "  ✅ Analytics tables"
        echo "  ✅ Blog system"
        echo "  ✅ Support system"
        echo "  ✅ Storage buckets"
        echo "  ✅ Sample data (countries, currencies, payment methods)"
    else
        print_error "Failed to apply database migrations"
        exit 1
    fi
}

# Final verification
verify_setup() {
    print_header "Verifying Setup"
    
    # Check if .env.local has been configured
    if grep -q "your_supabase_project_url_here" .env.local 2>/dev/null; then
        print_warning ".env.local still contains template values"
        print_warning "Please update .env.local with your actual Supabase credentials"
    fi
    
    # Try to build the project
    print_status "Testing build..."
    npm run build
    
    if [[ $? -eq 0 ]]; then
        print_success "Build test passed"
    else
        print_error "Build test failed. Please check your configuration."
        exit 1
    fi
}

# Main execution
main() {
    print_header "PXV Pay Quick Setup Script"
    print_status "This script will set up PXV Pay for local development"
    
    check_directory
    check_requirements
    install_dependencies
    setup_environment
    
    read -p "Set up local Supabase? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        setup_supabase
        apply_migrations
    else
        print_warning "Skipping Supabase setup. You'll need to configure it manually."
    fi
    
    verify_setup
    
    print_header "Setup Complete!"
    print_success "PXV Pay has been set up successfully!"
    
    echo -e "\n${GREEN}Next Steps:${NC}"
    echo "1. Update .env.local with your Supabase credentials (if not done already)"
    echo "2. Start the development server: npm run dev"
    echo "3. Visit http://localhost:3000"
    echo "4. Login with: admin@pxvpay.com / admin123456"
    
    echo -e "\n${BLUE}Available Commands:${NC}"
    echo "npm run dev              # Start development server"
    echo "npm run supabase:start   # Start Supabase services"
    echo "npm run supabase:stop    # Stop Supabase services"
    echo "npm run supabase:status  # Check Supabase status"
    echo "npm run backup          # Create backup"
    
    echo -e "\n${BLUE}Important URLs:${NC}"
    echo "Application: http://localhost:3000"
    echo "Supabase Studio: http://localhost:54323"
    echo "Email Testing: http://localhost:54324"
    
    echo -e "\n${YELLOW}Documentation:${NC}"
    echo "Full setup guide: COMPREHENSIVE_SETUP_GUIDE.md"
    echo "Project summary: PROJECT-SUMMARY.md"
    echo "README: README.md"
}

# Run the main function
main "$@" 