import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://demo.playwright.dev/todomvc",
    retries: 1,
    viewportWidth: 1280,
    viewportHeight: 800,
    testIsolation: false,
    specPattern: "**/todomvc/*.js"
  }
});
