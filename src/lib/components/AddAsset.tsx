import React from "react";
import styles from './addAsset.module.css'
import Link from "next/link";

export const AddAsset: React.FC = () => {
  return (
    <div className={styles.page}>
      <Link className="button" href="/assets/upload">Upload assets</Link>
    </div>
  );
};

