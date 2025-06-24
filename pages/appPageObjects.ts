import { Page } from "@playwright/test";
import BasePage from "./basePage";
import { HomePage } from "./homePage/homePage";
import { LoginPage } from "./auth/loginPage";
import { SignUpPage } from "./signUp/signUpPage";
import { AccountPage } from "./accountPage/accountPage";
import { ItemPage } from "./itemPage/itemPage";
import { ShoppingCartPage } from "./shoppingCart/shoppingCartPage";
import { CheckoutPage } from "./checkoutPage/checkoutPage";
import { CategoriePage } from "./categoriePage/categoriePage";
import { RentalsPage } from "./rentalsPage/rentalsPage";
import { NavigationBarPage } from "./navigationBar/navigationBar";
import { ContactPage } from "./contactPage/contactPage";
import { ForgotPasswordPage } from "./forgot-passwordPage/forgot-passwordPage";
import { FavoritesPage } from "./favoritesPage/favoritesPage";
import { ProfilePage } from "./profilePage/profilePage";
import { InvoicesPage } from "./invoicesPage/invoicesPage";
import { MessagesPage } from "./messagesPage/messagesPage";

export class AppPageObjects extends BasePage {
  // Constructor for the class
  constructor(page: Page) {
    super(page);
  }

  // Methods
  homePage() {
    // Return instance of Homepage
    return new HomePage(this.page);
  }

  loginPage() {
    // Return instance of Loginpage
    return new LoginPage(this.page);
  }

  signUpPage() {
    // Return instance of SignUpPage
    return new SignUpPage(this.page);
  }

  accountPage() {
    // Return instance of AccountPage
    return new AccountPage(this.page);
  }

  itemPage() {
    // Return instance of ItemPage
    return new ItemPage(this.page);
  }

  shoppingCartPage() {
    // Return instance of ShoppingCartPage
    return new ShoppingCartPage(this.page);
  }

  checkoutPage() {
    // Return instance of CheckoutPage
    return new CheckoutPage(this.page);
  }

  categoriePage() {
    // Return instance of CategoriePage
    return new CategoriePage(this.page);
  }

  rentalPage() {
    // Return instance of RentalsPage
    return new RentalsPage(this.page);
  }

  navigationBarPage() {
    // Return instance of NavigationBarPage
    return new NavigationBarPage(this.page);
  }

  contactPage() {
    // Return instance of ContactPage
    return new ContactPage(this.page);
  }

  forgotPasswordPage() {
    // Return instance of ForgotPasswordPage
    return new ForgotPasswordPage(this.page);
  }

  favoritesPage() {
    // Return instance of FavoritesPage
    return new FavoritesPage(this.page);
  }

  profilePage() {
    // Return instance of ProfilePage
    return new ProfilePage(this.page);
  }

  invoicesPage() {
    // Return instance of InvoicesPage
    return new InvoicesPage(this.page);
  }

  messagesPage() {
    // Return instance of MessagesPage
    return new MessagesPage(this.page);
  }
}
