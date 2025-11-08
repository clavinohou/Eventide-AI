# Marketing Landing Page Components

This document describes the reusable components built for the CAL-MGR marketing landing page.

## Component Overview

### 1. MarketingLayout (`components/MarketingLayout.tsx`)

A reusable layout component that wraps the entire marketing page, providing consistent structure with header and footer.

**Features:**
- Global background treatment
- Constrained section width via `container-max` utility
- Renders shared chrome (Header and Footer)
- Accepts `onCtaClick` callback for CTA button interactions

**Usage:**
```tsx
import MarketingLayout from '@/components/MarketingLayout';

<MarketingLayout onCtaClick={handleSignupClick}>
  {/* Page content */}
</MarketingLayout>
```

---

### 2. Header (`components/Header.tsx`)

Responsive, accessible navigation header with mobile menu support.

**Features:**
- Logo and wordmark with hover effects
- In-page smooth scroll navigation links:
  - Problem
  - Solution
  - Features
  - How It Works
  - FAQ
- Mobile hamburger menu with slide-in animation
- Sticky header with scroll-based backdrop blur effect
- Focus management for accessibility
- Proper ARIA labels and roles
- Automatic body scroll lock when mobile menu is open

**Props:**
- `onCtaClick?: () => void` - Callback for CTA button clicks

**Accessibility:**
- ARIA labels on all interactive elements
- Keyboard navigation support
- Focus visible states
- Semantic HTML with proper heading hierarchy
- Mobile menu announced to screen readers

---

### 3. Hero (`components/Hero.tsx`)

Modern, animated hero section with compelling value proposition and visual elements.

**Features:**
- Animated gradient mesh background (3 floating blobs)
- Subtle grid pattern overlay
- Social proof badge showing beta user count
- Gradient text treatment on main heading
- Feature highlights with icons
- Primary and secondary CTAs with icons
- Two-column responsive layout
- Animated phone mockup with floating cards
- Motion primitives using framer-motion:
  - Fade-in and slide-up animations
  - Staggered children animations
  - Progress bar animation
  - Infinite bounce scroll indicator

**Props:**
- `onSignupClick?: () => void` - Handler for beta signup CTA
- `onDemoClick?: () => void` - Handler for watch demo CTA

**Animation:**
- Container stagger: 0.15s between children
- Item fade/slide: 600ms with easeOut
- Image scale: 800ms with 400ms delay
- Respects `prefers-reduced-motion` for accessibility

**Visual Elements:**
- 3 animated gradient blobs (primary, secondary, accent)
- Floating event card with conflict status
- Floating AI processing card with progress bar
- Phone mockup with app UI preview
- Scroll indicator (desktop only)

---

### 4. Footer (`components/Footer.tsx`)

Marketing footer with links and social media.

**Features:**
- Four-column grid layout (Brand, Product, Company, Legal)
- Social media icons (Twitter, GitHub, LinkedIn)
- Automatic current year in copyright
- Responsive design (stacks on mobile)
- Hover states on all links
- External links with proper rel attributes

---

### 5. SignupModal (`components/SignupModal.tsx`)

Modal dialog for beta signup with form validation and success state.

**Features:**
- Backdrop blur and overlay
- Animated entrance/exit (framer-motion)
- Email input with validation
- Success state with animated checkmark
- Auto-closes 2 seconds after successful submission
- Click outside to close
- Escape key support (via backdrop click)
- Prevents page scroll when open

**Props:**
- `isOpen: boolean` - Controls modal visibility
- `onClose: () => void` - Callback when modal closes

---

### 6. Button (`components/Button.tsx`)

Reusable button component with multiple variants and sizes.

**Variants:**
- `primary` - Blue gradient background
- `secondary` - Gray background
- `outline` - Transparent with border
- `ghost` - Transparent, minimal

**Sizes:**
- `sm` - Small (px-3 py-1)
- `md` - Medium (px-4 py-2) - default
- `lg` - Large (px-6 py-3)

**Features:**
- Loading state with spinner
- Disabled state
- Focus ring for accessibility
- Forward ref support
- TypeScript typed

---

## Styling

### Global Styles (`app/globals.css`)

Custom animations:
- `@keyframes blob` - Organic floating animation for background blobs
- `.animate-blob` - 7s infinite blob animation
- `.animation-delay-2000` - 2s animation delay
- `.animation-delay-4000` - 4s animation delay

All animations respect `prefers-reduced-motion` media query.

### Tailwind Utilities

The project uses custom Tailwind utilities:
- `.container-max` - Max-width container with responsive padding
- `.btn-*` - Button variant classes
- `.text-display-*` - Display text sizes
- `.text-heading-*` - Heading text sizes

---

## Accessibility Features

All components follow WCAG 2.1 AA guidelines:

1. **Keyboard Navigation**
   - All interactive elements are keyboard accessible
   - Visible focus indicators
   - Logical tab order

2. **Screen Readers**
   - Proper ARIA labels and roles
   - Semantic HTML structure
   - Hidden decorative elements

3. **Motion**
   - Respects `prefers-reduced-motion`
   - All animations disabled when user prefers reduced motion

4. **Color Contrast**
   - All text meets WCAG AA contrast requirements
   - Interactive elements have sufficient contrast

5. **Focus Management**
   - Trapped focus in modal
   - Restored focus when modal closes
   - Smooth scroll with proper offset

---

## Performance

- All components are code-split via Next.js
- Framer-motion animations use GPU-accelerated transforms
- Images use proper aspect ratios to prevent layout shift
- Components use React best practices (memo, proper keys, etc.)

---

## Dependencies

- `framer-motion` - Animation library for motion primitives
- `next` - React framework
- `react` - UI library
- `tailwindcss` - Utility-first CSS

---

## Development

Run the development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Lint code:
```bash
npm run lint
```

---

## Future Enhancements

Potential improvements for future iterations:

1. Add video demo modal/player
2. Implement form backend integration for beta signups
3. Add more micro-interactions and hover effects
4. Create additional landing page variants (pricing, blog, etc.)
5. Add A/B testing capabilities
6. Implement analytics tracking
7. Add more sophisticated animation sequences
8. Create mobile app download badges
