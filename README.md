# 🧪 Cypress TypeScript Test Automation Framework — Test Strategy

This README explains the design of the Cypress (TypeScript) test framework, why tests were written the way they were, how the framework scales, how to avoid flakiness, how to run it in CI, and how release readiness is measured.

---

# 1. Framework Structure

```
project/
│
├── cypress/
│   ├── e2e/                # All spec files (TS)
│   ├── fixtures/           # Test data (JSON)
│   ├── support/
│   │   ├── commands.ts     # Reusable custom commands
│   │   └── e2e.ts          # Global before/after hooks
│
├── .gitignore
├── cypress.config.ts       # Cypress configuration
├── package.json
├── AI_USAGE.md
└── README.md
```

---


# 2. Why Tests Were Written This Way

Tests follow a clear structure:

* **Arrange** – visit page + clear data
* **Act** – user actions (typing, clicking)
* **Assert** – UI validation

Selectors are:

* Short
* Stable
* Based on class names or text content

Custom commands reduce duplication and improve readability.

The TodoMVC application is extremely small and simple:
Using Page Object Model here would be **unnecessary**

Created two spec files for each Scenario

---

# 3. What Should Be Unit vs Integration vs E2E

### **Unit Tests** (optional, using Jest/Mocha)

Use for:

* Helper functions
* Data formatting
* Pure logic

### **Integration Tests (Cypress + stubs)**

Use for:

* Mocking results with `cy.intercept()`
* Testing error states
* Testing loading states

### **E2E Tests**

Used for critical flows:

* Add todo
* Mark complete
* Clear completed
* Delete todo
* UI persistence

---

# 4. Scalability Strategy

This lightweight framework can scale easily because:

* No unnecessary POM complexity
* Custom commands handle repeated logic
* Fixtures allow consistent test data
* Independent test design avoids shared state
* Cypress parallel execution can be added later

---

# 5. Preventing Flaky Tests

### Strategies used:

✔ No hard waits
✔ Use of `cy.contains`, `cy.get`, and retry-friendly assertions
✔ Clearing app state before each test
✔ Stable selectors
✔ Intercept-based deterministic mocking

---

# 6. CI Integration Strategy

A simple CI pipeline (GitHub Actions example):

```
name: Cypress Tests

on:
  pull_request:
  push:
    branches:
      - main

jobs:
  cypress-run:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 18.18.2

      - name: Install dependencies
        run: npm install

      - name: Run Cypress tests
        run: npx cypress run
```

---

# 7. Measuring Release Readiness

### Metrics:

* Automated test coverage
* Zero critical failures in regression
* Green CI builds for last few PRs
* Low flakiness (<2%)
* All critical user flows validated
* Requirements mapped to tests

---
