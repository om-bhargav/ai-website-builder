import fs from "fs";
import path from "path";

export function imageToBase64(filePath: string) {
  const absolutePath = path.resolve(filePath);
  const file = fs.readFileSync(absolutePath);
  const ext = path.extname(filePath).replace(".", "");

  return `data:image/${ext};base64,${file.toString("base64")}`;
}