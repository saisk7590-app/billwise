# 📱 DASHBOARD MODULE V2.1 — FINAL FIGMA UPDATE PROMPT

⚠️ IMPORTANT

This is a refinement of the existing Dashboard module.

DO NOT:

* Redesign the app
* Regenerate screens from scratch
* Modify the global design system
* Change existing typography
* Change spacing system
* Change card styles
* Change shadow system
* Change component library

Maintain all existing visual language.

Improve only:

* Dashboard architecture
* Information hierarchy
* Mobile usability
* Dashboard navigation structure

---

# 🏠 DASHBOARD MODULE ARCHITECTURE

Dashboard is now a standalone intelligence module.

Navigation hierarchy:

☰ Drawer Navigation
├ Dashboard
├ Subscriptions
├ EMI
├ Utilities
├ Groceries
└ Settings

Dashboard Module
├ Overview
├ Analytics
├ Insights
└ Stats

---

# 📱 DASHBOARD BOTTOM NAVIGATION

Like the existing Subscription module, Dashboard must have its own internal bottom navigation.

Add a sticky bottom navigation bar containing:

🏠 Overview
📈 Analytics
🧠 Insights
📊 Stats

Purpose:

Overview = Signal Layer
Analytics = Visual Layer
Insights = Intelligence Layer
Stats = Truth Layer

Rules:

* Bottom navigation belongs ONLY to Dashboard module
* Not part of drawer navigation
* Always visible while inside Dashboard
* Preserve tab state
* Preserve scroll position
* Smooth transitions between tabs

Active Tab:

* Filled background
* Dashboard accent
* Slight elevation

Inactive Tab:

* Neutral tone
* Reduced emphasis

---

# 🎯 DASHBOARD GOAL

Help users understand their recurring financial situation within 2 seconds.

Dashboard acts as:

🔥 Financial Command Center

NOT:

❌ Subscription dashboard
❌ Expense logger
❌ Banking screen

---

# 🟢 OVERVIEW TAB

Use this exact visual hierarchy:

1. Hero Financial Card
2. KPI Cards
3. Main Insight Card
4. Quick Module Glance
5. Monthly Burn Rate Graph
6. Upcoming Burden Timeline
7. Savings Preview

---

# 💰 HERO FINANCIAL CARD

Highest visual priority.

Display:

* Monthly recurring spend
* Yearly projection
* Growth %
* Financial health score
* Mini sparkline graph

Visual Treatment:

* Premium gradient
* Larger spacing
* Strong visual emphasis
* Dashboard accent styling

---

# 📊 KPI CARDS

Maximum 4 cards.

Layout:

2 × 2 grid

Requirements:

* Equal height
* Consistent spacing
* Clickable cards

Include:

* Upcoming Due Amount
* Active Recurring Items
* Dynamic Intelligence KPIs

Examples:

* Utility spike detected
* EMI burden reduced
* Potential savings found
* Duplicate bundle found

---

# 🧠 MAIN INSIGHT CARD

Display only ONE insight.

Examples:

* Utility spike detected
* EMI burden reduced
* Duplicate OTT bundle found
* Potential yearly savings found

Visual Priority:

* Prominent
* Smaller than Hero Card
* Easy to scan

---

# ⚡ QUICK MODULE GLANCE

Replace stacked module sections.

Use horizontally scrollable cards.

Cards:

🔔 Subscriptions
💳 EMI
⚡ Utilities
🛒 Groceries

Each card shows:

* Monthly spend
* One key metric

Use module accent colors:

Subscriptions → Purple
EMI → Blue
Utilities → Amber
Groceries → Green

---

# 📈 MINI ANALYTICS GRAPH

Keep ONLY ONE graph on Overview.

Graph:

Monthly Burn Rate Trend

Type:

Line Chart

Series:

* Subscriptions
* EMI
* Utilities
* Groceries

Maintain:

* Existing graph style
* Existing tooltip behavior
* Existing chart interactions

---

# 📅 UPCOMING BURDEN TIMELINE

Overview only.

Remove from Analytics.

Use:

Vertical financial timeline

Display:

* Upcoming dues
* EMI endings
* High-pressure months

Rules:

* Max 5 visible items
* Chronological order
* Scrollable if needed

Indicators:

🔴 High urgency
🟡 Medium urgency
🟢 Low urgency

---

# 💰 SAVINGS PREVIEW

Compact intelligence card.

Show:

Potential monthly savings amount.

Examples:

* Unused subscriptions
* Duplicate OTT bundles
* Utility optimization
* EMI ending soon

---

# ➕ QUICK ACTIONS

Do NOT create a dedicated section.

Use:

Expandable Floating Action Button (FAB)

Position:

Bottom-right corner

Actions:

* Add Subscription
* Add EMI
* Add Utility
* Add Grocery Entry

---

# 🔵 ANALYTICS TAB

Contains ONLY:

1. Expense Distribution
2. Monthly Burn Rate
3. Yearly Growth Trend
4. Savings Opportunity Analysis
5. Expense Stability Score

Remove:

❌ Upcoming Burden Timeline

Timeline belongs only in Overview.

---

# 🧠 INSIGHTS TAB

Dedicated intelligence feed.

Include:

* Smart insights
* Savings opportunities
* Financial warnings
* Recommendations

Display as feed-style cards.

---

# 📊 STATS TAB

Focus on exact numbers.

Include:

1. Year Summary
2. Module Totals
3. Module Insights
4. Top Expenses
5. Search
6. Long-Term Intelligence

Purpose:

Truth Layer

---

# 🎨 DASHBOARD ACCENT RULE

Dashboard is cross-module.

Use:

* Neutral design language
* Subtle gradient hero card
* Balanced graph colors

Avoid:

* Heavy purple
* Heavy blue
* Heavy green
* Single-module dominance

Dashboard should feel:

✅ Premium
✅ Intelligent
✅ Calm
✅ Financial command center

---

# 📱 MOBILE UX RULES

* Single-column layout
* Touch targets ≥ 44px
* Breathable spacing
* Sticky bottom tabs
* Smooth scrolling
* Card-based structure
* Preserve scroll state
* Preserve tab state

---

# FINAL GOAL

Create a premium recurring financial command center that gives users instant awareness, clear priorities, actionable intelligence, and seamless navigation through Overview, Analytics, Insights, and Stats using a dedicated Dashboard bottom navigation system.
