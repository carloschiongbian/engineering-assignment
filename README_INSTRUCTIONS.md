========================================================================================================

# Tech Stack
React, TypeScript, Next.js, Tailwind, AntDesign, Axios, PrismaORM, and SQLite

# How to start the project
1. Use the command "npm install" to install the packages
2. Use the command "npm run db:push" to initialize the local database
3. Use the command "npm run db:seed" to populate the local database with the data from grants.json
4. Use the command "npm run dev" to start the frontend and backend of the webapp.
5. Simply enter the name of a grant, or use any of the filters to get the desired grant search matches.
6. Click on the "Grant Card" to see more details.

# My Approach
I started by inspecting the dataset to understand the shape of the data and identify which fields were most relevant for filtering. From there, I built the UI first and simulated the filtering logic on the frontend to quickly validate the user experience without introducing backend complexity early on.

Once I've established the flow correctly, I integrated a simple backend using Prisma and SQLite, and seeded the data locally. This allowed me to transition cleanly from a "front-end only" mocked setup to a working API setup with a functioning backend service.

# Dev Notes
1. The env file was intentionally included in the repository. While not best practice, I made that tradeoff here to reduce setup friction and ensure the project runs immediately for reviewers.

2. I used Cursor as my AI tool to speed up parts of the UI development, which allowed me to focus more on how the data is filtered, queried, and consumed across the frontend and backend.

3. For the filters, I focused on applicant_type, revenue_band, requires_local_entity, and requires_new_market.
I made the assumption that these act as primary eligibility gates—criteria users are most likely to know upfront. This makes them effective for quickly narrowing down results.

I chose not to include fields like business_goals or supports as filters to avoid overloading the UI with options that may introduce noise or ambiguity early in the decision process. Instead, I surfaced those details in the Grant Card pop-up, where users can evaluate them more meaningfully after the initial filtering.

========================================================================================================
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
.
# Grantbii Software Engineering Assignment

This assignment is based on a simplified version of a real product problem we have worked on at Grantbii.

## The task

Build a small application that allows a user to enter a business profile and receive relevant grant recommendations.

A simplified grant dataset is included in this repository for use in the assignment. You may interpret, transform, or extend it if useful, but please explain any meaningful changes.

## Scope

Your solution should include:

- a web UI
- a backend service

## Submission

Please complete the assignment in a private repository and grant reviewer access using the contact details provided in our email, or provide equivalent access on your chosen platform when you are ready for review.

Please also include:

- instructions for running the project locally
- a short write-up covering your assumptions, open questions, and tradeoffs

## Guidance

Treat this like a real piece of engineering work, while keeping the scope proportionate to the assignment.

Your submission should be straightforward for another engineer to run, review, and reason about.

A thoughtful, well-scoped solution is better than a broad one.

We are not looking for maximum feature count or polish for its own sake.
