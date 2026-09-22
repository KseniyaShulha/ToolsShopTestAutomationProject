import path from "path";
import fs from "fs";

export type UserKey = "admin" | "customer1" | "customer2" | "customer3";

export class TokenStore {
  private static instance: TokenStore;

  private readonly tokens: Map<UserKey, string> = new Map();

  private constructor() {}

  static getInstance(): TokenStore {
    if (!TokenStore.instance) {
      TokenStore.instance = new TokenStore();
    }
    return TokenStore.instance;
  }

  // Return token for a user, reading it from disk only on the first request
  getToken(fileName: UserKey): string {
    const cachedToken = this.tokens.get(fileName);
    if (cachedToken) {
      return cachedToken;
    }

    const jsonPath = path.resolve(__dirname, `../.auth/${fileName}.json`);
    const raw = fs.readFileSync(jsonPath, "utf-8");
    const storageState = JSON.parse(raw);
    const token = storageState["origins"][0]["localStorage"][0]["value"];

    this.tokens.set(fileName, token);
    return token;
  }
}
