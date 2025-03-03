import React from "react";
import { Asset } from "@/lib/models";
import styles from "./assetList.module.css";

type Props = {
  assets?: Asset[];
};

export const AssetList: React.FC<Props> = ({ assets }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Company Id</th>
          <th>Address</th>
          <th>Latitude</th>
          <th>Longitude</th>
        </tr>
      </thead>
      <tbody>
        {assets?.map((asset: Asset) => (
          <tr key={asset.id}>
            <td>{asset?.companyId}</td>
            <td>{asset.address}</td>
            <td>{asset.latitude}</td>
            <td>{asset.longitude}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

