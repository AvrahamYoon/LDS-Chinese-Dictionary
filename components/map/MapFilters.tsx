"use client";

import type { BranchFilters } from "@/lib/types";

type MapFiltersProps = {
  filters: BranchFilters;
  onChange: (filters: BranchFilters) => void;
};

export function MapFilters({ filters, onChange }: MapFiltersProps) {
  return (
    <form className="filter-panel">
      <label>
        搜尋
        <input
          value={filters.search}
          onChange={(event) =>
            onChange({ ...filters, search: event.target.value })
          }
          placeholder="名稱、城市或地址"
          type="search"
        />
      </label>
      <label>
        語言
        <select
          value={filters.language}
          onChange={(event) =>
            onChange({
              ...filters,
              language: event.target.value as BranchFilters["language"]
            })
          }
        >
          <option value="all">全部</option>
          <option value="chinese">中文</option>
          <option value="mandarin">國語 / 普通話</option>
          <option value="asian">亞洲 YSA</option>
        </select>
      </label>
      <label>
        類型
        <select
          value={filters.type}
          onChange={(event) =>
            onChange({
              ...filters,
              type: event.target.value as BranchFilters["type"]
            })
          }
        >
          <option value="all">全部</option>
          <option value="ward">Ward</option>
          <option value="branch">Branch</option>
        </select>
      </label>
      <label>
        狀態
        <select
          value={filters.status}
          onChange={(event) =>
            onChange({
              ...filters,
              status: event.target.value as BranchFilters["status"]
            })
          }
        >
          <option value="all">全部</option>
          <option value="active">活躍</option>
          <option value="unknown">待確認</option>
          <option value="discontinued">已停用</option>
        </select>
      </label>
    </form>
  );
}
