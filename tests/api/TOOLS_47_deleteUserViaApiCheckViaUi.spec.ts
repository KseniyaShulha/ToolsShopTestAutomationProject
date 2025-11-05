import { test, expect } from "../fixtures/fixtures";
import {
  testData_TOOLS_47_signUp,
  testData_47_login,
} from "../../testData/testData_TOOLS_47";
import { signUpApi } from "../../api/apiHelper";
import { UserSteps } from "../../steps/steps";
import { Header } from "../../pages/header/header";
import { AdminUsersPage } from "../../pages/adminUsers/adminUsers";

test.describe(
  "TOOLS_47_deleteUserViaApiCheckViaUi",
  { tag: ["@api", "@integration", "@regression"] },
  () => {
    test("Delete user via API check via UI", async ({
      page,
      request,
      adminApi,
    }) => {
      const steps: UserSteps = new UserSteps(page);
      const header: Header = new Header(page);
      const adminUserspage = new AdminUsersPage(page);

      // Send Post request to sign in
      const userObj: any = await signUpApi(testData_TOOLS_47_signUp, request);
      console.log("\nuserObj", userObj);

      // Login as admin via UI
      await steps.loginUi(
        testData_47_login.email,
        testData_47_login.password,
        testData_47_login.surname,
        true,
      );

      // Click on user dropdown menu in header
      await header.clickUserDropdownMenu();

      // Click on orders
      await header.clickUsersAsAdmin();

      // Admin fill in search field with deleted user's email
      await adminUserspage.fillInSearchUserField(userObj.email);

      // Admin clicks on search button
      await adminUserspage.clickOnSearchButton();

      await adminUserspage.waitForUsers();

      // Convert shopping cart table in json format

      const getUsersTableContent: any =
        await adminUserspage.getUsersTableContent();
      expect(getUsersTableContent).toHaveLength(1);

      expect(getUsersTableContent[0]["Id"]).toBe(userObj.id);

      const deleteResponse = await adminApi.deleteUser(userObj.id);
      // Asserting response status is equal to 2**
      await expect(deleteResponse).toBeOK();

      // Click on user dropdown menu in header
      await header.clickUserDropdownMenu();

      // Click on orders
      await header.clickUsersAsAdmin();

      // Admin fill in search field with deleted user's email
      await adminUserspage.fillInSearchUserField(userObj.id);

      // Admin clicks on search button
      await adminUserspage.clickOnSearchButton();

      await adminUserspage.waitForUsers();

      // Convert shopping cart table in json format
      const usersTable = await adminUserspage.getUsersTable();
      await expect(usersTable.locator("tbody")).toBeEmpty();
    });
  },
);
