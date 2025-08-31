import { exec } from "child_process";

export class AutoUpdate {
  constructor() {
    setInterval(this.updateRepo, 10 * 60 * 1000);
    this.updateRepo();
  }

  updateRepo() {
    exec(
      "cd .. && git pull && npx ncu -u && npm install && npx tsc",
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
