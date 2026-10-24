# Skill & Tell Website

## Overview

This project has been migrated to **Next.js (App Router)**

---

# Routing

Next.js works with **file-system routing**. You can think of it like the file explorer on your laptop: whenever Next.js finds a `page.tsx` (or `page.jsx`) inside a folder, it automatically creates a route using that folder's name.

For example:

```
app/
└── about/
    └── page.tsx
```

becomes:

```
/about
```

---

# Project Structure

The project currently has three main route groups:

```
/
├── Landing Page
├── registervsv

```

### `/`

The main Skill & Tell landing page.

### `/register`

Used for registering new members into the **Skill & Tell club**.and if you add the name of the event to the route it becomes the
event page (the registrations ones )

Contains all event registrations.

Each event has its own route:

```
/register/arcade
/register/eunoia
/register/mobai
```

Inside every event there are two registration pages:

```
organizer/
participant/
```

which gives routes like:

```
/register/arcade/organizer
/register/arcade/participant
```

---

# Folder Organization

Every event follows the same structure.

```
app/
└── registr/
    ├── page.tsx
    └── (events)/
        └── arcade/
            ├── page.tsx
            ├── layout.tsx
            ├── organizer/
            │   └── page.tsx
            ├── participant/
            │   └── page.tsx
            └── features/
                ├── components/
                ├── sections/
                ├── lib/
                └── ...
```

I grouped everything related to a route inside a `features` folder to keep things organized and easier to work with.

---

# Changes Made

- Reorganized the project structure by grouping each route's files inside its own `features` folder.
- Converted the **landing page** animations to **Framer Motion**.
- Kept the existing CSS animations since they're native and generally faster.
- Changed the custom mouse cursor back to the default browser cursor because it felt too big and wasn't very smooth. If you'd like the old one back, just let me know so I restore it.

---

Managers / Team Section (CMS)

The managers shown on the landing page's team section are no longer hardcoded , they're managed dynamically through a **Payload CMS** backend, deployed separately at:

https://skillandtell-website-cms-omuq.vercel.app/

Club admins can add, edit, or remove managers (name, role, picture, description, socials) directly from that CMS's admin panel, and the changes flow through to the frontend without needing a code change or redeploy.

### Caching

The frontend fetches manager data using Next.js's built-in fetch caching, currently set to a **3-month revalidation window** , meaning the data is fetched once and then reused for about 3 months before Next.js checks the CMS again for updates. This keeps the site fast and avoids hitting the database on every page load, since manager info doesn't change often.

Managers / Team Section (CMS)

The managers shown on the landing page's team section are no longer hardcoded , they're managed dynamically through a **Payload CMS** backend, deployed separately at:

https://skillandtell-website-cms-omuq.vercel.app/

Club admins can add, edit, or remove managers (name, role, picture, description, socials) directly from that CMS's admin panel, and the changes flow through to the frontend without needing a code change or redeploy.

### Caching

## The frontend fetches manager data using Next.js's built-in fetch caching, currently set to a **3-month revalidation window** , meaning the data is fetched once and then reused for about 3 months before Next.js checks the CMS again for updates. This keeps the site fast and avoids hitting the database on every page load, since manager info doesn't change often.

# Future Improvements

```
-using typescript I didn't convert to it because it's too strict and unforgiving about types and to and since we will redeploying
the project very often it can cause too many pb when doing that I didn't convert to it, but hopefully we can do that later
-now for the different version of events like arcade 26/25... I am planing to use routes like /arcade/26 or /arcade25 this if we wanna each version of the event in a different page or we can include them all in one page and then use the route /arcade

<force redeploy>

```

---

# Main website redesign (`new_design` branch)

The public site is now a multi-page experience inside `app/(main)`:

| Route       | Content                                                                                                                                                                                   |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`         | Hero (rotating WebGL planet), values ribbons, Who are we?, statistics, Missions teaser, events (horizontal scroll), heads, Chrome extension, department test, F&Q, partner call-to-action |
| `/events`   | Latest event, filterable archive by year, ARCADE editions, photo gallery with lightbox                                                                                                    |
| `/missions` | The Skill&Tell Missions format: phases, XP ranks, tracks, leaderboards                                                                                                                    |
| `/team`     | Executive board and departments (live from the CMS), previous offices                                                                                                                     |
| `/partner`  | Why partner, audiences, formats, logos, process, contact form (opens a pre-filled email)                                                                                                  |

The `/register/...` pages are untouched.

### Motion stack

- **GSAP** (+ ScrollTrigger, SplitText, Flip, MotionPath) , registered once in `lib/motion/gsap.js`.
- **Lenis** smooth scrolling , `components/site/SmoothScroll.jsx`, synced with ScrollTrigger.
- Page transitions , `components/site/TransitionShell.jsx` + `TLink` (use `TLink` instead of `Link` for internal links to get the curtain).
- Declarative scroll reveals , `components/motion/useReveals.js` (`data-reveal`, `data-split`, `data-reveal-stagger`, `data-parallax`).
- Everything respects `prefers-reduced-motion`.

### Where to edit content

- `data/skillntell/events.json` , events (add `category`, `editions`, or `placeholder: true` for an event whose details are not ready, like ARWAh).
- `data/skillntell/offices.js` , previous offices shown on /team (the 2025 – 2026 office reads `managers-info.json`).
- `data/skillntell/missions.js` , Missions platform URL, Solo Leveling copy, gates, phases, ranks, tracks and facts (images in `public/images/missions/`).
- `data/skillntell/partner.js` , partner page formats, process and F&Q.
- `data/skillntell/site.js` , navigation, contacts, socials, headline stats, partner logos, Chrome extension.
- Managers still come from the Payload CMS (fallback: `data/skillntell/managers-info.json`); departments are derived from roles in `lib/utils/team.js`.
