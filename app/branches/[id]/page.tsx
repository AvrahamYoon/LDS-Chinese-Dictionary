import Link from "next/link";
import { notFound } from "next/navigation";
import { branches } from "@/data/branches";
import { formatBranchType, formatLanguage, formatStatus } from "@/lib/format";

type BranchPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return branches.map((branch) => ({ id: branch.id }));
}

export default async function BranchPage({ params }: BranchPageProps) {
  const { id } = await params;
  const branch = branches.find((item) => item.id === id);

  if (!branch) {
    notFound();
  }

  const address = [
    branch.location.address,
    branch.location.city,
    branch.location.state,
    branch.location.postalCode
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <main className="detail-page">
      <Link className="back-link" href="/map">
        返回地圖
      </Link>
      <article className="detail-panel">
        <p className="eyebrow">{formatBranchType(branch.type)}</p>
        <h1>{branch.name.en}</h1>
        <dl className="detail-grid">
          <div>
            <dt>中文名稱</dt>
            <dd>{branch.name.zhTw ?? "待補"}</dd>
          </div>
          <div>
            <dt>語言</dt>
            <dd>{formatLanguage(branch.language)}</dd>
          </div>
          <div>
            <dt>狀態</dt>
            <dd>{formatStatus(branch.status)}</dd>
          </div>
          <div>
            <dt>聚會地址</dt>
            <dd>{address}</dd>
          </div>
        </dl>
        {branch.notes ? <p className="detail-notes">{branch.notes}</p> : null}
      </article>
    </main>
  );
}
