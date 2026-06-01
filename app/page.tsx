import Link from "next/link";
import { branches } from "@/data/branches";

export default function Home() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <p className="eyebrow">LDS Chinese Directory</p>
        <h1>海外中文單位地圖</h1>
        <p className="hero-copy">
          從猶他州開始，整理華語、粵語與亞洲 YSA 單位的位置、聚會地址與基本狀態。
        </p>
        <div className="hero-actions">
          <Link className="primary-link" href="/map">
            查看地圖
          </Link>
          <span className="quiet-note">目前收錄 {branches.length} 個猶他州單位</span>
        </div>
      </section>
    </main>
  );
}
