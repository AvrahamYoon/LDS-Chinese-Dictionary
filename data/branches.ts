import type { Branch } from "@/lib/types";

export const branches: Branch[] = [
  {
    id: "ut-provo-edgemont-22nd",
    name: {
      en: "Edgemont 22nd Ward (Chinese)",
      zhTw: "埃奇蒙特第二十二支會（中文）"
    },
    type: "ward",
    language: "chinese",
    status: "active",
    location: {
      lat: 40.2969,
      lng: -111.6948,
      address: "2900 Timpview Dr",
      city: "Provo",
      state: "UT",
      postalCode: "84604",
      country: "US"
    },
    region: "utah",
    notes: "座標為 MVP 初始資料，後續建議逐筆核對。"
  },
  {
    id: "ut-provo-ysa-asian-1st",
    name: {
      en: "Provo YSA Asian 1st Ward",
      zhTw: "普羅沃單身成人亞洲第一支會"
    },
    type: "ward",
    language: "asian",
    status: "active",
    location: {
      lat: 40.2525,
      lng: -111.6558,
      address: "1345 N 200 E",
      city: "Provo",
      state: "UT",
      postalCode: "84604",
      country: "US"
    },
    region: "utah",
    notes: "亞洲 YSA 單位，語言分類暫列為 asian。"
  },
  {
    id: "ut-provo-ysa-asian-2nd",
    name: {
      en: "Provo YSA Asian 2nd Ward",
      zhTw: "普羅沃單身成人亞洲第二支會"
    },
    type: "ward",
    language: "asian",
    status: "active",
    location: {
      lat: 40.2419,
      lng: -111.6518,
      address: "395 East 600 North",
      city: "Provo",
      state: "UT",
      postalCode: "84606",
      country: "US"
    },
    region: "utah",
    notes: "亞洲 YSA 單位，語言分類暫列為 asian。"
  },
  {
    id: "ut-salt-lake-6th-chinese",
    name: {
      en: "Salt Lake 6th Ward (Chinese)",
      zhTw: "鹽湖城第六支會（中文）"
    },
    type: "ward",
    language: "chinese",
    status: "active",
    location: {
      lat: 40.7285,
      lng: -111.8794,
      address: "1955 S 400 E",
      city: "Salt Lake City",
      state: "UT",
      postalCode: "84115",
      country: "US"
    },
    region: "utah",
    notes: "座標為 MVP 初始資料，後續建議逐筆核對。"
  },
  {
    id: "ut-logan-foothills-3rd-mandarin",
    name: {
      en: "Foothills 3rd Branch (Mandarin)",
      zhTw: "山麓第三分會（國語）"
    },
    type: "branch",
    language: "mandarin",
    status: "active",
    location: {
      lat: 41.759,
      lng: -111.8027,
      address: "1450 E 1500 N",
      city: "Logan",
      state: "UT",
      postalCode: "84321",
      country: "US"
    },
    region: "utah",
    notes: "座標為 MVP 初始資料，後續建議逐筆核對。"
  },
  {
    id: "ut-ogden-woodland-mandarin",
    name: {
      en: "Woodland Branch (Mandarin)",
      zhTw: "伍德蘭分會（國語）"
    },
    type: "branch",
    language: "mandarin",
    status: "active",
    location: {
      lat: 41.2052,
      lng: -111.9373,
      address: "1401 Country Hills Dr",
      city: "Ogden",
      state: "UT",
      postalCode: "84403",
      country: "US"
    },
    region: "utah",
    notes: "座標為 MVP 初始資料，後續建議逐筆核對。"
  }
];
