import { Asset } from "@/lib/models";
import { generateUUID } from "@/lib/utils";
import fs from "fs";

const filePath =  "assets.json";

export function create(assets: Asset[]) {
  const data = assets.map((asset) => ({
    ...asset,
    id: generateUUID(),
  }));
  let existingData: Asset[] = [];
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    existingData = JSON.parse(fileContent);
  }
  const newData = [...existingData, ...data];
  fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));
}

export function findAll(): Asset[] {
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const fileContent = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileContent);
}

export function findByCompanyId(companyId: string) {
  const data = findAll();
  return data.filter((asset) => asset.companyId === companyId);
}
