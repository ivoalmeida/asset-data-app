export async function readJsonFile(file: File) {
  return readFile(file, JSON.parse);
}

export async function readCsvFile(file: File) {
  return readFile(file, csvJSON);
}

export async function readFile(
  file: File,
  parseFn: (content: string) => Record<string, string | number>[]
) {
  return new Promise((resolve, reject) => {
    if (!file) new Error("File is not defined");
    if (!parseFn) new Error("Parser function is not defined");

    const fileReader = new FileReader();
    fileReader.onload = (event: ProgressEvent<FileReader>) => {
      if (event.target) {
        const result = event?.target?.result;
        if (typeof result === "string") {
          const parsedData = parseFn(result);
          resolve(parsedData);
        } else {
          reject(new Error("File content is not a string"));
        }
      }
    };
    fileReader.onerror = (error) => reject(error);
    fileReader.readAsText(file);
  });
}

export function csvJSON(csv: string) {
  const lines = csv
    .trim()
    .replace(/^\'|\'$/g, "")
    .split("\n");
  const headers = lines?.shift?.()?.split(",") || [];
  const data = lines.map((line) => {
    const row: Record<string, string | number> = {};
    headers.forEach((header, index) => {
      if (index === 0) {
        row[header] = line.replaceAll('"', "").split(",")[index];
      } else {
        row[header] = parseFloat(line.split(",")[index]);
      }
    });
    return row;
  });

  return data;
}


export function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}