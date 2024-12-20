# Use the official Playwright Docker image
FROM mcr.microsoft.com/playwright:v1.35.0-focal

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files first to optimize Docker layer caching
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the entire project into the container
COPY . .

# Run the tests when the container starts
#CMD ["npm", "test"]

RUN mkdir -p /app/reports

# Define the command to run the tests (including generating Cucumber report)
CMD ["npx", "cucumber-js", "--require", "step-definitions/**/*.ts",  "--require", "./setup/hooks.ts", "--format", "json:reports/cucumber-report.json", "--format", "html:reports/cucumber-report.html", "--parallel", "2", "--no-strict"]


