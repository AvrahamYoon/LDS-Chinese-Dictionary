"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import type { Branch, BranchFilters } from "@/lib/types";
import { filterBranches } from "@/lib/filterBranches";
import { MapFilters } from "./MapFilters";

type BranchMapPageProps = {
  branches: Branch[];
};

const BranchMap = dynamic(
  () => import("./BranchMap").then((module) => module.BranchMap),
  {
    ssr: false,
    loading: () => <div className="map-loading">地圖載入中...</div>
  }
);

const initialFilters: BranchFilters = {
  search: "",
  status: "all",
  type: "all",
  language: "all"
};

export function BranchMapPage({ branches }: BranchMapPageProps) {
  const [filters, setFilters] = useState<BranchFilters>(initialFilters);

  const filteredBranches = useMemo(
    () => filterBranches(branches, filters),
    [branches, filters]
  );

  return (
    <main className="map-page">
      <aside className="map-sidebar" aria-label="地圖篩選">
        <div>
          <p className="eyebrow">Utah MVP</p>
          <h1>中文與亞洲單位地圖</h1>
          <p className="sidebar-copy">
            先從猶他州的 6 個單位開始，後續可以逐步加入加州、其他北美城市與歷史資料。
          </p>
        </div>
        <MapFilters filters={filters} onChange={setFilters} />
        <div className="result-count">
          顯示 <strong>{filteredBranches.length}</strong> / {branches.length}
        </div>
      </aside>
      <section className="map-canvas-wrap" aria-label="地圖">
        <BranchMap branches={filteredBranches} />
      </section>
    </main>
  );
}
