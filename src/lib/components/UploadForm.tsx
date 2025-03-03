"use client";
import React from "react";
import { Asset } from "@/lib/models/asset";
import { readCsvFile, readJsonFile } from "@/lib/utils";
import styles from "./uploadForm.module.css";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const UploadForm: React.FC<Props> = ({ isOpen, onClose }) => {
  const [data, setData] = React.useState<Asset[]>();
  const [companyId, setcompanyId] = React.useState("");

  const handleCompanyId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setcompanyId(event.target.value);
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile && selectedFile.type === "application/json") {
      const parseData = await readJsonFile(selectedFile);
      console.log(parseData);
      setData(parseData as Asset[]);
    } else if (selectedFile && selectedFile.type === "text/csv") {
      const parseData = await readCsvFile(selectedFile);
      console.log(parseData);
      setData(parseData as Asset[]);
    } else {
      alert("Please upload a file in JSON or CSV format.");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!companyId) {
      alert("Please enter a Company Id");
      return;
    }

    if (data) {
      const dataWithCompanyId = data.map((asset) => ({ ...asset, companyId }));
      await fetch("/api/assets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataWithCompanyId),
      });
    } else {
      alert("No file selected");
    }
  };

  return (
    <dialog className={styles.page} open={isOpen}>
      <header className={styles.header}>
        <h2>Upload assets file</h2>
        <button className={styles.close} onClick={onClose}>X</button>
      </header>
      <form
        className={styles.form}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <em>** All fields are required</em>
        <label htmlFor="companyId">
          Company Id:
          <input
            id="companyId"
            onChange={handleCompanyId}
            type="text"
            placeholder="Company Id"
          />
        </label>
        <label htmlFor="file">
          Upload a file:
          <input
            id="file"
            type="file"
            accept=".json,.csv"
            onChange={handleFileChange}
          />
        </label>
        <div className={styles.footer}>
          <button type="reset" onClick={onClose}>
            Cancel
          </button>
          <button className="button" type="submit">
            Upload
          </button>
        </div>
      </form>
    </dialog>
  );
};
