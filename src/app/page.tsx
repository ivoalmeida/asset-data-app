import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div>
      <h1>hello</h1>
      <Link href="/assets">go to assets</Link>
    </div>
  );
}
