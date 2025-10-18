import { Client } from "discord.js";
import fs from "fs";
import path from "path";

export class LoadFeatures {
  public features: any[] = [];

  constructor(instance: Client) {
    if (fs.existsSync("./features")) {
      this.LoadFeatures(instance).then(() => {
        console.log(
          `Loaded Functions📜: [ ${this.features.map(
            (f) => f.constructor.name
          )} ]`
        );
      });
    }
  }

  private async LoadFeatures(instance: Client) {
    const featuresPath = path.resolve("./features");
    const files = fs.readdirSync(featuresPath).filter((f) => f.endsWith(".js"));

    for (const file of files) {
      const modulePath = path.join(featuresPath, file);
      const importedModule = await import(`file://${modulePath}`);
      const className = path.basename(file, ".js");
      const FeatureClass = importedModule.default ?? importedModule[className];

      if (!FeatureClass) {
        console.warn(
          `No exportable class "${className}" in ${file} found!`
        );
        continue;
      }

      const FeatureInstance = new FeatureClass(instance);

      this.features.push(FeatureInstance);
    }
  }
}
