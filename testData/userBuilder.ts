type UserRole = "ADMIN" | "CUSTOMER_1" | "CUSTOMER_2" | "CUSTOMER_3";

export class UserBuilder {
  private data: any = {};

  withUserData(user: UserRole): this {
    this.data.userData = {
      email: process.env[`${user}_EMAIL`],
      password: process.env[`${user}_PASSWORD`],
      surname: process.env[`${user}_SURNAME`],
    };
    return this;
  }

  build(): any {
    return this.data;
  }
}
