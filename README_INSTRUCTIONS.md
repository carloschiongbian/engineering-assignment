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
I inspected the data given in the grants.json file, afterwards, I built out the UI so that I could simulate the data filtering without the backend. Once I was satisfied with how the filter was simulated, I slowly integrated the backend service with PrismaORM and SQLite. To populate the local database, I seeded the data through the script in seed.ts so that I would be able to make successful requests via Axios.

# Dev Notes
1. The env file was intentionally included in the repository. Not best practice, but for this task there's no danger.
2. I made use of Cursor to help build out the UI while I focused more on how the data was manipulated, queried, and consumed on by the frontend and backend.
3. For the filters, I focused on applicant_type, revenue_band, local_entity, and new_market since these fields are the most effective for narrowing down results early. They represent high-level eligibility criteria that users are likely to know upfront, which makes the filtering experience faster and more intuitive. The rest of the information is still important, but I placed it inside the Grant Card pop-up since those details are better suited for deeper evaluation once the user has a smaller, more relevant set of options.

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
