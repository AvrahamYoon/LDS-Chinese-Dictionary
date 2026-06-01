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
    loading: () => <div className="map-loading">Loading map...</div>
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
      <aside className="map-sidebar" aria-label="Map filters">
        <div>
          <p className="eyebrow">MVP Directory</p>
          <h1>Chinese-speaking Unit Map</h1>
          <p className="sidebar-copy">
            A lightweight directory map for Chinese-speaking and Asian YSA
            units, starting with seed data across Utah, California, Texas, New
            York, Massachusetts, and selected additional states.
          </p>
        </div>
        <MapFilters filters={filters} onChange={setFilters} />
        <div className="result-count">
          Showing <strong>{filteredBranches.length}</strong> / {branches.length}
        </div>
      </aside>
      <section className="map-canvas-wrap" aria-label="Map">
        <BranchMap branches={filteredBranches} />
      </section>
    </main>
  );
}
