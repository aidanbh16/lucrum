# Lucrum Frontend

This repository contains the frontend for Lucrum, a personal finance management application. Built with Next.js and TypeScript, it provides the user interface for managing income, categories, and financial allocations. The application communicates with backend services for authentication and data persistence.

---

## Overview

The application provides views for:

User signup and login
Monthly income tracking and updates
Category-based budgeting (expenses, savings, credit/debt)
Allocation management within categories
Real-time UI updates based on user actions

Authentication state is managed via JWT tokens stored in HTTP-only cookies, with protected routes enforced through middleware.

---

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- React
- Chart.js

---

## Pages

| Route	            |    Description       |
|-------------------|----------------------|
| /	                | Main dashboard       |
| /account-signin	  | Login page           |
| /account-creation	| Signup page          |
| /account-signout	| Sign out page        |
| /password-reset   | Passwrord reset page |

---

## Environment Variables

| Variable                | Description                                   |
|-------------------------|-----------------------------------------------|
|NEXT_PUBLIC_API_BASE_URL |	Base URL for backend authentication endpoints |

---

## Notes

- This repository contains only the frontend application
- Backend services are hosted separately
- Backend repos can be seen publicly as well and are called the following:
  - lucrum-income-management
  - lucrum-account-management
  - lucrum-accoun-summary
 
---

## Instructions

The YouTube video below shows how to run the Lucrum project locally:
https://youtu.be/2uu_PGzhg7c

To follow along, download the following repositories:

[lucrum-income-management](https://github.com/aidanbh16/lucrum-income-management)
[lucrum-account-management](https://github.com/aidanbh16/lucrum-account-management)

Open all three in VS Code.
Run each project in its own terminal using npm run dev.

Once running, open the frontend link shown in the terminal (usually http://localhost:3000).

The video uses Developer Tools and the Network tab to show how the frontend communicates with the backend.

It walks through:

Account creation
Account sign-in
The main dashboard

On the main page, it demonstrates:

Adding income sources
Creating categories
Adding expense allocations

Finally, it shows:

The sign-out button
The password reset page

