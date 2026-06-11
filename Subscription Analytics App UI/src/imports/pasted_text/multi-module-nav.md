Upgrade the existing Subscription Intelligence App from a single-module app into a multi-module recurring expense intelligence platform using a mobile-first drawer navigation system.

⚠️ IMPORTANT:
- Do NOT redesign existing screens
- Do NOT regenerate the app from scratch
- Keep all current:
  - cards
  - graphs
  - layouts
  - analytics
  - stats
  - spacing
  - typography
  - charts
  - visual hierarchy
  - component structure

This update should ONLY:
- add multi-module navigation
- add module identity system
- preserve the existing Subscription module completely

--------------------------------------------------

🔥 MOBILE-FIRST NAVIGATION CORRECTION

Do NOT use a permanently visible sidebar.

This app is mobile-first.

Instead:

Use a hamburger menu icon (☰) in the top app bar/header of EVERY module screen.

Examples:

☰ Dashboard
☰ Subscriptions
☰ EMI
☰ Utilities
☰ Groceries

This helps users always know:
- which module they are inside
- current app context

--------------------------------------------------

🔹 DRAWER NAVIGATION BEHAVIOR

When user taps the menu icon (☰):

- Open a slide-out drawer sidebar
- Drawer overlays above current screen
- Current screen remains unchanged underneath
- Drawer closes after selecting a module

Sidebar acts ONLY as:
- module switcher
- app-level navigation

NOT screen-level navigation.

--------------------------------------------------

🔹 DRAWER STRUCTURE

TOP SECTION:
- Avatar
- User name
- Optional subtitle

Example:
Sai Kiran
“Recurring spending stable this month.”

--------------------------------------------------

MIDDLE SECTION — MODULES

🏠 Dashboard
🔔 Subscriptions
💳 EMI
⚡ Utilities
🛒 Groceries

--------------------------------------------------

BOTTOM SECTION

⚙️ Settings
🚪 Logout

--------------------------------------------------

🔹 IMPORTANT MODULE RULE

When user clicks “Subscriptions”:

- Navigate to the EXISTING Subscription module
- Reuse all existing Subscription screens
- Preserve:
  - Dashboard
  - Analytics
  - Stats
  - History
  - Reminders
  - Graphs
  - Cards
  - Filters
  - Layouts

Do NOT redesign the Subscription module.

The drawer should ONLY switch modules.

--------------------------------------------------

🎨 UNIFIED DESIGN SYSTEM

Maintain ONE consistent design system across the entire app.

Keep globally consistent:
- Typography
- Card system
- Border radius
- Shadows
- Spacing
- Graph styles
- Animations
- Search bars
- KPI structures
- Bottom sheets
- Interaction patterns

The app should feel:
- premium
- calm
- modern
- scalable
- visually organized

NOT:
- enterprise-heavy
- rainbow-styled
- inconsistent

--------------------------------------------------

🎨 MODULE ACCENT SYSTEM

Use subtle module identity accents.

⚠️ Only 10–20% visual difference between modules.

Do NOT create completely different themes.

--------------------------------------------------

🏠 Dashboard
Accent:
- Neutral / Adaptive

Feel:
- financial intelligence hub
- calm overview

--------------------------------------------------

🔔 Subscriptions
Accent:
- Purple / Indigo

Feel:
- digital
- subscription-focused
- OTT/platform ecosystem

Use:
- purple graph highlights
- indigo KPI glow
- purple CTA accents

--------------------------------------------------

💳 EMI
Accent:
- Deep Blue

Feel:
- trust
- structure
- financial seriousness

Use:
- blue charts
- payoff indicators
- blue highlights

--------------------------------------------------

⚡ Utilities
Accent:
- Amber / Orange

Feel:
- energy
- household utility intelligence

Use:
- amber graph highlights
- warning indicators
- utility analytics accents

--------------------------------------------------

🛒 Groceries
Accent:
- Green

Feel:
- budgeting
- lifestyle
- freshness

Use:
- green spending graphs
- grocery insights
- budget indicators

--------------------------------------------------

🚨 IMPORTANT UX RULE

Accent colors should affect ONLY:
- active tabs
- graph highlights
- icons
- CTA buttons
- KPI glow
- chips
- progress indicators

Do NOT:
- recolor full screens
- change layouts
- use aggressive theme switching

--------------------------------------------------

🔹 MOBILE-FIRST UX RULES

- Fullscreen-focused layouts
- Touch targets ≥ 44px
- One-hand usability
- Breathable spacing
- Minimal cognitive load
- Smooth transitions
- Calm visual hierarchy

--------------------------------------------------

🔹 INTERACTION STYLE

Use:
- soft motion
- fade transitions
- subtle scale animation
- smooth drawer transitions

Avoid:
- flashy animations
- gaming UI behavior
- aggressive fintech motion

--------------------------------------------------

🎯 FINAL PRODUCT GOAL

The app should feel like:

🔥 A premium recurring expense intelligence platform

with:
- intelligent navigation
- unified design consistency
- subtle module personalities
- clean mobile-first UX
- scalable multi-module architecture

NOT:
- desktop admin software
- spreadsheet UI
- enterprise accounting dashboard