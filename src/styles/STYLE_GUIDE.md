
# Project Style Guide

## Colors and Theme

Our project uses a carefully curated color system defined in `tailwind.config.ts`:

### Base Colors
- Background: `--background: 0 0% 100%` (Pure White)
- Foreground: `--foreground: 220 14% 10%` (Dark Gray/almost black)
- Primary: `--primary: 220 70% 30%` (Blue-800)
- Secondary: `--secondary: 210 40% 96.1%` (Light Gray/off-white)

### Semantic Colors
- Card: White background with subtle shadow
- Popover: White with higher elevation shadow
- Muted: Light gray (`220 14% 95%`) for less prominent elements
- Accent: Light blue (`218 60% 65%`) for hover states and selected items
- Border: Very light gray (`220 14% 95%`, neutral-100)
- Success: Green (`145 65% 30%`, emerald-700)

## Typography

### Font Family
- Primary font: Inter
- Import: `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap')`
- System fallback: system-ui, sans-serif

### Text Sizes
- Base Font Size: 14px (`text-sm`/`text-base`)
- Headings:
  - H1: 24px (`text-2xl`) with line height 1.2
  - H2: 18px (`text-xl`) with line height 1.3
  - H3: 16px (`text-lg`) with line height 1.3
- Body: 14px with line height 1.5

### Font Weights
- Regular: 400
- Medium: 500 (used for most text)
- Semibold: 600 (headings, buttons)

## Layout and Spacing

### Base Grid
- 8px unit (`spacing-2`)

### Spacing Scale
- Item Spacing: 16px (`spacing-4`) between related elements
- Section Spacing: 32px (`spacing-8`) between major sections
- Page Padding: 24px (`spacing-6`)

### Container Width
- Maximum Content Width: 1243px centered
- Responsive padding: 1.5rem (24px)

### Grid System
Use Tailwind's grid utilities:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

## Components

### Sidebar
- Width: 240px
- Light background: neutral-50
- Navigation items with 12px vertical padding
- Icons left-aligned with text

### Buttons
- Border Radius: 8px
- Primary: Blue background (blue-800), white text
  ```tsx
  <Button variant="default">Primary Action</Button>
  // or custom class
  <button className="btn-primary">Primary Action</button>
  ```
- Secondary: White background, grey border, dark text
  ```tsx
  <Button variant="secondary">Secondary Action</Button>
  // or custom class
  <button className="btn-secondary">Secondary Action</button>
  ```
- Font Weight: 500 or 600
- Padding: 8px 16px

### Search Fields
```tsx
<div className="search-field">
  <SearchIcon className="w-4 h-4 mr-2" />
  <input type="text" placeholder="Search..." className="bg-transparent outline-none flex-1" />
  <span className="text-xs text-neutral-400">⌘K</span>
</div>
```

### Cards
```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content here</CardContent>
</Card>
```

## Interactive Elements

### Transitions
- Default duration: 150-200ms
- Easing: ease-out
- Use for: hover states, focus states, showing/hiding elements

```tsx
// Example transition
<div className="transition-colors duration-150 ease-out">
```

### Hover States
- Subtle background change (2-3% darker)
- Primary buttons: slightly darker blue
- Secondary buttons: light gray background

### Active/Selected States
- Navigation items: Light blue background
- Buttons: Slightly darker than hover state

## Animations

### Pre-built Animations
- Accordion animations
- Fade in/out
- Scale in/out
- Slide animations

## Custom Classes

### Common Utility Classes
```css
.section-header {
  @apply text-lg font-medium text-neutral-900 mb-4;
}

.input-label {
  @apply text-sm font-medium text-muted-foreground mb-1 block;
}

.btn-primary {
  @apply bg-primary text-primary-foreground font-medium rounded-lg px-4 py-2 hover:bg-primary/90 transition-colors duration-150;
}

.btn-secondary {
  @apply bg-white border border-neutral-200 text-neutral-900 font-medium rounded-lg px-4 py-2 hover:bg-neutral-50 transition-colors duration-150;
}

.search-field {
  @apply bg-neutral-100 rounded-lg px-3 py-2 text-sm flex items-center border border-transparent focus-within:border-neutral-200 transition-colors duration-150;
}
```

## Best Practices

1. **Use Tailwind First**
   - Prefer Tailwind utility classes over custom CSS
   - Use component variants for consistent styling

2. **Responsive Design**
   - Mobile-first approach
   - Use Tailwind breakpoint prefixes: `sm:`, `md:`, `lg:`
   - Sidebar collapses to icon-only or hidden menu on smaller screens

3. **Accessibility**
   - Maintain color contrast ratios
   - Use semantic HTML elements
   - Include focus states for interactive elements

4. **Component Organization**
   - Keep components small and focused
   - Use composition over inheritance
   - Maintain consistent naming conventions

5. **Icon Usage**
   - Line style (outlined)
   - Size: 20px for navigation, 16px for inline
   - Color matches text they accompany
   - Use from Lucide React library

6. **Shadow Usage**
   - Cards: `shadow-sm`
   - Dropdowns/Popovers: `shadow-md`
   - Modals: `shadow-lg`

## File Structure

```
src/
  ├── styles/
  │   ├── index.css       # Global styles
  │   └── STYLE_GUIDE.md  # This document
  ├── components/
  │   └── ui/            # Reusable UI components
  └── tailwind.config.ts # Theme configuration
```

## Code Examples

### Basic Layout Structure
```tsx
<div className="container mx-auto px-6">
  <main className="py-8">
    <section className="space-y-8">
      <h1 className="text-2xl font-semibold leading-tight">Page Title</h1>
      <div className="grid gap-4">
        {/* Content */}
      </div>
    </section>
  </main>
</div>
```

### Form Elements
```tsx
<div className="space-y-4">
  <div className="space-y-2">
    <Label htmlFor="name" className="text-sm font-medium">Name</Label>
    <Input id="name" placeholder="Enter your name" className="rounded-lg" />
  </div>
  <Button type="submit" className="font-medium">Submit</Button>
</div>
```

Remember to consult this guide when creating new components or modifying existing ones to maintain consistency across the project.
