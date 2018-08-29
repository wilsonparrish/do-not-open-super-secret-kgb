# DO-NOT-OPEN(kgb-super-secret)

This project will identify car dealership customers who are WAY TOO EXCITED about their experience at McKaig Chevrolet Buick.  It identifies these OVERLY EXCITED CONSUMERS by looking for reviews that contain the most exclamation points because those are OBVIOUSLY SUSPICIOUS.

## To Run

This project uses node v8.11.4 and npm v6.4.0.  After cloning the project, an npm install is required:

```bash
npm i
```

after which, tests can be run with:

```bash
npm test
```

and the tool itself can be used with the command:

```bash
node driver.js
```

## ESLint

This project includes eslint, setup for a node environment with ES2105.  To run, use the following console commands after an npm install:

```bash
.\node_modules\.bin\eslint .\driver.js
.\node_modules\.bin\eslint .\scripts\scrapeReviews.js
.\node_modules\.bin\eslint .\scripts\rankReviews.js
```