# TrackIt — Goal Tracker

**TrackIt** is a calm, aesthetic goal-tracking web application designed to help users build consistency, track progress, and grow their goals over time.

The application combines **goal management, progress tracking, nature-inspired visuals, authentication, and persistent data storage** into a peaceful productivity experience.

---

## Features

### Authentication
* User signup and login
* Secure authentication
* Session management
* Logout functionality
* User-specific data
* Persistent user accounts

Each user can access and manage only their own goals.

---

## Goal Management
Users can:

* Create new goals
* Add a goal title
* Add an optional description
* Set a deadline
* View active goals
* Mark goals as completed
* Delete goals

Completed goals are visually distinguished from active goals to make progress easy to understand.

---

##  Nature-Based Progress System

Instead of using a traditional progress bar, GuidedGoals represents progress through the growth of a tree.

| Progress | Stage           |
| -------- | --------------- |
| 0–25%    | 🌱 Seed         |
| 25–50%   | 🌿 Small Plant  |
| 50–75%   | 🌲 Growing Tree |
| 100%     | 🌳 Full Tree    |

The tree stage automatically changes according to the percentage of completed goals.

This creates a more visual and motivating way to track consistency.

---

## Progress Statistics
The dashboard provides important progress information such as:
* **Total Goals**
* **Completed Goals**
* **Completion Percentage**

These statistics update automatically as users manage their goals.

---
## Motivational Feedback

When a goal is completed, GuidedGoals provides a short motivational message.

Examples:

* 🌿 Growth happens daily
* 🌲 Consistency builds forests
* 🌱 Small steps matter

Completion interactions use subtle animations and visual feedback to make progress feel rewarding.

---
##  Calm Water Theme

TrackIt uses a peaceful nature-inspired interface.

### Visual elements include:

* Slow-moving water animation
* Soft blue and teal gradients
* Subtle wave motion
* Glassmorphism cards
* Soft shadows
* Rounded UI elements
* Smooth transitions
* Minimal visual clutter

The animations are intentionally slow and subtle so they do not distract from productivity.

---
##  Day &  Night Mode
TrackIt supports two visual modes.

### Day Mode

* Bright water tones
* Light interface
* Soft aqua and teal colors

### Night Mode

* Darker blue tones
* Subtle glow effects
* Floating particles
* Darker background

The interface transitions smoothly between modes.

---

## Design Philosophy

TrackIt follows a:

> **Calm Productivity Aesthetic**

The design focuses on making productivity feel peaceful rather than stressful.

### Design principles

* Minimal
* Clean
* Peaceful
* Premium
* Responsive
* Nature-inspired
* Easy to use

---

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* shadcn/ui

### Backend & Database

* Supabase
* Authentication
* Persistent data storage
* Database

### Development

* Lovable
* GitHub
* npm

---

## Project Structure

```text
TrackIt/
│
├── public/
│   └── Static assets
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── lib/
│   └── ...
│
├── supabase/
│   └── Database and backend configuration
│
├── package.json
├── package-lock.json
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── components.json
└── README.md
```

---

## Getting Started

### Prerequisites

Make sure you have:

* Node.js
* npm

installed on your system.

### Clone the repository

```bash
git clone https://github.com/charitha1702/guidedgoals.git
```

### Navigate into the project

```bash
cd guidedgoals
```

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

The application will be available through the local development URL provided by Vite.

---

## Environment Variables

If your local setup requires environment variables, create a `.env` file in the project root.

Example:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Never commit private API keys, service-role keys, passwords, or other secrets to GitHub.**

---

## Development Workflow

TrackIt was developed using **Lovable** and is connected to GitHub.

The development workflow can be:

```text
Lovable
   ↓
Code changes
   ↓
GitHub
   ↓
Local development
   ↓
Testing
   ↓
Commit changes
```
Changes made through Lovable can be synchronized with the connected GitHub repository.

---
##  Responsive Design

TrackIt is designed to work across:

* 💻 Desktop
* 📱 Mobile
* 📟 Tablet

The interface adapts its layout while maintaining the same calm visual experience.

---
##  User Experience

The main experience follows a simple loop:

```text
Create a Goal
      ↓
Work Towards It
      ↓
Complete the Goal
      ↓
Watch Your Progress Grow
      ↓
 Grow Your Forest
      ↓
Create the Next Goal
```
The goal is to make consistency feel visible and rewarding.

---
##  Future Improvements

Potential future features include:
* Daily goal reminders
* Push notifications
* Goal categories
* Habit tracking
* Streak tracking
* Weekly progress reports
* Monthly analytics
* Achievement badges
* Multiple trees / personal forest
* Goal priority levels
* Calendar integration
* AI-powered goal suggestions
* AI productivity assistant

---
##  Vision

TrackIt is built around a simple idea:
> **Small consistent actions grow into something bigger.**
Instead of treating productivity as a race,TrackIt turns progress into a visual journey — one goal, one step, and one tree at a time.

---
##  Project

**TrackIt — Forest Flow Goals**

Built with using React, TypeScript, Tailwind CSS, Supabase, Lovable, and GitHub.
