#!/usr/bin/env node

import { Command } from "commander";
import simpleGit from "simple-git";
import { readFile, writeFile } from "fs";
import { rimraf } from "rimraf";

const program = new Command();

program
  .command("create-app <name>")
  .description("Clona um repositório do GitHub")
  .action((name) => {
    console.log(`Criando app ${name}...`);
    const git = simpleGit();
    git
      .clone("https://github.com/PS-Smart-Hub/app-template", name || "", {
        "--depth": 1,
      })
      .then(() => {
        const package_json = readFile(
          `./${name}/package.json`,
          "utf-8",
          (err, data) => {
            const parseJSON = JSON.parse(data);
            parseJSON.name = name;

            writeFile(
              `./${name}/package.json`,
              JSON.stringify(parseJSON, null, 2),
              (err) => {
                if (err) {
                  console.error(
                    "Erro ao escrever no arquivo package.json:",
                    err
                  );
                  return;
                }
              }
            );
          }
        );
        console.log("App criado com sucesso!");

        rimraf(`./${name}/.git`)
      })
      .catch((err) => console.error("Erro ao clonar o repositório:", err));
  });

program.parse();
