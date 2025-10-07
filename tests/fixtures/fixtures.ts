import { test as base, expect } from "@playwright/test";
import { AdminApi } from "../../api/adminApi";
import { AppPageObjects } from "../../pages/appPageObjects";

type MyFixtures = {
  adminApi: AdminApi;
  appPageObjects: AppPageObjects;
};

export const test = base.extend<MyFixtures>({
  adminApi: async ({ request }, use) => {
    await use(new AdminApi(request));
  },
  appPageObjects: async ({ page }, use) => {
    await use(new AppPageObjects(page));
  },
});

export { expect };
