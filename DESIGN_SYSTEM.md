# ScholarTrail Design System

*Based on the Canva presentation design and brand guidelines*

## Overview

This design system defines the visual language, components, and patterns for ScholarTrail's user interface. It ensures consistency across all touchpoints while maintaining the sophisticated, educational brand identity established in our presentation materials.

---

## 🎨 Color Palette

### Primary Colors
```css
/* Primary Purple Gradient */
--st-purple-light: #A78BFA;    /* rgb(167, 139, 250) */
--st-purple-main: #8B5CF6;     /* rgb(139, 92, 246) */
--st-purple-dark: #7C3AED;     /* rgb(124, 58, 237) */
--st-purple-deep: #6366F1;     /* rgb(99, 102, 241) */

/* Secondary Blue Accents */
--st-blue-light: #3B82F6;      /* rgb(59, 130, 246) */
--st-blue-main: #2563EB;       /* rgb(37, 99, 235) */
--st-blue-dark: #1E40AF;       /* rgb(30, 64, 175) */
```

### Tailwind CSS Mappings
```javascript
// tailwind.config.js additions
colors: {
  'st-purple': {
    50: '#F3F0FF',
    100: '#E9E5FF', 
    200: '#D6CCFF',
    300: '#A78BFA',  // light
    400: '#8B5CF6',  // main
    500: '#7C3AED',  // dark
    600: '#6366F1',  // deep
  },
  'st-blue': {
    400: '#3B82F6',  // light
    500: '#2563EB',  // main
    600: '#1E40AF',  // dark
  }
}
```

### Neutral Colors
```css
/* Backgrounds */
--st-bg-primary: #FFFFFF;      /* Pure white */
--st-bg-secondary: #F9FAFB;    /* Light gray */
--st-bg-accent: #F3F4F6;       /* Card backgrounds */

/* Text Colors */
--st-text-primary: #111827;    /* Dark charcoal */
--st-text-secondary: #6B7280;  /* Medium gray */
--st-text-tertiary: #9CA3AF;   /* Light gray */

/* Borders & Dividers */
--st-border-light: #E5E7EB;
--st-border-medium: #D1D5DB;
```

### Data Visualization Colors
```css
/* Progress & Statistics */
--st-success: #10B981;         /* Green for positive data */
--st-warning: #F59E0B;         /* Amber for moderate data */
--st-info: #06B6D4;            /* Cyan for informational data */
```

---

## 📝 Typography

### Font Families
```css
/* Primary Font - Interface */
--st-font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Secondary Font - Display (when needed) */
--st-font-display: 'Inter', sans-serif;
```

### Font Scale
```css
/* Headings */
--st-text-5xl: 3rem;      /* 48px - Hero titles */
--st-text-4xl: 2.25rem;   /* 36px - Page titles */
--st-text-3xl: 1.875rem;  /* 30px - Section headers */
--st-text-2xl: 1.5rem;    /* 24px - Subsection headers */
--st-text-xl: 1.25rem;    /* 20px - Card titles */

/* Body Text */
--st-text-lg: 1.125rem;   /* 18px - Large body */
--st-text-base: 1rem;     /* 16px - Standard body */
--st-text-sm: 0.875rem;   /* 14px - Small text */
--st-text-xs: 0.75rem;    /* 12px - Captions */
```

### Font Weights
```css
--st-font-light: 300;
--st-font-normal: 400;
--st-font-medium: 500;
--st-font-semibold: 600;
--st-font-bold: 700;
```

### Typography Classes
```css
/* Hero Typography */
.st-hero-title {
  font-size: var(--st-text-5xl);
  font-weight: var(--st-font-bold);
  color: var(--st-text-primary);
  line-height: 1.1;
}

/* Section Headers */
.st-section-title {
  font-size: var(--st-text-3xl);
  font-weight: var(--st-font-semibold);
  color: var(--st-text-primary);
  line-height: 1.2;
}

/* Body Text */
.st-body-text {
  font-size: var(--st-text-base);
  font-weight: var(--st-font-normal);
  color: var(--st-text-secondary);
  line-height: 1.6;
}
```

---

## 🔘 Buttons

### Primary Button
```css
.st-btn-primary {
  background: linear-gradient(135deg, var(--st-purple-main), var(--st-purple-dark));
  color: white;
  padding: 12px 24px;
  border-radius: 24px;
  font-weight: var(--st-font-medium);
  font-size: var(--st-text-base);
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.st-btn-primary:hover {
  background: linear-gradient(135deg, var(--st-purple-dark), var(--st-purple-deep));
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
}
```

### Secondary Button
```css
.st-btn-secondary {
  background: transparent;
  color: var(--st-purple-main);
  border: 2px solid var(--st-purple-main);
  padding: 10px 22px;
  border-radius: 24px;
  font-weight: var(--st-font-medium);
  transition: all 0.2s ease;
}

.st-btn-secondary:hover {
  background: var(--st-purple-main);
  color: white;
}
```

### Tailwind Button Classes
```html
<!-- Primary Button -->
<button class="bg-gradient-to-r from-st-purple-400 to-st-purple-500 text-white px-6 py-3 rounded-full font-medium hover:from-st-purple-500 hover:to-st-purple-600 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200">
  Join Us
</button>

<!-- Secondary Button -->
<button class="border-2 border-st-purple-400 text-st-purple-400 px-6 py-3 rounded-full font-medium hover:bg-st-purple-400 hover:text-white transition-all duration-200">
  Learn More
</button>
```

---

## 📦 Cards & Containers

### Standard Card
```css
.st-card {
  background: var(--st-bg-primary);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.2s ease;
}

.st-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}
```

### Feature Card (with icon)
```css
.st-feature-card {
  background: var(--st-bg-primary);
  border-radius: 20px;
  padding: 32px 24px;
  text-align: center;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.st-feature-card .icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 16px;
  padding: 16px;
  background: linear-gradient(135deg, var(--st-purple-light), var(--st-purple-main));
  border-radius: 50%;
  color: white;
}
```

### Tailwind Card Classes
```html
<!-- Standard Card -->
<div class="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
  <!-- Card content -->
</div>

<!-- Feature Card -->
<div class="bg-white rounded-3xl p-8 text-center shadow-sm">
  <div class="w-16 h-16 mx-auto mb-4 p-4 bg-gradient-to-br from-st-purple-300 to-st-purple-400 rounded-full text-white">
    <!-- Icon -->
  </div>
  <!-- Card content -->
</div>
```

---

## 📊 Data Visualization

### Progress Rings
```css
.st-progress-ring {
  width: 120px;
  height: 120px;
  transform: rotate(-90deg);
}

.st-progress-ring circle {
  fill: none;
  stroke-width: 8;
}

.st-progress-ring .background {
  stroke: var(--st-border-light);
}

.st-progress-ring .progress {
  stroke: var(--st-purple-main);
  stroke-linecap: round;
  transition: stroke-dasharray 0.5s ease;
}
```

### Statistics Display
```css
.st-stat-container {
  text-align: center;
  padding: 16px;
}

.st-stat-number {
  font-size: var(--st-text-4xl);
  font-weight: var(--st-font-bold);
  color: var(--st-purple-main);
  line-height: 1;
}

.st-stat-label {
  font-size: var(--st-text-sm);
  color: var(--st-text-secondary);
  margin-top: 8px;
}
```

---

## 🎯 Icons

### Icon Style Guidelines
- **Style:** Outlined, minimal design
- **Weight:** 2px stroke width
- **Size:** 24px standard, 20px small, 32px large
- **Color:** Inherit from parent or use purple tints

### Icon Components (Tailwind)
```html
<!-- Standard Icon -->
<svg class="w-6 h-6 text-st-purple-400 stroke-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <!-- SVG path -->
</svg>

<!-- Large Feature Icon -->
<svg class="w-8 h-8 text-white stroke-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <!-- SVG path -->
</svg>
```

---

## 📐 Layout & Spacing

### Spacing Scale
```css
/* Based on 8px grid system */
--st-space-1: 0.25rem;  /* 4px */
--st-space-2: 0.5rem;   /* 8px */
--st-space-3: 0.75rem;  /* 12px */
--st-space-4: 1rem;     /* 16px */
--st-space-5: 1.25rem;  /* 20px */
--st-space-6: 1.5rem;   /* 24px */
--st-space-8: 2rem;     /* 32px */
--st-space-10: 2.5rem;  /* 40px */
--st-space-12: 3rem;    /* 48px */
--st-space-16: 4rem;    /* 64px */
--st-space-20: 5rem;    /* 80px */
```

### Container Sizes
```css
--st-container-sm: 640px;
--st-container-md: 768px;
--st-container-lg: 1024px;
--st-container-xl: 1280px;
--st-container-2xl: 1536px;
```

### Grid Patterns
```css
/* Two-column feature grid */
.st-feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--st-space-8);
}

/* Three-column service grid */
.st-service-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--st-space-6);
}
```

---

## 🌟 Special Effects & Animation

### Gradient Backgrounds
```css
/* Hero gradient background */
.st-hero-gradient {
  background: linear-gradient(135deg, 
    var(--st-purple-light) 0%, 
    var(--st-purple-main) 50%, 
    var(--st-blue-main) 100%);
}

/* Subtle accent gradient */
.st-accent-gradient {
  background: linear-gradient(135deg, 
    var(--st-purple-main), 
    var(--st-blue-main));
}
```

### Geometric Elements
```css
/* Curved section divider */
.st-curve-divider {
  position: relative;
  overflow: hidden;
}

.st-curve-divider::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: white;
  border-radius: 50% 50% 0 0 / 100% 100% 0 0;
}
```

### Hover Animations
```css
/* Card hover lift */
.st-hover-lift {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.st-hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

/* Button hover grow */
.st-hover-grow {
  transition: transform 0.2s ease;
}

.st-hover-grow:hover {
  transform: scale(1.05);
}
```

---

## 📱 Responsive Design

### Breakpoints
```css
/* Mobile First Approach */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
```

### Mobile Considerations
- Touch targets minimum 44px
- Readable text at 16px base size
- Comfortable spacing between interactive elements
- Simplified navigation patterns

---

## ♿ Accessibility

### Color Contrast
- All text meets WCAG AA standards (4.5:1 ratio minimum)
- Interactive elements have clear focus states
- Color is not the only means of conveying information

### Focus States
```css
.st-focus {
  outline: 2px solid var(--st-purple-main);
  outline-offset: 2px;
}
```

---

## 🎯 Usage Guidelines

### Do's
- Use the purple gradient for primary actions
- Maintain consistent spacing using the 8px grid
- Apply hover effects to interactive elements
- Use cards to group related content
- Follow the established typography hierarchy

### Don'ts
- Don't use colors outside the defined palette
- Don't mix different border radius values randomly
- Don't ignore responsive design principles
- Don't sacrifice accessibility for aesthetics

---

## 🔄 Implementation Notes

### Current ScholarTrail Integration
Map existing classes to new design system:
```css
/* Replace existing colors */
.text-privacy-teal → .text-st-purple-400
.bg-trust-pink → .bg-st-purple-500
.text-vault-blue → .text-st-text-primary

/* Update button styles */
.bg-privacy-teal → .bg-gradient-to-r from-st-purple-400 to-st-purple-500
```

### Next Steps
1. Update `tailwind.config.js` with new color palette
2. Create component library based on these patterns
3. Gradually migrate existing components
4. Add design tokens CSS file for non-Tailwind usage

---

*This design system is based on the ScholarTrail Canva presentation and should be used as the single source of truth for all UI design decisions.*