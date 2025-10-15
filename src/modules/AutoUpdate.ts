import { exec } from "child_process";

export class AutoUpdate {
  constructor() {
    setInterval(this.updateRepo, 6 * 60 * 60 * 1000);
  }

  updateRepo() {
    exec(
      "cd ../ && cp -r ./configuration ./temp && git reset --hard HEAD && git pull && cp -r ./temp ./configuration && npm install && cp ./package.json ./dist && npx tsc && cd ./dist && npm install && clear",
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
