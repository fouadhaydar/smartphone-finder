# Overview

This project is a **Smartphone Finder** application that helps users discover the perfect smartphone through a guided wizard interface. The application uses a step-by-step approach to collect user preferences including platform choice (iOS/Android), brand preferences, budget constraints, use cases, feature priorities, and advanced filters. Based on these inputs, it provides personalized smartphone recommendations with detailed specifications and match reasons.

The application features a modern React frontend with shadcn/ui components, an Express.js backend API, and uses Drizzle ORM for database operations with PostgreSQL via Neon Database.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Library**: shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling
- **State Management**: React hooks with localStorage persistence for wizard state
- **Routing**: Wouter for lightweight client-side routing
- **Data Fetching**: TanStack Query (React Query) for server state management
- **Form Handling**: React Hook Form with Zod validation

## Backend Architecture
- **Framework**: Express.js with TypeScript running on Node.js
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **API Design**: RESTful endpoints following conventional patterns
- **Validation**: Zod schemas shared between frontend and backend
- **Development**: Hot reload with Vite integration for full-stack development

## Data Storage Solutions
- **Primary Database**: PostgreSQL via Neon Database serverless platform
- **Schema Management**: Drizzle Kit for migrations and schema management
- **In-Memory Storage**: Fallback MemStorage class for development/testing
- **Client Storage**: localStorage for wizard state persistence across sessions

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL connection driver
- **drizzle-orm** & **drizzle-kit**: Type-safe database ORM and migration toolkit
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight routing library for React
- **zod**: Runtime type validation and schema definition
- **tailwindcss**: Utility-first CSS framework

### UI Component Libraries
- **@radix-ui/react-***: Comprehensive collection of unstyled, accessible UI primitives
- **lucide-react**: Icon library with consistent design
- **class-variance-authority**: Utility for creating component variants
- **tailwind-merge**: Intelligent Tailwind CSS class merging

### Development Tools
- **vite**: Fast build tool with HMR support
- **typescript**: Static type checking
- **@replit/vite-plugin-***: Replit-specific development enhancements
- **esbuild**: Fast JavaScript bundler for production builds

### Validation and Forms
- **react-hook-form**: Performant form library with minimal re-renders
- **@hookform/resolvers**: Validation resolver for Zod schemas
- **drizzle-zod**: Automatic Zod schema generation from Drizzle schemas

The application uses a wizard-based UX pattern with six main steps: platform selection, brand preferences, budget setting, use case identification, priority ranking, and advanced filtering. Each step dynamically updates the result count and maintains state consistency through the wizard flow.