# Overview

This is a fitness and physiotherapy booking platform built as a single-page, mobile-responsive landing site. The application connects users with certified physiotherapist-trainers for safe, personalized strength and mobility training at home. The platform features a modern, clean design with a focus on trust, safety, and conversion optimization.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript for type safety and developer experience
- **Routing**: Wouter for lightweight client-side routing
- **UI Framework**: shadcn/ui components built on top of Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with custom design system variables for consistent theming
- **State Management**: TanStack Query for server state management and caching
- **Build Tool**: Vite for fast development and optimized production builds

## Design System
- **Color Palette**: Custom CSS variables defining primary teal (#3FB6A8), secondary sky blue (#4FA3D1), accent coral (#FF6F61), off-white background (#FAFAFA), and charcoal text (#333333)
- **Typography**: Inter font family for modern, readable typography
- **Component Library**: Comprehensive UI component system with consistent styling and accessibility features
- **Responsive Design**: Mobile-first approach with Tailwind's responsive utilities

## Backend Architecture
- **Runtime**: Node.js with Express.js server framework
- **Language**: TypeScript for full-stack type safety
- **Data Storage**: In-memory storage with interface for easy database migration
- **API Design**: RESTful endpoints with proper error handling and validation
- **Schema Validation**: Zod for runtime type checking and validation

## Page Structure
- **Single Page Application**: Organized into anchored sections (Hero, Problem, Benefits, Solution, How It Works, Differentiators, Trust, FAQ, Final CTA)
- **Navigation**: Sticky navigation with smooth scrolling to sections
- **Email Capture**: Multiple conversion points with duplicate forms for maximum lead generation
- **Micro-interactions**: Scroll-triggered animations and hover effects for enhanced user experience

## Data Management
- **Email Subscriptions**: Simple schema with email validation and duplicate prevention
- **Type Safety**: Shared schema definitions between frontend and backend using Drizzle ORM and Zod
- **Form Handling**: React Hook Form with resolver validation for optimal user experience

## Accessibility Features
- **ARIA Labels**: Proper semantic markup and ARIA attributes throughout
- **Keyboard Navigation**: Full keyboard accessibility support
- **Focus Management**: Visible focus states and logical tab order
- **Screen Reader Support**: Descriptive alt text and semantic HTML structure

# External Dependencies

## Core Dependencies
- **React**: Frontend framework with hooks and modern patterns
- **Express.js**: Backend web application framework
- **TypeScript**: Static typing for both frontend and backend
- **Vite**: Build tool and development server

## UI and Styling
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **Radix UI**: Accessible component primitives for complex UI elements
- **Lucide React**: Icon library for consistent iconography
- **shadcn/ui**: Pre-built component library with customizable design system

## Data and State Management
- **TanStack Query**: Server state management, caching, and synchronization
- **React Hook Form**: Form state management with validation
- **Zod**: Schema validation and type inference
- **Drizzle ORM**: Type-safe SQL ORM with PostgreSQL support

## Database
- **PostgreSQL**: Primary database (configured but using in-memory storage currently)
- **Neon Database**: Serverless PostgreSQL provider for production deployment
- **Drizzle Kit**: Database migration and schema management tools

## Development Tools
- **Wouter**: Lightweight routing library
- **class-variance-authority**: Utility for creating variant-based component APIs
- **clsx & tailwind-merge**: Conditional className utilities
- **Date-fns**: Date manipulation and formatting utilities

## Replit Integration
- **Cartographer**: Development tooling for Replit environment
- **Runtime Error Overlay**: Enhanced error reporting during development