# AI Rules & Project Guidelines

## Tech Stack
- **Framework**: TanStack Start (Full-stack React framework with SSR support).
- **Routing**: TanStack Router for type-safe, file-based routing.
- **State Management**: TanStack Query (React Query) for server state and data fetching.
- **Styling**: Tailwind CSS v4 for utility-first styling and modern CSS features.
- **UI Components**: shadcn/ui primitives built on Radix UI for accessible, customizable components.
- **Forms**: React Hook Form integrated with Zod for type-safe schema validation.
- **Icons**: Lucide React for a consistent and lightweight icon set.
- **Language**: TypeScript for end-to-end type safety across the entire application.
- **Deployment**: Optimized for Cloudflare Pages/Workers using the Vite Cloudflare plugin.

## Library Usage Rules

### 1. UI & Styling
- **Tailwind CSS**: Always use Tailwind classes for layout, spacing, and colors. Avoid writing custom CSS unless absolutely necessary (use `src/styles.css` for global animations/themes).
- **shadcn/ui**: Use existing components in `src/components/ui/`. If a new component is needed, follow the shadcn pattern.
- **Class Merging**: Always use the `cn()` utility from `src/lib/utils.ts` when conditionally applying Tailwind classes.
- **Icons**: Exclusively use `lucide-react`.

### 2. Routing & Navigation
- **Navigation**: Use the `Link` component from `@tanstack/react-router` for all internal navigation to maintain type safety.
- **Routes**: Follow the file-based routing convention in `src/routes/`. Use `createFileRoute` for page definitions.

### 3. Data Handling & Forms
- **Data Fetching**: Use TanStack Query hooks (`useQuery`, `useMutation`) for all asynchronous operations.
- **Validation**: Use `zod` to define schemas for API responses, form inputs, and environment variables.
- **Forms**: Use `react-hook-form` with the `@hookform/resolvers/zod` resolver for all form implementations.

### 4. Feedback & Notifications
- **Toasts**: Use `sonner` for all user feedback notifications (success, error, loading states).

### 5. Development Patterns
- **Type Safety**: Avoid using `any`. Leverage TanStack Router's generated types for params and search queries.
- **Components**: Keep components small and focused. Use the `src/components/` directory for shared logic and `src/pages/` (or route-specific files) for view logic.
- **Server Logic**: Use TanStack Start server functions or handlers for any logic that requires server-side execution.