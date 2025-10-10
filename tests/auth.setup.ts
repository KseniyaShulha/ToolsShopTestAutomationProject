import { test as setup } from "@playwright/test";
import { UserSteps } from "../steps/steps";
import path from "path";
import fs from "fs";

setup.use({ headless: true });

// Test data for TOOLS-50
const setupDataArr = [
  {
    setupName: "Customer_1 login",
    creds: {
      email: "customer@practicesoftwaretesting.com",
      password: "welcome01",
    },
    authFile: ".auth/customer1.json",
    surname: "Doe",
  },
  {
    setupName: "Customer_2 login",
    creds: {
      email: "customer2@practicesoftwaretesting.com",
      password: "welcome01",
    },
    authFile: ".auth/customer2.json",
    surname: "Howe",
  },
  {
    setupName: "Customer_3 login",
    creds: {
      email: "customer3@practicesoftwaretesting.com",
      password: "pass123",
    },
    authFile: ".auth/customer3.json",
    surname: "Smith",
  },
  {
    setupName: "Admin login",
    creds: {
      email: "admin@practicesoftwaretesting.com",
      password: "welcome01",
    },
    authFile: ".auth/admin.json",
    surname: "Doe",
  },
];

// Iterate over setup data
for (const setupDataObj of setupDataArr) {

  // Run test based on test data
  setup(setupDataObj.setupName, async ({ page }) => {

    // Resolve a path to a file with cookies
    const cookiesPath = path.resolve(process.cwd(), setupDataObj.authFile);

    // Open the file and convert it into utf-8
    const raw = fs.readFileSync(cookiesPath, "utf-8");

    // Save into object
    const storageState = JSON.parse(raw);

    if (Date.now > storageState["expires"]) {
      const steps = new UserSteps(page);

      await steps.loginUi(
        setupDataObj.creds.email,
        setupDataObj.creds.password,
        setupDataObj.surname,
        setupDataObj.setupName.includes("Admin") ? true : false,
      );

      // Add cookies to browser context
      await page.context().storageState({ path: setupDataObj.authFile });

      console.log(`Cookies are set for the user ${setupDataObj.creds.email}`);
    } else {
      console.log(
        `Existed cookies are valid for the user ${setupDataObj.creds.email}`,
      );
    }
  });
}
