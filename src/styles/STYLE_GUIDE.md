
# Project Style Guide

## Colors and Theme

Our project uses a carefully curated HSL color system defined in `tailwind.config.ts`:

### Base Colors
- Background: `--background: 0 0% 100%` (White)
- Foreground: `--foreground: 240 10% 3.9%` (Dark Gray)
- Primary: `--primary: 240 5.9% 10%` (Dark Gray)
- Secondary: `--secondary: 240 4.8% 95.9%` (Light Gray)

### Semantic Colors
- Card: White background with subtle shadow
- Popover: White with higher elevation shadow
- Muted: Light gray for less prominent elements
- Accent: Light gray for highlighted elements
- Border: Soft gray (`240 5.9% 90%`)

## Typography

### Font Family
- Primary font: Inter
- Import: `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap')`
- Weights used: 300 (light), 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Text Sizes
Use Tailwind's built-in size classes:
- Headings: `text-2xl`, `text-xl`, `text-lg`
- Body: `text-base`, `text-sm`
- Small text: `text-xs`

## Components

### Buttons
```tsx
// Primary button
<Button variant="default">Primary Action</Button>

// Secondary button
<Button variant="secondary">Secondary Action</Button>

// Outline button
<Button variant="outline">Outline Action</Button>
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

## Layout and Spacing

### Container Width
- Max width: 1280px
- Centered with auto margins
- Responsive padding: 1rem (16px)

### Spacing Scale
Use Tailwind's spacing utilities:
- `space-y-4` for vertical spacing
- `space-x-4` for horizontal spacing
- `gap-4` for grid/flex gaps

### Grid System
Use Tailwind's grid utilities:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

## Animations

### Transitions
- Default duration: 200ms
- Easing: ease-out
- Use for: hover states, focus states, showing/hiding elements

```tsx
// Example transition
<div className="transition-colors duration-200 ease-out">
```

### Pre-built Animations
- Accordion animations
- Fade in/out
- Scale in/out
- Slide animations

## Custom Classes

### Common Utility Classes
```css
.section-header {
  @apply text-lg font-medium text-gray-800 mb-4;
}

.input-label {
  @apply text-sm font-medium text-muted-foreground mb-1 block;
}

.confidence-badge {
  @apply inline-flex items-center text-xs font-medium px-2 py-1 rounded-full;
}
```

## Best Practices

1. **Use Tailwind First**
   - Prefer Tailwind utility classes over custom CSS
   - Use component variants for consistent styling

2. **Responsive Design**
   - Mobile-first approach
   - Use Tailwind breakpoint prefixes: `sm:`, `md:`, `lg:`
   - Test all components at different viewport sizes

3. **Accessibility**
   - Maintain color contrast ratios
   - Use semantic HTML elements
   - Include focus states for interactive elements

4. **Component Organization**
   - Keep components small and focused
   - Use composition over inheritance
   - Maintain consistent naming conventions

5. **State Styles**
   - Hover: subtle color changes
   - Focus: visible ring with offset
   - Active: slight color darkening
   - Disabled: reduced opacity

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
<div className="container mx-auto px-4">
  <main className="py-8">
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Page Title</h1>
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
    <Label htmlFor="name">Name</Label>
    <Input id="name" placeholder="Enter your name" />
  </div>
  <Button type="submit">Submit</Button>
</div>
```

Remember to consult this guide when creating new components or modifying existing ones to maintain consistency across the project.
