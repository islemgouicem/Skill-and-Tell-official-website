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
├── register

```

### `/`

The main Skill & Tell landing page.

### `/register`

Used for registering new members into the **Skill & Tell club**.and if you add the name of the event to the route it becomes the 
event  page (the registrations ones ) 


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


# Future Improvements

```
-using typescript I didn't convert to it because it's too strict and unforgiving about types and to and since we will redeploying 
the project very often it can cause too many pb when doing that I didn't convert to it, but hopefully we can do that later 
-now for the different version of events like arcade 26/25... I am planing to use routes like /arcade/26 or /arcade25 this if we wanna each version of the event in a different page or we can include them all in one page and then use the route /arcade

```