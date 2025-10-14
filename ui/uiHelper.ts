import { BrowserContext } from "@playwright/test";
import fs from "fs";
import path from "path";

export async function addCookies(
  testContext: BrowserContext,
  fileName: "admin" | "customer1" | "customer2" | "customer3",
): Promise<void> {
  const cookiesPath = path.resolve(__dirname, `../.auth/${fileName}.json`);

  const raw = fs.readFileSync(cookiesPath, "utf-8");

  const storageState = JSON.parse(raw);

  await testContext.storageState(storageState);
}
