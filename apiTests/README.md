# API Test Automation

## Setup

```
cd apiTests

npm install
```

## Execution

```
// Running in dev environment
npm run test-dev

// Running in int environment
npm run test-int
```

## Legend

-   😊 : Positive Scenarios
-   😢 : Negative Scenarios

## Defects / Observations

-   Endpoint should return Response Status 403 Forbidden when using methods such as POST

-   Endpoint should be lowercase getNavPriceList -> getnavpricelist

-   Endpoint should utilise CORS instead of JSONP as it supports better error-handling and improved security

-   Open Point: Should all currency be in AUD? I noticed 2 currencyCode field set as USD
