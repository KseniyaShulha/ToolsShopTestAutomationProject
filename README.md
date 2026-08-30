# ToolsShopTestAutomationProject

An automated testing framework for the [Practice Software Testing](https://practicesoftwaretesting.com) e-commerce application (an online tool store). The project is built with TypeScript and Playwright.

## Test Coverage

The framework covers three types of tests:

- **UI tests** — end-to-end user scenarios through the browser (login, add to cart, checkout, payment flows)
- **API tests** — backend verification via HTTP requests (products, users, cart, invoices)
- **Mixed tests** — data setup via API, result verification via UI

## Project Structure

```
├── .auth/                  # Stored auth tokens (admin, customer1-3)
├── .github/workflows/      # GitHub Actions CI/CD pipelines
│   ├── run_eslint_pr.yaml  # ESLint check on PR
│   └── run_tests_pr.yaml   # Playwright tests on push/PR
├── api/                    # API layer
│   ├── baseAPI.ts          # Abstract base class for all API classes
│   ├── apiHelper.ts        # Reusable API helper functions
│   ├── usersApi.ts         # Users endpoints
│   ├── adminApi.ts         # Admin endpoints
│   ├── cartApi.ts          # Cart endpoints
│   ├── categoryApi.ts      # Category endpoints
│   ├── productsApi.ts      # Products endpoints
│   ├── paymentApi.ts       # Payment endpoints
│   ├── invoiceApi.ts       # Invoice endpoints
│   └── responseData/       # Expected API response structures
├── pages/                  # Page Object Model layer
│   ├── basePage.ts         # Abstract base class for all page classes
│   ├── appPageObjects.ts   # Factory class for all page instances
│   └── ...                 # Page-specific classes (LoginPage, CheckoutPage, etc.)
├── steps/
│   └── steps.ts            # Reusable user flows (loginUi, addToCart, signOut)
├── testData/               # Isolated test data per ticket
├── tests/
│   ├── fixtures/           # Playwright fixtures (appPageObjects, adminApi)
│   ├── auth.setup.ts       # Auth setup — logs in 4 users, saves tokens
│   ├── ui/                 # UI test specs
│   └── api/                # API test specs
└── utils/
    └── urls.ts             # Environment-based URL management
```

## Architecture

The framework is built on the **Page Object Model (POM)** pattern with class inheritance:

```
BasePage (abstract)
    ├── LoginPage
    ├── HomePage
    ├── CheckoutPage
    └── ... (all page classes)

BaseAPI (abstract)
    ├── UsersApi
    ├── CartApi
    ├── ProductsApi
    └── ... (all API classes)
```

**Authentication flow:** `auth.setup.ts` logs in 4 users via API before the test suite runs and saves their tokens to `.auth/*.json` files. UI tests reuse these tokens via Playwright `storageState` — no UI login needed per test.

**Fixtures:** `fixtures.ts` injects `appPageObjects` and `adminApi` into every test automatically, eliminating boilerplate setup code.

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Running Tests

```bash
# Run tests (set SCOPE to filter by tag)
SCOPE="@smoke" npm run ci:test

# Run ESLint
npm run ci:eslint
```

### Environment Setup

Create a `.env` file in the root directory based on `.env.example`:

```dotenv
CUSTOMER_1_EMAIL=""
CUSTOMER_1_PASSWORD=""
CUSTOMER_1_SURNAME=""
CUSTOMER_2_EMAIL=""
CUSTOMER_2_PASSWORD=""
CUSTOMER_2_SURNAME=""
CUSTOMER_3_EMAIL=""
CUSTOMER_3_PASSWORD=""
CUSTOMER_3_SURNAME=""
ADMIN_EMAIL=""
ADMIN_PASSWORD=""
ADMIN_SURNAME=""
ENVIRONMENT="staging"
```

## CI/CD

The project uses GitHub Actions for continuous integration:

- **On every push and PR to `main`** — Playwright tests run automatically on a clean Ubuntu VM: install Node.js → install dependencies → install browsers → run tests → upload HTML report → send results to Slack
- **On schedule** — runs on the 1st of every month
- **Manual trigger** — `workflow_dispatch` allows choosing environment (`staging` / `integration`) and test scope (`@smoke`, `@regression`, `@invoice`, etc.)

## Test Tags

| Tag | Description |
|-----|-------------|
| `@smoke` | Critical path, runs on every PR |
| `@regression` | Full test suite |
| `@api` | API tests only |
| `@ui` | UI tests only |
| `@auth` | Authentication tests |
| `@payment` | Payment-related tests |
| `@products` | Product-related tests |
| `@cart` | Cart-related tests |
| `@invoice` | Invoice-related tests |
| `@negative` | Negative scenarios |
| `@integration` | Mixed API + UI tests |
