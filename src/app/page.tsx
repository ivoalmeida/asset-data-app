"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import { Asset } from "@/lib/models";
import { AssetList, UploadForm } from "@/lib/components";

const UploadPage: React.FC = () => {
  const [assets, setAssets] = React.useState<Asset[]>();
  const [isUploadFormOpen, setIsUploadFormOpen] =
    React.useState<boolean>(false);
  const searchParams = useSearchParams();
  const [companyId, setCompanyId] = React.useState<string | undefined | null>(
    searchParams?.get("companyId")
  );

  const showUploadForm = () => {
    setIsUploadFormOpen(true);
  };

  const resetSearch = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("companyId");
    window.history.pushState({}, "", url.href);
    setCompanyId(null);
  };

  const getAllAssets = React.useCallback(() => {
    const endpoint = companyId
      ? `/api/assets?companyId=${companyId}`
      : "/api/assets";
    setAssets([]);
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => setAssets(data))
      .catch((error) => console.error("Error fetching assets:", error));
  }, [companyId]);

  const hideUploadForm = React.useCallback(() => {
    setIsUploadFormOpen(false);
    getAllAssets();
  }, [getAllAssets]);

  React.useEffect(() => {
    getAllAssets();
  }, [getAllAssets]);

  return (
    <div className={styles.page}>
      <h1>Assets list</h1>
      <button className="button" onClick={showUploadForm}>
        Upload assets
      </button>
      {companyId && (
        <div className={styles.companyId}>
          <h4>
            Showing assets for company id: <em>{companyId}</em>
          </h4>
          <button onClick={resetSearch}>Reset</button>
        </div>
      )}
      <AssetList assets={assets} />
      <UploadForm isOpen={isUploadFormOpen} onClose={hideUploadForm} />
    </div>
  );
};

export default UploadPage;
