import { Urls } from "./utils/urls";
import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  testDir: "./tests",

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 5 : 1,

  reporter: [["html", { open: "never" }]],

  use: {
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "retain-on-failure",
    baseURL: new Urls().getUrls().appUrl,
  },

  projects: [
    { name: "setup", testMatch: "auth.setup.ts", use: { headless: true } },
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
      dependencies: ["setup"],
    },
  ],
});
