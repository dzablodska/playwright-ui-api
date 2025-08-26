# Test Automation Challenge – Playwright (TypeScript)

This repository implements **UI** (SauceDemo) and **API** (ReqRes) tests using Playwright with best practices.

## Tech choices

- **Playwright + TypeScript**
- Page Object Model, typed fixtures, and an **auth setup project** that reuses a persisted session
- Playwright HTML report for UI debugging (screenshots, traces, videos on failure)
- Allure report aggregating API runs (step details, attachments, labels, links)
- GitHub Actions pipeline with separate UI and API jobs
- Sensitive values (e.g., REQRES_API_KEY) stored as GitHub Secrets

## Structure

- `pages/`: Page Object Model (encapsulates locators + actions)
- `steps/`: Reusable **business flows** (login, checkout, sorting) that make tests concise and readable
- `tests/`: Test specs that focus on intent and assertions

## How to run locally

```bash
npm ci
npx playwright install --with-deps

# Optional env overrides
export UI_BASE_URL=https://www.saucedemo.com
export SAUCE_USER=standard_user
export SAUCE_PASS=secret_sauce
export REQRES_BASE=https://reqres.in

# Run everything
npm test

# UI only
npm run test:ui

# API only
npm run test:api

# Open HTML report (UI)
npm run report

# Generate and open Allure report (API)
npx allure generate allure-results -o allure-report --clean
npx allure open allure-report

```

## What’s covered

### UI (SauceDemo)

1. **Failed login** validation
2. **Sort items Z→A** and assert sorting
3. **Full checkout** with at least two items; validate totals (`item total + tax ≈ total`)

### API (ReqRes)

1. Retrieve a list of users (page 2).
   I chose to validate `/api/users?page=2` instead of the default first page.  
   This shows that the test suite correctly handles **query parameters and pagination**
2. Successful login
3. Update user (PUT)
4. Delete user
5. Two negatives (missing password, user not found)
6. Parameterized **delayed** request (≤ 3s) with duration measurement (annotated in test)

## Reporting

- Playwright **HTML** report generated at `playwright-report/` (screenshots, traces, videos).
- Allure report → aggregates results from both UI and API projects into a single dashboard
- In CI all the report are uploaded as artifacts you can download from the workflow run.

## CI/CD (GitHub Actions)

- UI job runs SauceDemo tests on Chromium, uploads Playwright HTML report.
- API job runs ReqRes tests, uploads Allure results.
- Allure results can be downloaded.
- Secrets such as REQRES_API_KEY are configured as environment variables in Repository → Settings → Secrets and variables → Actions.

## Assumptions

- Data-test attributes on SauceDemo are stable; we use `getByTestId` (configured to `data-test`).
- Timing tolerance for ReqRes delayed endpoint allows slight jitter from 3 seconds.

## AI usage

Used AI for refactoring ideas and validation, but all final code was reviewed, adapted, and validated by me. I'm the driver and I used AI as an assistant.
