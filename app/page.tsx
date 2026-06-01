import Link from "next/link";
import { branches } from "@/data/branches";

export default function Home() {
  return (
    <main className="intro-page">
      <section className="intro-hero">
        <p className="eyebrow">LDS Chinese Directory</p>
        <h1>Chinese-speaking Unit Directory</h1>
        <p className="hero-copy">
          Explore Mandarin and Chinese-speaking Latter-day Saint units around
          the world through a clean, map-based directory.
        </p>
        <p className="hero-copy zh-copy">
          以簡潔地圖整理全球國語中文後期聖徒單位，方便查找聚會地點與基本資料。
        </p>
        <div className="language-cards" aria-label="Choose language">
          <Link className="language-card" href="/map?lang=zh">
            <span>國語</span>
            <strong>進入繁體中文</strong>
          </Link>
          <Link className="language-card" href="/map?lang=en">
            <span>English</span>
            <strong>Continue in English</strong>
          </Link>
        </div>
        <p className="quiet-note">{branches.length} units currently listed</p>
      </section>
    </main>
  );
}
