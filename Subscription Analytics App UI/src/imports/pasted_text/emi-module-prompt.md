# 💳 EMI MODULE V2.1 — COMPLETE FIGMA GENERATION PROMPT

## IMPORTANT

This is NOT a redesign.

Keep the existing application design system:

* Existing typography
* Existing card styles
* Existing spacing system
* Existing shadows
* Existing charts
* Existing interactions
* Existing mobile layout patterns

Maintain visual consistency with the Subscription Module.

Only create the EMI Intelligence Module using the same design language.

---

# 🎨 EMI MODULE VISUAL IDENTITY

Module Accent:

🔵 Deep Blue

Use accent color ONLY for:

* active tabs
* graph highlights
* KPI accents
* progress indicators
* icons
* CTA buttons

Do NOT recolor entire screens.

The module should feel:

* structured
* trustworthy
* serious
* motivating

---

# 📱 GLOBAL EMI MODULE STRUCTURE

Top App Bar:

☰ Menu
💳 EMI

Tap ☰ opens slide-out drawer.

Drawer contains:

TOP:

* Avatar
* User Name
* Subtitle

MIDDLE:

* Dashboard
* Subscriptions
* EMI
* Utilities
* Groceries

BOTTOM:

* Settings
* Logout

Selecting EMI opens EMI Module.

---

# 📱 EMI MODULE INTERNAL NAVIGATION

Bottom Navigation:

[ Dashboard ]
[ Analytics ]
[ + ]
[ History ]
[ Reminders ]

Behavior:

Dashboard = Signal Layer
Analytics = Visual Layer
History = Timeline Layer
Reminders = Due Intelligence

Center + Button:

Add EMI

---

# 🏠 EMI DASHBOARD

Goal:

Understand EMI burden in 2 seconds.

Visual Hierarchy:

1. Hero Card
2. KPI Cards
3. Insight Card
4. EMI Distribution
5. Top EMIs
6. Upcoming Dues

---

## HERO CARD

Highest priority component.

Show:

Monthly EMI Burden

₹18,500

Remaining Balance

₹4.2L

Active EMIs

6

Additional:

Debt-Free Date

Mar 2029

Mini payoff sparkline

Tap:

Navigate to Analytics

---

## KPI GRID

2 x 2 Grid

Card 1

Highest EMI

Home Loan
₹12,000

Card 2

Ending Soon

Bike Loan
2 Months Left

Card 3

Interest Remaining

₹1.8L

Card 4

Upcoming Due

₹18,500 This Week

Cards remain clickable.

---

## INSIGHT CARD

Only one insight.

Examples:

Home Loan contributes 62% of EMI burden.

or

Car Loan completes next month 🎉

or

Debt-free date projected for Mar 2029.

---

## EMI TYPE DISTRIBUTION

Chart:

Donut Chart

Categories:

* Home Loan
* Car Loan
* Bike Loan
* Personal Loan
* Credit EMI

Tap Slice:

Highlight + Filter

---

## TOP EMIs

Top 3 Largest Commitments

Home Loan
Car Loan
Personal Loan

Ranked descending.

---

## UPCOMING DUES

Sorted by urgency.

Examples:

🔴 Home Loan
Due Tomorrow

🟡 Bike EMI
Due In 3 Days

🟢 Personal Loan
Due In 8 Days

---

# 📊 ANALYTICS SCREEN

Top Tabs:

[ Analytics ]
[ Stats ]

Default:

Analytics

---

## GRAPH 1

EMI Distribution

Type:

Donut Chart

Shows EMI types.

---

## GRAPH 2

Yearly EMI Spending

Type:

Vertical Bar Chart

Filters inside graph:

[1Y]
[3Y]
[5Y]
[10Y]

X Axis:

Years

Y Axis:

EMI Paid

Tap:

Tooltip

---

## GRAPH 3

Remaining Balance Trend

MOST IMPORTANT GRAPH

Type:

Line Chart

Shows:

Debt reducing over time

X:

Months / Years

Y:

Remaining Balance

Tap:

Balance + Date

---

## GRAPH 4

Interest vs Principal

Type:

Stacked Vertical Bar Chart

Displays:

Interest Paid

vs

Principal Paid

Per EMI

---

## GRAPH 5

EMI Burden Trend

Type:

Line Chart

Shows:

Monthly EMI pressure reducing over years

Example:

2024 → ₹32k

2025 → ₹24k

2026 → ₹18k

---

# 📊 STATS SCREEN

Second Analytics Tab

[ Analytics ]
[ Stats ]

When Stats selected:

---

## YEAR SELECTOR

2026 ▼

Sticky at top.

---

## EMI SUMMARY

Show:

* Total Monthly EMI
* Total Paid
* Remaining Balance
* Total Interest
* Debt-Free Projection

---

## EMI TYPE TOTALS

Home Loan

Car Loan

Personal Loan

Each displays:

Amount
Percentage
Active Count

---

## EMI INSIGHTS

Examples:

Home Loan forms 62% of debt.

Interest burden reduced 11%.

Car EMI ends soonest.

---

## EMI LIST

Each row:

EMI Name

Monthly Amount

Remaining Months

Interest Rate

Lender

Sorted highest amount first.

---

## SEARCH

Placeholder:

Search EMI...

Searches:

* EMI Name
* Bank
* Lender
* Loan Type

Real-time filtering.

---

## ADVANCED INSIGHTS

Examples:

Long-term debt trends

Interest-heavy loans

Payoff acceleration

Debt stability analysis

---

# 📜 HISTORY SCREEN

Purpose:

Payment Timeline

---

Each Item Displays:

Payment Amount

Payment Date

Remaining Balance

Status

Status Types:

* Active
* Completed
* Delayed
* Skipped

---

Filters:

Year

Loan Type

Lender

Search supported.

Lazy loading enabled.

---

# 🔔 REMINDERS SCREEN

Purpose:

EMI Due Awareness

---

List Items:

EMI Name

Due Date

Days Remaining

Urgency Color

Examples:

🔴 EMI Due Tomorrow

🟡 EMI Due In 3 Days

🟢 EMI Due In 7 Days

---

Smart Reminder Cards:

Last Payment Next Month 🎉

High EMI Pressure This Week

Debt-Free Milestone Coming Soon

---

# ➕ ADD EMI SCREEN

Access:

Center + Button

---

SECTION 1

Basic Details

Fields:

* EMI Name
* Loan Type
* Lender

---

SECTION 2

Financial Details

Fields:

* Total Loan Amount
* Interest Rate
* Monthly EMI
* Down Payment

---

SECTION 3

Timeline

Fields:

* Start Date
* End Date
* Due Day

---

SECTION 4

Reminder Settings

Fields:

* Reminder Toggle
* Reminder Days Before

Default:

Enabled

---

Validation:

Required Fields

Amount Validation

Date Validation

Success Feedback

---

# 📄 EMI DETAILS SCREEN

Opened From:

EMI List

Top EMIs

Analytics

---

Header:

EMI Name

Bank Name

Loan Type

---

Highlights:

Monthly EMI

Remaining Balance

Next Due

Remaining Months

---

Financial Information:

Total Amount

Interest Rate

Total Payable

Amount Paid

Amount Remaining

Start Date

End Date

---

Payoff Timeline Graph

Type:

Line Chart

Shows:

Remaining balance reducing over time

---

# 📱 MOBILE UX RULES

Single-column layout

Touch targets ≥ 44px

Smooth scrolling

Sticky headers where appropriate

Preserve state when navigating

Maintain existing app spacing and card system

---

# FINAL GOAL

Create a premium EMI Intelligence System that helps users instantly understand debt burden, visualize payoff progress, track loan health, and stay motivated toward becoming debt-free while maintaining consistency with the existing Subscription Intelligence platform.
