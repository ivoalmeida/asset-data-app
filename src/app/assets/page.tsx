import { Asset } from "@/lib/models/asset";
import React from "react";

async function getAssetData() {
  const response = await fetch("/api/assets");
  const data = await response.json();
  return data;
}

const UploadPage: React.FC = () => {
  const [assets, setAssets] = React.useState<Asset[]>();

  React.useEffect(() => {
    getAssetData().then((data) => setAssets(data));
  }, []);
  return (
    <div>
      <h1>Assets list</h1>
      <table>
        <thead>
          <tr>
            <th>Address</th>
            <th>Latitude</th>
            <th>Longitude</th>
          </tr>
        </thead>
        <tbody>
          {assets?.map((asset: Asset) => (
            <tr key={asset.address}>
              <td>{asset.address}</td>
              <td>{asset.latitude}</td>
              <td>{asset.longitude}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UploadPage;
