# Forest Flow Goals

Create a full-stack Goal Tracker Web Application with a calm forest water theme, login system, and persistent data storage.

The design must feel peaceful, productive, minimal, and aesthetic — not flashy or childish.

----------------------------------------

1. AUTHENTICATION SYSTEM

----------------------------------------

- Signup and Login functionality

- Secure password hashing

- Session-based login

- Logout option

- Each user must only see their own goals

- Store user data and goals in SQLite database

- When a user logs out and logs back in, their previous goals must reappear (persistent storage)

----------------------------------------

2. ANIMATED BACKGROUND (CALM WATER FLOW THEME)

----------------------------------------

- Constant slow-moving water flow animation

- Soft blue + teal gradient overlay

- Subtle wave motion (very slow and smooth)

- Optional ripple effect when user clicks

- Background must not distract from content

- Add slight blur layer behind content for readability

- Use smooth transitions only (no fast animation)

----------------------------------------

3. DASHBOARD (AFTER LOGIN)

----------------------------------------

At the top display:

"Welcome, [Username] 🌿"

Below that, add a small informational glass-style box:

Title: "How It Works"

Content:

- Add your goals

- Mark them complete

- Watch your tree grow 🌳

- Stay consistent daily

The box must:

- Have rounded corners

- Frosted glass effect (glassmorphism)

- Soft shadow

- Minimal clean layout

----------------------------------------

4. GOAL MANAGEMENT SYSTEM

----------------------------------------

User should be able to:

- Add new goal

  - Title (required)

  - Description (optional)

  - Deadline

- View goals in clean card format

- Mark goals complete with checkbox

- Delete goals

When a goal is marked complete:

- Show green tick

- Apply strike-through to text

- Smooth animation

- Subtle ripple or glow effect

- Show small motivational popup message for 3 seconds

Example messages:

- "Growth happens daily 🌿"

- "Consistency builds forests 🌲"

- "Small steps matter 🌱"

----------------------------------------

5. NATURE-THEMED PROGRESS SYSTEM (TREE GROWTH)

----------------------------------------

Replace normal progress bar with visual tree growth stages:

0–25% → 🌱 Seed

25–50% → 🌿 Small plant

50–75% → 🌲 Growing tree

100% → 🌳 Full tree

Progress must automatically calculate based on completed goals.

Smooth transition animation between stages.

----------------------------------------

6. STATS SECTION

----------------------------------------

Display:

- Total Goals

- Completed Goals

- Completion Percentage

Clean minimal cards layout.

----------------------------------------

7. UI & DESIGN REQUIREMENTS

----------------------------------------

Theme: Calm Productive Aesthetic

Colors:

- Deep teal

- Aqua blue

- Soft white

- Light transparency effects

Use:

- Rounded corners

- Soft shadows

- Smooth animations

- Glassmorphism cards

- Responsive layout (mobile + desktop friendly)

----------------------------------------

8. DAY / NIGHT MODE TOGGLE

----------------------------------------

Add toggle switch:

Day Mode:

- Brighter water tones

- Lighter overlay

Night Mode:

- Darker blue tones

- Slight glow effect

- Subtle floating particles

Smooth transition between modes.

----------------------------------------

9. TECH STACK REQUIREMENTS

----------------------------------------

Frontend:

- HTML

- CSS (with animation)

- JavaScript

Backend:

- Python Flask

Database:

- SQLite

Code Requirements:

- Clean and modular structure

- Proper database schema

- Secure session handling

- Commented code

- Organized folder structure

----------------------------------------

FINAL FEEL

----------------------------------------

The app should feel:

- Calm

- Premium

- Peaceful

- Motivating

- Clean

- Minimal but alive

No clutter.

No harsh colors.

No fast animations.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://guidedgoals.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/83fc31ae-cce3-4d20-a920-4dd937d24b94).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
