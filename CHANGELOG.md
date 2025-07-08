# Changelog

All notable changes to ScholarTrail will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
