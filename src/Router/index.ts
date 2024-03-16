import { Router } from "express";
import fs from "fs";

const path = `${__dirname}`;

const deleteExtensionFile = (fileName: string): string => {
  return fileName.split(".").shift() || "";
};

const router = Router();

const routerDinamic = async () => {
  const files = fs.readdirSync(path).filter((file) => {
    const fileWithOmitExtension = deleteExtensionFile(file);
    const extensionNoValid = ["index"].includes(fileWithOmitExtension);
    return !extensionNoValid;
  });

  for (const file of files) {
    const fileWithOmitExtension = deleteExtensionFile(file);
    const routerFile = `/${fileWithOmitExtension}`;
    const filePath = `./${fileWithOmitExtension}`;

    const module = await import(filePath);
    router.use(routerFile, module.default);
  }
};

routerDinamic();

export default router;
