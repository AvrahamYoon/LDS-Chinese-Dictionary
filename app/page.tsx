import Link from "next/link";
import { branches } from "@/data/branches";

export default function Home() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <p className="eyebrow">LDS Chinese Directory</p>
        <h1>Chinese-speaking Unit Map</h1>
        <p className="hero-copy">
          A modern directory map for Chinese-speaking Latter-day Saint units,
          beginning with manually curated seed data across the United States.
        </p>
        <div className="hero-actions">
          <Link className="primary-link" href="/map">
            Open Map
          </Link>
          <span className="quiet-note">
            Currently tracking {branches.length} units
          </span>
        </div>
      </section>
    </main>
  );
}
