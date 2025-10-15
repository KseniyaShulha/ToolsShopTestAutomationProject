import { test as setup } from "@playwright/test";
import { loginApi } from "../api/apiHelper";
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
  setup(setupDataObj.setupName, async ({ request }) => {
    // Resolve a path to a file with cookies
    const cookiesPath = path.resolve(process.cwd(), setupDataObj.authFile);

    // Open the file and convert it into utf-8
    const raw = fs.readFileSync(cookiesPath, "utf-8");

    // Convert file into obj
    const rawObj = JSON.parse(raw);

    console.log(JSON.stringify(rawObj, null, 2));

    const token = await loginApi(setupDataObj.creds, request);

    console.log("Token", token);

    rawObj["origins"][0]["localStorage"][0]["value"] = token;

    console.log("updatedStorageObj", JSON.stringify(rawObj, null, 2));

    fs.writeFileSync(
      setupDataObj.authFile,
      JSON.stringify(rawObj, null, 2),
      "utf-8",
    );

    // process.env.setupDataObj
  });
}
