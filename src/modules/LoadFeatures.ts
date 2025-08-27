import { Client } from "discord.js";
import fs from "fs";
import path from "path";

export class LoadFeatures {
  public features: any[] = [];

  constructor(instance: Client) {
    this.loadFeatures(instance).then(() => {
      console.log(this.features.map((f) => f.constructor.name));
    });
  }

  private async loadFeatures(instance: Client) {
    const featuresPath = path.resolve("./features");
    const files = fs.readdirSync(featuresPath).filter((f) => f.endsWith(".js"));

    for (const file of files) {
      const modulePath = path.join(featuresPath, file);

      const importedModule = await import(`file://${modulePath}`);

      const className = path.basename(file, ".js");

      const FeatureClass = importedModule.default ?? importedModule[className];

      if (!FeatureClass) {
        console.warn(
          `Keine exportierte Klasse "${className}" in ${file} gefunden!`
        );
        continue;
      }

      const featureInstance = new FeatureClass(instance);

      this.features.push(featureInstance);
    }
  }
}
