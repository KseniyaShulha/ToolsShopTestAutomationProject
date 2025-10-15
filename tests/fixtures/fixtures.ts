import { test as base, expect } from "@playwright/test";
import { AdminApi } from "../../api/adminApi";
import { AppPageObjects } from "../../pages/appPageObjects";
import { getTokenFromJson } from "../../api/apiHelper";

type MyFixtures = {
  adminApi: AdminApi;
  appPageObjects: AppPageObjects;
};

export const test = base.extend<MyFixtures>({
  adminApi: async ({ request }, use) => {
    // Use a new instance of AdminApi class and a token
    await use(new AdminApi(request, await getTokenFromJson("admin")));
  },
  appPageObjects: async ({ page }, use) => {
    // Use a new instance of AppPageObjects class
    await use(new AppPageObjects(page));
  },
});

export { expect };
