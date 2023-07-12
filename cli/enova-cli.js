#!/usr/bin/env node

const { program } = require("commander");

program
  .command("init")
  .description("Initialize a new Enova project")
  .action(async () => {
    try {
      const { default: inquirer } = await import("inquirer");
      const { default: fs } = await import("fs-extra");
      const { default: path } = await import("path");

      const { projectName } = await inquirer.prompt([
        {
          type: "input",
          name: "projectName",
          message: "Enter the project name:",
          validate: (input) => {
            if (!input.trim()) {
              return "Please enter a valid project name.";
            }
            return true;
          },
        },
      ]);

      const templatePath = path.join(__dirname, "templates/js");
      const destinationPath = path.join(process.cwd(), projectName);
      console.log("- Creating project...");

      await fs.copy(templatePath, destinationPath);

      console.log(`- Project created successfully in ${destinationPath}`);
      console.log("Next steps:");
      console.log(`- Navigate to the project directory: cd ${projectName}`);
      console.log("- Install dependencies: npm install");
      console.log("- Start the development server: npm run dev");
    } catch (err) {
      console.error("An error occurred while creating the project:", err);
    }
  });

program.parse(process.argv);
