#!/usr/bin/env node

const { program } = require("commander");
const { cyan, red, magenta, yellow } = require("colorette");

program
  .command("init")
  .description("Initialize a new Enova project")
  .action(async () => {
    try {
      const { default: inquirer } = await import("inquirer");
      const { default: fs } = await import("fs-extra");
      const { default: path } = await import("path");

      const { projectName, templateLang, templateType } = await inquirer.prompt(
        [
          {
            type: "input",
            name: "projectName",
            message: "Please enter the project name:",
            validate: (input) => {
              if (!input.trim()) {
                return "Ensure that the input is not empty or just whitespaces.";
              }
              return true;
            },
          },
          {
            type: "list",
            name: "templateLang",
            message: "Choose the project language:",
            choices: ["JavaScript", "TypeScript"],
          },
          {
            type: "list",
            name: "templateType",
            message: "Select the project type:",
            choices: ["Basic", "Advanced"],
          },
        ]
      );

      const templatePath = path.join(__dirname, "templates/js");
      const destinationPath = path.join(process.cwd(), projectName);
      console.log(`${yellow("Creating a new project...")}`);
      await fs.copy(templatePath, destinationPath);

      console.log(`
      ${cyan("Project successfully created!🎉")}`);
      console.log(`
      ${magenta("Next steps:")}
      ${cyan(`cd ${projectName}`)}
      ${cyan("npm install")}
      ${cyan("npm run dev")}
      `);
    } catch (err) {
      console.error("An error occurred while creating the project:", err);
    }
  });

program.parse(process.argv);
