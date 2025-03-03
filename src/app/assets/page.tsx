'use client';
import React from "react";
import styles from './page.module.css';
import { Asset } from "@/lib/models/asset";
import {AssetList, AddAsset} from '@/lib/components';

const UploadPage: React.FC = () => {
  const [assets, setAssets] = React.useState<Asset[]>();

  React.useEffect(() => {
    fetch('/api/assets')
      .then((response) => response.json())
      .then((data) => setAssets(data))
      .catch((error) => console.error('Error fetching assets:', error));
  }, []);

  return (
    <div className={styles.page}>
      <h1>Assets list</h1>
      <AddAsset />
      <AssetList assets={assets} />
    </div>
  );
};

export default UploadPage;
