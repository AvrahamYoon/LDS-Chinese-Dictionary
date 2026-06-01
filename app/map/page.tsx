import { BranchMapPage } from "@/components/map/BranchMapPage";
import { branches } from "@/data/branches";

export default function MapPage() {
  return <BranchMapPage branches={branches} />;
}
