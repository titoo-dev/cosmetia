# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Cosmetia** is a B2B marketplace for the cosmetic industry, connecting buyers (acheteurs) and suppliers (fournisseurs) for raw materials and chemical products. The platform includes AI-assisted ordering, lead management, messaging, and a subscription-based monetization model.

## Technologies

- **Framework**: Next.js 15 with App Router, TypeScript, Server Actions
- **UI Library**: Shadcn UI + Tailwind CSS 4
- **Icons**: Lucide Icons
- **State Management**: TanStack React Query
- **Forms**: Zod for validation, React transitions and useActionState
- **Fonts**: Space Grotesk & Plus Jakarta Sans (16px base)
- **Styling**: Tailwind CSS with custom color scheme

## Development Commands

```bash
# Development server with Turbopack
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
```

## Architecture & Structure

### User Roles (Multi-tenant Architecture)

The application is organized around 4 distinct user roles:

- **U1 - Fournisseurs (Suppliers)**: Product catalog management, lead tracking, quotes, statistics
- **U2 - Acheteurs (Customers)**: Marketplace browsing, multi-product quotes, AI-assisted ordering
- **U3 - Admin**: Account management, KYC validation, lead distribution, support
- **U4 - Prestataires (Providers)**: Order validation and management

### Directory Structure

```
src/
├── actions/              # Next.js Server Actions organized by role
│   ├── customer/         # Customer-specific actions
│   ├── supplier/         # Supplier-specific actions
│   ├── provider/         # Provider-specific actions
│   └── *.ts             # Shared actions (auth, user)
├── app/                  # Next.js App Router pages
│   ├── (public)/        # Public route group (marketplace, suppliers)
│   ├── customer/        # Customer dashboard routes
│   ├── supplier/        # Supplier dashboard routes
│   ├── provider/        # Provider dashboard routes
│   └── layout.tsx       # Root layout
├── components/
│   ├── ui/              # Shadcn UI components
│   ├── auth/            # Authentication components
│   ├── landing/         # Landing page components
│   └── *.tsx            # Shared components (header, footer, navigation)
└── lib/
    ├── types/           # TypeScript type definitions
    ├── cookies-storage.ts  # Server-side auth token management
    └── utils.ts         # Utility functions
```

### Server Actions Pattern

Server Actions are the primary method for data fetching and mutations. They are organized by:
1. **User role** (customer/, supplier/, provider/)
2. **Feature area** (orders/, products/, profile/, register/)
3. **Specific operation** (get-*, create-*, update-*, delete-*)

Example: `src/actions/supplier/products/get-supplier-products-action.ts`

All actions follow this pattern:
- Use `'use server'` directive
- Accept typed parameters or FormData
- Return typed responses with error handling
- Use `getAccessToken()` from cookies-storage for authenticated requests
- Make REST API calls to backend (API_BASE_URL environment variable)

### Authentication

- Token-based authentication using httpOnly cookies
- Server-side token management in `lib/cookies-storage.ts`
- Automatic token refresh mechanism
- Access token (15min) + Refresh token (7 days)
- User fetching via `getCurrentUserAction()` which loads role-specific data

### Forms Implementation

All forms must follow these rules:
- Use React `useActionState` hook with Server Actions
- Use React `useTransition` for pending states
- Validate with Zod schemas
- Use reusable Shadcn UI form components
- Handle error states from server actions

### Data Model

Key entities (defined in `src/lib/types/types.ts`):
- **UserEntity**: Base user with role (SUPPLIER, CUSTOMER, ADMIN, PROVIDER)
- **SupplierUserEntity**: Company info, products, documents, subscription plan
- **CustomerUserEntity**: Company info, orders, favorites
- **ProductEntity**: Name, INCI name, certificates, categories, functions, countries
- **DocumentEntity**: Technical sheets and files linked to products
- **OrderEntity**: Multi-item orders with formula, packaging, provider assignment
- **LeadEntity**: Tracks customer interactions (profile visits, product views)

### Route Organization

- **Public routes**: `(public)` route group for marketplace and supplier listings
- **Role-based routes**: `/customer/*`, `/supplier/*`, `/provider/*` for dashboards
- **Registration flows**: Multi-step registration with email verification (`/register`, `/register/verify`, `/register/last-step`)

### Client/Server Component Pattern

- Use Server Components by default for data fetching
- Client Components suffixed with `-client.tsx` for interactivity
- Loading states with `loading.tsx` convention
- Server Actions called from Client Components for mutations

## Design System

### Color Palette
- Primary: `#166970`
- Text: `#000000`
- Icon: `#GFFBBF`
- Background: `#FFFFFF`
- Background2: `#F7F4EF`

### Component Guidelines
- Always use Shadcn UI or Origin UI components
- All components must be reusable and responsive
- Follow Shadcn UI guidelines for accessibility
- Use Lucide Icons exclusively

## Coding Rules

### Backward Compatibility
- Preserve compatibility with previous versions
- No breaking changes without clear migration plan

### Performance
- Optimize for SSR/SSG with Next.js best practices
- Lazy load heavy components
- Use Server Components where possible

### Code Organization
- Separate business logic from presentation
- Keep server actions in `src/actions/` mirroring route structure
- Comments should be clear and concise
- Always prefer Server Actions over API routes

### API Integration

Backend API base URL is configured via `API_BASE_URL` environment variable. All authenticated requests require Bearer token from `getAccessToken()`.

Example API patterns:
- Authentication: `/auth/signUp`, `/auth/signIn`, `/auth/refreshToken`
- User data: `/user`, `/customer/customer`, `/supplier/supplier`
- Resources: `/supplier/products`, `/customer/orders`

## MVP Feature Scope

### Supplier (U1) Features
- Lead dashboard with CSV/Excel export
- Quote management and validation workflow
- Product catalog (images, docs, logistics, certifications)
- Statistics: leads, conversion, geographic CTR
- Profile and subscription management
- Private messaging + AI chat

### Customer (U2) Features
- Product/document marketplace with search and filters
- Supplier directory with geographic filters
- Multi-product quote requests
- AI-assisted 6-step ordering process
- Product and document favorites
- Private messaging + AI chat

### Admin (U3) Features
- Supplier KYC validation
- Customer management
- Lead distribution
- Subscription management
- Customer support

### Provider (U4) Features
- Order validation/rejection interface
- Profile management