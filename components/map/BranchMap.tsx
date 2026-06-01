"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import type { Branch } from "@/lib/types";
import { formatBranchType, formatLanguage, formatStatus } from "@/lib/format";

type BranchMapProps = {
  branches: Branch[];
};

const UTAH_CENTER: L.LatLngExpression = [40.25, -111.78];

function markerColor(branch: Branch) {
  if (branch.status === "discontinued") {
    return "#8a8f98";
  }

  return branch.type === "ward" ? "#2563eb" : "#16a34a";
}

function createMarkerIcon(branch: Branch) {
  const color = markerColor(branch);

  return L.divIcon({
    className: "branch-marker",
    html: `<span style="background:${color}"></span>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12]
  });
}

function popupHtml(branch: Branch) {
  const address = [
    branch.location.address,
    branch.location.city,
    branch.location.state,
    branch.location.postalCode
  ]
    .filter(Boolean)
    .join(", ");

  return `
    <div class="branch-popup">
      <strong>${branch.name.en}</strong>
      <p>${address}</p>
      <dl>
        <div><dt>類型</dt><dd>${formatBranchType(branch.type)}</dd></div>
        <div><dt>語言</dt><dd>${formatLanguage(branch.language)}</dd></div>
        <div><dt>狀態</dt><dd>${formatStatus(branch.status)}</dd></div>
      </dl>
      <a href="/branches/${branch.id}">查看詳情</a>
    </div>
  `;
}

export function BranchMap({ branches }: BranchMapProps) {
  const mapElementRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layerRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!mapElementRef.current || mapRef.current) {
      return;
    }

    const map = L.map(mapElementRef.current, {
      center: UTAH_CENTER,
      zoom: 7,
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

    branches.forEach((branch) => {
      L.marker([branch.location.lat, branch.location.lng], {
        icon: createMarkerIcon(branch),
        title: branch.name.en
      })
        .bindPopup(popupHtml(branch), {
          closeButton: true,
          maxWidth: 280
        })
        .addTo(layer);
    });

    if (branches.length > 0) {
      const bounds = L.latLngBounds(
        branches.map((branch) => [branch.location.lat, branch.location.lng])
      );
      map.fitBounds(bounds, { padding: [42, 42], maxZoom: 11 });
    }
  }, [branches]);

  return <div ref={mapElementRef} className="leaflet-map" />;
}
