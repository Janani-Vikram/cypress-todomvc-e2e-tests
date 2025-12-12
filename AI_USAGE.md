# AI_USAGE.md

## AI Assistance Summary

This document describes how AI was used during the development of the Cypress E2E testing framework for the TodoMVC (Playwright demo) application.

---

## 1. Generating Tests

AI was used to:

* Propose initial Cypress test structures for critical user flows.
* Draft Scenario A and Scenario B test cases.
* Suggest deterministic approaches for UI-only TodoMVC behavior.

**Value delivered:**

* Faster creation of baseline test files.
* Clean, readable test skeletons.

**Human corrections:**

* Adjusted tests to match real application behavior (since this TodoMVC does not use API or localStorage).
* Replaced unworkable stubbing strategies with UI-based mocking.

---

## 2. Refactoring Selectors

AI helped identify and standardize selectors such as:

* `.new-todo`
* `.todo-list li`
* `.toggle`
* `.destroy`
* `.clear-completed`

**Value delivered:**

* Reduced flaky selectors.
* Improved test readability.

**Human corrections:**

* Ensured selectors match the exact DOM of the Playwright TodoMVC, which differs slightly from standard TodoMVC implementations.

---

## 3. Writing Edge Cases

AI generated edge-case scenarios such as:

* Ensuring the list is empty before each run.
* Handling UI lists that re-render after each delete.
* Deleting todos one-by-one to avoid Cypress multiple-element errors.

**Value delivered:**

* Improved stability of the suite.

**Human corrections:**

* Replaced incorrect suggestions involving `localStorage` and `cy.intercept()` because the application does not support backend mocks.

---

## 4. Validating Test Strategy

AI validated and improved overall strategy:

* Recommended preferring UI-driven setup since no API or storage layer exists.
* Suggested recursive and sequential deletion to avoid flaky tests.
* Redefined Scenario B to reflect an in-memory UI (not API-based) test.

**Value delivered:**

* Corrected initial misunderstanding about app architecture.
* Ensured deterministic execution.

**Human corrections:**

* Confirmed real application behavior and adjusted the strategy accordingly.

---

## 5. Improving Fixtures or Mocks

AI assisted in:

* Drafting fixture-based mock structures.
* Highlighting the failure points when mocking isn't possible.

**Value delivered:**

* Faster fixture creation.
* Clear understanding of why mocks do not apply to this app.

**Human corrections:**

* Removed unsupported mocks (e.g., API responses, localStorage-based setups).
* Replaced mocks with UI-driven creation.

---

## What AI Handled Well

* Generating clean test templates.
* Suggesting stable Cypress patterns.
* Identifying selector patterns and refactoring options.
* Recognizing Cypress-specific pitfalls (e.g., multiple element click errors).
* Explaining why certain mock approaches would not work.

---

## What Required Human Override

* Understanding that this Playwright demo uses an **in-memory todo store**.
* Realizing that:

  * `cy.intercept()` does not work (no network).
  * LocalStorage mocks do not work (app ignores storage on load).
  * The clear-completed button behavior differs.
* Implementing stable, UI-driven list resets.

---

## Final Notes

AI was used as a productivity accelerator, but all final behavior was validated manually against the actual TodoMVC demo application. Testing decisions were based on real-world DOM behavior, not assumptions.

This document reflects a transparent record of how AI contributed to this project and where human testing expertise was essential.