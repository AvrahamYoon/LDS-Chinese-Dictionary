"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import type { Branch, Locale, Temple, TempleStatus } from "@/lib/types";
import { formatBranchType, formatLanguage, formatStatus } from "@/lib/format";

type BranchMapProps = {
  branches: Branch[];
  locale: Locale;
  temples: Temple[];
};

type BranchLocationGroup = {
  lat: number;
  lng: number;
  branches: Branch[];
};

const UNITED_STATES_CENTER: L.LatLngExpression = [39.5, -98.35];

const popupCopy = {
  en: {
    type: "Type",
    language: "Language",
    status: "Status",
    details: "View details",
    official: "Official church page"
  },
  zh: {
    type: "類型",
    language: "語言",
    status: "狀態",
    details: "查看詳情",
    official: "前往官方教會頁面"
  }
};

function markerColor(branch: Branch) {
  if (branch.status === "discontinued") {
    return "#8a8f98";
  }

  return branch.type === "ward" ? "#2563eb" : "#16a34a";
}

function markerGroupColor(branches: Branch[]) {
  const activeBranches = branches.filter(
    (branch) => branch.status !== "discontinued"
  );

  if (activeBranches.length === 0) {
    return "#8a8f98";
  }

  const hasWards = activeBranches.some((branch) => branch.type === "ward");
  const hasBranches = activeBranches.some((branch) => branch.type === "branch");

  if (hasWards && hasBranches) {
    return "#b8841f";
  }

  return markerColor(activeBranches[0]);
}

function createMarkerIcon(branches: Branch[]) {
  const color = markerGroupColor(branches);
  const count = branches.length;
  const countClass = count > 1 ? " is-grouped" : "";
  const label = count > 1 ? count.toString() : "";

  return L.divIcon({
    className: `branch-marker${countClass}`,
    html: `<span style="background:${color}">${label}</span>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12]
  });
}

function createTempleIcon(status: TempleStatus) {
  const statusClass = ` temple-${status}`;

  return L.divIcon({
    className: `temple-marker${statusClass}`,
    html: "<span>T</span>",
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -14]
  });
}

function branchTitle(branch: Branch, locale: Locale) {
  return locale === "zh" ? branch.name.zhTw ?? branch.name.en : branch.name.en;
}

function templeTitle(temple: Temple, locale: Locale) {
  return locale === "zh" ? temple.name.zhTw : temple.name.en;
}

function templeStatusLabel(status: TempleStatus, locale: Locale) {
  const labels: Record<TempleStatus, Record<Locale, string>> = {
    announced: { en: "Announced", zh: "已宣布" },
    operating: { en: "Operating", zh: "營運中" },
    "under-construction": { en: "Under construction", zh: "興建中" }
  };

  return labels[status][locale];
}

function branchAddress(branch: Branch) {
  return [
    branch.location.address,
    branch.location.city,
    branch.location.state,
    branch.location.postalCode
  ]
    .filter(Boolean)
    .join(", ");
}

function popupHtml(branch: Branch, locale: Locale) {
  const t = popupCopy[locale];
  const title = branchTitle(branch, locale);
  const officialLink = branch.officialUrl
    ? `<a class="popup-official-link" href="${branch.officialUrl}" target="_blank" rel="noreferrer">${t.official}</a>`
    : "";
  const address = branchAddress(branch);

  return `
    <div class="branch-popup">
      <strong>${title}</strong>
      <p>${address}</p>
      <dl>
        <div><dt>${t.type}</dt><dd>${formatBranchType(
          branch.type,
          locale
        )}</dd></div>
        <div><dt>${t.language}</dt><dd>${formatLanguage(
          branch.language,
          locale
        )}</dd></div>
        <div><dt>${t.status}</dt><dd>${formatStatus(
          branch.status,
          locale
        )}</dd></div>
      </dl>
      <div class="popup-actions">
        <a href="/branches/${branch.id}?lang=${locale}">${t.details}</a>
        ${officialLink}
      </div>
    </div>
  `;
}

function templePopupHtml(temple: Temple, locale: Locale) {
  const statusLabel = templeStatusLabel(temple.status, locale);
  const address = [
    temple.location.address,
    temple.location.city,
    temple.location.state
  ]
    .filter(Boolean)
    .join(", ");
  const milestones = [
    temple.announced
      ? `<div><dt>${locale === "zh" ? "宣布" : "Announced"}</dt><dd>${temple.announced}</dd></div>`
      : "",
    temple.groundbreaking
      ? `<div><dt>${locale === "zh" ? "動土" : "Groundbreaking"}</dt><dd>${temple.groundbreaking}</dd></div>`
      : "",
    temple.dedicated
      ? `<div><dt>${locale === "zh" ? "奉獻" : "Dedicated"}</dt><dd>${temple.dedicated}</dd></div>`
      : "",
    temple.rededicated
      ? `<div><dt>${locale === "zh" ? "重新奉獻" : "Rededicated"}</dt><dd>${temple.rededicated}</dd></div>`
      : ""
  ]
    .filter(Boolean)
    .join("");

  return `
    <div class="branch-popup temple-popup">
      <strong>${templeTitle(temple, locale)}</strong>
      <p>${address}</p>
      <dl>
        <div><dt>${locale === "zh" ? "狀態" : "Status"}</dt><dd>${statusLabel}</dd></div>
        ${milestones}
      </dl>
      ${temple.notes ? `<p>${temple.notes}</p>` : ""}
      <div class="popup-actions">
        <a class="popup-official-link" href="${temple.officialUrl}" target="_blank" rel="noreferrer">
          ${locale === "zh" ? "官方聖殿頁面" : "Official temple page"}
        </a>
      </div>
    </div>
  `;
}

function groupedPopupHtml(group: BranchLocationGroup, locale: Locale) {
  if (group.branches.length === 1) {
    return popupHtml(group.branches[0], locale);
  }

  const t = popupCopy[locale];
  const address = branchAddress(group.branches[0]);
  const unitsLabel = locale === "zh" ? "個單位" : "units";
  const heading =
    locale === "zh"
      ? `此地點有 ${group.branches.length} ${unitsLabel}`
      : `${group.branches.length} ${unitsLabel} at this location`;
  const branchItems = group.branches
    .map(
      (branch) => `
        <li>
          <strong>${branchTitle(branch, locale)}</strong>
          <dl>
            <div><dt>${t.type}</dt><dd>${formatBranchType(
              branch.type,
              locale
            )}</dd></div>
            <div><dt>${t.language}</dt><dd>${formatLanguage(
              branch.language,
              locale
            )}</dd></div>
            <div><dt>${t.status}</dt><dd>${formatStatus(
              branch.status,
              locale
            )}</dd></div>
          </dl>
          <a href="/branches/${branch.id}?lang=${locale}">${t.details}</a>
        </li>
      `
    )
    .join("");

  return `
    <div class="branch-popup branch-popup-group">
      <strong>${heading}</strong>
      <p>${address}</p>
      <ul>
        ${branchItems}
      </ul>
    </div>
  `;
}

function groupBranchesByLocation(branches: Branch[]) {
  const groups = new Map<string, BranchLocationGroup>();

  branches.forEach((branch) => {
    const key = `${branch.location.lat},${branch.location.lng}`;
    const group = groups.get(key);

    if (group) {
      group.branches.push(branch);
      return;
    }

    groups.set(key, {
      lat: branch.location.lat,
      lng: branch.location.lng,
      branches: [branch]
    });
  });

  return Array.from(groups.values());
}

export function BranchMap({ branches, locale, temples }: BranchMapProps) {
  const mapElementRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layerRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!mapElementRef.current || mapRef.current) {
      return;
    }

    const map = L.map(mapElementRef.current, {
      center: UNITED_STATES_CENTER,
      zoom: 4,
      scrollWheelZoom: true
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const layer = L.layerGroup().addTo(map);
    mapRef.current = map;
    layerRef.current = layer;

    return () => {
      map.remove();
      mapRef.current = null;
      layerRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const layer = layerRef.current;

    if (!map || !layer) {
      return;
    }

    layer.clearLayers();

    const branchGroups = groupBranchesByLocation(branches);

    branchGroups.forEach((group) => {
      L.marker([group.lat, group.lng], {
        icon: createMarkerIcon(group.branches),
        title: group.branches.map((branch) => branch.name.en).join(", ")
      })
        .bindPopup(groupedPopupHtml(group, locale), {
          closeButton: true,
          maxWidth: 340
        })
        .addTo(layer);
    });

    temples.forEach((temple) => {
      L.marker([temple.location.lat, temple.location.lng], {
        icon: createTempleIcon(temple.status),
        title: temple.name.en
      })
        .bindPopup(templePopupHtml(temple, locale), {
          closeButton: true,
          maxWidth: 360
        })
        .addTo(layer);
    });

    const boundsPoints = [
      ...branches.map((branch) => [branch.location.lat, branch.location.lng]),
      ...temples.map((temple) => [temple.location.lat, temple.location.lng])
    ] as L.LatLngExpression[];

    if (boundsPoints.length > 0) {
      const bounds = L.latLngBounds(boundsPoints);
      map.fitBounds(bounds, { padding: [42, 42], maxZoom: 11 });
    }
  }, [branches, locale, temples]);

  return <div ref={mapElementRef} className="leaflet-map" />;
}
