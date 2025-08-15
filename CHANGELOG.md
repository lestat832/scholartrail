# Changelog

All notable changes to ScholarTrail will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2025-08-15]

### Added
- Financial need preference to onboarding Step 2 (Personal Info):
  - New "Scholarship Type Preference" dropdown field for better scholarship matching
  - Options: Merit-based scholarships, Need-based scholarships, Both merit and need-based, Not sure/Show all
  - Added to both AddPersonalInfoModal (student flow) and AddChildPersonalInfoModal (parent flow)
  - Field strategically placed after City/State for logical demographic grouping
  - Updated modal subheader: "helps find scholarships that match your background, location, and financial situation"

### Changed
- Updated personal info modals with new design system:
  - Applied st-purple-400 color palette throughout
  - Replaced vault-blue headers with gray-900
  - Updated all focus states to use st-purple-400
  - Removed serif fonts in favor of Inter typography

### Technical
- Maintained existing form validation and data flow
- Field data integrated into onContinue callbacks for parent components
- No additional onboarding steps required - leverages existing Step 2

## [2025-07-28]

### Added
- Enhanced registration modal (SignUpOptionsModal) for better conversion:
  - Added password helper text: "8+ characters, no special characters needed"
  - Implemented privacy trust badge: "ScholarTrail is a 501(c)(3) nonprofit and will never sell your data"
  - Added explicit consent checkbox for GDPR compliance
  - Fixed header spacing from close button for better visual hierarchy

### Changed
- Improved registration modal copy for clarity and conversion:
  - Header: "Find Scholarships Just For You" (more personal and direct)
  - Subheader: "No ads. No spam. Your data stays private." (simplified)
  - CTA button: "Join for Free" (clearer call-to-action)
  - Consolidated legal text into single consent checkbox
- Updated login modal (SignInModal) for consistency:
  - Subheader: "Keep matching with scholarships built just for you"
  - CTA button: Changed from "Continue" to "Sign In"
  - Added consistent header spacing from close button
- Applied new design system colors to both modals:
  - Replaced privacy-teal, trust-pink, vault-blue with st-purple palette
  - Updated focus states and hover effects
  - Used btn-primary class for consistent CTAs

### Technical
- Maintained all existing authentication flows and functionality
- SSO buttons (Apple/Google) work independently of consent checkbox
- All links properly open in new tabs with security attributes
- Forms maintain proper validation and error handling

## [2025-07-25]

### Added
- Comprehensive design system overhaul with purple/blue gradient theme
  - Created complete design system documentation (DESIGN_SYSTEM.md) based on Canva presentation guidelines
  - Added design-tokens.css with comprehensive CSS custom properties for colors, typography, spacing, and components
  - Implemented new st-purple and st-blue color palettes in Tailwind configuration
  - Created reusable component classes: btn-primary, btn-secondary, card, card-feature, heading-hero, heading-section

### Changed
- Migrated from legacy color scheme to new design system colors:
  - privacy-teal → st-purple-400 (#8B5CF6)
  - trust-pink → st-purple-500 (#7C3AED)
  - vault-blue → gray-900 (#111827)
  - protected-bg → gray-50 (#F9FAFB)
- Updated Logo component with new purple branding and Inter typography
- Modernized all core components with new design system:
  - Header: Updated navigation colors and button styles
  - Footer: Applied new color scheme
  - Hero: Implemented new button classes and typography
  - PersonaTabs: Updated tab styling and card components
  - SignUpModal: Applied new colors and rounded corners
- Updated key pages (AboutUs, Dashboard) with new styling
- Replaced custom styling with design system classes throughout codebase
- Enhanced typography system with Inter font and consistent heading hierarchy

### Technical
- Added comprehensive CSS custom properties for maintainable design tokens
- Implemented systematic color migration across 16+ files
- Maintained accessibility standards and responsive design principles
- Updated 1200+ lines of styling code for consistency

## [2025-07-24]

### Added
- Three-tiered parent account system with comprehensive account management
  - Payment-only accounts: Billing portal access only for parents who pay for student subscriptions
  - Parent-free accounts: Trial experience with 1 student profile and 3 scholarship limit
  - Parent-paid accounts: Full premium features with up to 3 students and unlimited scholarships
  - Account capability matrix defining features, limitations, and upgrade paths for each account type
  - Helper functions for account type transitions, pricing, and validation

- Enhanced payment service architecture
  - `ParentAccountType` type with payment-only, parent-free, and parent-paid options
  - Account-specific pricing functions and upgrade logic
  - Comprehensive capability matrix for feature access control
  - Account type validation and transition management

- Specialized parent dashboards for each account type
  - Payment-only dashboard: Simple billing portal with subscription management and upgrade prompts
  - Free trial dashboard: Student profile management with scholarship limitations and upgrade incentives
  - Premium parent dashboard: Full feature access with progress tracking and multi-student management

### Changed
- Update parent payment page with account type selection
  - Distinguish between "Pay for Student Only" vs "Get Parent Account + Student" options
  - Account type-specific pricing display and feature comparisons
  - Enhanced plan selection with capability-based feature lists

- Improve PaywallModal user experience for parent contexts
  - Hide "Ask My Parents To Pay" option when user is already in a parent account
  - Add `hideParentPayOption` prop for context-aware payment option display
  - Prevent logical inconsistency of parents asking parents to pay

- Enhanced parent account data management
  - Account type-specific data initialization after payment completion
  - Proper handling of student associations based on account type
  - Improved localStorage persistence for parent account information

### Fixed
- PaywallModal UX issue where parent payment option appeared inappropriately in parent account contexts
- Account type data consistency between payment flow and dashboard display

## [2025-07-21]

### Added
- Data security section to homepage with privacy-focused messaging
  - Add comprehensive "Why Data Security Matters" section to PersonaTabs component
  - Include 4-card grid showcasing key privacy benefits (Data Privacy, Nonprofit Status, No Ads/Spam, Family-First Approach)
  - Add call-to-action buttons for data protection and monetization information
  - Use brand colors and typography for consistent visual design

- ProfileEnhancementModal with global search functionality
  - Create comprehensive modal for adding activities, interests, languages, and special information
  - Implement global search across all parameter categories simultaneously
  - Add tag-style selection UI with auto-clearing search after parameter selection
  - Include tabbed interface with item counts and proper validation

### Changed
- Enhance parent payment page layout and user experience
  - Restructure credit card information with Stripe-style layout (Name on Card, Card Number, Expiry/CVV side-by-side, ZIP Code)
  - Move email field to parent account creation section above password field
  - Remove first name requirement from parent account creation
  - Add hover tooltip for disabled payment button with user guidance
  - Fix tooltip positioning and text wrapping to prevent cutoff issues

## [2025-07-17]

### Changed
- Implement parent payment request flow with Stripe-style payment page

## [2025-07-16]

### Changed
- Implement enhanced child invitation acceptance flow with personalized landing page, update pricing to /year, reorganize privacy controls into sections, fix parent dashboard headers, and various UI improvements

## [2025-07-10]

### Changed
- Fix critical data privacy bug: Clear all localStorage data on logout to prevent data leakage between user sessions

## [2025-07-09]

### Changed
- Add demo navigation: View Parent's Perspective and View as Student buttons for easy switching between connected accounts, plus demo mode banner

## [2025-07-08]

### Changed
- Add tooltips to child status dots, fix edit modal headers, add Edit Child Profile modal, remove View Activity option

## [2025-07-03]

### Changed
- Add parent dashboard features: multi-child support, academic/school info modals, and improved navigation

## [2025-07-02]

### Added
- Parent onboarding and dashboard features
  - Create WelcomeParentModal with two CTAs: "Add Child Profile" and "Browse Non-Personalized Scholarships"
  - Implement parent dashboard state showing non-personalized scholarships (limited to 3)
  - Create SubscribePromo component encouraging child profile completion
  - Add AddChildProfileModal for capturing child's first name and birthday
  - Add AddChildPersonalInfoModal for optional demographic information
  - Implement proper navigation flow from parent signup to dashboard

### Changed
- Fix logout functionality to use React Router navigation instead of hardcoded paths
- Update parent dashboard styling to match student dashboard exactly
- Fix conditional rendering priority to show parent state correctly
- Update CTA button colors to use Trust Pink (brand guidelines) consistently
- Add emoji to parent promo to match student dashboard
- Remove unnecessary copy from AddChildProfileModal

### Fixed
- Resolve development server issues with multiple node processes
- Fix parent state not showing due to conditional logic priority
- Correct CTA alignment in parent dashboard (right-aligned to match student)
- Fix saved/applied state colors from gray to verified-green

## [2025-06-26]

### Added
- Logo component, About Us, Contact Us, Privacy Policy, and Terms of Use pages
  - Create flexible Logo component with multiple variants and color schemes
  - Add About Us page with founder cards and organization mission
  - Add Contact Us page with comprehensive contact form
  - Create Privacy Policy page emphasizing privacy-first approach
  - Create Terms of Use page with nonprofit-appropriate terms
  - Update navigation links across Header and Footer components
  - Fix scroll-to-top behavior on page navigation
  - Update footer links to use React Router instead of placeholder hrefs

## [2025-06-25]

### Added
- Financial assistance sponsorship flow and improve Edit Profile UX
  - Create NeedFinancialAssistanceModal for sponsorship applications
  - Create ApplicationSubmissionModal for success confirmation
  - Wire up sponsorship flow from Paywall modal
  - Update Edit Profile flow for better UX

- Edit Account and Edit Profile modals with multi-step flow
  - Create EditAccountModal for editing first name and birthday
  - Create EditProfileModal, EditAcademicInfoModal, and EditSchoolInfoModal
  - Implement multi-step Edit Profile flow
  - Add state management for all profile fields in Dashboard
  - Fix header to dynamically update when user name changes

- Paid member dashboard state with infinite scroll
  - Add paid member state management with localStorage persistence
  - Generate 60 mock scholarships for demonstrating pagination
  - Implement infinite scroll showing 25 scholarships at a time
  - Create MemberCongratulationsModal for subscription success
  - Show all scholarships for paid members, only 3 for free members

- Save/apply scholarship features and sign-in functionality
  - Implement save scholarship feature with congratulations modal
  - Add applied scholarship tracking with "Did You Apply?" modal
  - Create sign-in modal with Apple/Google/email options
  - Add localStorage persistence for saved/applied scholarships
  - Show badge counts on filter dropdown for new saves/applies

### Changed
- Add local debug scripts to gitignore

## [2025-06-24]

### Added
- Scholarship detail page and improve navigation
- Dashboard empty state and improve sign-up flow logic
- Complete student sign-up flow and dashboard
- Initial commit: ScholarTrail web app with sign-up flow

---

🤖 Generated with [Claude Code](https://claude.ai/code)
