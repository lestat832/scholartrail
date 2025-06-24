# ScholarTrail AI Assistant Context

This document provides essential context and references for AI assistants working on the ScholarTrail project.

## Project Overview
ScholarTrail is a mission‑driven, privacy‑first nonprofit platform that empowers students, families, and educators to unlock higher‑education funding without sacrificing personal data. By combining a tailored matching engine with family and teacher collaboration tools, ScholarTrail removes the noise and inequities of today’s scholarship landscape while operating under a sustainable 501(c)(3) model. 

### Project Type
- Frontend prototype for investor demonstrations
- No backend infrastructure initially
- Focus on visual impact and user experience

## Requirements & Documentation

### Documentation
- Business Plan: https://docs.google.com/document/d/17UAsC-tJAcJM7PGEg4zqgv3incrN_oUammXa_tGDG-s/edit?usp=sharing
- Educator Pitch Deck: https://docs.google.com/presentation/d/1c2mc4_P7t7TXtWP2ZR_BHpCCpvVgVAirQo8Dk2-rti4/edit?usp=sharing

### Confluence Links
- User Stories: https://scholartrail.atlassian.net/wiki/spaces/~712020a0c76b8214a94694bb8517b55aee133f/pages/6881282/MVP

### Key Requirements
<!-- Add your main requirements here -->
1. 
2. 
3. 

## Design Resources

### Wireframes
- Homepage: [ADD LINK/DESCRIPTION]
- Programs Page: [ADD LINK/DESCRIPTION]
- Student Stories: [ADD LINK/DESCRIPTION]
- About Us: [ADD LINK/DESCRIPTION]
- Contact/Donate: [ADD LINK/DESCRIPTION]
- Whimsical: https://whimsical.com/flows-Nozs2kY8zkEEYEDHRGrCzy

### Brand Guidelines
- Primary Colors: [
      { hex: "#45818E", name: "Privacy Teal", role: "Security features" },
      { hex: "#6C7B7F", name: "Neutral Gray", role: "Data protection badges" },
      { hex: "#34495E", name: "Vault Blue", role: "Secure sections" },
      { hex: "#F7F9FB", name: "Protected Background", role: "Safe zones" },
      { hex: "#27AE60", name: "Verified Green", role: "Security confirmations" },
      { hex: "#3498DB", name: "Information Blue", role: "Help & guidance" },
      { hex: "#E85A9B", name: "Trust Pink", role: "Call-to-action accents" }
    ]
- Typography: 
  Inter (Sans-serif) for body text and UI elements:
    Clean, highly legible, and modern
    Designed specifically for digital interfaces
    Conveys reliability and accessibility
    Works perfectly with your Privacy Teal and Vault Blue colors
  Playfair Display (Serif) for headings and emphasis:
    Elegant and trustworthy feeling
    Adds sophistication without being intimidating
    Creates nice contrast with Inter
    Complements the "Trust Pink" accent color beautifully
  Use medium to bold weights for security-related text with your Vault Blue (#34495E)
  Apply Trust Pink (#E85A9B) sparingly for important CTAs in headings
  Leverage Privacy Teal (#45818E) for subheadings and section dividers
  Keep body text in Neutral Gray (#6C7B7F) for optimal readability  
- Logo Assets: [ADD LOCATION]
- Tone of Voice: A sophisticated palette emphasizing data protection and privacy. Clean, modern colors that communicate security without feeling sterile or intimidating.

## Technical Specifications

### Current Tech Stack
- Frontend Framework: React with TypeScript
- Styling: Tailwind CSS
- Routing: React Router
- Animations: Framer Motion
- Build Tool: Create React App
- Deployment: GitHub Pages

### Development Environment
- Node.js version: [SPECIFY VERSION]
- Package Manager: npm/yarn
- IDE: [SPECIFY IF ANY]

## Development Guidelines

### Code Standards
- Use TypeScript for type safety
- Follow React best practices
- Implement responsive design (mobile-first)
- Ensure accessibility (WCAG 2.1 AA compliance)

### Component Structure
```
src/
  components/     # Reusable UI components
  pages/         # Page-level components
  styles/        # Global styles and Tailwind config
  utils/         # Helper functions
  assets/        # Images, fonts, etc.
```

### Testing Approach
- [ADD TESTING REQUIREMENTS]

## Important Context

### Target Audience
1. **Primary**: Students seeking scholarships
2. **Secondary**: Parents and Educators seeking scholarships for their children or students
3. **Tertiary**: Potential investors and donors

### User Personas
<!-- Add detailed personas if available -->

### Business Rules
<!-- Add any specific business logic or constraints -->

### Accessibility Requirements
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Minimum WCAG 2.1 AA compliance

## External Resources

### APIs & Services
<!-- List any external services to integrate -->

### Reference Sites
<!-- Add competitor or inspiration sites -->

### Third-party Documentation
<!-- Add links to relevant documentation -->

## Progress Tracking

### Current Phase
Building initial prototype for investor presentations

### Completed Features
- [ ] Project setup
- [ ] Homepage
- [ ] Programs page
- [ ] Student stories
- [ ] About page
- [ ] Contact/Donate page

### Next Steps
1. Complete prototype development
2. Deploy to GitHub Pages
3. Gather investor feedback
4. Plan backend infrastructure

## Notes for AI Assistant

### When Building Components
1. Prioritize visual appeal for investor demos
2. Use mock data that tells compelling stories
3. Include smooth animations and transitions
4. Ensure fast load times
5. Make CTAs prominent and clear

### Common Commands
```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Deploy to GitHub Pages
npm run deploy
```

### Important Reminders
- This is a prototype - focus on presentation over complex functionality
- All data should be mocked/static for now
- Optimize for desktop viewing (investors) but ensure mobile responsiveness
- Include impressive metrics and success stories
- Make donation/investment CTAs prominent

---

**Last Updated**: [DATE]
**Updated By**: [YOUR NAME]