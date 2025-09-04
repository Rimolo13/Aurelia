import { exec } from "child_process";

export class AutoUpdate {
  constructor() {
    setInterval(this.updateRepo, 6 * 60 * 60 * 1000);
  }

  updateRepo() {
    exec(
      "cd .. && cp ./config.json ./src && git pull && npx tsc && cp ./src/config.json .. && cp ./package.json ./dist && cd ./dist && npm install && clear",
      (error: Error | null, stdout: string, stderr: string) => {
        if (error) {
          console.error(`❌ Fehler: ${error.message}`);
          return;
        } else {
          console.log("✅ Update & Build abgeschlossen!");
        }
        if (stderr) console.error(stderr);
        if (stdout) console.log(stdout);
      }
    );
  }
}
