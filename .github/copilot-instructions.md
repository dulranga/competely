# Project: Competely

## 1. Overview

Competely is a centralized web platform designed to revolutionize the student competition landscape. It serves as:

- **Discovery Engine**: A hub for delegates to find, track, and register for competitions tailored to their skills.
- **Management Ecosystem**: Tools for organizers to execute events with professional workflows, bulk communications, and remote judging.

## 2. Problem Statement

The university competition ecosystem is fragmented. Delegates struggle to find relevant competitions, while organizers (OCs) find it difficult to market events and reach the right talent pool. Competely bridges this "Discovery & Connection" gap.

## 3. Tech Stack

- **Framework**: Next.js 15 (App Router, Turbopack)
- **Authentication**: Better Auth
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS v4, Lucide React icons
- **UI Components**: Shadcn UI (Radix UI primitives)
- **Forms**: React Hook Form with Zod validation
- **Formatting/Linting**: Biome

## 4. Development Standards

- Use **Next.js 15 App Router** patterns (Server Components by default).
- Follow the **Hexagonal Architecture** or **Clean Architecture** as reflected in the project structure (split between logic, data access, and UI).
- Use **Biome** for linting and formatting instead of ESLint/Prettier.
- Adhere to the defined **Tailwind CSS v4** color scheme and custom oklch variables.
- Maintain **Access Control** using the system in `src/lib/access-control`.
- Use **Zod** for schema validation in both the database and forms.

## 5. UI/UX Guidelines

- Follow the earthy palette:
    - Primary: `#e5ab7d` (Warm sand)
    - Secondary: `#bcde8c` (Leaf green)
    - Accent: `#6dd594` (Mint green)
    - Background: `#fbf6f3` (Off-white)
    - Text: `#0c0803` (Dark charcoal)
- Support both Light and Dark modes using `next-themes` and Tailwind's `dark:` variant.
- Maintain a clean, professional "Management Ecosystem" feel for Organizers and a vibrant "Discovery Engine" for Delegates.
- **Minimalist Design**: Avoid bulky or "loud" UI elements. Maintain generous whitespace, subtle borders, and a refined, thin-line aesthetic.
- **Button Standards**: Never apply large inline utility classes for button styling. Always define and use `cva` variants in the base component. Keep buttons appropriately sized and consistent with the minimal theme.

## 6. Data Access Layer (DAL) — Strictly Enforced Separation

- **All** database queries, API calls to external services, S3 operations, queue interactions, etc. **must** live under `src/data-access/`.
- UI components and pages are **forbidden** from:
    - Using `fetch`, `ofetch`, or any direct HTTP calls.
    - Directly importing `db` from drizzle.
    - Accessing `localStorage`/`sessionStorage` for business logic data.
    - Containing raw SQL or query logic.
- DAL functions must:
    - Be pure, typed, and descriptively named (`getUserPowerPositions`, `createBrokerageTrade`, etc.).
    - Return fully typed objects (use drizzle’s inferred types when possible).
    - Normalize/transform data if the DB shape ≠ UI shape.

## 7. State Management

- Server state / async data → **React Query** (`useQuery`, `useMutation`, `queryClient`).
- Local component state → `useState` / `useReducer` only when truly local.
- Derived data → `useMemo`.
- Side effects → `useEffect` (keep minimal).
- Never duplicate data fetching logic between client and server components unless using `await` in Server Components.

## 8. General Coding Standards

- 100% TypeScript — no `any` (use `unknown` or generics if needed).
- Functional components + hooks only.
- Single responsibility per file/component.
- Composition > inheritance.
- Keep components small (<300 lines when possible).
- Favor explicit, readable code over clever one-liners.
- Prefer early returns and guard clauses.
- For logging, use the centralized winston logger from `src/lib/winston.ts`.

## 9. Project-Specific Conventions

- Don't create db migrations manually — always ask the user to do it.
- Logging → winston (configured centrally).
- Background jobs → better-queue + better-queue-memory.
- Charts → prefer Rechats for standard, Nivo for calendar/heatmap.

## 10. Form Handling & Data Entry (Custom Rules)

- **Standard Framework**: Use `react-hook-form` + `zod` + custom `Form` wrapper components.
- **Standard Fields**: Use `<Form.Item />` for standard inputs (`Input`, `Textarea`, `Checkbox`).
    ```tsx
    <Form.Item label={_(msg`Username`)} name="username">
        <Input />
    </Form.Item>
    ```
- **Complex Fields**: Use the standard `react-hook-form` `<Controller />` combined with `<Form.CustomController />`.
    - NEVER use `Form.CustomController` outside of a `Controller` render prop.
    - NEVER nest `Form.CustomController` inside `Form.Item`.
    - Pass `field` and `...props` from `render` to `Form.CustomController`.
    ```tsx
    <Controller
        name="role"
        control={form.control}
        render={({ field, ...props }) => (
            <Form.CustomController label={_(msg`Role`)} field={field} {...props}>
                <Select onValueChange={field.onChange} value={field.value}>
                    {/* ... */}
                </Select>
            </Form.CustomController>
        )}
    />
    ```
