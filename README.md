This project is for automated UI browser tests using Cypress with JavaScript, and Page Object Model (POM) pattern

## Get Started 🚀

### Pre-requirements 🚩

Before you begin, ensure you have the following tools installed on your system:

- Node.js (v14 or later)
- npm (v6 or later)
- cypress (globally installed)
- Git
- Docker

### Run Locally 🔥

Clone the project

```bash
  git clone https://github.com/eli-dashti/Foo_Assessment.git
```

Go to the project directory

```bash
  cd Foo_Assessment
```

Install dependencies

```bash
npm install
```

Running Tests locally

```bash
npx cypress run 
```
or
```bash
npm run cypress:run
```

This command will execute the tests using Cypress.

### Run in Docker 🐳

Create the image

```bash
docker build . -f Dockerfile -t=foo_assessment
```

Run the test-app image in a container

```bash
docker run -v "$(pwd)"/cypress/videos:/app/cypress/videos --rm foo_assessment:latest
```
## Reporting 📊
```bash
npm run combine-reports
```
#### Reports can be found in the `mochawesome-report` directory.
