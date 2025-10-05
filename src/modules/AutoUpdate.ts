import { exec } from "child_process";

export class AutoUpdate {
  constructor() {
    setInterval(this.updateRepo, 6 * 60 * 60 * 1000);
  }

  updateRepo() {
    exec(
      "cd .. && cp ./config.json ./src && git reset --hard HEAD && git pull && cp ./src/config.json .. && npm install && rm -r ./dist/node_modules && cp -r ./node_modules ./dist && cp ./package.json ./dist && npx tsc && clear",
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
