export class Urls {
  protected apiUrl: string;
  protected appUrl: string;

  constructor() {
    // Define apiUrl and appUrl based on the environment var
    if (process.env.ENVIRONMENT === "staging") {
      this.apiUrl = "https://api.practicesoftwaretesting.com/";
      this.appUrl = "https://practicesoftwaretesting.com/";
    } else if (process.env.ENVIRONMENT === "integration") {
      this.apiUrl = "https://api-with-bugs.practicesoftwaretesting.com/";
      this.appUrl = "https://with-bugs.practicesoftwaretesting.com/";
    } else {
      throw new Error("Wrong env");
    }
  }

  // Get URL based on env
  getUrls(): any {
    // Return object with defined urls
    const urlObj: object = { apiUrl: this.apiUrl, appUrl: this.appUrl };
    console.log("Get env URLs: ", urlObj);
    return urlObj;
  }
}
