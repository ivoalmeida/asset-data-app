"use client";
import React from "react";
import { useSearchParams } from 'next/navigation';
import styles from "./page.module.css";
import { Asset } from "@/lib/models";
import { AssetList, UploadForm } from "@/lib/components";

const UploadPage: React.FC = () => {
  const [assets, setAssets] = React.useState<Asset[]>();
  const [showUploadForm, setshowUploadForm] = React.useState<boolean>(false);
  const searchParams = useSearchParams();
  const companyId = searchParams?.get('companyId');

  const toggleShowUploadForm = () => {
    setshowUploadForm(!showUploadForm);
  };

  React.useEffect(() => {
    fetch("/api/assets")
      .then((response) => response.json())
      .then((data) => setAssets(data))
      .catch((error) => console.error("Error fetching assets:", error));
  }, []);

  React.useEffect(() => {
    if (companyId) {
      fetch(`/api/assets?companyId=${companyId}`)
        .then((response) => response.json())
        .then((data) => setAssets(data))
        .catch((error) => console.error("Error fetching assets:", error));
    }
  }, [companyId]);

  return (
    <div className={styles.page}>
      <h1>Assets list</h1>
      <button className="button" onClick={toggleShowUploadForm}>
        Upload assets
      </button>
      <AssetList assets={assets} />
      <UploadForm isOpen={showUploadForm} onClose={toggleShowUploadForm} />
    </div>
  );
};

export default UploadPage;
