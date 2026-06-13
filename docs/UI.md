# BrightRoots - UI Design Document

## Overview

The BrightRoots user interface is designed to be:

- Simple
- Parent-friendly
- Mobile responsive
- Easy to navigate
- Focused on actionable insights

The UI should emphasize positive habit building rather than highlighting problems.

---

# Application Structure

```text
Public Pages
│
├── Landing Page
├── Login Page
└── Register Page

Protected Pages
│
├── Dashboard
├── Children Page
├── Add Child Page
├── Child Dashboard
├── Recommendations Page
├── Resource Library
└── Resource Details Page

```

---

# 1. Landing Page

## Purpose

Introduce BrightRoots and its benefits.

## Sections

### Hero Section

Contains:

- Project Name
- Tagline
- Call To Action Button

Example CTA:

```text
Get Started

```

---

### Features Section

Highlights:

- Child Habit Tracking
- Personalized Recommendations
- Parenting Resources
- Progress Monitoring

---

### Benefits Section

Explains:

- Healthy Habits
- Better Family Engagement
- Positive Child Development

---

### Footer

Contains:

- About
- Contact
- Privacy Policy

---

# 2. Login Page

## Purpose

Allow existing users to sign in.

## Components

- Email Input
- Password Input
- Login Button
- Register Link

---

# 3. Register Page

## Purpose

Allow new parents to create accounts.

## Components

- Full Name
- Email
- Password
- Confirm Password
- Register Button

---

# 4. Dashboard

## Purpose

Main entry point after login.

## Components

### Welcome Card

Displays:

```text
Welcome back, Parent Name

```

---

### Child Overview

Displays:

- Total Children
- Latest Activity Summary

---

### Quick Actions

Buttons:

- Add Child
- View Recommendations
- Open Resource Library

---

### Recent Activity

Displays:

- Latest Screen Time Entry
- Latest Sleep Entry
- Latest Outdoor Activity Entry

---

# 5. Children Page

## Purpose

Display all children associated with the parent account.

## Components

### Child Cards

Each card displays:

- Name
- Age
- Gender

Actions:

- View
- Edit
- Delete

---

### Add Child Button

Navigates to Add Child Page.

---

# 6. Add Child Page

## Purpose

Create a new child profile.

## Form Fields

- Name
- Age
- Gender

Button:

```text
Create Profile

```

---

# 7. Child Dashboard

## Purpose

Central page for managing a specific child.

This page combines all habit tracking and recommendations.

---

## Child Information Section

Displays:

- Name
- Age
- Gender

---

## Screen Time Section

Displays:

- Today's Screen Time
- Weekly Summary

Actions:

- Add Screen Time Entry

---

## Sleep Section

Displays:

- Latest Sleep Hours
- Weekly Sleep Trend

Actions:

- Add Sleep Entry

---

## Outdoor Activity Section

Displays:

- Latest Activity Minutes
- Weekly Activity Trend

Actions:

- Add Activity Entry

---

## Recommendations Preview

Displays:

- Top Recommendations

Button:

```text
View All Recommendations

```

---

# 8. Recommendations Page

## Purpose

Display personalized recommendations.

## Sections

### Screen Time Recommendations

Examples:

- Reduce daily usage by 15 minutes.
- Introduce screen-free activities.

---

### Sleep Recommendations

Examples:

- Establish consistent bedtime.
- Reduce screen exposure before sleep.

---

### Outdoor Activity Recommendations

Examples:

- Encourage outdoor play.
- Schedule family walks.

---

# 9. Resource Library Page

## Purpose

Provide parenting guidance and educational content.

## Components

### Search Bar

Search resources.

---

### Category Filters

Categories:

- Digital Wellbeing
- Parenting Guidance
- Healthy Habits
- Family Interaction

---

### Resource Cards

Displays:

- Title
- Category
- Read More Button

---

# 10. Resource Details Page

## Purpose

Display full educational content.

## Components

- Title
- Category
- Content Body

---

# Navigation Structure

```text
Dashboard
│
├── Children
│     └── Child Dashboard
│
├── Recommendations
│
└── Resource Library

```

---

# Responsive Design Requirements

## Mobile

- Hamburger Menu
- Single-column layout
- Touch-friendly buttons

---

## Tablet

- Two-column layout where appropriate

---

## Desktop

- Sidebar navigation
- Dashboard cards
- Charts and analytics

---

# Future UI Enhancements

Future versions may include:

- AI Parenting Assistant Interface
- Multilingual Support
- Voice Guidance
- Goal Tracking Dashboard
- Family Challenges Section

These features are intentionally excluded from the MVP.